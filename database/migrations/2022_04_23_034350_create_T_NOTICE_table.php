<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTNOTICETable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_NOTICE', function (Blueprint $table) {
            $table->increments('ID');
            $table->string('SUBJECT', 200);
            $table->text('CONTENT')->nullable();
            $table->text('ATTACH_FILES')->nullable();
            $table->integer('DEPT_ID')->nullable();
            $table->integer('READ_CNT')->nullable();
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
        Schema::dropIfExists('T_NOTICE');
    }
}
