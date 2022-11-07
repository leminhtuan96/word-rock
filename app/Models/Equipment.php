<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Equipment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_EQUIPMENT';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'EQUIP_KIND',
        'EQUIP_NAME',
        'MODEL_NAME',
        'MANU_NAME',
        'MANU_YM',
        'OS_KIND',
        'TOUCH_MTH',
        'POWER',
        'INTERFACE',
        'PURC_MTH',
        'PURC_NAME',
        'TEL_NO',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
    public function kind() {
        return $this->hasOne(CodeDetail::class, 'ID', 'EQUIP_KIND');
    }
}
