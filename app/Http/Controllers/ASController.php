<?php

namespace App\Http\Controllers;

use App\Exports\DetailASExport;
use App\Mail\SendUrlCreateAS;
use App\Models\ASImage;
use App\Models\ASNotice;
use App\Models\ASReceipt;
use App\Models\CodeDetail;
use App\Models\CodeMaster;
use App\Models\Locker;
use App\Models\Notice;
use App\Models\Station;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class ASController extends Controller
{
    public function htmlCreate()
    {
        $dataRelate = $this->getDataRelateToAS();
        $lockers = Locker::where('STATION_ID', auth()->user()->CFM_STATION_ID)->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $dataRelate['lockers'] = $lockers;
        return view('after_services.create', $dataRelate);
    }

    public function htmlGuestCreate()
    {
        return view('after_services.guest_create', $this->getDataRelateToAS());
    }

    public function detail_as($id) {
        $as = ASReceipt::find($id);
        if (!$as) return $this->responseErrorMessage('404', 'AS 접수내역을 찾을 수 없습니다!');
        return $this->responseSuccessData(200, $as);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ask_type' => 'required',
            'defect_type' => 'required',
            'locker_id' => 'required',
            'telephone' => 'required',
            'email' => 'email',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
        //check data
            //locker
            if (!checkExistIdInData($request->locker_id, Locker::class))
                return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다.');
            //ask type
            if (!checkExistIdInData($request->ask_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Ask type not found.');
            //defect type
            if (!checkExistIdInData($request->defect_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Defect type not found.');
            $create_data = [
                'RECEIPT_YMD' => date("Y-m-d H:i"),
                'ASK_TYPE' => $request->ask_type,
                'DEFECT_TYPE' => $request->defect_type,
                'ASK_REMARK' => $request->ask_remark,
                'LOCKER_ID' => $request->locker_id,
                'TEL_NO' => $request->telephone,
                'E_MAIL' => $request->email,
                'PROG_STATUS' => config('constants.DETAIL_CODES.PROG_STATUS.RECEIPT'),
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'CREATED_BY' => auth()->id(),
            ];
            $as = ASReceipt::create($create_data);

            //handle upload attachments if any
            if ($request->images) {
                $folderUploads = public_path('/uploads/as_receipts/');
                if (!File::isDirectory($folderUploads)) {
                    File::makeDirectory($folderUploads, 0777, true, true);
                }
                foreach ($request->images as $image) {
                    $image_name = $image->getClientOriginalName();
                    $image->move('uploads/as_receipts/', time() . '_' . $image_name);
                    $image_path = '/uploads/as_receipts/' . time() . '_' . $image_name;
                    ASImage::create([
                        'AS_RECEIPT_ID' => $as->ID,
                        'IMAGE_PATH' => $image_path,
                        'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                        'CREATED_BY' => auth()->id(),
                    ]);
                }
            }

            DB::commit();
            return $this->responseSuccessMessage(200, 'Create as success.');
        } catch (\Exception $e) {
            Log::notice("Create as false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create as failed.');
        }
    }

    public function guestStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ask_type' => 'required',
            'defect_type' => 'required',
            'area1' => 'required',
            'area2' => 'required',
            'location' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
        //check data
            //ask type
            if (!checkExistIdInData($request->ask_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Ask type not found.');
            //defect type
            if (!checkExistIdInData($request->defect_type, CodeDetail::class))
                return $this->responseErrorMessage( 404, 'Defect type not found.');
            //area1
            if (!checkExistIdInData($request->area1, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Area not found.');

            $guest_create_data = [
                'RECEIPT_YMD' => date("Y-m-d H:i"),
                'ASK_TYPE' => $request->ask_type,
                'DEFECT_TYPE' => $request->defect_type,
                'ASK_REMARK' => $request->ask_remark,
                'TEL_NO' => $request->telephone,
                'AREA1_DIV' => $request->area1,
                'AREA2_NM' => $request->area2,
                'LOCATION_NM' => $request->location,
                'E_MAIL' => $request->email,
                'PROG_STATUS' => config('constants.DETAIL_CODES.PROG_STATUS.RECEIPT'),
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
            ];
            $as = ASReceipt::create($guest_create_data);

            //handle upload attachments if any
            if ($request->images) {
                $folderUploads = public_path('/uploads/as_receipts/');
                if (!File::isDirectory($folderUploads)) {
                    File::makeDirectory($folderUploads, 0777, true, true);
                }
                foreach ($request->images as $image) {
                    $image_name = $image->getClientOriginalName();
                    $image->move('uploads/as_receipts/', time() . '_' . $image_name);
                    $image_path = '/uploads/as_receipts/' . time() . '_' . $image_name;
                    ASImage::create([
                        'AS_RECEIPT_ID' => $as->ID,
                        'IMAGE_PATH' => $image_path,
                        'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                    ]);
                }
            }

            DB::commit();
            return $this->responseSuccessMessage(200, 'Guest create as success.');
        } catch (\Exception $e) {
            Log::notice("Guest create as false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Guest create as failed.');
        }
    }

    //edit
    public function htmlEdit(Request $request)
    {
        if (!checkJoinTabPermission($this->edit_as_permissions) || $this->edit_as_permissions->PERMISSION_SEARCH != 'Y') {
            return view('errors.403');
        }

        return view('after_services.edit.index', $this->getDataRelateToEditASAndHandleAS($request));
    }

    public function getByLocker(Request $request)
    {
        if ((empty($this->edit_as_permissions) || $this->edit_as_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->handle_as_permissions) || $this->handle_as_permissions->PERMISSION_SEARCH != 'Y')) {
            return $this->responseError403();
        }

        $as_list = ASReceipt::orderBy('ID', 'DESC');
        if ($request->locker_id) {
            $as_list = $as_list->where('LOCKER_ID', $request->locker_id);
        } else {
            $as_list = $as_list->whereNull('LOCKER_ID');
        }

        if ($request->use_date) {
            if ($request->start) $as_list->whereDate('RECEIPT_YMD', '>=', $request->start);
            if ($request->end) $as_list->whereDate('RECEIPT_YMD', '<=', $request->end);
        }
        if ($request->except_complete) $as_list = $as_list->where('PROG_STATUS', '!=', config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE'));

        $as_list = $as_list->get();

        foreach ($as_list as $as) {
            $this->convertASListInASController($as);
            if ($as['LOCKER_ID']) {
                $as['LOCKER_NAME'] = $as->locker->LOCKER_NAME;
                $station = $as->locker->station;
                $as['STATION_NAME'] = $station->STATION_NAME;
                $as['STATION_TYPE'] = $station->STATION_TYPE;
                $as['STATION_REG_CODE'] = $station->REG_CODE;
                $as['STATION_REPR_NM'] = $station->REPR_NM;
                $as['STATION_TEL_NO'] = $station->TEL_NO;
                $as['STATION_MNGR_NM'] = $station->MNGR_NM;
                $as['STATION_MOBL_NO'] = $station->MOBL_NO;
                $as['STATION_MAINT_TYPE'] = $station->MAINT_TYPE;
                if ($as['STATION_MAINT_TYPE']) $as['STATION_MAINT_TYPE_NAME'] = $station->maintType->CODED_NAME;
                $as['STATION_MAINT_END_YMD'] = $station->MAINT_END_YMD;
            }
            if ($as['USER_ID']) $as['USER_NAME'] = $as->user->USER_NAME;
        }

        return $this->responseSuccessData(200, $as_list);
    }

    public function updateAS(Request $request, $id)
    {
        if (empty($this->edit_as_permissions) || $this->edit_as_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'ask_type' => 'required',
            'defect_type' => 'required',
            'emergency_type' => 'required',
            'ask_remark' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
        //check data
            //ask type
            if (!checkExistIdInData($request->ask_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Ask type not found.');
            //defect
            if (!checkExistIdInData($request->defect_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Defect type not found.');
            //emergency type
            if (!checkExistIdInData($request->emergency_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Emergency type not found.');
            //manager
            if ($request->manager_id) {
                if (!checkExistIdInData($request->manager_id, User::class))
                    return $this->responseErrorMessage(404, 'Manager not found.');
            }
            $update_data = [
                'ASK_TYPE' => $request->ask_type,
                'DEFECT_TYPE' => $request->defect_type,
                'EMERGENCY_TYPE' => $request->emergency_type,
                'ASK_REMARK' => $request->ask_remark,
                'TEL_NO' => $request->phone,
                'E_MAIL' => $request->email,
                'USER_ID' => $request->manager_id,
                'PROC_PLAN_YMD' => $request->plan_date,
                'PROC_CMPL_YMD' => $request->complete_date,
                'UPDATED_BY' => auth()->id(),
            ];
            if ($request->locker_id) {
                if (!checkExistIdInData($request->locker_id, Locker::class))
                    return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다.');
                $update_data['LOCKER_ID'] = $request->locker_id;
            }
            $as = ASReceipt::find($id);
            if (!$as) return $this->responseErrorMessage(404, 'AS 접수내역을 찾을 수 없습니다.');
            if ($as->PROG_STATUS == config('constants.DETAIL_CODES.PROG_STATUS.RECEIPT')) $update_data['PROG_STATUS'] = config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE_RECEIPT');
            $as->update($update_data);
            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Update as false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update as failed.');
        }
    }

    public function delete($id) {
        if ((empty($this->edit_as_permissions) || $this->edit_as_permissions->PERMISSION_DELETE != 'Y') && (empty($this->handle_as_permissions) || $this->handle_as_permissions->PERMISSION_DELETE != 'Y')) {
            return $this->responseError403();
        }
        try {
            DB::beginTransaction();
            $as = ASReceipt::find($id);
            if (!$as) $this->responseErrorMessage(404, 'AS 접수내역을 찾을 수 없습니다.');
            if (count($as->notices()->get())) return $this->responseErrorMessage(400, 'This AS cannot be deleted, contact IT to get it resolved.');
            $as->delete();

            DB::commit();
            return response()->json([
                'code' => 200,
                'message' => '삭제되었습니다.'
            ]);
        } catch (\Exception $e) {
            Log::notice("Delete as false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Delete as failed.');
        }
    }

    public function sendUrlCreateAS(Request $request)
    {
        if (empty($this->edit_as_permissions) || $this->edit_as_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            Mail::to($request->email)->send(new SendUrlCreateAS());
            return response()->json([
                'code' => 200,
                'message' => '이메일 발송되었습니다.'
            ]);
        } catch (\Exception $e) {
            Log::notice("Send url create as false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, '이메일 전송이 실패하였습니다.');
        }
    }

    //handle
    public function htmlHandle(Request $request)
    {
        if (!checkJoinTabPermission($this->handle_as_permissions)) {
            return view('errors.403');
        }
        return view('after_services.handle.index', $this->getDataRelateToEditASAndHandleAS($request));
    }

    public function handleAS(Request $request, $id)
    {
        if (empty($this->handle_as_permissions) || $this->handle_as_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        if (empty($this->handle_as_permissions) || $this->handle_as_permissions->PERMISSION_SAVE != 'Y') {
            return response()->json([
                'code' => 403,
                'message' => config('messages.ERROR.403_FORBIDDEN')
            ]);
        }

        $validator = Validator::make($request->all(), [
            'defect_type' => 'required',
            'emergency_type' => 'required',
            'prog_status' => 'required',
            'complete_date' => 'required',
            'ask_remark' => 'required',
            'complete_remark' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            if ($request->manager_id) {
                if (!checkExistIdInData($request->manager_id, User::class))
                    return $this->responseErrorMessage(404, 'Manager not found.');
            }
            if (!checkExistIdInData($request->defect_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Defect type not found.');
            if (!checkExistIdInData($request->emergency_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Emergency type not found.');
            if (!checkExistIdInData($request->prog_status, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Progress status not found.');
            $handle_data = [
                'USER_ID' => $request->manager_id,
                'DEFECT_TYPE' => $request->defect_type,
                'EMERGENCY_TYPE' => $request->emergency_type,
                'PROG_STATUS' => $request->prog_status,
                'PROC_PLAN_YMD' => $request->plan_date,
                'PROC_CMPL_YMD' => $request->complete_date,
                'BLLING_YMD' => $request->blling_date,
                'ASK_REMARK' => $request->ask_remark,
                'CMPL_REMARK' => $request->complete_remark,
                'UPDATED_BY' => auth()->id(),
            ];
            if ($request->locker_id) {
                if (!checkExistIdInData($request->locker_id, Locker::class))
                    return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다.');
                $handle_data['LOCKER_ID'] = $request->locker_id;
            }
            if ($file = $request->attach_file) {
                $folderUploads = public_path('/uploads/as_receipts/handle/');
                if (!File::isDirectory($folderUploads)) {
                    File::makeDirectory($folderUploads, 0777, true, true);
                }
                $file_name = $file->getClientOriginalName();
                $file->move('uploads/as_receipts/handle/', time() . '_' . $file_name);
                $file_path = '/uploads/as_receipts/handle/' . time() . '_' . $file_name;
                $handle_data['ATTACH_FILE'] = $file_path;
            }
            $as = ASReceipt::find($id);
            if (!$as) $this->responseErrorMessage(404, 'AS 접수내역을 찾을 수 없습니다.');
            $as->update($handle_data);
            DB::commit();
            return response()->json([
                'code' => 200,
                'message' => '저장되었습니다.'
            ]);
        } catch (\Exception $e) {
            Log::notice("Handle as false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Handle as failed.');
        }
    }

    //detail
    public function htmlDetail(Request $request) {
        if (!checkJoinTabPermission($this->detail_as_permissions)) {
            return view('errors.403');
        }
        $totalASCount = ASReceipt::where(function ($query) {
            return $query->where(function ($q1) {
                return $q1->whereYear('CREATED_AT', '<', date('Y'))->where('PROG_STATUS', '!=', config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE'));
            })->orWhere(function ($q2) {
                return $q2->whereDate('CREATED_AT', '>=', date('Y') . '-01-01');
            });
        })->count();
        $completeASCount = ASReceipt::whereDate('CREATED_AT', '>=', date('Y') . '-01-01')->where('PROG_STATUS', '!=', config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE'))->count();
        return view('after_services.detail.index', ['totalASCount' => $totalASCount, 'completeASCount' => $completeASCount]);
    }

    public function getNewASNotices() {
        if (empty($this->detail_as_permissions) || $this->detail_as_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $newASNotices = ASNotice::whereNull('UPPER_ID')->orderBy('ID', 'DESC')->take(10)->get();
        foreach ($newASNotices as $newASNotice) {
            $newASNotice['CREATED_BY_NAME'] = $newASNotice->created_by->USER_NAME;
            $created_at = date_create($newASNotice['CREATED_AT']);
            $newASNotice['CREATED_AT'] = date_format($created_at,"Y.m.d H:i");
            $departments = $newASNotice->departments()->pluck('DEPT_NAME')->toArray();
            $newASNotice['DEPARTMENT_NAME'] = implode(',', $departments);
        }
        return $this->responseSuccessData(200, $newASNotices);
    }
    public function getNewNotices() {
        if (empty($this->detail_as_permissions) || $this->detail_as_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $newNotices = Notice::where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->take(10)->get();
        foreach ($newNotices as $newNotice) {
            if ($newNotice['DEPT_ID']) $newNotice['DEPT_NAME'] = $newNotice->dept->DEPT_NAME;
            $newNotice['CREATED_AT'] = date_format(date_create($newNotice['CREATED_AT']),"Y.m.d");
        }
        return $this->responseSuccessData(200, $newNotices);
    }
    public function getMaintainStations() {
        if (empty($this->detail_as_permissions) || $this->detail_as_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $now = date('Y-m-d');
        $day = 30;
        $newDate = date('Y-m-d', strtotime("+$day days"));
        $newMaintainStations = Station::where('MAINT_END_YMD', '>=', $now)->where('MAINT_END_YMD', '<=', $newDate)->take(10)->get();
        foreach ($newMaintainStations as $newMaintainStation) {
            if ($newMaintainStation['MAINT_TYPE']) $newMaintainStation['MAINT_TYPE_NAME'] = $newMaintainStation->maintType->CODED_NAME;
        }
        return $this->responseSuccessData(200, $newMaintainStations);
    }

    public function detail(Request $request) {
        if (empty($this->detail_as_permissions) || $this->detail_as_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $as_list = ASReceipt::select('T_AS_RECEIPT.*')
            ->leftJoin('T_LOCKER', 'T_LOCKER.ID', '=', 'T_AS_RECEIPT.LOCKER_ID')
            ->leftJoin('T_STATION', 'T_STATION.ID', '=', 'T_LOCKER.STATION_ID')
            ->orderBy('T_AS_RECEIPT.ID', 'DESC');
        if ($request->keyword) {
            $keyword = $request->keyword;

            $as_list = $as_list->where(function ($q) use ($keyword) {
                return $q->where(function ($sq) use ($keyword) {
                    if (stripos(config('constants.NON_MEMBER_AS_RECEPTION'), $keyword) !== false) return $sq->whereNull('T_AS_RECEIPT.LOCKER_ID');
                    return $sq;
                })->orWhere(function ($sq) use ($keyword) {
                    return $sq->where('T_STATION.STATION_NAME', 'like', '%' . $keyword . '%')
                        ->orWhere('T_LOCKER.LOCKER_NAME', 'like', '%' . $keyword . '%');
                });
            });

        }
        if ($request->use_date) {
            if ($request->start || $request->end) {
                if ($request->start) $as_list = $as_list->whereDate('T_AS_RECEIPT.RECEIPT_YMD', '>=', $request->start);
                if ($request->end) $as_list = $as_list->whereDate('T_AS_RECEIPT.RECEIPT_YMD', '<=', $request->end);
            }
        }
        if ($request->except_complete) $as_list = $as_list->where('T_AS_RECEIPT.PROG_STATUS', '!=', config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE'));

        if ($request->only_complete) $as_list = $as_list->where('T_AS_RECEIPT.PROG_STATUS', config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE'));

        $as_list = $as_list->get();

        foreach ($as_list as $as) {
            $this->convertASListInASController($as);
            if ($as['LOCKER_ID']) {
                $locker = $as->locker;
                $station = $locker->station;
                $as['LOCKER_NAME'] = $locker->LOCKER_NAME;
                if ($station->MAINT_TYPE) $as['STATION_MAINT_TYPE_NAME'] = $station->maintType->CODED_NAME;
            }
            if ($as['USER_ID']) $as['USER_NAME'] = $as->user->USER_NAME;
        }
        return response()->json([
            'code' => 200,
            'data' => $as_list
        ]);
    }

    public function detailExport(Request $request) {
        $keyword = trim($request->keyword);
        $start = $request->start;
        $end = $request->end;
        $use_date = $request->use_date;
        $except_complete = $request->except_complete;
        $only_complete = $request->only_complete;
        return Excel::download(new DetailASExport($keyword, $start, $end, $use_date, $except_complete, $only_complete), 'as_list.xlsx');
    }

    //staff create as
    public function staffStore(Request $request) {
        if (empty($this->edit_as_permissions) || $this->edit_as_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'ask_type' => 'required',
            'defect_type' => 'required',
            'emergency_type' => 'required',
            'ask_remark' => 'required',
            'locker_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check data
            //ask type
            if (!checkExistIdInData($request->ask_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Ask type not found.');
            //defect
            if (!checkExistIdInData($request->defect_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Defect type not found.');
            //emergency type
            if (!checkExistIdInData($request->emergency_type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Emergency type not found.');
            //manager
//            if ($request->manager_id) {
//                if (!checkExistIdInData($request->manager_id, User::class))
//                    return $this->responseErrorMessage(404, 'Manager not found.');
//            }
            //locker
            if ($request->locker_id) {
                if (!checkExistIdInData($request->locker_id, Locker::class))
                    return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다.');
            }
            $staff_create_data = [
                'RECEIPT_YMD' => date("Y-m-d H:i"),
                'LOCKER_ID' => $request->locker_id,
                'ASK_TYPE' => $request->ask_type,
                'DEFECT_TYPE' => $request->defect_type,
                'EMERGENCY_TYPE' => $request->emergency_type,
                'ASK_REMARK' => $request->ask_remark,
                'TEL_NO' => $request->phone,
                'E_MAIL' => $request->email,
//                'USER_ID' => $request->manager_id,
                'PROG_STATUS' => config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE_RECEIPT'),
//                'PROC_PLAN_YMD' => $request->plan_date,
//                'PROC_CMPL_YMD' => $request->complete_date,
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'CREATED_BY' => auth()->id(),
            ];
            $as = ASReceipt::create($staff_create_data);
            $this->convertASListInASController($as);
            if ($as['LOCKER_ID']) {
                $locker = $as->locker;
                $station = $locker->station;
                $as['LOCKER_NAME'] = $locker->LOCKER_NAME;
                if ($station->MAINT_TYPE) $as['STATION_MAINT_TYPE_NAME'] = $station->maintType->CODED_NAME;
            }
            if ($as['USER_ID']) $as['USER_NAME'] = $as->user->USER_NAME;
            DB::commit();
            return $this->responseSuccessData(200, $as);
        } catch (\Exception $e) {
            Log::notice("Update as false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update as failed.');
        }
    }

    protected function getDataRelateToAS() {
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = [
            'master' => $area,
            'detail' => $area->detailCodes()->get()
        ];
        $ask_type = CodeMaster::find(config('constants.MASTER_CODES.ASK_TYPE'));
        $ask_type = [
            'master' => $ask_type,
            'detail' => $ask_type->detailCodes()->get()
        ];
        $defect_type = CodeMaster::find(config('constants.MASTER_CODES.DEFECT_TYPE'));
        $defect_type = [
            'master' => $defect_type,
            'detail' => $defect_type->detailCodes()->get()
        ];
        return ['areas' => $area, 'ask_types' => $ask_type, 'defect_types' => $defect_type];
    }

    protected function getDataRelateToEditASAndHandleAS($request) {
        $station_type = CodeMaster::find(config('constants.MASTER_CODES.STATION_TYPE'));
        $station_type = $station_type->detailCodes()->get();
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = $area->detailCodes()->get();
        $maint_type = CodeMaster::find(config('constants.MASTER_CODES.MAINT_TYPE'));
        $maint_type = $maint_type->detailCodes()->get();
        $ask_type = CodeMaster::find(config('constants.MASTER_CODES.ASK_TYPE'));
        $ask_type = $ask_type->detailCodes()->get();
        $defect_type = CodeMaster::find(config('constants.MASTER_CODES.DEFECT_TYPE'));
        $defect_type = $defect_type->detailCodes()->get();
        $emergency_type = CodeMaster::find(config('constants.MASTER_CODES.EMERGENCY_TYPE'));
        $emergency_type = $emergency_type->detailCodes()->get();
        $prog_status = CodeMaster::find(config('constants.MASTER_CODES.PROG_STATUS'));
        $prog_status = $prog_status->detailCodes()->get();
        $has_no_locker = config('constants.NON_MEMBER_AS_RECEPTION');
        $lockers = Locker::join('T_STATION', 'T_STATION.ID', '=', 'T_LOCKER.STATION_ID')
            ->select('T_LOCKER.*')
            ->orderBy('T_LOCKER.ID', 'DESC');
        if ($request->keyword) {
            $keyword = $request->keyword;
            $lockers = $lockers->where(function ($q) use ($keyword) {
                return $q->where('T_STATION.STATION_NAME', 'like', '%' . $keyword . '%')->orWhere('T_LOCKER.LOCKER_NAME', 'like', '%' . $keyword . '%');
            });
        }
        $lockers = $lockers->get();

        return [
            'lockers' => $lockers,
            'has_no_locker' => $has_no_locker,
            'station_types' => $station_type,
            'maint_types' => $maint_type,
            'areas' => $area, 'ask_types' => $ask_type,
            'defect_types' => $defect_type,
            'emergency_types' => $emergency_type,
            'prog_status' => $prog_status,
        ];
    }

    protected function convertASListInASController($as) {
        $receipt_ymd = date_create($as['RECEIPT_YMD']);
        $as['RECEIPT_YMD'] = date_format($receipt_ymd,"Y.m.d H:i");
        $as['ASK_TYPE_NAME'] = $as->type->CODED_NAME;
        $as['DEFECT_TYPE_NAME'] = $as->defect->CODED_NAME;
        $as['PROG_STATUS_NAME'] = $as->status->CODED_NAME;
        if ($as['EMERGENCY_TYPE']) $as['EMERGENCY_TYPE_NAME'] = $as->emergency->CODED_NAME;
    }

}
