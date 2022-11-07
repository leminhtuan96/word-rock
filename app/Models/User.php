<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;

    protected $table = 'T_USER';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'USER_NAME',
        'LOGIN_ID',
        'LOGIN_PWD',
        'DEPT_ID',
        'USER_LVL',
        'REQ_AREA1_DIV',
        'REQ_AREA2_NM',
        'REQ_STATION_NM',
        'CFM_STATION_ID',
        'TEL_NO',
        'MOBL_NO',
        'EMAIL',
        'AVATAR',
        'DEVICE_TOKEN',
        'REMEMBER_TOKEN',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'LOGIN_PWD',
        'REMEMBER_TOKEN',
    ];

    //change remember_token name
    public function getRememberTokenName()
    {
        return 'REMEMBER_TOKEN';
    }

    //change password name
    public function getAuthPassword()
    {
        return $this->LOGIN_PWD;
    }

    public function dept()
    {
        return $this->hasOne(Department::class, 'ID', 'DEPT_ID');
    }

    public function station()
    {
        return $this->hasOne(Station::class, 'ID', 'CFM_STATION_ID');
    }

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
    public function level() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USER_LVL');
    }
}
