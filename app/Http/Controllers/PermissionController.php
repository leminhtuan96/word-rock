<?php

namespace App\Http\Controllers;

use App\Models\CodeMaster;
use App\Models\Menu;
use App\Models\Permission;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PermissionController extends Controller
{
    public function htmlIndex() {
        if (!checkJoinTabPermission($this->permissions_permissions)) {
            return view('errors.403');
        }
        $level = CodeMaster::find(config('constants.MASTER_CODES.USER_LVL'));
        $level = [
            'master' => $level,
            'detail' => $level->detailCodes()->get()
        ];
        return view('permissions.index', ['levels' => $level]);
    }

    public function index(Request $request) {
        if (empty($this->permissions_permissions) || $this->permissions_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $permissions = Permission::orderBy('USER_LEVEL')->orderBy('MENU_ID');
        if ($request->level) $permissions = $permissions->where('USER_LEVEL', $request->level);
        if ($request->page_id) $permissions = $permissions->where('MENU_ID', $request->page_id);
        $permissions = $permissions->get();
        foreach ($permissions as $permission) {
            $permission['USER_LEVEL_NAME'] = $permission->level->CODED_NAME;
            $permission['MENU_NAME'] = $permission->menu->MENU_NAME;
            $permission['PERMISSION_SEARCH'] = $permission['PERMISSION_SEARCH'] == 'Y';
            $permission['PERMISSION_SAVE'] = $permission['PERMISSION_SAVE'] == 'Y';
            $permission['PERMISSION_DELETE'] = $permission['PERMISSION_DELETE'] == 'Y';
            $permission['PERMISSION_EXPORT'] = $permission['PERMISSION_EXPORT'] == 'Y';
        }
        return $this->responseSuccessData(200, $permissions);
    }

    public function getPages() {
        if (empty($this->permissions_permissions) || $this->permissions_permissions->PERMISSION_SEARCH != 'Y') {
            return $this->responseError403();
        }
        $pages = Menu::all();
        return $this->responseSuccessData(200, $pages);
    }

    public function update(Request $request) {
        if (empty($this->permissions_permissions) || $this->permissions_permissions->PERMISSION_SAVE != 'Y') {
            return $this->responseError403();
        }
        $validator = Validator::make($request->all(), [
            'edit_permissions' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->responseErrorMessage(400, $validator->errors()->first());
        }

        try {
            DB::beginTransaction();
            $edit_permissions = json_decode($request->edit_permissions);
            if (!$edit_permissions)
                return $this->responseErrorMessage(400, 'No data update permissions.');

            foreach ($edit_permissions as $edit_permission) {
                $permission = Permission::find($edit_permission->ID);
                if (!$permission)
                    return $this->responseErrorMessage(404, 'Permission not found.');

                $update_data = ['UPDATED_BY' => auth()->id()];
                if (isset($edit_permission->PERMISSION_SEARCH)) $update_data['PERMISSION_SEARCH'] = $edit_permission->PERMISSION_SEARCH;
                if (isset($edit_permission->PERMISSION_SAVE)) $update_data['PERMISSION_SAVE'] = $edit_permission->PERMISSION_SAVE;
                if (isset($edit_permission->PERMISSION_DELETE)) $update_data['PERMISSION_DELETE'] = $edit_permission->PERMISSION_DELETE;
                if (isset($edit_permission->PERMISSION_EXPORT)) $update_data['PERMISSION_EXPORT'] = $edit_permission->PERMISSION_EXPORT;

                $permission->update($update_data);
            }
            DB::commit();
            return $this->responseSuccessMessage(200, '저장되었습니다.');
        } catch (\Exception $e) {
            Log::notice("Update permissions false" . ' ' . Carbon::now() . ': ' . $e->getMessage());
            return $this->responseErrorMessage(500, 'Update permissions failed.');
        }
    }
}
