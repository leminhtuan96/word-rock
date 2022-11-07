<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTASRECEIPTTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_AS_RECEIPT', function (Blueprint $table) {
            $table->increments('ID');
            $table->dateTime('RECEIPT_YMD');
            $table->integer('ASK_TYPE')->nullable();
            $table->integer('DEFECT_TYPE')->nullable();
            $table->integer('EMERGENCY_TYPE')->nullable();
            $table->text('ASK_REMARK')->nullable();
            $table->integer('LOCKER_ID')->nullable();
            $table->string('TEL_NO', 20)->nullable();
            $table->string('E_MAIL', 100)->nullable();
            $table->integer('AREA1_DIV')->nullable();
            $table->string('AREA2_NM', 100)->nullable();
            $table->string('LOCATION_NM', 100)->nullable();
            $table->integer('USER_ID')->nullable();
            $table->integer('PROG_STATUS');
            $table->date('PROC_PLAN_YMD')->nullable();
            $table->date('PROC_CMPL_YMD')->nullable();
            $table->date('BLLING_YMD')->nullable();
            $table->text('CMPL_REMARK')->nullable();
            $table->string('ATTACH_FILE', 255)->nullable();
            $table->integer('USE_FLAG')->nullable();
            $table->integer('CREATED_BY')->nullable();
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
        Schema::dropIfExists('T_AS_RECEIPT');
    }
}
