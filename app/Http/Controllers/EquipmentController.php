<?php

namespace App\Http\Controllers;

use App\Models\CodeDetail;
use App\Models\CodeMaster;
use App\Models\Equipment;
use App\Models\Locker;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EquipmentController extends Controller
{
    public function htmlIndex() {
        if (!checkJoinTabPermission($this->equipments_permissions)) {
            return view('errors.403');
        }
        $kind = CodeMaster::find(config('constants.MASTER_CODES.EQUIP_KIND'));
        $kind = [
            'master' => $kind,
            'detail' => $kind->detailCodes()->get()
        ];

        $touch_methods = CodeMaster::find(config('constants.MASTER_CODES.TOUCH_MTH'));
        $touch_methods = [
            'master' => $touch_methods,
            'detail' => $touch_methods->detailCodes()->get()
        ];

        $os_kind = CodeMaster::find(config('constants.MASTER_CODES.OS_KIND'));
        $os_kind = [
            'master' => $os_kind,
            'detail' => $os_kind->detailCodes()->get()
        ];

        $purchase_methods = CodeMaster::find(config('constants.MASTER_CODES.PURC_MTH'));
        $purchase_methods = [
            'master' => $purchase_methods,
            'detail' => $purchase_methods->detailCodes()->get()
        ];

        return view('equipments.index', ['kinds' => $kind, 'touch_methods' => $touch_methods, 'purchase_methods' => $purchase_methods, 'os_kinds' => $os_kind]);
    }

    public function index(Request $request) {
        if (empty($this->equipments_permissions) || $this->equipments_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $equipments = Equipment::orderBy('ID', 'DESC');
        if ($request->kind) $equipments = $equipments->where('EQUIP_KIND', $request->kind);
        if ($request->name) $equipments = $equipments->where('EQUIP_NAME', 'like', "%$request->name%");
        if ($request->model) $equipments = $equipments->where('MODEL_NAME', 'like', "%$request->model%");
        if ($request->purc_name) $equipments = $equipments->where('PURC_NAME', 'like', "%$request->purc_name%");
        $equipments = $equipments->get();

        //add kind name
        foreach ($equipments as $equipment) {
            $equipment['EQUIP_KIND_NAME'] = $equipment->kind->CODED_NAME;
        }

        return $this->responseSuccessData(200, $equipments);
    }

    public function store(Request $request) {
        if (empty($this->equipments_permissions) || $this->equipments_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'kind' => 'required',
            'use_flag' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            //check data
            if ($messageCheckData = $this->messageCheckDataEquipment($request))
                return $this->responseErrorMessage(404, $messageCheckData);
            $create_data = [
                'EQUIP_KIND' => $request->kind,
                'EQUIP_NAME' => $request->name,
                'MODEL_NAME' => $request->model,
                'MANU_NAME' => $request->manu_name,
                'MANU_YM' => $request->manu_ym,
                'PURC_MTH' => $request->purc_mth,
                'PURC_NAME' => $request->purc_name,
                'TEL_NO' => $request->telephone,
                'USE_FLAG' => $request->use_flag,
                'CREATED_BY' => auth()->id(),
            ];
            $create_data = $this->updateDataByKind($create_data, $request);

            Equipment::create($create_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Create equipment false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Create equipment failed.');
        }
    }

    public function update(Request $request, $id) {
        if (empty($this->equipments_permissions) || $this->equipments_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'kind' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            //check data
            if ($messageCheckData = $this->messageCheckDataEquipment($request))
                return $this->responseErrorMessage(404, $messageCheckData);
            $update_data = [
                'EQUIP_KIND' => $request->kind,
                'EQUIP_NAME' => $request->name,
                'MODEL_NAME' => $request->model,
                'MANU_NAME' => $request->manu_name,
                'MANU_YM' => $request->manu_ym,
                'PURC_MTH' => $request->purc_mth,
                'PURC_NAME' => $request->purc_name,
                'TEL_NO' => $request->telephone,
                'USE_FLAG' => $request->use_flag,
                'UPDATED_BY' => auth()->id(),
            ];
            $update_data = $this->updateDataByKind($update_data, $request);

            $equipment = Equipment::find($id);
            if (!$equipment) return $this->responseErrorMessage(404, 'Equipment not found.');

            $equipment->update($update_data);

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Edit equipment false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Edit equipment failed.');
        }
    }

    public function delete($id) {
        if (empty($this->equipments_permissions) || $this->equipments_permissions->PERMISSION_DELETE != 'Y') {
            return $this->responseError403();
        }
        try {
            DB::beginTransaction();
            $equipment = Equipment::find($id);
            if (!$equipment)
                return $this->responseErrorMessage(404, 'Equipment not found!');

            //check relate
            $kind = $equipment->EQUIP_KIND;
            if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.RFID_READER')) {
                $lockers = Locker::where('RFID_READER', $equipment->ID)->get();
            } else if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.WEBCAM')) {
                $lockers = Locker::where('WEBCAM', $equipment->ID)->get();
            } else if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.PRINTER')) {
                $lockers = Locker::where('PRINTER', $equipment->ID)->get();
            } else if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.CARD_TERMINAL')) {
                $lockers = Locker::where('CARD_TERMINAL', $equipment->ID)->get();
            } else if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.BANKNOTE_INSERTER')) {
                $lockers = Locker::where('BANKNOTE_INSERTER', $equipment->ID)->get();
            } else if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.BANKNOTE_DISPENSER')) {
                $lockers = Locker::where('BANKNOTE_DISPENSER', $equipment->ID)->get();
            } else if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.COIN_INSERTER')) {
                $lockers = Locker::where('COIN_INSERTER', $equipment->ID)->get();
            } else if ($kind == config('constants.DETAIL_CODES.EQUIP_KIND.COIN_DISPENSER')) {
                $lockers = Locker::where('COIN_DISPENSER', $equipment->ID)->get();
            }
            if (isset($lockers) && count($lockers)) return $this->responseErrorMessage(400, 'This equipment cannot be deleted, already have a locker use it.');

            $equipment->delete();

            DB::commit();
            return $this->responseSuccessMessage(200, '삭제되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Delete equipment false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Delete equipment failed.');
        }
    }

    protected function updateDataByKind($data, $request) {
        if ($request->kind == config('constants.DETAIL_CODES.EQUIP_KIND.COMPUTER')) {
            $data['OS_KIND'] = $request->os;
        } else if ($request->kind == config('constants.DETAIL_CODES.EQUIP_KIND.MONITOR')) {
            $data['TOUCH_MTH'] = $request->touch_method;
            $data['INTERFACE'] = $request->interface;
        } else {
            $data['POWER'] = $request->power;
            $data['INTERFACE'] = $request->interface;
        }
        return $data;
    }

    protected function messageCheckDataEquipment($request) {
        if (!checkExistIdInData($request->kind, CodeDetail::class))
            return 'Equipment kind not found.';
        if (!checkExistIdInData($request->use_flag, CodeDetail::class))
            return 'Use flag kind not found.';
        if ($request->os) {
            if (!checkExistIdInData($request->os, CodeDetail::class))
                return 'OS kind not found.';
        }
        if ($request->touch_method) {
            if (!checkExistIdInData($request->touch_method, CodeDetail::class))
                return 'Touch method not found.';
        }
        if ($request->purc_mth) {
            if (!checkExistIdInData($request->purc_mth, CodeDetail::class))
                return 'Purc method not found.';
        }
        return '';
    }

}
