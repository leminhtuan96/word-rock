<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;

    protected $table = 'T_PERMISSION';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'USER_LEVEL',
        'MENU_ID',
        'PERMISSION_SEARCH',
        'PERMISSION_SAVE',
        'PERMISSION_DELETE',
        'PERMISSION_EXPORT',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function menu()
    {
        return $this->hasOne(Menu::class, 'ID', 'MENU_ID');
    }

    //common code
    public function level() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USER_LEVEL');
    }
}
