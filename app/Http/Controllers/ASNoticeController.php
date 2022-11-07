<?php

namespace App\Http\Controllers;

use App\Models\ASNotice;
use App\Models\ASNoticeDept;
use App\Models\ASReceipt;
use App\Models\Department;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ASNoticeController extends Controller
{
    public function getByAS($as_id) {
        $as_notice_parent_list = ASNotice::where('AS_RECEIPT_ID', $as_id)->whereNull('UPPER_ID')->orderBy('ID', 'DESC')->get();
        $as_notice_list = [];

        foreach ($as_notice_parent_list as $as_notice_parent) {
            $as_notice_parent['AS_PROG_STATUS_NAME'] = $as_notice_parent->as_receipt->status->CODED_NAME;
            $as_notice_parent['CREATED_BY_NAME'] = $as_notice_parent->created_by->USER_NAME;
            $created_at = date_create($as_notice_parent['CREATED_AT']);
            $as_notice_parent['CREATED_AT'] = date_format($created_at,"Y.m.d H:i");
            if ($as_notice_parent->as_receipt->USER_ID ) $as_notice_parent['AS_USER_NAME'] = $as_notice_parent->as_receipt->user->USER_NAME;
            $departments = $as_notice_parent->departments()->pluck('DEPT_NAME')->toArray();
            $as_notice_parent['DEPARTMENT_NAME'] = implode(',', $departments);
            array_push($as_notice_list, $as_notice_parent);
            $as_notice_child_list = $as_notice_parent->notices()->orderBy('ID', 'DESC')->get();
            foreach ($as_notice_child_list as $as_notice_child) {
                array_push($as_notice_list, $as_notice_child);
            }
        }

        return $this->responseSuccessData(200, $as_notice_list);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'as_id' => 'required',
            'content' => 'required',
            'departments' => 'required|array',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check as
            $as = ASReceipt::find($request->as_id);
            if (!$as) $this->responseErrorMessage(404, 'AS 접수내역을 찾을 수 없습니다.');
            $create_data = [
                'AS_RECEIPT_ID' => $request->as_id,
                'CONTENT' => $request->get('content'),
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'CREATED_BY' => auth()->id(),
            ];

            $as_notice = ASNotice::create($create_data);

            foreach ($request->departments as $department_id) {
                //check department
                if (!checkExistIdInData($department_id, Department::class))
                    return $this->responseErrorMessage(404, 'Department not found.');

                ASNoticeDept::create([
                    'AS_NOTICE_ID' => $as_notice->ID,
                    'DEPT_ID' => $department_id,
                    'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                    'CREATED_BY' => auth()->id(),
                ]);
            }

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Create notice AS false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create notice AS failed.');
        }
    }

    public function subStore(Request $request) {
        $validator = Validator::make($request->all(), [
            'as_id' => 'required',
            'notice_id' => 'required',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check as
            if (!checkExistIdInData($request->as_id, ASReceipt::class))
                return $this->responseErrorMessage(404, 'AS 접수내역을 찾을 수 없습니다.');
            //check parent
            if (!checkExistIdInData($request->notice_id, ASNotice::class))
                return $this->responseErrorMessage(404, 'AS notice parent not found.');

            $create_data = [
                'AS_RECEIPT_ID' => $request->as_id,
                'UPPER_ID' => $request->notice_id,
                'CONTENT' => $request->get('content'),
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'CREATED_BY' => auth()->id(),
            ];

            ASNotice::create($create_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Create sub notice AS false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create sub notice AS failed.');
        }
    }
}
