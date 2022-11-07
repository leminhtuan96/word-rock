<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTStationFeeTemplateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('T_STATION_FEE_TEMPLATE', function (Blueprint $table) {
            $table->increments('ID');
            $table->string('NAME', 50);
            $table->integer('DEFAULT_TIME')->nullable();
            $table->integer('ONE_ADDITIONAL_HOUR')->nullable();
            $table->integer('TWO_ADDITIONAL_HOUR')->nullable();
            $table->integer('REPEAT_TIME')->nullable();
            $table->integer('BASE_RATE')->nullable();
            $table->integer('ONE_EXTRA_CHARGE')->nullable();
            $table->integer('TWO_EXTRA_CHARGE')->nullable();
            $table->integer('RECURRING_FEE')->nullable();
            $table->integer('WEEKLY_BASIC_RATE')->nullable();
            $table->integer('WEEKLY_RECURRING_FEE')->nullable();
            $table->integer('MONTHLY_BASIC_FEE')->nullable();
            $table->integer('MONTHLY_RECURRING_FEE')->nullable();
            $table->integer('DEPOSIT')->nullable();
            $table->integer('USE_FLAG')->nullable();
            $table->integer('CREATED_BY')->nullable();
            $table->timestamp('CREATED_AT', 0)->nullable();
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
        Schema::dropIfExists('T_STATION_FEE_TEMPLATE');
    }
}
