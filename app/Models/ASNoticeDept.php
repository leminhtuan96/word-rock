<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ASNoticeDept extends Model
{
    use HasFactory;
    protected $table = 'T_AS_NOTICE_DEPT';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'AS_NOTICE_ID',
        'DEPT_ID',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];
}
