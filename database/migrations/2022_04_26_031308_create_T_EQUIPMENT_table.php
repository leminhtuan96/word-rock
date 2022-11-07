<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTEQUIPMENTTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_EQUIPMENT', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('EQUIP_KIND');
            $table->string('EQUIP_NAME', 100);
            $table->string('MODEL_NAME', 100)->nullable();
            $table->string('MANU_NAME', 100)->nullable();
            $table->string('MANU_YM', 10)->nullable();
            $table->integer('OS_KIND')->nullable();
            $table->integer('TOUCH_MTH')->nullable();
            $table->string('POWER', 20)->nullable();
            $table->string('INTERFACE', 100)->nullable();
            $table->integer('PURC_MTH')->nullable();
            $table->string('PURC_NAME', 100)->nullable();
            $table->string('TEL_NO', 20)->nullable();
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
        Schema::dropIfExists('T_EQUIPMENT');
    }
}
