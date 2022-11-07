<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Station extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_STATION';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'STATION_NAME',
        'STATION_GROUP',
        'STATION_TYPE',
        'HHLD_CNT',
        'REG_CODE',
        'CTRL_CNT',
        'LOCKER_CNT',
        'AREA1_DIV',
        'AREA2_NM',
        'DTL_ADDR',
        'REPR_NM',
        'MNGR_NM',
        'TEL_NO',
        'MOBL_NO',
        'EMAIL',
        'MAINT_TYPE',
        'MAINT_ST_YMD',
        'MAINT_END_YMD',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function lockers() {
        return $this->hasMany(Locker::class, 'STATION_ID', 'ID');
    }
    public function users() {
        return $this->hasMany(User::class, 'CFM_STATION_ID', 'ID');
    }

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
    public function area1() {
        return $this->hasOne(CodeDetail::class, 'ID', 'AREA1_DIV');
    }
    public function type() {
        return $this->hasOne(CodeDetail::class, 'ID', 'STATION_TYPE');
    }
    public function maintType() {
        return $this->hasOne(CodeDetail::class, 'ID', 'MAINT_TYPE');
    }
}
