<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_DEPT';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'DEPT_NAME',
        'DEPT_TYPE',
        'UPPER_ID',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function departments() {
        return $this->hasMany(Department::class, 'UPPER_ID', 'ID');
    }

    public function asNotices() {
        return $this->belongsToMany(ASNotice::class, 'T_AS_NOTICE_DEPT', 'DEPT_ID', 'AS_NOTICE_ID');
    }

    public function notices() {
        return $this->hasMany(Notice::class, 'DEPT_ID', 'ID');
    }

    public function users() {
        return $this->hasMany(User::class, 'DEPT_ID', 'ID');
    }

    public function parent() {
        return $this->belongsTo(Department::class, 'UPPER_ID', 'ID');
    }

    public function created_by()
    {
        return $this->hasOne(User::class, 'ID', 'CREATED_BY');
    }

    public function updated_by()
    {
        return $this->hasOne(User::class, 'ID', 'UPDATED_BY');
    }

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
    public function deptType() {
        return $this->hasOne(CodeDetail::class, 'ID', 'DEPT_TYPE');
    }
}
