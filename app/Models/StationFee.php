<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StationFee extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_STATION_FEE';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'STATION_ID',
        'DEFAULT_TIME',
        'ONE_ADDITIONAL_HOUR',
        'TWO_ADDITIONAL_HOUR',
        'REPEAT_TIME',
        'BASE_RATE',
        'ONE_EXTRA_CHARGE',
        'TWO_EXTRA_CHARGE',
        'RECURRING_FEE',
        'WEEKLY_BASIC_RATE',
        'WEEKLY_RECURRING_FEE',
        'MONTHLY_BASIC_FEE',
        'MONTHLY_RECURRING_FEE',
        'DEPOSIT',
        'CREATED_BY',
        'UPDATED_BY',
    ];
}
