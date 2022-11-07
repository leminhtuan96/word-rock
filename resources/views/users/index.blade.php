<style type="text/css">

    .jqx-passwordinput-password-icon-light:after {
        content: '';
    }

    .jqx-validator-hint-arrow {
        background-image: url({{asset('jqwidgets/styles/images/multi-arrow.gif')}}) !important;
    }

    .jqx-validator-hint-light {
        background-color: #942724;
        height: 30px;
        padding: 5px;
    }
</style>
<div id="users-loader">
</div>
<div class="page-area" id="users">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$users_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='users-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="display:none;" class="me-1" type="button" id='users-reset'>
                            <img src="{{asset('icons/refresh.png')}}"/>
                            신규
                        </button>
                        <button style="{{$users_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='users-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$users_permissions->PERMISSION_DELETE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='users-excel'>
                            <img src="{{asset('icons/excel.png')}}"/>
                            Excel 저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row page-filter mt-1" style="">
            <div class="col-lg-12">
                <div class="filter-area overflow-auto">
                    <div class="d-flex">
                        <div class="d-flex align-items-center text-end me-1">
                            <label for="users-filter-station-name" style="min-width: 70px">
                                소속(그룹)
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="users-filter-station-name"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="users-filter-name" style="min-width: 50px">
                                이름
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="users-filter-name"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="users-filter-login-id" style="min-width: 55px">
                                아이디
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="users-filter-login-id"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="users-filter-level" style="min-width: 70px">
                                권한레벨
                            </label>
                        </div>
                        <select id="users-filter-level" class="form-select form-select-sm size-input-m">
                            <option value="">전체</option>
                            @foreach($levels['detail'] as $level)
                                <option value="{{$level->ID}}">{{$level->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="users-splitter" style="height: 100%">
            <div style="overflow: auto;">
                <div style="display: none" class="container-fluid mt-1" id="edit-user-area">
                    <input type="hidden" id="edit-user-id">
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="edit-user-name">
                                이름
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input readonly class="form-control form-control-sm" type="text" id="edit-user-name">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="edit-user-loginId">
                                아이디
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input readonly class="form-control form-control-sm" type="text" id="edit-user-loginId">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <form id="change-password-user-form" enctype="multipart/form-data">
                        <div class="d-flex">
                            <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                                <label class="col-form-label" for="change-password-user-password">
                                    패스워드
                                </label>
                            </div>
                            <div class="size-input-m">
                                <input class="form-control form-control-sm" type="password" id="change-password-user-password">
                            </div>
                            <div class="ms-1 size-input-m"></div>
                        </div>
                        <div class="d-flex">
                            <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                                <label class="col-form-label" for="change-password-user-passwordConfirm">
                                    패스워드 확인
                                </label>
                            </div>
                            <div class="size-input-m">
                                <input class="form-control form-control-sm" type="password" id="change-password-user-passwordConfirm">
                            </div>
                            <div class="ms-1 size-input-m">
                                <button class="w-100" id="change-password-user-change-password">패스워드 변경</button>
                            </div>
                        </div>
                    </form>
                    <form id="edit-user-form" enctype="multipart/form-data">
                        <div class="d-flex">
                            <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                                <label class="col-form-label required-label" for="edit-user-station-name">
                                    소속
                                </label>
                            </div>
                            <div class="size-input-big">
                                <input class="form-control form-control-sm" type="text" id="edit-user-station-name">
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                                <label class="col-form-label required-label" for="edit-user-level">
                                    권한레벨
                                </label>
                            </div>
                            <div class="size-input-m">
                                <select id="edit-user-level" class="form-select form-select-sm">
                                    @foreach($levels['detail'] as $level)
                                        <option value="{{$level->ID}}">{{$level->CODED_NAME}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="ms-1 size-input-m"></div>
                        </div>
                        <div class="d-flex">
                            <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                                <label class="col-form-label required-label" for="edit-user-telephone">
                                    연락처
                                </label>
                            </div>
                            <div class="size-input-m">
                                <input class="form-control form-control-sm" id="edit-user-telephone">
                            </div>
                            <div class="ms-1 size-input-m"></div>
                        </div>
                        <div class="d-flex">
                            <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                                <label class="col-form-label required-label" for="edit-user-mobile">
                                    비상연락처
                                </label>
                            </div>
                            <div class="size-input-m">
                                <input class="form-control form-control-sm" id="edit-user-mobile">
                            </div>
                            <div class="ms-1 size-input-m"></div>
                        </div>
                        <div class="d-flex">
                            <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                                <label class="col-form-label required-label" for="edit-user-email">
                                    E-Mail
                                </label>
                            </div>
                            <div class="size-input-m">
                                <input class="form-control form-control-sm" id="edit-user-email">
                            </div>
                            <div class="ms-1 size-input-m"></div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">관리자 내역</b>
                <div id="users-grid"></div>
            </div>
        </div>
    </div>
</div>
