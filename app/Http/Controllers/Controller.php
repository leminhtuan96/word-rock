<?php

namespace App\Http\Controllers;

use App\Models\CodeMaster;
use App\Models\Department;
use App\Models\Permission;
use App\Models\Station;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\View;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $edit_as_permissions;
    protected $detail_as_permissions;
    protected $handle_as_permissions;
    protected $stations_permissions;
    protected $stations_lockers_permissions;
    protected $stations_detail_permissions;
    protected $lockers_permissions;
    protected $lockers_stations_permissions;
    protected $lockers_detail_permissions;
    protected $lockers_free_permissions;
    protected $register_user_permissions;
    protected $approval_users_permissions;
    protected $users_permissions;
    protected $equipments_permissions;
    protected $create_notice_permissions;
    protected $list_notices_permissions;
    protected $detail_notices_permissions;
    protected $departments_permissions;
    protected $codes_permissions;
    protected $permissions_permissions;
    protected $permissions_station_fee_templates;

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (auth()->check()) {
                $level = auth()->user()->USER_LVL;

                $this->edit_as_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.EDIT_AS'))->first();
                View::share('edit_as_permissions', $this->edit_as_permissions);

                $this->detail_as_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.DETAIL_AS'))->first();
                View::share('detail_as_permissions', $this->detail_as_permissions);

                $this->handle_as_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.HANDLE_AS'))->first();
                View::share('handle_as_permissions', $this->handle_as_permissions);

                $this->stations_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.STATIONS'))->first();
                View::share('stations_permissions', $this->stations_permissions);

                $this->stations_lockers_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.STATION_LOCKERS'))->first();
                View::share('stations_lockers_permissions', $this->stations_lockers_permissions);

                $this->stations_detail_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.STATIONS_DETAIL'))->first();
                View::share('stations_detail_permissions', $this->stations_detail_permissions);

                $this->lockers_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.LOCKERS'))->first();
                View::share('lockers_permissions', $this->lockers_permissions);

                $this->lockers_stations_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.LOCKERS_STATION'))->first();
                View::share('lockers_stations_permissions', $this->lockers_stations_permissions);

                $this->lockers_detail_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.LOCKERS_DETAIL'))->first();
                View::share('lockers_detail_permissions', $this->lockers_detail_permissions);

                $this->lockers_free_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.LOCKER_FREE'))->first();
                View::share('lockers_free_permissions', $this->lockers_free_permissions);

                $this->register_user_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.REGISTER_USER'))->first();
                View::share('register_user_permissions', $this->register_user_permissions);

                $this->approval_users_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.APPROVAL_USERS'))->first();
                View::share('approval_users_permissions', $this->approval_users_permissions);

                $this->users_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.USERS'))->first();
                View::share('users_permissions', $this->users_permissions);

                $this->equipments_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.EQUIPMENTS'))->first();
                View::share('equipments_permissions', $this->equipments_permissions);

                $this->create_notice_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.CREATE_NOTICE'))->first();
                View::share('create_notice_permissions', $this->create_notice_permissions);

                $this->list_notices_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.LIST_NOTICES'))->first();
                View::share('list_notices_permissions', $this->list_notices_permissions);

                $this->detail_notices_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.DETAIL_NOTICES'))->first();
                View::share('detail_notices_permissions', $this->detail_notices_permissions);

                $this->departments_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.DEPARTMENTS'))->first();
                View::share('departments_permissions', $this->departments_permissions);

                $this->codes_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.CODES'))->first();
                View::share('codes_permissions', $this->codes_permissions);

                $this->permissions_permissions = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.PERMISSIONS'))->first();
                View::share('permissions_permissions', $this->permissions_permissions);

                $this->permissions_station_fee_templates = Permission::where('USER_LEVEL', $level)->where('MENU_ID', config('constants.MENU.STATION_FEE_TEMPLATES'))->first();
                View::share('permissions_station_fee_templates', $this->permissions_station_fee_templates);
            }
            return $next($request);
        });
    }

    protected function responseError403() {
        return response()->json([
            'code' => 403,
            'message' => config('messages.ERROR.403_FORBIDDEN')
        ]);
    }

    protected function responseErrorMessage($code, $message) {
        return response()->json([
            'code' => $code,
            'message' => $message
        ]);
    }

    protected function responseSuccessMessage($code, $message) {
        return response()->json([
            'code' => $code,
            'message' => $message
        ]);
    }

    protected function responseSuccessData($code, $data) {
        return response()->json([
            'code' => $code,
            'data' => $data
        ]);
    }

    protected function addUseFlagName($data) {
        foreach ($data as $item) {
            if (isset($item->useFlag))
            $item['USE_FLAG_NAME'] = $item->useFlag->CODED_NAME;
        }
        return $data;
    }

    protected function getUseFlag() {
        $use_flag = CodeMaster::find(config('constants.MASTER_CODES.USE_FLAG'));
        $use_flag = [
            'master' => $use_flag,
            'detail' => $use_flag->detailCodes()->get()
        ];
        return $use_flag;
    }

    protected function getDepartments() {
        $master_departments = Department::whereNull('UPPER_ID')->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $departments = [];
        foreach ($master_departments as $master_department) {
            array_push($departments, $master_department);
            $detail_departments = $master_department->departments()->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
            foreach ($detail_departments as $detail_department) {
                array_push($departments, $detail_department);
                $detail_detail_departments = $detail_department->departments()->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
                foreach ($detail_detail_departments as $detail_detail_department) {
                    array_push($departments, $detail_detail_department);
                }
            }
        }
        return $departments;
    }

    protected function getStationsActive() {
        $stations = Station::where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        //add area name, created at
        foreach ($stations as $station) {
            if ($station['AREA1_DIV']) $station['AREA1_DIV_NAME'] = $station->area1->CODED_NAME;
            if ($station['STATION_TYPE']) $station['STATION_TYPE_NAME'] = $station->type->CODED_NAME;
        }
        return response()->json([
            'code' => 200,
            'data' => $stations
        ]);
    }

    protected function convertASList($item) {
        $receipt_ymd = date_create($item['RECEIPT_YMD']);
        $item['RECEIPT_YMD'] = date_format($receipt_ymd,"Y.m.d H:i");
        if ($item['LOCKER_ID']) {
            $locker = $item->locker;
            $station = $locker->station;
            $item['LOCKER_NAME'] = $locker->LOCKER_NAME;
            if ($station->MAINT_TYPE) $as['STATION_MAINT_TYPE_NAME'] = $station->maintType->CODED_NAME;
        }
        if ($item['ASK_TYPE']) $item['ASK_TYPE_NAME'] = $item->type->CODED_NAME;
        if ($item['DEFECT_TYPE']) $item['DEFECT_TYPE_NAME'] = $item->defect->CODED_NAME;
        if ($item['EMERGENCY_TYPE']) $item['EMERGENCY_TYPE_NAME'] = $item->emergency->CODED_NAME;
        if ($item['USER_ID']) $item['USER_NAME'] = $item->user->USER_NAME;
        $item['PROG_STATUS_NAME'] = $item->status->CODED_NAME;
    }
}
