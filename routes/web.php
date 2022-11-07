<?php

use App\Http\Controllers\ASController;
use App\Http\Controllers\ASNoticeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LockerController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'loginPost'])->name('loginPost');
Route::get('api/auth/get-info', [AuthController::class, 'getInfo'])->name('get-info');

Route::post('api/users/check-login-id', [UserController::class, 'checkLoginId'])->name('api.users.check-login-id');

//create as
Route::group(['prefix' => 'as'], function () {
    Route::get('/create', [ASController::class, 'htmlCreate'])->name('as.create');
    Route::get('guest-create', [ASController::class, 'htmlGuestCreate'])->name('as.guest-create');
});

Route::group(['prefix' => 'api/as'], function () {
    Route::post('/store', [ASController::class, 'store'])->name('api.as.store');
    Route::post('guest-store', [ASController::class, 'guestStore'])->name('api.as.guest-store');
});
//register users
Route::group(['prefix' => 'users'], function () {
    Route::get('/register', [UserController::class, 'htmlRegister'])->name('users.register');
});
Route::group(['prefix' => 'api/users'], function () {
    Route::post('/register-store', [UserController::class, 'registerStore'])->name('api.users.register-store');

});

//send mail
Route::post('api/as/send-url-create-as', [ASController::class, 'sendUrlCreateAS'])->name('send-url-create-as');

//guest

