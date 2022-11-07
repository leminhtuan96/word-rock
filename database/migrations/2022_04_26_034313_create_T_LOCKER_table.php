<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTLOCKERTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_LOCKER', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('STATION_ID');
            $table->string('LOCKER_NAME', 100);
            $table->integer('LOCKER_KIND')->nullable();
            $table->integer('CTRL_BOX_TYPE')->nullable();
            $table->integer('COMPTR_TYPE')->nullable();
            $table->integer('MONTR_SIZE')->nullable();
            $table->integer('LOCKER_CNT')->nullable();
            $table->integer('LOCK_KIND')->nullable();
            $table->string('UNIT_CODE', 20)->nullable();
            $table->string('RADIAL_NO', 20)->nullable();
            $table->integer('MCU_KIND')->nullable();
            $table->integer('SUB_MCU_YN')->nullable();
            $table->integer('RFID_READER')->nullable();
            $table->integer('WEBCAM')->nullable();
            $table->integer('PRINTER')->nullable();
            $table->integer('CASH_TERMINAL')->nullable();
            $table->integer('CARD_TERMINAL')->nullable();
            $table->integer('BANKNOTE_INSERTER')->nullable();
            $table->integer('BANKNOTE_DISPENSER')->nullable();
            $table->integer('COIN_INSERTER')->nullable();
            $table->integer('COIN_DISPENSER')->nullable();
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
        Schema::dropIfExists('T_LOCKER');
    }
}
