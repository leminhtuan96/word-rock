<?php

namespace App\Http\Controllers;

use App\Models\ASReceipt;
use App\Models\CodeDetail;
use App\Models\CodeMaster;
use App\Models\Equipment;
use App\Models\Locker;
use App\Models\Station;
use Carbon\Carbon;
use Illuminate\Cache\Lock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class LockerController extends Controller
{
    public function htmlIndex() {
        if (!checkJoinTabPermission($this->lockers_permissions) || $this->lockers_permissions->PERMISSION_SEARCH != 'Y') {
            return view('errors.403');
        }

        return view('lockers.index', $this->getDataRelateToLocker());
    }

    public function index(Request $request) {
        if ((empty($this->lockers_permissions) || $this->lockers_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->lockers_detail_permissions) || $this->lockers_detail_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->edit_as_permissions) || $this->edit_as_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->handle_as_permissions) || $this->handle_as_permissions->PERMISSION_SEARCH != 'Y')) {
            return $this->responseError403();
        }
        $lockers = Locker::orderBy('ID', 'DESC');
        if ($request->name) $lockers = $lockers->where('LOCKER_NAME', 'like', "%$request->name%");
        $lockers = $lockers->get();

        $lockers = $this->addUseFlagName($lockers);

        //add station info
        $lockers = $this->convertLockerInfo($lockers);

        return $this->responseSuccessData(200, $lockers);
    }

    public function getByKeyword(Request $request) {
        $lockers = Locker::join('T_STATION', 'T_STATION.ID', '=', 'T_LOCKER.STATION_ID')
            ->select('T_LOCKER.*')
            ->orderBy('T_LOCKER.ID', 'DESC');
        if ($keyword = trim($request->keyword)) {
            $lockers = $lockers->where(function ($q) use ($keyword) {
                return $q->where('T_STATION.STATION_NAME', 'like', '%' . $keyword . '%')->orWhere('T_LOCKER.LOCKER_NAME', 'like', '%' . $keyword . '%');
            });
        }
        $lockers = $lockers->get();
        //add station info
        $lockers = $this->convertLockerInfo($lockers);
        return $this->responseSuccessData(200, $lockers);
    }

    public function getLocker($id) {
        $locker = Locker::find($id);
        if (!$locker) return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다!');
        $station = $locker->station;
        if (!$station) return $this->responseErrorMessage(404, 'Station not found!');

        //convert locker
        $locker['STATION_NAME'] = $station->STATION_NAME;
        if ($station->type) $locker['STATION_TYPE'] = $station->STATION_TYPE;
        if ($station->type) $locker['STATION_TYPE_NAME'] = $station->type->CODED_NAME;
        $locker['STATION_MAINT_TYPE'] = $station->MAINT_TYPE;
        $locker['STATION_CODE'] = $station->REG_CODE;
        if ($station->area1) $locker['STATION_AREA'] = $station->area1->CODED_NAME;
        $locker['STATION_MNGR_NM'] = $station->MNGR_NM;
        $locker['STATION_TEL_NO'] = $station->TEL_NO;
        $locker['STATION_MOBL_NO'] = $station->MOBL_NO;
        $locker['STATION_MAINT_END_YMD'] = $station->MAINT_END_YMD;
        $locker['STATION_REPR_NM'] = $station->STATION_REPR_NM;
        if ($locker->kind) $locker['LOCKER_KIND_NAME'] = $locker->kind->CODED_NAME;

        return $this->responseSuccessData(200, $locker);
    }

    public function store(Request $request) {
        if (empty($this->lockers_permissions) || $this->lockers_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'code' => 'required',
            'station_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check data
            if ($messageCheckData = $this->messageCheckDataLocker($request))
                return $this->responseErrorMessage(404, $messageCheckData);
            $create_data = [
                'STATION_ID' => $request->station_id,
                'LOCKER_NAME' => $request->name,
                'LOCKER_KIND' => $request->kind,
                'CTRL_BOX_TYPE' => $request->ctrl_box_type,
                'COMPTR_TYPE' => $request->computer_type,
                'MONTR_SIZE' => $request->monitor_size,
                'LOCKER_CNT' => $request->locker_cnt,
                'LOCK_KIND' => $request->lock_kind,
                'UNIT_CODE' => $request->code,
                'RADIAL_NO' => $request->radial_no,
                'MCU_KIND' => $request->mcu_kind,
                'SUB_MCU_YN' => $request->sub_mcu_yn,
                'RFID_READER' => $request->rfid_reader,
                'WEBCAM' => $request->webcam,
                'PRINTER' => $request->printer,
                'CARD_TERMINAL' => $request->card_terminal,
                'BANKNOTE_INSERTER' => $request->banknote_inserter,
                'BANKNOTE_DISPENSER' => $request->banknote_dispenser,
                'COIN_INSERTER' => $request->coin_inserter,
                'COIN_DISPENSER' => $request->coin_dispenser,
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'CREATED_BY' => auth()->id(),
            ];

            Locker::create($create_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Create locker false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create locker failed.');
        }
    }

    public function update(Request $request, $id) {
        if (empty($this->lockers_permissions) || $this->lockers_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'code' => 'required',
            'station_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check data
            if ($messageCheckData = $this->messageCheckDataLocker($request))
                return $this->responseErrorMessage(404, $messageCheckData);
            $update_data = [
                'STATION_ID' => $request->station_id,
                'LOCKER_NAME' => $request->name,
                'LOCKER_KIND' => $request->kind,
                'CTRL_BOX_TYPE' => $request->ctrl_box_type,
                'COMPTR_TYPE' => $request->computer_type,
                'MONTR_SIZE' => $request->monitor_size,
                'LOCKER_CNT' => $request->locker_cnt,
                'LOCK_KIND' => $request->lock_kind,
                'UNIT_CODE' => $request->code,
                'RADIAL_NO' => $request->radial_no,
                'MCU_KIND' => $request->mcu_kind,
                'SUB_MCU_YN' => $request->sub_mcu_yn,
                'RFID_READER' => $request->rfid_reader,
                'WEBCAM' => $request->webcam,
                'PRINTER' => $request->printer,
                'CARD_TERMINAL' => $request->card_terminal,
                'BANKNOTE_INSERTER' => $request->banknote_inserter,
                'BANKNOTE_DISPENSER' => $request->banknote_dispenser,
                'COIN_INSERTER' => $request->coin_inserter,
                'COIN_DISPENSER' => $request->coin_dispenser,
                'UPDATED_BY' => auth()->id(),
            ];

            $locker = Locker::find($id);
            if (!$locker)
                return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다!');

            $locker->update($update_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Update locker false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update locker failed.');
        }
    }

    public function delete($id) {
        if (empty($this->lockers_permissions) || $this->lockers_permissions->PERMISSION_DELETE != 'Y') {
            return $this->responseError403();
        }
        try {
            DB::beginTransaction();
            $locker = Locker::find($id);
            if (!$locker)
                return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다!');
            //check relate
            if (count($locker->afterServices()->get())) return $this->responseErrorMessage(400, 'This locker cannot be deleted, contact IT to get it resolved.');

            $locker->delete();

            DB::commit();
            return $this->responseSuccessMessage(200, '삭제되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Delete locker false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Delete locker failed.');
        }
    }

    public function getLockersByStation($id) {
        if ((empty($this->stations_lockers_permissions) || $this->stations_lockers_permissions->PERMISSION_SEARCH != 'Y') && (empty($this->lockers_stations_permissions) || $this->lockers_stations_permissions->PERMISSION_SEARCH != 'Y')) {
            return $this->responseError403();
        }
        $lockers = Locker::where('STATION_ID', $id)->orderBy('ID', 'DESC')->get();

        //add station info
        $lockers = $this->convertLockerInfo($lockers);
        return $this->responseSuccessData(200, $lockers);
    }

    public function htmlGetDetail() {
        if (!checkJoinTabPermission($this->lockers_detail_permissions) || $this->lockers_detail_permissions->PERMISSION_SEARCH != 'Y') {
            return view('errors.403');
        }

        return view('lockers.detail.index', $this->getDataRelateToLocker());
    }

    public function getDetailAndAS(Request $request) {
        if (empty($this->lockers_detail_permissions) || $this->lockers_detail_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $locker = null;
        $as = [];
        if ($request->id) {
            $locker = Locker::find($request->id);
            if (!$locker)
                return $this->responseErrorMessage(404, '보관함을 찾을 수 없습니다!');

            $locker->STATION_NAME = $locker->station->STATION_NAME;
            $as = ASReceipt::where('LOCKER_ID', $locker->ID)->orderBy('PROG_STATUS')->orderBy('ID', 'DESC')->get();
            foreach ($as as $item) {
                $this->convertASList($item);
            }
        }
        return response()->json([
            'code' => 200,
            'locker' => $locker,
            'as' => $as,
        ]);
    }

    //lockers-stations
    public function htmlLockersStations(Request $request) {
        if (!checkJoinTabPermission($this->lockers_stations_permissions)) {
            return view('errors.403');
        }
        return view('lockers.lockers_stations');
    }

    protected function convertLockerInfo($lockers) {
        foreach ($lockers as $locker) {
            $station = $locker->station;
            $locker['STATION_NAME'] = $station->STATION_NAME;
            if ($station->type) $locker['STATION_TYPE'] = $station->STATION_TYPE;
            if ($station->type) $locker['STATION_TYPE_NAME'] = $station->type->CODED_NAME;
            $locker['STATION_MAINT_TYPE'] = $station->MAINT_TYPE;
            $locker['STATION_CODE'] = $station->REG_CODE;
            if ($station->area1) $locker['STATION_AREA'] = $station->area1->CODED_NAME;
            $locker['STATION_MNGR_NM'] = $station->MNGR_NM;
            $locker['STATION_TEL_NO'] = $station->TEL_NO;
            $locker['STATION_MOBL_NO'] = $station->MOBL_NO;
            $locker['STATION_MAINT_END_YMD'] = $station->MAINT_END_YMD;
            $locker['STATION_REPR_NM'] = $station->STATION_REPR_NM;
            if ($locker->kind) $locker['LOCKER_KIND_NAME'] = $locker->kind->CODED_NAME;
        }
        return $lockers;
    }

    protected function getDataRelateToLocker() {
        $kind = CodeMaster::find(config('constants.MASTER_CODES.LOCKER_KIND'));
        $kind = [
            'master' => $kind,
            'detail' => $kind->detailCodes()->get()
        ];

        $mcu_kind = CodeMaster::find(config('constants.MASTER_CODES.MCU_KIND'));
        $mcu_kind = [
            'master' => $mcu_kind,
            'detail' => $mcu_kind->detailCodes()->get()
        ];

        $ctrl_box_type = CodeMaster::find(config('constants.MASTER_CODES.CTRL_BOX_TYPE'));
        $ctrl_box_type = [
            'master' => $ctrl_box_type,
            'detail' => $ctrl_box_type->detailCodes()->get()
        ];

        $sub_mcu_yn = CodeMaster::find(config('constants.MASTER_CODES.SUB_MCU_YN'));
        $sub_mcu_yn = [
            'master' => $sub_mcu_yn,
            'detail' => $sub_mcu_yn->detailCodes()->get()
        ];

        $comptr_type = CodeMaster::find(config('constants.MASTER_CODES.COMPTR_TYPE'));
        $comptr_type = [
            'master' => $comptr_type,
            'detail' => $comptr_type->detailCodes()->get()
        ];

        $os_kind = CodeMaster::find(config('constants.MASTER_CODES.OS_KIND'));
        $os_kind = [
            'master' => $os_kind,
            'detail' => $os_kind->detailCodes()->get()
        ];

        $monitor_size = CodeMaster::find(config('constants.MASTER_CODES.MONTR_SIZE'));
        $monitor_size = [
            'master' => $monitor_size,
            'detail' => $monitor_size->detailCodes()->get()
        ];

        $lock_kind = CodeMaster::find(config('constants.MASTER_CODES.LOCK_KIND'));
        $lock_kind = [
            'master' => $lock_kind,
            'detail' => $lock_kind->detailCodes()->get()
        ];

        $rfid_readers = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.RFID_READER'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $webcams = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.WEBCAM'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $printers = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.PRINTER'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $card_terminals = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.CARD_TERMINAL'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $banknote_inserters = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.BANKNOTE_INSERTER'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $banknote_dispensers = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.BANKNOTE_DISPENSER'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $coin_inserters = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.COIN_INSERTER'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();
        $coin_dispensers = Equipment::where('EQUIP_KIND', config('constants.DETAIL_CODES.EQUIP_KIND.COIN_DISPENSER'))->where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->get();

        return [
            'kinds' => $kind,
            'mcu_kinds' => $mcu_kind,
            'ctrl_box_types' => $ctrl_box_type,
            'sub_mcu_yn' => $sub_mcu_yn,
            'comptr_types' => $comptr_type,
            'os_kinds' => $os_kind,
            'rfid_readers' => $rfid_readers,
            'webcams' => $webcams,
            'monitor_sizes' => $monitor_size,
            'printers' => $printers,
            'card_terminals' => $card_terminals,
            'banknote_inserters' => $banknote_inserters,
            'banknote_dispensers' => $banknote_dispensers,
            'lock_kinds' => $lock_kind,
            'coin_inserters' => $coin_inserters,
            'coin_dispensers' => $coin_dispensers,
        ];
    }

    protected function messageCheckDataLocker($request) {
        if (!checkExistIdInData($request->station_id, Station::class))
            return 'Station not found.';
        if ($request->kind) {
            if (!checkExistIdInData($request->kind, CodeDetail::class))
                return 'Locker kind not found.';
        }
        if ($request->mcu_kind) {
            if (!checkExistIdInData($request->mcu_kind, CodeDetail::class))
                return 'MCU kind not found.';
        }
        if ($request->ctrl_box_type) {
            if (!checkExistIdInData($request->ctrl_box_type, CodeDetail::class))
                return 'Control box type not found.';
        }
        if ($request->sub_mcu_yn) {
            if (!checkExistIdInData($request->sub_mcu_yn, CodeDetail::class))
                return 'Sub MCU not found.';
        }
        if ($request->computer_type) {
            if (!checkExistIdInData($request->computer_type, CodeDetail::class))
                return 'Computer type not found.';
        }
        if ($request->os) {
            if (!checkExistIdInData($request->os, CodeDetail::class))
                return 'OS kind not found.';
        }
        if ($request->lock_kind) {
            if (!checkExistIdInData($request->lock_kind, CodeDetail::class))
                return 'Lock kind not found.';
        }
        if ($request->monitor_size) {
            if (!checkExistIdInData($request->monitor_size, CodeDetail::class))
                return 'Monitor size not found.';
        }
        if ($request->rfid_reader) {
            if (!checkExistIdInData($request->rfid_reader, Equipment::class))
                return 'RFID reader not found.';
        }
        if ($request->webcam) {
            if (!checkExistIdInData($request->webcam, Equipment::class))
                return 'Webcam not found.';
        }
        if ($request->printer) {
            if (!checkExistIdInData($request->printer, Equipment::class))
                return 'Printer not found.';
        }
        if ($request->card_terminal) {
            if (!checkExistIdInData($request->card_terminal, Equipment::class))
                return 'Card terminal not found.';
        }
        if ($request->banknote_inserter) {
            if (!checkExistIdInData($request->banknote_inserter, Equipment::class))
                return 'Banknote inserter not found.';
        }
        if ($request->banknote_dispenser) {
            if (!checkExistIdInData($request->banknote_dispenser, Equipment::class))
                return 'Banknote dispenser not found.';
        }
        if ($request->coin_inserter) {
            if (!checkExistIdInData($request->coin_inserter, Equipment::class))
                return 'Coin inserter not found.';
        }
        if ($request->coin_dispenser) {
            if (!checkExistIdInData($request->coin_dispenser, Equipment::class))
                return 'Coin dispenser not found.';
        }
        return '';
    }

}
