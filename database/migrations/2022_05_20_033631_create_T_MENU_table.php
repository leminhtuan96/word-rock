<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTMENUTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_MENU', function (Blueprint $table) {
            $table->increments('ID');
            $table->string('MENU_NAME', 100);
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
        Schema::dropIfExists('T_MENU');
    }
}
