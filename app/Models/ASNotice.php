<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ASNotice extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_AS_NOTICE';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'AS_RECEIPT_ID',
        'UPPER_ID',
        'CONTENT',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function notices() {
        return $this->hasMany(ASNotice::class, 'UPPER_ID', 'ID');
    }

    public function as_receipt() {
        return $this->hasOne(ASReceipt::class, 'ID', 'AS_RECEIPT_ID');
    }

    public function departments() {
        return $this->belongsToMany(Department::class, 'T_AS_NOTICE_DEPT', 'AS_NOTICE_ID', 'DEPT_ID');
    }

    public function created_by()
    {
        return $this->hasOne(User::class, 'ID', 'CREATED_BY');
    }
}
