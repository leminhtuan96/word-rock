<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTPERMISSIONTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_PERMISSION', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('USER_LEVEL');
            $table->integer('MENU_ID');
            $table->string('PERMISSION_SEARCH', 1)->default('N');
            $table->string('PERMISSION_SAVE', 1)->default('N');
            $table->string('PERMISSION_DELETE', 1)->default('N');
            $table->string('PERMISSION_EXPORT', 1)->default('N');
            $table->integer('USE_FLAG')->nullable();
            $table->integer('CREATED_BY')->nullable();
            $table->timestamp('CREATED_AT', 0)->nullable();
            $table->integer('UPDATED_BY')->nullable();
            $table->timestamp('UPDATED_AT', 0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('T_PERMISSION');
    }
}
