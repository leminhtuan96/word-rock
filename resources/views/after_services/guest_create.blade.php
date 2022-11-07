<style>
    .jqx-file-upload-file-upload,
    .jqx-file-upload-buttons-container button {
        display: none;
    }
</style>
<div id="guest-create-as-loader">
</div>
<div class="page-area" id="guest-create-as">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='guest-create-as-reset'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button class="me-1" type="button" id='guest-create-as-save'>
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
            <form id="guest-create-as-form" class="container-fluid mt-1" enctype="multipart/form-data">
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="guest-create-as-ask-type">
                            문의유형
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <select id="guest-create-as-ask-type" class="form-select form-select-sm">
                            <option value="">선택</option>
                            @foreach($ask_types['detail'] as $ask_type)
                                <option value="{{$ask_type->ID}}">{{$ask_type->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="guest-create-as-defect-type">
                            하자유형
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <select id="guest-create-as-defect-type" class="form-select form-select-sm">
                            <option value="">선택</option>
                            @foreach($defect_types['detail'] as $defect_type)
                                <option value="{{$defect_type->ID}}">{{$defect_type->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="guest-create-as-ask-remark">
                            문의내용
                        </label>
                    </div>
                    <div style="max-height: calc(425px + .75rem); min-width: calc(325px + .75rem); width: calc(425px + .75rem)">
                        <textarea style="height: 100px" class="form-control form-control-sm" id="guest-create-as-ask-remark"></textarea>
                    </div>
                </div>
                <div class="d-flex mt-1">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="guest-create-as-station-area1">
                            지역
                        </label>
                    </div>
                    <div class="size-input-very-sm">
                        <select id="guest-create-as-station-area1" class="form-select form-select-sm">
                            <option value="">도/시</option>
                            @foreach($areas['detail'] as $area)
                                <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="size-input-very-sm ms-1">
                        <input class="form-control form-control-sm" type="text" id="guest-create-as-station-area2">
                    </div>
                    <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                        <label class="col-form-label" for="guest-create-as-telephone">
                            연락처
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <input class="form-control form-control-sm" type="text" id="guest-create-as-telephone">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="guest-create-as-location-name">
                            명칭
                        </label>
                    </div>
                    <div class="size-input-m-adv">
                        <input class="form-control form-control-sm" type="text" id="guest-create-as-location-name">
                    </div>
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                        <label class="col-form-label" for="guest-create-as-email">
                            E-Mail
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <input class="form-control form-control-sm" type="text" id="guest-create-as-email">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label">
                            &nbsp;
                        </label>
                    </div>
                    <div class="size-input-m-adv">
                    </div>
                    <div class="w-75-px me-1 ms-1"></div>
                    <div style="width: 410px; min-width: 205px" class="required-label">
                        * 연락 받을  수 있는 전화 번호 또는 이메일 주소를 남겨 주세요.
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="guest-create-as-images">
                            이미지등록
                        </label>
                    </div>
                    <div class="size-textarea-m-adv">
                        <div style="border: none; padding: unset" id="guest-create-as-images"></div>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="guest-create-as-images">
                            &nbsp;
                        </label>
                    </div>
                    <div id="guest-create-as-preview"></div>
                </div>
            </form>
        </div>
    </div>
</div>
