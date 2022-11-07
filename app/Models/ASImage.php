<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ASImage extends Model
{
    use HasFactory;

    protected $table = 'T_AS_IMAGE';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'AS_RECEIPT_ID',
        'IMAGE_PATH',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];
}
