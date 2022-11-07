<?php

namespace App\Exports;

use App\Models\Station;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class StationExport implements FromQuery, WithHeadings, WithMapping
{
    public function query()
    {
        return Station::query();
    }

    public function headings(): array
    {
        return [
            '등록일',
            '지역',
            '세부지역',
            '구분',
            'Station 명',
            '담당자',
            '대표연락처',
            'Mobile',
        ];
    }

    public function map($station): array
    {
        return [
            date_format(date_create($station->CREATED_AT),"Y/m/d"),
            $station->AREA1_DIV ? $station->area1->CODED_NAME : '',
            $station->AREA2_NM ?: '',
            $station->STATION_TYPE ? $station->type->CODED_NAME : '',
            $station->STATION_NAME,
            $station->MNGR_NM ?: '',
            $station->TEL_NO ?: '',
            $station->MOBL_NO ?: '',
        ];
    }
}
