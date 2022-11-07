<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTSTATIONTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_STATION', function (Blueprint $table) {
            $table->increments('ID');
            $table->string('STATION_NAME', 100);
            $table->string('STATION_GROUP', 100)->nullable();
            $table->integer('STATION_TYPE')->nullable();
            $table->integer('HHLD_CNT')->nullable();
            $table->string('REG_CODE', 4)->nullable();
            $table->integer('CTRL_CNT')->nullable();
            $table->integer('LOCKER_CNT')->nullable();
            $table->integer('AREA1_DIV')->nullable();
            $table->string('AREA2_NM', 100)->nullable();
            $table->string('DTL_ADDR', 100)->nullable();
            $table->string('REPR_NM', 100)->nullable();
            $table->string('MNGR_NM', 100)->nullable();
            $table->string('TEL_NO', 20)->nullable();
            $table->string('MOBL_NO', 20)->nullable();
            $table->string('EMAIL', 100)->nullable();
            $table->integer('MAINT_TYPE')->nullable();
            $table->date('MAINT_ST_YMD')->nullable();
            $table->date('MAINT_END_YMD')->nullable();
            $table->integer('USE_FLAG')->nullable();
            $table->integer('CREATED_BY');
            $table->timestamp('CREATED_AT', 0);
            $table->integer('UPDATED_BY')->nullable();
            $table->timestamp('UPDATED_AT', 0)->nullable();
            $table->timestamp('DELETED_AT', 0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('T_STATION');
    }
}