Route::get('', [HomeController::class, 'index'])->name('welcome');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

    //push notification
    Route::post('/save-token', [AuthController::class, 'saveToken'])->name('save-token');
    Route::post('/send-notification', [AuthController::class, 'sendNotification'])->name('send.notification');
    Route::group(['prefix' => 'notifications'], function () {
        Route::get('/', [NotificationController::class, 'htmlIndex'])->name('notifications.index');
        Route::get('/create', [NotificationController::class, 'htmlCreate'])->name('notifications.create');
    });
    Route::group(['prefix' => 'api/notifications'], function () {
        Route::get('/', [NotificationController::class, 'index'])->name('api.notifications.index');
        Route::get('/create', [NotificationController::class, 'create'])->name('api.notifications.create');
        Route::post('/store', [NotificationController::class, 'store'])->name('api.notifications.store');
    });

    //codes
    Route::group(['prefix' => 'codes'], function () {
        Route::get('/', [CodeController::class, 'htmlIndex'])->name('codes.index');
    });

    Route::group(['prefix' => 'api/codes'], function () {
        Route::get('/', [CodeController::class, 'index'])->name('api.codes.index');
        Route::get('/get-detail/{id}', [CodeController::class, 'getDetail'])->name('api.codes.get-detail');
        Route::post('/update', [CodeController::class, 'update'])->name('api.codes.update');
    });

    //departments
    Route::group(['prefix' => 'departments'], function () {
        Route::get('/', [DepartmentController::class, 'htmlIndex'])->name('departments.index');
    });

    Route::group(['prefix' => 'api/departments'], function () {
        Route::get('/', [DepartmentController::class, 'index'])->name('api.departments.index');
        Route::get('/get-parents/{type}', [DepartmentController::class, 'getParents'])->name('api.departments.get-parents');
        Route::post('/store', [DepartmentController::class, 'store'])->name('api.departments.store');
        Route::post('/update/{id}', [DepartmentController::class, 'update'])->name('api.departments.update');
        Route::delete('/delete/{id}', [DepartmentController::class, 'delete'])->name('api.departments.delete');
    });

    //notices
    Route::group(['prefix' => 'notices'], function () {
        Route::get('/list', [NoticeController::class, 'htmlList'])->name('notices.list');
        Route::get('/create', [NoticeController::class, 'htmlCreate'])->name('notices.create');
        Route::get('/detail', [NoticeController::class, 'htmlDetail'])->name('notices.detail');
    });

    Route::group(['prefix' => 'api/notices'], function () {
        Route::get('/list', [NoticeController::class, 'list'])->name('api.notices.list');
        Route::post('/create', [NoticeController::class, 'create'])->name('api.notices.create');
    });

    //stations
    Route::group(['prefix' => 'stations'], function () {
        Route::get('/', [StationController::class, 'htmlIndex'])->name('stations.index');
        Route::get('/stations-lockers', [StationController::class, 'htmlStationsLockers'])->name('stations.stations-lockers');
        Route::get('/detail', [StationController::class, 'htmlGetDetail'])->name('stations.detail');

        Route::get('/export/', [StationController::class, 'export'])->name('stations.export');
    });

    Route::group(['prefix' => 'api/stations'], function () {
        Route::get('/', [StationController::class, 'index'])->name('api.stations.index');
        Route::get('/get-by-keyword', [StationController::class, 'getByKeyword'])->name('api.stations.get-by-keyword');
        Route::post('/store', [StationController::class, 'store'])->name('api.stations.store');
        Route::post('/update/{id}', [StationController::class, 'update'])->name('api.stations.update');
        Route::delete('/delete/{id}', [StationController::class, 'delete'])->name('api.stations.delete');
        Route::get('/detail-and-as', [StationController::class, 'getDetailAndAS'])->name('api.stations.detail-and-as');
        Route::get('/fee-template/{template_id}', [StationController::class, 'getDetailFeeTemplate']);
        Route::get('/get-fee-template-by-station/{station_id}', [StationController::class, 'getDetailFeeTemplateByStation']);
        Route::post('/fee', [StationController::class, 'updateFeeStation']);
    });

    //lockers
    Route::group(['prefix' => 'lockers'], function () {
        Route::get('/', [LockerController::class, 'htmlIndex'])->name('lockers.index');
        Route::get('/detail', [LockerController::class, 'htmlGetDetail'])->name('lockers.detail');
        Route::get('/lockers-stations', [LockerController::class, 'htmlLockersStations'])->name('lockers.lockers-stations');
    });

    Route::group(['prefix' => 'api/lockers'], function () {
        Route::get('/', [LockerController::class, 'index'])->name('api.lockers.index');
        Route::get('/get-by-keyword', [LockerController::class, 'getByKeyword'])->name('api.stations.get-by-keyword');
        Route::get('/get-stations', [LockerController::class, 'getStationsActive'])->name('api.lockers.get-stations');
        Route::post('/store', [LockerController::class, 'store'])->name('api.lockers.store');
        Route::post('/update/{id}', [LockerController::class, 'update'])->name('api.lockers.update');
        Route::delete('/delete/{id}', [LockerController::class, 'delete'])->name('api.lockers.delete');
        Route::get('/get-by-station/{id}', [LockerController::class, 'getLockersByStation'])->name('api.lockers.get-by-station');
        Route::get('/detail-and-as', [LockerController::class, 'getDetailAndAS'])->name('api.lockers.detail-and-as');

        Route::get('/get-locker/{id}', [LockerController::class, 'getLocker'])->name('api.lockers.get-by-station');
    });

    //equipments
    Route::group(['prefix' => 'equipments'], function () {
        Route::get('/', [EquipmentController::class, 'htmlIndex'])->name('equipments.index');
    });

    Route::group(['prefix' => 'api/equipments'], function () {
        Route::get('/', [EquipmentController::class, 'index'])->name('api.equipments.index');
        Route::post('/store', [EquipmentController::class, 'store'])->name('api.equipments.store');
        Route::post('/update/{id}', [EquipmentController::class, 'update'])->name('api.equipments.update');
        Route::delete('/delete/{id}', [EquipmentController::class, 'delete'])->name('api.equipments.delete');
    });

    //as
    Route::group(['prefix' => 'as'], function () {
        Route::get('/detail', [ASController::class, 'htmlDetail'])->name('as.detail');
        Route::get('edit', [ASController::class, 'htmlEdit'])->name('as.edit');
        Route::get('handle', [ASController::class, 'htmlHandle'])->name('as.handle');
    });

    Route::group(['prefix' => 'api/as'], function () {
        Route::get('/detail', [ASController::class, 'detail'])->name('api.as.detail');
        Route::get('/detail-as/{id}', [ASController::class, 'detail_as'])->name('api.as.detail-as');
        Route::get('/detail/export', [ASController::class, 'detailExport'])->name('api.as.detail.export');
        Route::post('/staff-store', [ASController::class, 'staffStore'])->name('api.as.staff-store');
        Route::post('/update/{id}', [ASController::class, 'updateAS'])->name('api.as.update');
        Route::post('/handle/{id}', [ASController::class, 'handleAS'])->name('api.as.handle');
        Route::get('get-by-locker', [ASController::class, 'getByLocker'])->name('api.as.get-by-locker');
        Route::delete('/delete/{id}', [ASController::class, 'delete'])->name('api.as.delete');
        Route::post('/send-url-create-as', [ASController::class, 'sendUrlCreateAS'])->name('send-url-create-as');

        Route::get('/get-new-as-notices', [ASController::class, 'getNewASNotices']);
        Route::get('/get-new-notices', [ASController::class, 'getNewNotices']);
        Route::get('/get-maintain-stations', [ASController::class, 'getMaintainStations']);
    });

    //notice as
    Route::group(['prefix' => 'api/notice-as'], function () {
        Route::get('/get-by-as/{as_id}', [ASNoticeController::class, 'getByAS'])->name('api.notice-as.get-by-as');
        Route::post('/store', [ASNoticeController::class, 'store'])->name('api.notice-as.store');
        Route::post('/sub-store', [ASNoticeController::class, 'subStore'])->name('api.notice-as.sub-store');
    });

    //permissions
    Route::group(['prefix' => 'permissions'], function () {
        Route::get('/', [PermissionController::class, 'htmlIndex'])->name('permissions.index');
    });

    Route::group(['prefix' => 'api/permissions'], function () {
        Route::get('/', [PermissionController::class, 'index'])->name('api.permissions.index');
        Route::get('/get-pages', [PermissionController::class, 'getPages'])->name('api.permissions.get-pages');
        Route::post('/update', [PermissionController::class, 'update'])->name('api.permissions.update');
    });

    //users
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'htmlIndex'])->name('users.index');
        Route::get('/edit-my-profile', [UserController::class, 'htmlEditMyProfile'])->name('users.edit-my-profile');
        Route::get('/approval-users', [UserController::class, 'htmlApprovalUsers'])->name('users.approval-users');
    });

    Route::group(['prefix' => 'api/users'], function () {
        Route::get('/', [UserController::class, 'index'])->name('api.users.index');
        Route::get('/approval-users', [UserController::class, 'approvalUsers'])->name('api.users.approval-users');
        Route::get('/get-stations', [UserController::class, 'getStationsActive'])->name('api.users.get-stations');

        Route::post('/update/{id}', [UserController::class, 'update'])->name('api.users.update');
        Route::post('/change-password/{id}', [UserController::class, 'changePassword'])->name('api.users.change-password');
        Route::delete('/delete/{id}', [UserController::class, 'delete'])->name('api.users.delete');

        Route::post('/approval-user/{id}', [UserController::class, 'approvalUser'])->name('api.users.approval-user');

        Route::get('/get-staffs', [UserController::class, 'getStaffs'])->name('api.users.get-staffs');

        Route::get('/get-users-to-push-notification', [UserController::class, 'getUsersToPushNotification'])->name('api.users.get-users-to-push-notification');
    });
});
