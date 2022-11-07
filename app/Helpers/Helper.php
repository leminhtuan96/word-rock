<?php
if (!function_exists('checkJoinTabPermission')) {
    function checkJoinTabPermission($permissions)
    {
        return isset($permissions) && ($permissions->PERMISSION_SEARCH == 'Y' || $permissions->PERMISSION_SAVE == 'Y' || $permissions->PERMISSION_DELETE == 'Y' || $permissions->PERMISSION_EXPORT == 'Y');
    }
}

if (!function_exists('checkExistIdInData')) {
    function checkExistIdInData($id, $class)
    {
        return $class::find($id);
    }
}


