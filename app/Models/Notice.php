<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notice extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_NOTICE';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'SUBJECT',
        'CONTENT',
        'ATTACH_FILES',
        'DEPT_ID',
        'READ_CNT',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function dept()
    {
        return $this->hasOne(Department::class, 'ID', 'DEPT_ID');
    }

    public function author()
    {
        return $this->hasOne(User::class, 'ID', 'CREATED_BY');
    }

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
}
