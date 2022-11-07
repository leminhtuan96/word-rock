<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ASReceipt extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_AS_RECEIPT';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'RECEIPT_YMD',
        'ASK_TYPE',
        'DEFECT_TYPE',
        'EMERGENCY_TYPE',
        'ASK_REMARK',
        'LOCKER_ID',
        'TEL_NO',
        'E_MAIL',
        'AREA1_DIV',
        'AREA2_NM',
        'LOCATION_NM',
        'USER_ID',
        'PROG_STATUS',
        'PROC_PLAN_YMD',
        'PROC_CMPL_YMD',
        'BLLING_YMD',
        'CMPL_REMARK',
        'ATTACH_FILE',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function locker()
    {
        return $this->hasOne(Locker::class, 'ID', 'LOCKER_ID');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'ID', 'USER_ID');
    }

    public function notices()
    {
        return $this->hasMany(ASNotice::class, 'AS_RECEIPT_ID', 'ID');
    }

    public function images()
    {
        return $this->hasMany(ASImage::class, 'AS_RECEIPT_ID', 'ID');
    }

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
    public function type() {
        return $this->hasOne(CodeDetail::class, 'ID', 'ASK_TYPE');
    }
    public function defect() {
        return $this->hasOne(CodeDetail::class, 'ID', 'DEFECT_TYPE');
    }
    public function emergency() {
        return $this->hasOne(CodeDetail::class, 'ID', 'EMERGENCY_TYPE');
    }
    public function status() {
        return $this->hasOne(CodeDetail::class, 'ID', 'PROG_STATUS');
    }
}
