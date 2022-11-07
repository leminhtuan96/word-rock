<style type="text/css">
</style>
<div id="edit-my-profile-loader">
</div>
<div class="page-area" id="edit-my-profile">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='edit-my-profile-reset'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button class="me-1" type="button" id='edit-my-profile-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div style="overflow: auto;height: 100%">
            <div class="container-fluid mt-1" id="edit-my-profile-area">
                <input type="hidden" id="edit-my-profile-id" value="{{$user->ID}}">
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="edit-my-profile-name">
                            이름
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input value="{{$user->USER_NAME}}" readonly class="form-control form-control-sm" type="text" id="edit-my-profile-name">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="edit-my-profile-loginId">
                            아이디
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input value="{{$user->LOGIN_ID}}" readonly class="form-control form-control-sm" type="text" id="edit-my-profile-loginId">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
                <form id="edit-my-profile-change-password-form" enctype="multipart/form-data">
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="edit-my-profile-change-password-user-password">
                                패스워드
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input class="form-control form-control-sm" type="password" id="edit-my-profile-change-password-user-password">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="edit-my-profile-change-password-user-passwordConfirm">
                                패스워드 확인
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input class="form-control form-control-sm" type="password" id="edit-my-profile-change-password-user-passwordConfirm">
                        </div>
                        <div class="ms-1 size-input-m">
                            <button class="w-100" id="edit-my-profile-change-password-submit">패스워드 변경</button>
                        </div>
                    </div>
                </form>
                <form id="edit-my-profile-form" enctype="multipart/form-data">
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="edit-my-profile-station-name">
                                소속
                            </label>
                        </div>
                        <div class="size-input-big">
                            <input value="{{$user->station ? $user->station->STATION_NAME : ''}}" readonly class="form-control form-control-sm" type="text" id="edit-my-profile-station-name">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="edit-my-profile-level">
                                권한레벨
                            </label>
                        </div>
                        <div class="size-input-m">
                            <select disabled id="edit-my-profile-level" class="form-select form-select-sm">
                                @foreach($levels['detail'] as $level)
                                    <option {{$user->USER_LVL == $level->ID ? 'selected' : ''}} value="{{$level->ID}}">{{$level->CODED_NAME}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="edit-my-profile-telephone">
                                연락처
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input value="{{$user->TEL_NO}}" class="form-control form-control-sm" id="edit-my-profile-telephone">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="edit-my-profile-mobile">
                                비상연락처
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input value="{{$user->	MOBL_NO}}" class="form-control form-control-sm" id="edit-my-profile-mobile">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="edit-my-profile-email">
                                E-Mail
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input value="{{$user->	EMAIL}}" class="form-control form-control-sm" id="edit-my-profile-email">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
