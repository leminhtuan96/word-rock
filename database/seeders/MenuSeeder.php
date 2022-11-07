<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('T_MENU')->insert([
            'ID' => 1,
            'MENU_NAME' => '1.1 A/S 접수등록',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 2,
            'MENU_NAME' => '1.2 A/S 접수내역',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 3,
            'MENU_NAME' => '1.3 A/S 처리등록',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 4,
            'MENU_NAME' => '2.1 Station 등록',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 5,
            'MENU_NAME' => '2.2 Station 내역',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 6,
            'MENU_NAME' => '2.3 Station 상세내역',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 7,
            'MENU_NAME' => '3.1 보관함 등록',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 8,
            'MENU_NAME' => '3.2 보관함 내역',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 9,
            'MENU_NAME' => '3.3 보관함 상세내역',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 10,
            'MENU_NAME' => '3.4 보관함 요금설정',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 11,
            'MENU_NAME' => '4.1 관리자 가입신청',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 12,
            'MENU_NAME' => '4.2 관리자 가입승인',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 13,
            'MENU_NAME' => '4.3 관리자 정보수정',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 14,
            'MENU_NAME' => '5.1 장비등록',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 15,
            'MENU_NAME' => '6.1 공지사항 등록',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 16,
            'MENU_NAME' => '6.2 공지사항',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 17,
            'MENU_NAME' => '6.3 공지사항 상세',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 18,
            'MENU_NAME' => '7.1 조직/부서 관리',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 19,
            'MENU_NAME' => '7.2 공통코드 관리',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 20,
            'MENU_NAME' => '7.3 권한관리',
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_MENU')->insert([
            'ID' => 21,
            'MENU_NAME' => '7.4 역 요금 템플릿',
            'USE_FLAG' => config('constants.MENU.STATION_FEE_TEMPLATES'),
        ]);
    }
}
