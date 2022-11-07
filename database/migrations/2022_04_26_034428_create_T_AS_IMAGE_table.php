<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTASIMAGETable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_AS_IMAGE', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('AS_RECEIPT_ID');
            $table->string('IMAGE_PATH', 200);
            $table->integer('USE_FLAG')->nullable();
            $table->integer('CREATED_BY')->nullable();
            $table->timestamp('CREATED_AT', 0);
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
        Schema::dropIfExists('T_AS_IMAGE');
    }
}
