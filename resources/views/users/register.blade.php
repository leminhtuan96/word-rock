<style type="text/css">
</style>
<div id="register-user-loader">
</div>
<div class="page-area" id="register-user">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='register-user-create'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button class="me-1" type="button" id='register-user-save'>
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
            <form id="register-user-form" class="container-fluid mt-1" enctype="multipart/form-data">
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-name">
                            이름
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input class="form-control form-control-sm" type="text" id="register-user-name">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-loginId">
                            아이디
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input class="form-control form-control-sm" type="text" id="register-user-loginId">
                    </div>
                    <div class="ms-1 size-input-m">
                        <button class="w-100" id="register-user-duplicate-check">중복체크</button>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-password">
                            패스워드
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input class="form-control form-control-sm" type="password" id="register-user-password">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-passwordConfirm">
                            패스워드 확인
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input class="form-control form-control-sm" type="password" id="register-user-passwordConfirm">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-area1">
                            지역
                        </label>
                    </div>
                    <div class="size-input-m">
                        <select id="register-user-area1" class="form-select form-select-sm">
                            <option value="">도/시</option>
                            @foreach($areas['detail'] as $area)
                                <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="ms-1 size-input-m">
                        <input class="form-control form-control-sm" type="text" id="register-user-area2">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-station-name">
                            소속
                        </label>
                    </div>
                    <div class="size-input-big">
                        <input class="form-control form-control-sm" type="text" id="register-user-station-name">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-telephone">
                            연락처
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input class="form-control form-control-sm" id="register-user-telephone">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-mobile">
                            비상연락처
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input class="form-control form-control-sm" id="register-user-mobile">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
                <div class="d-flex">
                    <div class="w-85-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="register-user-email">
                            E-Mail
                        </label>
                    </div>
                    <div class="size-input-m">
                        <input class="form-control form-control-sm" id="register-user-email">
                    </div>
                    <div class="ms-1 size-input-m"></div>
                </div>
            </form>
        </div>
    </div>
</div>
