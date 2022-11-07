<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Notice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class NoticeController extends Controller
{
    //list
    public function htmlList(Request $request) {
        if (empty($this->list_notices_permissions) || $this->list_notices_permissions->PERMISSION_SEARCH != 'Y') {
            return view('errors.403');
        }
        return view('notices.list.index');
    }

    public function list(Request $request) {
        if (empty($this->list_notices_permissions) || $this->list_notices_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $notices = Notice::join('T_USER', 'T_USER.ID', '=', 'T_NOTICE.CREATED_BY')
            ->select('T_NOTICE.*', 'T_USER.USER_NAME')
            ->orderBy('ID', 'DESC');
        if ($request->type) {
            if ($request->keyword) {
                $keyword = trim($request->keyword);
                switch ($request->type) {
                    case 'title':
                        $notices = $notices->where('SUBJECT', 'like', "%$keyword%");
                        break;
                    case 'content':
                        $notices = $notices->where('CONTENT', 'like', "%$keyword%");
                        break;
                    case 'title_content':
                        $notices = $notices->where(function ($q) use ($keyword) {
                            return $q->where('SUBJECT', 'like', '%' . $keyword . '%')->orWhere('CONTENT', 'like', '%' . $keyword . '%');
                        });
                        break;
                    case 'author':
                        $notices = $notices->where('T_USER.USER_NAME', 'like', "%$keyword%");
                        break;
                    default:

                }
            }
        }

        $notices = $notices->get();

        //convert attachments, add dept name and format created at
        foreach ($notices as $notice) {
            if ($notice['ATTACH_FILES']) $notice['ATTACH_FILES'] = json_decode($notice['ATTACH_FILES']);
            if ($notice['DEPT_ID']) $notice['DEPT_NAME'] = $notice->dept->DEPT_NAME;
            $notice['CREATED_AT'] = date_format(date_create($notice['CREATED_AT']),"Y.m.d");
        }

        return $this->responseSuccessData(200, $notices);
    }

    //detail
    public function htmlDetail(Request $request) {
        if (!checkJoinTabPermission($this->detail_notices_permissions)) {
            return view('errors.403');
        }
        $notice = Notice::find($request->id);
        if ($notice) {
            $notice->update([
                'READ_CNT' => $notice->READ_CNT + 1
            ]);
            $notice['CREATED_AT'] = date_format(date_create($notice['CREATED_AT']),"Y.m.d");
        }

        $previous = null;
        $next = null;
        if ($request->id) {
            // get previous notice
            $previous_id = Notice::where('ID', '<', $request->id)->max('ID');
            if ($previous_id) $previous = Notice::find($previous_id);

            // get next notice
            $next_id = Notice::where('ID', '>', $request->id)->min('ID');
            if ($next_id) $next = Notice::find($next_id);
        }
        return view('notices.detail.index', ['notice' => $notice, 'previous' => $previous, 'next' => $next]);
    }

    public function detail(Request $request) {

    }

    //create
    public function htmlCreate(Request $request) {
        if (empty($this->create_notice_permissions) || $this->create_notice_permissions->PERMISSION_SAVE != 'Y') {
            return view('errors.403');
        }
        return view('notices.create.index', ['departments' => $this->getDepartments()]);
    }

    public function create(Request $request) {
        if (empty($this->create_notice_permissions) || $this->create_notice_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            $create_data = [
                'SUBJECT' => $request->name,
                'CONTENT' => $request->get('content'),
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'READ_CNT' => 0,
                'CREATED_BY' => auth()->id(),
            ];

            if ($request->dept_id) {
                if (!checkExistIdInData($request->dept_id, Department::class))
                    return $this->responseErrorMessage(404, 'Department not found.');
                $create_data['DEPT_ID'] = $request->dept_id;
            }

            //handle upload attachments if any
            if ($request->attachments) {
                $attachment_path_arr = array();
                foreach ($request->attachments as $attachment) {
                    $folderUploads = public_path('/uploads/notices/');
                    if (!File::isDirectory($folderUploads)) {
                        File::makeDirectory($folderUploads, 0777, true, true);
                    }
                    $attachment_name = $attachment->getClientOriginalName();
                    $attachment->move('uploads/notices/', time() . '_' . $attachment_name);
                    $attachment_path = '/uploads/notices/' . time() . '_' . $attachment_name;
                    array_push($attachment_path_arr, $attachment_path);
                }
                $create_data['ATTACH_FILES'] = json_encode($attachment_path_arr);
            }

            Notice::create($create_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Create notice false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create notice failed.');
        }
    }

}
