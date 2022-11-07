<?php

namespace App\Http\Controllers;

use App\Exports\StationExport;
use App\Models\ASReceipt;
use App\Models\CodeDetail;
use App\Models\CodeMaster;
use App\Models\Locker;
use App\Models\Station;
use App\Models\StationFee;
use App\Models\StationFeeTemplate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;

class StationController extends Controller
{
    public function htmlIndex()
    {
        if (!checkJoinTabPermission($this->stations_permissions)) {
            return view('errors.403');
        }
        $type = CodeMaster::find(config('constants.MASTER_CODES.STATION_TYPE'));
        $type = [
            'master' => $type,
            'detail' => $type->detailCodes()->get()
        ];
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = [
            'master' => $area,
            'detail' => $area->detailCodes()->get()
        ];
        $maint_type = CodeMaster::find(config('constants.MASTER_CODES.MAINT_TYPE'));
        $maint_type = [
            'master' => $maint_type,
            'detail' => $maint_type->detailCodes()->get()
        ];
        return view('stations.index', ['areas' => $area, 'types' => $type, 'maint_types' => $maint_type]);
    }

    public function index(Request $request)
    {
        if ((empty($this->stations_permissions) || $this->stations_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->stations_lockers_permissions) || $this->stations_lockers_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->lockers_stations_permissions) || $this->lockers_stations_permissions->PERMISSION_SEARCH != 'Y')) {
            return $this->responseError403();
        }
        $stations = Station::orderBy('ID', 'DESC');
        if ($request->keyword) $stations = $stations->where('STATION_NAME', 'like', "%$request->keyword%");
        if ($request->station_name) $stations = $stations->where('STATION_NAME', 'like', "%$request->station_name%");
        $stations = $stations->get();

        $stations = $this->addUseFlagName($stations);

        //add area name, created at
        foreach ($stations as $station) {
            if ($station['AREA1_DIV']) $station['AREA1_DIV_NAME'] = $station->area1->CODED_NAME;
            if ($station['STATION_TYPE']) $station['STATION_TYPE_NAME'] = $station->type->CODED_NAME;
            if ($station['MAINT_TYPE']) $station['MAINT_TYPE_NAME'] = $station->maintType->CODED_NAME;
            $station['CREATED_AT'] = date_format(date_create($station['CREATED_AT']), "Y/m/d");
        }
        return $this->responseSuccessData(200, $stations);
    }

    public function getByKeyword(Request $request)
    {
        $stations = Station::leftJoin('T_LOCKER', 'T_LOCKER.STATION_ID', '=', 'T_STATION.ID')
            ->select('T_STATION.*')
            ->where('T_STATION.USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'));
        if ($keyword = trim($request->keyword))
            $stations = $stations->where(function ($q) use ($keyword) {
                return $q->where('T_STATION.STATION_NAME', 'like', '%' . $keyword . '%')->orWhere('T_LOCKER.LOCKER_NAME', 'like', '%' . $keyword . '%');
            });
        $stations = $stations->get()->unique();
        //add area name, created at
        foreach ($stations as $station) {
            if ($station['AREA1_DIV']) $station['AREA1_DIV_NAME'] = $station->area1->CODED_NAME;
            if ($station['STATION_TYPE']) $station['STATION_TYPE_NAME'] = $station->type->CODED_NAME;
        }
        return $this->responseSuccessData(200, $stations);
    }

    public function store(Request $request)
    {
        if (empty($this->stations_permissions) || $this->stations_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'type' => 'required',
            'code' => 'required',
            'area1' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check data
            if ($messageCheckData = $this->messageCheckDataStation($request))
                return $this->responseErrorMessage(404, $messageCheckData);
            $create_data = [
                'STATION_NAME' => $request->name,
                'STATION_GROUP' => $request->group,
                'STATION_TYPE' => $request->type,
                'HHLD_CNT' => $request->hhld_cnt,
                'REG_CODE' => $request->code,
                'CTRL_CNT' => $request->ctrl_cnt,
                'LOCKER_CNT' => $request->locker_cnt,
                'AREA1_DIV' => $request->area1,
                'AREA2_NM' => $request->area2,
                'DTL_ADDR' => $request->detail_address,
                'REPR_NM' => $request->repr_name,
                'MNGR_NM' => $request->manager,
                'TEL_NO' => $request->telephone,
                'MOBL_NO' => $request->mobile,
                'EMAIL' => $request->email,
                'MAINT_TYPE' => $request->maint_type,
                'MAINT_END_YMD' => $request->maint_end_ymd,
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'CREATED_BY' => auth()->id(),
            ];

            Station::create($create_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Create station false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create station failed.');
        }
    }

    public function update(Request $request, $id)
    {
        if (empty($this->stations_permissions) || $this->stations_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'type' => 'required',
            'code' => 'required',
            'area1' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check data
            if ($messageCheckData = $this->messageCheckDataStation($request))
                return $this->responseErrorMessage(404, $messageCheckData);
            $update_data = [
                'STATION_NAME' => $request->name,
                'STATION_GROUP' => $request->group,
                'STATION_TYPE' => $request->type,
                'HHLD_CNT' => $request->hhld_cnt,
                'REG_CODE' => $request->code,
                'CTRL_CNT' => $request->ctrl_cnt,
                'LOCKER_CNT' => $request->locker_cnt,
                'AREA1_DIV' => $request->area1,
                'AREA2_NM' => $request->area2,
                'DTL_ADDR' => $request->detail_address,
                'REPR_NM' => $request->repr_name,
                'MNGR_NM' => $request->manager,
                'TEL_NO' => $request->telephone,
                'MOBL_NO' => $request->mobile,
                'EMAIL' => $request->email,
                'MAINT_TYPE' => $request->maint_type,
                'MAINT_END_YMD' => $request->maint_end_ymd,
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'UPDATED_BY' => auth()->id(),
            ];

            $station = Station::find($id);
            if (!$station)
                return $this->responseErrorMessage(404, 'Station not found!');

            $station->update($update_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Update station false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update station failed.');
        }
    }

    public function delete($id)
    {
        if (empty($this->stations_permissions) || $this->stations_permissions->PERMISSION_DELETE != 'Y') {
            return $this->responseError403();
        }
        try {
            DB::beginTransaction();
            $station = Station::find($id);
            if (!$station)
                return $this->responseErrorMessage(404, 'Station not found!');
            //check relate
            if (
                count($station->lockers()->get())
                || count($station->users()->get())
            ) return $this->responseErrorMessage(400, 'This station cannot be deleted, contact IT to get it resolved.');

            $station->delete();

            DB::commit();
            return $this->responseSuccessMessage(200, '삭제되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Delete station false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Delete station failed.');
        }
    }

    //stations-lockers
    public function htmlStationsLockers(Request $request)
    {
        if (!checkJoinTabPermission($this->stations_lockers_permissions)) {
            return view('errors.403');
        }
        return view('stations.stations_lockers');
    }

    public function export()
    {
        return Excel::download(new StationExport(), 'stations.xlsx');
    }

    //detail
    public function htmlGetDetail()
    {
        if (!checkJoinTabPermission($this->stations_detail_permissions)) {
            return view('errors.403');
        }
        $type = CodeMaster::find(config('constants.MASTER_CODES.STATION_TYPE'));
        $type = [
            'master' => $type,
            'detail' => $type->detailCodes()->get()
        ];
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = [
            'master' => $area,
            'detail' => $area->detailCodes()->get()
        ];
        $maint_type = CodeMaster::find(config('constants.MASTER_CODES.MAINT_TYPE'));
        $maint_type = [
            'master' => $maint_type,
            'detail' => $maint_type->detailCodes()->get()
        ];
        $userLvl = auth()->user()->USER_LVL;
        $showCode = $userLvl == config('constants.DETAIL_CODES.USER_LVL.ADMIN')
            || $userLvl == config('constants.DETAIL_CODES.USER_LVL.STAFF')
            || $userLvl == config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF');
        $feeTemplates = StationFeeTemplate::where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        return view('stations.detail.index', ['types' => $type, 'areas' => $area, 'maint_types' => $maint_type, 'showCode' => $showCode, 'feeTemplates' => $feeTemplates]);
    }

    public function htmlGetFee()
    {
        if (!checkJoinTabPermission($this->stations_detail_permissions)) {
            return view('errors.403');
        }
        $type = CodeMaster::find(config('constants.MASTER_CODES.STATION_TYPE'));
        $type = [
            'master' => $type,
            'detail' => $type->detailCodes()->get()
        ];
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = [
            'master' => $area,
            'detail' => $area->detailCodes()->get()
        ];
        $maint_type = CodeMaster::find(config('constants.MASTER_CODES.MAINT_TYPE'));
        $maint_type = [
            'master' => $maint_type,
            'detail' => $maint_type->detailCodes()->get()
        ];
        $userLvl = auth()->user()->USER_LVL;
        $showCode = $userLvl == config('constants.DETAIL_CODES.USER_LVL.ADMIN')
            || $userLvl == config('constants.DETAIL_CODES.USER_LVL.STAFF')
            || $userLvl == config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF');
        return view('stations.fee.index', ['types' => $type, 'areas' => $area, 'maint_types' => $maint_type, 'showCode' => $showCode]);
    }

    public function getDetailAndAS(Request $request)
    {
        if (empty($this->stations_detail_permissions) || $this->stations_detail_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $station = null;
        $as = [];
        $fee = null;
        if ($request->id) {
            $station = Station::find($request->id);
            if (!$station)
                return $this->responseErrorMessage(404, 'Station not found!');

            $lockerIds = Locker::where('STATION_ID', $station->ID)->pluck('ID');
            $as = ASReceipt::whereIn('LOCKER_ID', $lockerIds)->orderBy('PROG_STATUS')->orderBy('ID', 'DESC')->get();
            foreach ($as as $item) {
                $this->convertASList($item);
            }
            $fee = StationFee::where('STATION_ID', $request->id)->first();
        }
        return response()->json([
            'code' => 200,
            'station' => $station,
            'as' => $as,
            'fee' => $fee,
        ]);
    }

    public function getDetailFeeTemplate($template_id) {
        if (empty($this->stations_detail_permissions) || $this->stations_detail_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $template = StationFeeTemplate::find($template_id);
        if (!$template) return $this->responseErrorMessage(404, 'Fee station template not found!');
        return $this->responseSuccessData(200, $template);
    }

    public function getDetailFeeTemplateByStation($station_id) {
        if (empty($this->stations_detail_permissions) || $this->stations_detail_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $template = StationFeeTemplate::where('STATION_ID', $station_id)->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        if (!$template) return $this->responseErrorMessage(404, 'Fee station template not found!');
        return $this->responseSuccessData(200, $template);
    }

    public function updateFeeStation(Request $request) {
        if (empty($this->stations_detail_permissions) || $this->stations_detail_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'station_id' => 'required',
            'default_time' => 'required',
            'one_additional_hour' => 'required',
            'two_additional_hour' => 'required',
            'repeat_time' => 'required',
            'base_rate' => 'required',
            'one_extra_charge' => 'required',
            'two_extra_charge' => 'required',
            'recurring_fee' => 'required',
            'weekly_basic_rate' => 'required',
            'weekly_recurring_fee' => 'required',
            'monthly_basic_fee' => 'required',
            'monthly_recurring_fee' => 'required',
            'deposit' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            $data = [
                'STATION_ID' => $request->station_id,
                'DEFAULT_TIME' => $request->default_time,
                'ONE_ADDITIONAL_HOUR' => $request->one_additional_hour,
                'TWO_ADDITIONAL_HOUR' => $request->two_additional_hour,
                'REPEAT_TIME' => $request->repeat_time,
                'BASE_RATE' => $request->base_rate,
                'ONE_EXTRA_CHARGE' => $request->one_extra_charge,
                'TWO_EXTRA_CHARGE' => $request->two_extra_charge,
                'RECURRING_FEE' => $request->recurring_fee,
                'WEEKLY_BASIC_RATE' => $request->weekly_basic_rate,
                'WEEKLY_RECURRING_FEE' => $request->weekly_recurring_fee,
                'MONTHLY_BASIC_FEE' => $request->monthly_basic_fee,
                'MONTHLY_RECURRING_FEE' => $request->monthly_recurring_fee,
                'DEPOSIT' => $request->deposit,
            ];
            $feeOld = StationFee::where('STATION_ID', $request->station_id)->first();
            if ($feeOld) {
                $data['UPDATED_BY'] = auth()->id();
                $feeOld->update($data);
            } else {
                $data['CREATED_BY'] = auth()->id();
                StationFee::create($data);
            }
            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Update station fee false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update station fee failed.');
        }
    }

    protected function messageCheckDataStation($request)
    {
        if (!checkExistIdInData($request->type, CodeDetail::class))
            return 'Station type not found.';
        if (!checkExistIdInData($request->area1, CodeDetail::class))
            return 'Area not found.';
        if ($request->maint_type) {
            if (!checkExistIdInData($request->maint_type, CodeDetail::class))
                return 'Maint type not found.';
        }
        return '';
    }
}
