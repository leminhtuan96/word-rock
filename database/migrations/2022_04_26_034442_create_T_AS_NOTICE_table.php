<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTASNOTICETable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_AS_NOTICE', function (Blueprint $table) {
            $table->increments('ID');
            $table->integer('AS_RECEIPT_ID');
            $table->integer('UPPER_ID')->nullable();
            $table->text('CONTENT')->nullable();
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
        Schema::dropIfExists('T_AS_NOTICE');
    }
}
