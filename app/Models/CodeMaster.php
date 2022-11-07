<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CodeMaster extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_CODEM';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'CODEM_CD',
        'CODEM_NAME',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    public function detailCodes() {
        return $this->hasMany(CodeDetail::class, 'CODEM_ID', 'ID')->orderBy('DISP_SORT', 'ASC');
    }

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
}
