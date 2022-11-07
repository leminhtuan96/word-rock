<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CodeDetail extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'T_CODED';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'ID';

    protected $fillable = [
        'CODEM_ID',
        'CODED_CD',
        'CODED_NAME',
        'DISP_SORT',
        'USE_FLAG',
        'CREATED_BY',
        'UPDATED_BY',
    ];

    //common code
    public function useFlag() {
        return $this->hasOne(CodeDetail::class, 'ID', 'USE_FLAG');
    }
}
