<?php


namespace App\Http\Controllers;


use App\Models\CodeDetail;
use App\Models\CodeMaster;
use App\Models\Department;
use App\Models\Station;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function htmlIndex()
    {
        if (!checkJoinTabPermission($this->users_permissions) || $this->users_permissions->PERMISSION_SEARCH != 'Y') {
            return view('errors.403');
        }
        $level = CodeMaster::find(config('constants.MASTER_CODES.USER_LVL'));
        $level = [
            'master' => $level,
            'detail' => $level->detailCodes()->get()
        ];
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = [
            'master' => $area,
            'detail' => $area->detailCodes()->get()
        ];
        return view('users.index', ['departments' => $this->getDepartments(), 'levels' => $level, 'areas' => $area]);
    }

    public function index(Request $request)
    {
        if (empty($this->users_permissions) || $this->users_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $users = User::where('USER_LVL', '!=', config('constants.DETAIL_CODES.USER_LVL.GUEST'))->orderBy('ID', 'DESC');
        $users = $this->queryFilterUsers($request, $users);
        if ($request->level) $users = $users->where('USER_LVL', $request->level);
        $users = $users->get();

        //add level name
        foreach ($users as $user) {
            if ($user['CFM_STATION_ID']) $user['STATION_NAME'] = $user->station->STATION_NAME;
            if ($user['USER_LVL']) $user['USER_LVL_NAME'] = $user->level ? $user->level->CODED_NAME : null;
        }

        return $this->responseSuccessData(200, $users);
    }

    public function checkLoginId(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'loginId' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            $user = User::where('LOGIN_ID', $request->loginId)->first();
            if ($user)
                return $this->responseErrorMessage(400, '동일한 로그인 ID가 존재합니다.');

            return $this->responseSuccessMessage(200, '로그인 ID.');
        } catch (\Exception $e) {
            Log::notice("Check login id false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Check login id failed.');
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'station_name' => 'required',
            'level' => 'required',
            'telephone' => 'required',
            'mobile' => 'required',
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            //check data
            if (!checkExistIdInData($request->level, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Level not found.');
            $update_data = [
                'REQ_STATION_NM' => $request->station_name,
                'USER_LVL' => $request->level,
                'TEL_NO' => $request->telephone,
                'MOBL_NO' => $request->mobile,
                'EMAIL' => $request->email,
                'UPDATED_BY' => auth()->id(),
            ];

            $user = User::find($id);
            if (!$user)
                return $this->responseErrorMessage(404, 'User not found!');

            $user->update($update_data);
            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Update user false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update user failed.');
        }
    }

    public function changePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:3|max:20',
            'passwordConfirm' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }
        try {
            DB::beginTransaction();
            $user = User::find($id);
            if (!$user)
                return $this->responseErrorMessage(404, 'User not found!');

            $user->update([
                'LOGIN_PWD' => bcrypt($request->password),
            ]);
            DB::commit();
            return $this->responseSuccessMessage(200, '패스워드가  변경되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Change password false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Change password failed.');
        }
    }

    public function delete($id)
    {
        try {
            DB::beginTransaction();
            $user = User::find($id);
            if (!$user)
                return $this->responseErrorMessage(404, 'User not found!');

            $user->delete();

            DB::commit();
            return $this->responseSuccessMessage(200, 'Delete user success.');
        } catch (\Exception $e) {
            Log::notice("Delete user false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Delete user failed.');
        }
    }

    //register page
    public function htmlRegister()
    {
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = [
            'master' => $area,
            'detail' => $area->detailCodes()->get()
        ];
        return view('users.register', ['departments' => $this->getDepartments(), 'areas' => $area]);
    }

    public function registerStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'loginId' => 'required|unique:T_USER,LOGIN_ID',
            'password' => 'required|min:3|max:20',
            'passwordConfirm' => 'required|same:password',
            'area1' => 'required',
            'area2' => 'required',
            'stationName' => 'required',
            'telephone' => 'required',
            'mobile' => 'required',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            //check data
            if (!checkExistIdInData($request->area1, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Area not found.');
            $register_data = [
                'USER_NAME' => $request->name,
                'LOGIN_ID' => $request->loginId,
                'LOGIN_PWD' => bcrypt($request->password),
                'USER_LVL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
                'REQ_AREA1_DIV' => $request->area1,
                'REQ_AREA2_NM' => $request->area2,
                'REQ_STATION_NM' => $request->stationName,
                'EMAIL' => $request->email,
                'TEL_NO' => $request->telephone,
                'MOBL_NO' => $request->mobile,
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
            ];

            if (auth()->check()) $register_data['CREATED_BY'] = auth()->id();
            $user = User::create($register_data);
            if (!auth()->check()) $user->update([
                'CREATED_BY' => $user->ID,
            ]);
            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Register user false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Register user failed.');
        }
    }

    //approval page
    public function htmlApprovalUsers()
    {
        if (!checkJoinTabPermission($this->approval_users_permissions)) {
            return view('errors.403');
        }
        $level = CodeMaster::find(config('constants.MASTER_CODES.USER_LVL'));
        $level = [
            'master' => $level,
            'detail' => $level->detailCodes()->get()
        ];
        $area = CodeMaster::find(config('constants.MASTER_CODES.REQ_AREA1_DIV'));
        $area = [
            'master' => $area,
            'detail' => $area->detailCodes()->get()
        ];
        return view('users.approval', ['departments' => $this->getDepartments(), 'levels' => $level, 'areas' => $area]);
    }

    public function approvalUsers(Request $request)
    {
        if (empty($this->approval_users_permissions) || $this->approval_users_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $approval_users = User::where('USER_LVL', config('constants.DETAIL_CODES.USER_LVL.GUEST'))->orderBy('ID', 'DESC');
        $approval_users = $this->queryFilterUsers($request, $approval_users);
        $approval_users = $approval_users->get();

        //add level name, station name
        foreach ($approval_users as $approval_user) {
            if ($approval_user['USER_LVL']) $approval_user['USER_LVL_NAME'] = $approval_user->level->CODED_NAME;
            if ($approval_user['CFM_STATION_ID']) $approval_user['CFM_STATION_NAME'] = $approval_user->station->STATION_NAME;
        }
        return $this->responseSuccessData(200, $approval_users);
    }

    public function approvalUser(Request $request, $id)
    {
        if (empty($this->approval_users_permissions) || $this->approval_users_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'station' => 'required',
            'level' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            //check data
            if (!checkExistIdInData($request->station, Station::class))
                return $this->responseErrorMessage(404, 'Station not found.');
            if (!checkExistIdInData($request->level, CodeDetail::class))
                return $this->responseErrorMessage(404, 'Level not found.');
            $approval_data = [
                'CFM_STATION_ID' => $request->station,
                'USER_LVL' => $request->level,
                'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
                'UPDATED_BY' => auth()->id(),
            ];

            $user = User::find($id);
            if (!$user)
                return $this->responseErrorMessage(404, 'User not found!');

            $user->update($approval_data);
            DB::commit();
            return $this->responseSuccessMessage(200, '가입승인되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Approval user false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Approval user failed.');
        }
    }

    public function getStaffs()
    {
        if (!checkJoinTabPermission($this->edit_as_permissions) && !checkJoinTabPermission($this->handle_as_permissions)) {
            return $this->responseError403();
        }
        $users = User::where('USE_FLAG', config('constants.DETAIL_CODES.USE_FLAG.YES'))->orderBy('ID', 'DESC');

        $users = $users->whereIn('USER_LVL', [
            config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
        ]);

        $users = $users->get();

        //add level name
        foreach ($users as $user) {
            if ($user['USER_LVL']) $user['USER_LVL_NAME'] = $user->level ? $user->level->CODED_NAME : null;
        }
        return $this->responseSuccessData(200, $users);
    }

    //edit my profile
    public function htmlEditMyProfile() {
        $level = CodeMaster::find(config('constants.MASTER_CODES.USER_LVL'));
        $level = [
            'master' => $level,
            'detail' => $level->detailCodes()->get()
        ];
        return view('users.edit_my_profile', ['user' => auth()->user(), 'levels' => $level]);
    }

    public function getUsersToPushNotification()
    {
        $users = User::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return $this->responseSuccessData(200, $users);
    }

    protected function queryFilterUsers($request, $query) {
        if ($request->station_name) $query = $query->where('REQ_STATION_NM', 'like', "%$request->station_name%");
        if ($request->name) $query = $query->where('USER_NAME', 'like', "%$request->name%");
        if ($request->login_id) $query = $query->where('LOGIN_ID', 'like', "%$request->login_id%");
        return $query;
    }
}
