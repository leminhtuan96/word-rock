<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StationFeeTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('T_STATION_FEE_TEMPLATE')->insert([
            'NAME' => '무인택배',
            'DEFAULT_TIME' => 1000,
            'ONE_ADDITIONAL_HOUR' => 1000,
            'TWO_ADDITIONAL_HOUR' => 1000,
            'REPEAT_TIME' => 1000,
            'BASE_RATE' => 1000,
            'ONE_EXTRA_CHARGE' => 1000,
            'TWO_EXTRA_CHARGE' => 1000,
            'RECURRING_FEE' => 1000,
            'WEEKLY_BASIC_RATE' => 1000,
            'WEEKLY_RECURRING_FEE' => 1000,
            'MONTHLY_BASIC_FEE' => 1000,
            'MONTHLY_RECURRING_FEE' => 1000,
            'DEPOSIT' => 1000,
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_STATION_FEE_TEMPLATE')->insert([
            'NAME' => '안심택배',
            'DEFAULT_TIME' => 2000,
            'ONE_ADDITIONAL_HOUR' => 2000,
            'TWO_ADDITIONAL_HOUR' => 2000,
            'REPEAT_TIME' => 2000,
            'BASE_RATE' => 2000,
            'ONE_EXTRA_CHARGE' => 2000,
            'TWO_EXTRA_CHARGE' => 2000,
            'RECURRING_FEE' => 2000,
            'WEEKLY_BASIC_RATE' => 2000,
            'WEEKLY_RECURRING_FEE' => 2000,
            'MONTHLY_BASIC_FEE' => 2000,
            'MONTHLY_RECURRING_FEE' => 2000,
            'DEPOSIT' => 2000,
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_STATION_FEE_TEMPLATE')->insert([
            'NAME' => '전자식',
            'DEFAULT_TIME' => 3000,
            'ONE_ADDITIONAL_HOUR' => 3000,
            'TWO_ADDITIONAL_HOUR' => 3000,
            'REPEAT_TIME' => 3000,
            'BASE_RATE' => 3000,
            'ONE_EXTRA_CHARGE' => 3000,
            'TWO_EXTRA_CHARGE' => 3000,
            'RECURRING_FEE' => 3000,
            'WEEKLY_BASIC_RATE' => 3000,
            'WEEKLY_RECURRING_FEE' => 3000,
            'MONTHLY_BASIC_FEE' => 3000,
            'MONTHLY_RECURRING_FEE' => 3000,
            'DEPOSIT' => 3000,
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
        DB::table('T_STATION_FEE_TEMPLATE')->insert([
            'NAME' => '도서관',
            'DEFAULT_TIME' => 4000,
            'ONE_ADDITIONAL_HOUR' => 4000,
            'TWO_ADDITIONAL_HOUR' => 4000,
            'REPEAT_TIME' => 4000,
            'BASE_RATE' => 4000,
            'ONE_EXTRA_CHARGE' => 4000,
            'TWO_EXTRA_CHARGE' => 4000,
            'RECURRING_FEE' => 4000,
            'WEEKLY_BASIC_RATE' => 4000,
            'WEEKLY_RECURRING_FEE' => 4000,
            'MONTHLY_BASIC_FEE' => 4000,
            'MONTHLY_RECURRING_FEE' => 4000,
            'DEPOSIT' => 4000,
            'USE_FLAG' => config('constants.DETAIL_CODES.USE_FLAG.YES'),
        ]);
    }
}
