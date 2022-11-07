<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTUSERTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_USER', function (Blueprint $table) {
            $table->increments('ID');
            $table->string('USER_NAME', 100);
            $table->string('LOGIN_ID', 20);
            $table->string('LOGIN_PWD', 100);
            $table->integer('DEPT_ID',)->nullable();
            $table->integer('USER_LVL')->nullable();
            $table->integer('REQ_AREA1_DIV')->nullable();
            $table->string('REQ_AREA2_NM', 100)->nullable();
            $table->string('REQ_STATION_NM', 100)->nullable();
            $table->integer('CFM_STATION_ID')->nullable();
            $table->string('TEL_NO', 20);
            $table->string('MOBL_NO', 20);
            $table->string('EMAIL', 100);
            $table->string('AVATAR', 200)->default('/images/default_avatar.png');
            $table->string('DEVICE_TOKEN', 100)->nullable();
            $table->string('REMEMBER_TOKEN', 100)->nullable();
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
        Schema::dropIfExists('T_USER');
    }
}
