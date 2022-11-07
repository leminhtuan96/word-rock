<?php


namespace App\Http\Controllers;


use App\Models\CodeDetail;
use App\Models\CodeMaster;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CodeController extends Controller
{
    public function htmlIndex() {
        if (!checkJoinTabPermission($this->codes_permissions)) {
            return view('errors.403');
        }
        return view('codes.index');
    }

    public function index(Request $request) {
        if (empty($this->codes_permissions) || $this->codes_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $master_codes = CodeMaster::orderBy('CODEM_CD', 'DESC');
        if ($request->code) $master_codes = $master_codes->where('CODEM_CD', 'like', "%$request->code%");
        if ($request->name) $master_codes = $master_codes->where('CODEM_NAME', 'like', "%$request->name%");
        $master_codes = $master_codes->get();
        $master_codes = $this->addUseFlagName($master_codes);

        return response()->json([
            'code' => 200,
            'master_codes' => $master_codes,
            'use_flag' => $this->getUseFlag()
        ]);
    }

    public function getDetail($id) {
        if (empty($this->codes_permissions) || $this->codes_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        try {
            DB::beginTransaction();
            $detail_codes = CodeDetail::where('CODEM_ID', $id)->orderBy('DISP_SORT')->get();
            foreach ($detail_codes as $detail_code) {
                $detail_code['USE_FLAG_NAME'] = $detail_code->useFlag->CODED_NAME;
            }

            DB::commit();
            return $this->responseSuccessData(200, $detail_codes);
        } catch (\Exception $e) {
            Log::notice("Update user false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update user failed.');
        }
    }

    public function update(Request $request) {
        if (empty($this->codes_permissions) || $this->codes_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        try {
            DB::beginTransaction();
            //handle delete code
            $delete_master_codes = json_decode($request->delete_master_codes);
            $delete_detail_codes = json_decode($request->delete_detail_codes);
            if ($delete_master_codes) {
                foreach ($delete_master_codes as $delete_master_code) {
                    CodeDetail::where('CODEM_ID', $delete_master_code->id)->delete();
                    CodeMaster::destroy($delete_master_code->id);
                }
            }

            if ($delete_detail_codes) {
                foreach ($delete_detail_codes as $delete_detail_code) {
                    CodeDetail::destroy('CODEM_ID', $delete_detail_code->id);
                }
            }

            //handle add, edit code
            $master_codes = json_decode($request->master_codes);
            $detail_codes = json_decode($request->detail_codes);

            $undefined_uid_master = null;
            if ($detail_codes) {
                foreach ($detail_codes as $detail_code) {
                    if ($detail_code->master_id) {
                        if (!checkExistIdInData($detail_code->master_id, CodeMaster::class))
                            return $this->responseErrorMessage(404, 'Code master not found.');
                        if ($detail_code->id) {
                            //update
                            $d_code = CodeDetail::find($detail_code->id);

                            if (!$d_code)
                                return $this->responseErrorMessage(404, 'Detail code update not found.');

                            $d_code->update([
                                'CODED_CD' => $detail_code->code,
                                'CODED_NAME' => $detail_code->name,
                                'DISP_SORT' => $detail_code->sort,
                                'USE_FLAG' => $detail_code->use_flag,
                                'UPDATED_BY' => auth()->id(),
                            ]);
                        } else {
                            //create
                            CodeDetail::create([
                                'CODEM_ID' => $detail_code->master_id,
                                'CODED_CD' => $detail_code->code,
                                'CODED_NAME' => $detail_code->name,
                                'DISP_SORT' => $detail_code->sort,
                                'USE_FLAG' => $detail_code->use_flag,
                                'CREATED_BY' => auth()->id(),
                            ]);
                        }
                    } else {
                        $undefined_uid_master = $detail_code->master_uid;
                        break;
                    }
                }
            }

            if ($master_codes) {
                foreach ($master_codes as $master_code) {
                    if ($master_code->id) {
                        //update
                        $m_code = CodeMaster::find($master_code->id);
                        if (!$m_code)
                            return $this->responseErrorMessage(404, 'Master code update not found.');

                        $m_code->update([
                            'CODEM_CD' => $master_code->code,
                            'CODEM_NAME' => $master_code->name,
                            'USE_FLAG' => $master_code->use_flag,
                            'UPDATED_BY' => auth()->id(),
                        ]);
                    } else {
                        //create
                        $m_code = CodeMaster::create([
                            'CODEM_CD' => $master_code->code,
                            'CODEM_NAME' => $master_code->name,
                            'USE_FLAG' => $master_code->use_flag,
                            'CREATED_BY' => auth()->id(),
                        ]);
                        if ($master_code->uid == $undefined_uid_master) {
                            foreach ($detail_codes as $detail_code) {
                                //create
                                CodeDetail::create([
                                    'CODEM_ID' => $m_code->ID,
                                    'CODED_CD' => $detail_code->code,
                                    'CODED_NAME' => $detail_code->name,
                                    'DISP_SORT' => $detail_code->sort,
                                    'USE_FLAG' => $detail_code->use_flag,
                                    'CREATED_BY' => auth()->id(),
                                ]);
                            }
                        }
                    }
                }
            }

            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Create code false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update code failed.');
        }
    }
}
