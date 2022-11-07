<?php

namespace App\Providers;

use App\Models\CodeMaster;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        view()->composer(
            '*',
            function ($view) {
                $use_flag = CodeMaster::find(config('constants.MASTER_CODES.USE_FLAG'));
                $use_flag = [
                    'master' => $use_flag,
                    'detail' => $use_flag->detailCodes()->get()
                ];
                $view->with('use_flag', $use_flag);
            }
        );
    }
}
