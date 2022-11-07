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
<div id="approval-users-loader">
</div>
<div class="page-area" id="approval-users">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$approval_users_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='approval-users-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="display: none" class="me-1" type="button" id="approval-users-reset">
                            <img width="18px" src="{{asset('icons/refresh.png')}}">
                            신규
                        </button>
                        <button style="{{$approval_users_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='approval-users-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$approval_users_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" type="button" id='approval-users-excel'>
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
                            <label for="approval-users-filter-station-name" style="min-width: 70px">
                                소속(그룹)
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="approval-users-filter-station-name"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="approval-users-filter-name" style="min-width: 50px">
                                이름
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="approval-users-filter-name"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="approval-users-filter-login-id" style="min-width: 55px">
                                아이디
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="approval-users-filter-login-id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="approval-users-splitter" style="height: 100%">
            <div style="overflow: auto;">
                <div id="approval-users-choose-station-window">
                    <div>
                        <img width="14" height="14" src="../../images/help.png" alt=""/>
                        <span id="approval-users-choose-station-window-title">Station 선택</span>
                    </div>
                    <div>
                        <div id="approval-users-choose-station-window-content"></div>
                        <div>
                            <div style="float: right; margin-top: 15px;">
                                <button type="button" id="approval-users-choose-station-window-ok" style="margin-right: 10px">
                                    <img width="18px" src="{{asset('icons/check.png')}}">
                                    저장
                                </button>
                                <button type="button" id="approval-users-choose-station-window-cancel">
                                    <img width="18px" src="{{asset('icons/close.png')}}">
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <form style="display: none" id="approval-users-form" class="container-fluid mt-1" enctype="multipart/form-data">
                    <input id="approval-users-id" type="hidden">
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="approval-users-name">
                                이름
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input readonly class="form-control form-control-sm" type="text" id="approval-users-name">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="approval-users-loginId">
                                아이디
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input readonly class="form-control form-control-sm" type="text" id="approval-users-loginId">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="approval-users-area1">
                                지역
                            </label>
                        </div>
                        <div class="size-input-m">
                            <select id="approval-users-area1" class="form-select form-select-sm" disabled>
                                <option value="">도/시</option>
                                @foreach($areas['detail'] as $area)
                                    <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="ms-1 size-input-m">
                            <input readonly class="form-control form-control-sm" type="text" id="approval-users-area2">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="approval-users-station-name">
                                소속
                            </label>
                        </div>
                        <div class="size-input-big">
                            <input readonly class="form-control form-control-sm" type="text" id="approval-users-station-name">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="approval-users-approval-station-name">
                                Station 명
                            </label>
                        </div>
                        <div class="size-input-big position-relative">
                            <input style="cursor: pointer;background-color: #83D5F6" readonly class="form-control form-control-sm pe-4" type="text" id="approval-users-approval-station-name">
                            <img id="approval-users-choose-station" style="top:.4rem;right: .25rem;cursor: pointer" class="position-absolute" src="{{asset('jqwidgets/styles/images/search.png')}}" />
                            <input type="hidden" id="approval-users-approval-station-id">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="approval-users-level">
                                권한레벨
                            </label>
                        </div>
                        <div class="size-input-m">
                            <select id="approval-users-level" class="form-select form-select-sm">
                                @foreach($levels['detail'] as $level)
                                    <option value="{{$level->ID}}">{{$level->CODED_NAME}}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="approval-users-telephone">
                                연락처
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input readonly class="form-control form-control-sm" id="approval-users-telephone">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="approval-users-mobile">
                                비상연락처
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input readonly class="form-control form-control-sm" id="approval-users-mobile">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                    <div class="d-flex">
                        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="approval-users-email">
                                E-Mail
                            </label>
                        </div>
                        <div class="size-input-m">
                            <input readonly class="form-control form-control-sm" id="approval-users-email">
                        </div>
                        <div class="ms-1 size-input-m"></div>
                    </div>
                </form>
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">가입대기 내역</b>
                <div id="approval-users-grid"></div>
            </div>
        </div>
    </div>
</div>
