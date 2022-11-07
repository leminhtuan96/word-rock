<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //admin
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.EDIT_AS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.DETAIL_AS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.HANDLE_AS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.STATIONS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.STATION_LOCKERS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.STATIONS_DETAIL'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.LOCKERS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.LOCKERS_STATION'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.LOCKERS_DETAIL'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.LOCKER_FREE'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.REGISTER_USER'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.APPROVAL_USERS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.USERS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.EQUIPMENTS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.CREATE_NOTICE'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.LIST_NOTICES'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.DETAIL_NOTICES'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.DEPARTMENTS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.CODES'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.ADMIN'),
            'MENU_ID' => config('constants.MENU.PERMISSIONS'),
            'PERMISSION_SEARCH' => 'Y',
            'PERMISSION_SAVE' => 'Y',
            'PERMISSION_DELETE' => 'Y',
            'PERMISSION_EXPORT' => 'Y',
        ]);

        //staff
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.EDIT_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.DETAIL_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.HANDLE_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.STATIONS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.STATION_LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.STATIONS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKERS_STATION')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKERS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKER_FREE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.REGISTER_USER')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.APPROVAL_USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.EQUIPMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.CREATE_NOTICE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.LIST_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.DETAIL_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.DEPARTMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.CODES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.STAFF'),
            'MENU_ID' => config('constants.MENU.PERMISSIONS')
        ]);

        //call center staff
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.EDIT_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.DETAIL_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.HANDLE_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.STATIONS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.STATION_LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.STATIONS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKERS_STATION')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKERS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.LOCKER_FREE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.REGISTER_USER')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.APPROVAL_USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.EQUIPMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.CREATE_NOTICE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.LIST_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.DETAIL_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.DEPARTMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.CODES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'),
            'MENU_ID' => config('constants.MENU.PERMISSIONS')
        ]);

        //apartment manager
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.EDIT_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.DETAIL_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.HANDLE_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.STATIONS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.STATION_LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.STATIONS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.LOCKERS_STATION')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.LOCKERS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.LOCKER_FREE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.REGISTER_USER')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.APPROVAL_USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.EQUIPMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.CREATE_NOTICE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.LIST_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.DETAIL_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.DEPARTMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.CODES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'),
            'MENU_ID' => config('constants.MENU.PERMISSIONS')
        ]);

        //guest
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.EDIT_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.DETAIL_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.HANDLE_AS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.STATIONS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.STATION_LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.STATIONS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.LOCKERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.LOCKERS_STATION')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.LOCKERS_DETAIL')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.LOCKER_FREE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.REGISTER_USER')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.APPROVAL_USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.USERS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.EQUIPMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.CREATE_NOTICE')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.LIST_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.DETAIL_NOTICES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.DEPARTMENTS')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.CODES')
        ]);
        DB::table('T_PERMISSION')->insert([
            'USER_LEVEL' => config('constants.DETAIL_CODES.USER_LVL.GUEST'),
            'MENU_ID' => config('constants.MENU.PERMISSIONS')
        ]);
    }
}
