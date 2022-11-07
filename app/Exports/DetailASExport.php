<?php

namespace App\Exports;

use App\Models\ASReceipt;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class DetailASExport implements FromCollection, WithHeadings, WithMapping
{
    protected $keyword;
    protected $start;
    protected $end;
    protected $use_date;
    protected $except_complete;
    protected $only_complete;

    function __construct($keyword, $start, $end, $use_date, $except_complete, $only_complete) {
        $this->keyword = $keyword;
        $this->start = $start;
        $this->end = $end;
        $this->use_date = $use_date;
        $this->except_complete = $except_complete;
        $this->only_complete = $only_complete;
    }

    public function collection()
    {
        $as_list = ASReceipt::select('T_AS_RECEIPT.*')
            ->leftJoin('T_LOCKER', 'T_LOCKER.ID', '=', 'T_AS_RECEIPT.LOCKER_ID')
            ->leftJoin('T_STATION', 'T_STATION.ID', '=', 'T_LOCKER.STATION_ID')
            ->orderBy('T_AS_RECEIPT.ID', 'DESC');
        if ($this->keyword) {
            $keyword = $this->keyword;

            $as_list = $as_list->where(function ($q) use ($keyword) {
                return $q->where(function ($sq) use ($keyword) {
                    if (stripos(config('constants.NON_MEMBER_AS_RECEPTION'), $keyword) !== false) return $sq->whereNull('T_AS_RECEIPT.LOCKER_ID');
                    return $sq;
                })->orWhere(function ($sq) use ($keyword) {
                    return $sq->where('T_STATION.STATION_NAME', 'like', '%' . $keyword . '%')
                        ->orWhere('T_LOCKER.LOCKER_NAME', 'like', '%' . $keyword . '%');
                });
            });

        }
        if ($this->use_date) {
            if ($this->start || $this->end) {
                if ($this->start) $as_list = $as_list->whereDate('T_AS_RECEIPT.RECEIPT_YMD', '>=', $this->start);
                if ($this->end) $as_list = $as_list->whereDate('T_AS_RECEIPT.RECEIPT_YMD', '<=', $this->end);
            }
        }
        if ($this->except_complete) $as_list = $as_list->where('T_AS_RECEIPT.PROG_STATUS', '!=', config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE'));
        if ($this->only_complete) $as_list = $as_list->where('T_AS_RECEIPT.PROG_STATUS', config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE'));

        $as_list = $as_list->get();
        return $as_list;
    }

    public function headings(): array
    {
        return [
            '접수일시',
            '레벨',
            '정기여부',
            '보관함명',
            '접수내용',
            '담당자',
            '진행상태',
            '예정일',
            '완료일',
        ];
    }

    public function map($as): array
    {
        return [
            date_format(date_create($as->RECEIPT_YMD),"Y.m.d H:i"),
            $as->EMERGENCY_TYPE ? $as->emergency->CODED_NAME: '',
            $as->LOCKER_ID ? ($as->locker->station->MAINT_TYPE ? $as->locker->station->maintType->CODED_NAME : '') : '',
            $as->LOCKER_ID ? $as->locker->LOCKER_NAME : '',
            $as->DEFECT_TYPE ? $as->defect->CODED_NAME : '',
            $as->USER_ID ? $as->user->USER_NAME : '',
            $as->PROG_STATUS ? $as->status->CODED_NAME : '',
            $as->PROC_PLAN_YMD ?: '',
            $as->PROC_CMPL_YMD ?: '',
        ];
    }
}
