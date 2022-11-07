<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTCODEMTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_CODEM', function (Blueprint $table) {
            $table->increments('ID');
            $table->string('CODEM_CD', 20);
            $table->string('CODEM_NAME', 100);
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
        Schema::dropIfExists('T_CODEM');
    }
}
