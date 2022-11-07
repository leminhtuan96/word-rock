<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Locker extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_LOCKER';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'STATION_ID',
        'LOCKER_NAME',
        'LOCKER_KIND',
        'CTRL_BOX_TYPE',
        'COMPTR_TYPE',
        'MONTR_SIZE',
        'LOCKER_CNT',
        'LOCK_KIND',
        'UNIT_CODE',
        'RADIAL_NO',
        'MCU_KIND',
        'SUB_MCU_YN',
        'RFID_READER',
        'WEBCAM',
        'PRINTER',
        'CASH_TERMINAL',
        'CARD_TERMINAL',
        'BANKNOTE_INSERTER',
        'BANKNOTE_DISPENSER',
        'COIN_INSERTER',
        'COIN_DISPENSER',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function station()
    {
        return $this->hasOne(Station::class, 'ID', 'STATION_ID');
    }

    public function afterServices() {
        return $this->hasMany(ASReceipt::class, 'LOCKER_ID', 'ID');
    }

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
    public function kind() {
        return $this->hasOne(CodeDetail::class, 'ID', 'LOCKER_KIND');
    }
}
