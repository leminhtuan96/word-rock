<?php

namespace App\Http\Controllers;

use App\Models\CodeDetail;
use App\Models\CodeMaster;
use App\Models\Department;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class DepartmentController extends Controller
{
    public function htmlIndex() {
        if (!checkJoinTabPermission($this->departments_permissions)) {
            return view('errors.403');
        }
        $dept_type = CodeMaster::find(config('constants.MASTER_CODES.DEPT_TYPE'));
        $dept_type = [
            'master' => $dept_type,
            'detail' => $dept_type->detailCodes()->get()
        ];
        return view('departments.index', ['dept_type' => $dept_type]);
    }

    public function index(Request $request) {
        if ((empty($this->departments_permissions) || $this->departments_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->detail_as_permissions) || $this->detail_as_permissions->PERMISSION_SEARCH != 'Y')) {
            return $this->responseError403();
        }
        $master_departments = Department::whereNull('UPPER_ID');
        $type = $request->type;
        $master_departments = $master_departments->get();
        $departments = [];
        foreach ($master_departments as $master_department) {
            if (!$type || $type == config('constants.DETAIL_CODES.DEPT_TYPE.DIVISION')) array_push($departments, $master_department);
            $detail_departments = $master_department->departments()->get();
            foreach ($detail_departments as $detail_department) {
                if (!$type || $type == config('constants.DETAIL_CODES.DEPT_TYPE.DEPARTMENT')) array_push($departments, $detail_department);
                $detail_detail_departments = $detail_department->departments()->get();
                foreach ($detail_detail_departments as $detail_detail_department) {
                    if (!$type || $type == config('constants.DETAIL_CODES.DEPT_TYPE.TEAM')) array_push($departments, $detail_detail_department);
                }
            }
        }

        $departments = $this->addUseFlagName($departments);

        //add dept type name
        foreach ($departments as $department) {
            if ($department->UPPER_ID) {
                $department['PARENT_NAME'] = $department->parent->DEPT_NAME;
            }
            $department['DEPT_TYPE_NAME'] = $department->deptType->CODED_NAME;
            $department['CREATED_BY_NAME'] = $department->created_by->USER_NAME;
            if($department['UPDATED_BY']) $department['UPDATED_BY_NAME'] = $department->updated_by->USER_NAME;
        }

        return response()->json([
            'code' => 200,
            'data' => $departments,
        ]);
    }

    public function getParents($type) {
        if ((empty($this->departments_permissions) || $this->departments_permissions->PERMISSION_SAVE != 'Y')) {
            return $this->responseError403();
        }
        if ($type == config('constants.DETAIL_CODES.DEPT_TYPE.DEPARTMENT')) {
            $parents = Department::where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->where('DEPT_TYPE', config('constants.DETAIL_CODES.DEPT_TYPE.DIVISION'))->get();
        } else if ($type == config('constants.DETAIL_CODES.DEPT_TYPE.TEAM')) {
            $parents = Department::where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->where('DEPT_TYPE', config('constants.DETAIL_CODES.DEPT_TYPE.DEPARTMENT'))->get();
        } else {
            $parents = [];
        }
        //add dept type name
        foreach ($parents as $department) {
            $department['DEPT_TYPE_NAME'] = $department->deptType->CODED_NAME;
        }
        return response()->json([
            'code' => 200,
            'data' => $parents,
        ]);
    }

    public function store(Request $request) {
        if (empty($this->departments_permissions) || $this->departments_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'type' => 'required',
            'use_flag' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            //check data
            if (!checkExistIdInData($request->type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Dept type not found.');
            if (!checkExistIdInData($request->use_flag, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Use flag not found.');
            $create_data = [
                'DEPT_NAME' => $request->name,
                'DEPT_TYPE' => $request->type,
                'USE_FLAG' => $request->use_flag,
                'CREATED_BY' => auth()->id(),
            ];
            if ($request->parent_id) {
                if (!checkExistIdInData($request->parent_id, Department::class))
                    return $this->responseErrorMessage(404, 'Department parent not found.');
                $create_data['UPPER_ID'] = $request->parent_id;
            }

            if ($request->type == config('constants.DETAIL_CODES.DEPT_TYPE.DIVISION')) {
                if ($request->parent_id)
                    return $this->responseErrorMessage(400, 'Invalid data.');
            } else {
                if (!$request->parent_id)
                    return $this->responseErrorMessage(400, 'Invalid data.');
            }

            Department::create($create_data);

            DB::commit();
            return response()->json([
                'code' => 200,
                'message' => '저장되었습니다.'
            ]);
        } catch (\Exception $e) {
            Log::notice("Create department false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create department failed.');
        }
    }

    public function update(Request $request, $id) {
        if (empty($this->departments_permissions) || $this->departments_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'type' => 'required',
            'use_flag' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            //check data
            if (!checkExistIdInData($request->type, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Dept type not found.');
            if (!checkExistIdInData($request->use_flag, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Use flag not found.');
            $update_data = [
                'DEPT_NAME' => $request->name,
                'DEPT_TYPE' => $request->type,
                'USE_FLAG' => $request->use_flag,
                'UPDATED_BY' => auth()->id(),
            ];
            if ($request->parent_id) {
                if (!checkExistIdInData($request->parent_id, Department::class))
                    return $this->responseErrorMessage(404, 'Department parent not found.');
                $create_data['UPPER_ID'] = $request->parent_id;
            }

            if ($request->type == config('constants.DETAIL_CODES.DEPT_TYPE.DIVISION')) {
                if ($request->parent_id)
                    return $this->responseErrorMessage(400, 'Invalid data.');
            } else {
                if (!$request->parent_id)
                    return $this->responseErrorMessage(400, 'Invalid data.');
            }

            $department = Department::find($id);
            if (!$department)
                return $this->responseErrorMessage(404, 'Department not found!');

            $department->update($update_data);

            DB::commit();
            return response()->json([
                'code' => 200,
                'message' => '저장되었습니다.'
            ]);
        } catch (\Exception $e) {
            Log::notice("Update department false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update department failed.');
        }
    }

    public function delete($id) {
        if (empty($this->departments_permissions) || $this->departments_permissions->PERMISSION_DELETE != 'Y') {
            return $this->responseError403();
        }
        try {
            DB::beginTransaction();
            $department = Department::find($id);
            if (!$department)
                return $this->responseErrorMessage(404, 'Department not found!');

            //check relate
            if (
                count($department->departments()->get())
                || count($department->asNotices()->get())
                || count($department->notices()->get())
                || count($department->users()->get())
            ) return $this->responseErrorMessage(400, 'This department cannot be deleted, contact IT to get it resolved.');

            $department->delete();

            DB::commit();
            return response()->json([
                'code' => 200,
                'message' => '삭제되었습니다.'
            ]);
        } catch (\Exception $e) {
            Log::notice("Delete department false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Delete department failed.');
        }
    }
}
