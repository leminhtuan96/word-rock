<style>
    .jqx-file-upload-file-upload,
    .jqx-file-upload-buttons-container button {
        display: none;
    }
</style>
<div id="create-as-loader">
</div>
<div class="page-area" id="create-as">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='create-as-reset'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button class="me-1" type="button" id='create-as-save'>
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
            <form id="create-as-form" class="container-fluid mt-1" enctype="multipart/form-data">
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="create-as-ask-type">
                            문의유형
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <select id="create-as-ask-type" class="form-select form-select-sm">
                            <option value="">선택</option>
                            @foreach($ask_types['detail'] as $ask_type)
                                <option value="{{$ask_type->ID}}">{{$ask_type->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="create-as-defect-type">
                            하자유형
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <select id="create-as-defect-type" class="form-select form-select-sm">
                            <option value="">선택</option>
                            @foreach($defect_types['detail'] as $defect_type)
                                <option value="{{$defect_type->ID}}">{{$defect_type->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="create-as-ask-remark">
                            문의내용
                        </label>
                    </div>
                    <div style="max-height: calc(425px + .75rem); min-width: calc(325px + .75rem); width: calc(425px + .75rem)">
                        <textarea style="height: 100px" class="form-control form-control-sm" id="create-as-ask-remark"></textarea>
                    </div>
                </div>
                <div class="d-flex mt-1">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="create-as-station-area1">
                            지역
                        </label>
                    </div>
                    <div class="size-input-very-sm">
                        <select id="create-as-station-area1" class="form-select form-select-sm" disabled>
                            <option value="">도/시</option>
                            @foreach($areas['detail'] as $area)
                                <option value="{{$area->ID}}" {{auth()->user()->station ? ((auth()->user()->station->AREA1_DIV == $area->ID ) ? 'selected' : '') : ''}}>{{$area->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="size-input-very-sm ms-1">
                        <input value="{{auth()->user()->station ? auth()->user()->station->AREA2_NM : ''}}" readonly class="form-control form-control-sm" type="text" id="create-as-station-area2">
                    </div>
                    <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                        <label class="col-form-label required-label" for="create-as-telephone">
                            연락처
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <input value="{{auth()->user() ? auth()->user()->TEL_NO : ''}}" class="form-control form-control-sm" type="text" id="create-as-telephone">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="create-as-station-name">
                            Station 명
                        </label>
                    </div>
                    <div class="size-input-m-adv">
                        <input value="{{auth()->user()->station ? auth()->user()->station->STATION_NAME : ''}}" readonly class="form-control form-control-sm" type="text" id="create-as-station-name">
                    </div>
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                        <label class="col-form-label" for="create-as-email">
                            E-Mail
                        </label>
                    </div>
                    <div class="size-input-sm">
                        <input value="{{auth()->user() ? auth()->user()->EMAIL : ''}}" readonly class="form-control form-control-sm" type="text" id="create-as-email">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="create-as-locker-id">
                            보관함명
                        </label>
                    </div>
                    <div class="size-input-m-adv">
                        <select id="create-as-locker-id" class="form-select form-select-sm">
                            <option value="">선택</option>
                            @foreach($lockers as $locker)
                                <option value="{{$locker->ID}}">{{$locker->LOCKER_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="w-75-px me-1 ms-1"></div>
                    <div style="width: 410px; min-width: 205px" class="required-label">
                        * 다른 전화번호로 연락받길 원하시면 연락처 변경해서 입력하시면 됩니다.
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="create-as-images">
                            이미지등록
                        </label>
                    </div>
                    <div class="size-textarea-m-adv">
                        <div style="border: none; padding: unset" id="create-as-images"></div>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="create-as-images">
                            &nbsp;
                        </label>
                    </div>
                    <div id="create-as-preview"></div>
                </div>
            </form>
        </div>
    </div>
</div>
