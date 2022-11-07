<div id="edit-as-create-as-form-area" style="overflow: auto" class="container-fluid mt-1" >
    <form id="edit-as-create-as-form" enctype="multipart/form-data">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="edit-as-create-as-form-ask-type">
                    문의유형
                </label>
            </div>
            <div class="size-input-m">
                <select id="edit-as-create-as-form-ask-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($ask_types as $ask_type)
                        <option value="{{$ask_type->ID}}">{{$ask_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="edit-as-create-as-form-defect-type">
                    하자유형
                </label>
            </div>
            <div class="size-input-m">
                <select id="edit-as-create-as-form-defect-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($defect_types as $defect_type)
                        <option value="{{$defect_type->ID}}">{{$defect_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="edit-as-create-as-form-emergency-type">
                    레벨
                </label>
            </div>
            <div class="size-input-m">
                <select id="edit-as-create-as-form-emergency-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($emergency_types as $emergency_type)
                        <option value="{{$emergency_type->ID}}">{{$emergency_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
{{--        <div class="d-flex">--}}
{{--            <div class="w-75-px d-flex align-items-center justify-content-end me-1">--}}
{{--                <label class="col-form-label" for="edit-as-create-as-form-plan-date">--}}
{{--                    처리예정일--}}
{{--                </label>--}}
{{--            </div>--}}
{{--            <div class="size-input-m">--}}
{{--                <input class="form-control form-control-sm" type="date" id="edit-as-create-as-form-plan-date">--}}
{{--            </div>--}}
{{--            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">--}}
{{--                <label class="col-form-label" for="edit-as-create-as-form-complete-date">--}}
{{--                    처리완료일--}}
{{--                </label>--}}
{{--            </div>--}}
{{--            <div class="size-input-m">--}}
{{--                <input class="form-control form-control-sm" type="date" id="edit-as-create-as-form-complete-date">--}}
{{--            </div>--}}
{{--            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">--}}
{{--                <label class="col-form-label" for="edit-as-create-as-form-manager">--}}
{{--                    처리담당자--}}
{{--                </label>--}}
{{--            </div>--}}
{{--            <div class="size-input-m" id="edit-as-create-as-form-manager"></div>--}}
{{--        </div>--}}
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="edit-as-create-as-form-ask-remark">
                    접수내용
                </label>
            </div>
            <div style="width: calc(750px + 1rem); min-width: calc(600px + 1rem); max-width: calc(750px + 1rem)">
                <textarea style="height: 100px" class="form-control" id="edit-as-create-as-form-ask-remark"></textarea>
            </div>
        </div>
        <div class="d-flex mt-1">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="edit-as-create-as-form-locker-name">
                    보관함명
                </label>
            </div>
            <div class="size-input-m">
                <input style="cursor: pointer" readonly class="form-control form-control-sm" id="edit-as-create-as-form-locker-name">
                <input type="hidden" id="edit-as-create-as-form-locker-id">
            </div>
            <div class="w-50-px ms-1">
                <button id="edit-as-create-as-redirect-locker">
                    <img id="" src="{{asset('jqwidgets/styles/images/search.png')}}" />
                </button>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label" for="edit-as-create-as-form-user-phone">
                    연락처
                </label>
            </div>
            <div class="size-input-sm">
                <input placeholder="고객 연락처 직접입력" class="form-control form-control-sm" id="edit-as-create-as-form-user-phone">
            </div>
            <div class="w-50-px d-flex align-items-center justify-content-end ms-1 me-1">
            </div>
            <div class="me-1" style="width: calc((225px - .5rem) / 2); min-width: calc((175px - .5rem) / 2); max-width: calc((225px - .5rem) / 2)">
            </div>
            <div style="width: calc((225px - .5rem) / 2); min-width: calc((175px - .5rem) / 2); max-width: calc((225px - .5rem) / 2)">
            </div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-create-as-form-station-name">
                    Station 명
                </label>
            </div>
            <div style="width: calc(250px + .25rem); min-width: calc(200px + .25rem); max-width: calc(250px + .25rem)">
                <input readonly class="form-control form-control-sm" id="edit-as-create-as-form-station-name">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label" for="edit-as-create-as-form-user-email">
                    E-Mail
                </label>
            </div>
            <div class="size-input-sm">
                <input placeholder="고객 연락처 직접입력" class="form-control form-control-sm" id="edit-as-create-as-form-user-email">
            </div>
            <div class="w-50-px d-flex align-items-center justify-content-end ms-1 me-1">
            </div>
            <div style="width: calc(225px - .25rem); min-width: calc(175px - .25rem); max-width: calc(225px - .25rem)">
            </div>
        </div>
    </form>
    <div class="position-relative" style="max-width: calc(825px + 1.25rem); min-width: calc(675 + 1.25rem)">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-create-as-form-station-type">
                    구분
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <select disabled class="form-select form-select-sm" id="edit-as-create-as-form-station-type">
                    <option value="">선택</option>
                    @foreach($station_types as $station_type)
                        <option value="{{$station_type->ID}}">{{$station_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-create-as-form-station-code">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div class="size-input-sm"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="width: calc(225px - .25rem); min-width: calc(175px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-create-as-form-station-maint-type">
                    유지보수
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <select disabled class="form-select form-select-sm" id="edit-as-create-as-form-station-maint-type">
                    <option value="">선택</option>
                    @foreach($maint_types as $maint_type)
                        <option value="{{$maint_type->ID}}">{{$maint_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input type="date" readonly class="form-control form-control-sm" id="edit-as-create-as-form-station-maint-end-ymd">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div class="size-input-sm"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="width: calc(225px - .25rem); min-width: calc(175px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-create-as-form-station-repr-name">
                    대표자
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-create-as-form-station-repr-name">
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-create-as-form-station-telephone">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div class="size-input-sm"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="width: calc(225px - .25rem); min-width: calc(175px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-create-as-form-station-manager">
                    담당자
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-create-as-form-station-manager">
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-create-as-form-station-mobile">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div class="size-input-sm"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="width: calc(225px - .25rem); min-width: calc(175px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div id="edit-as-create-as-send-url-create-as-area" class="position-absolute" style="left: calc(365px + 1rem);bottom: calc(0.375rem + 1px)">
            <b class="mb-2 d-block">직접 작성 안내</b>
            <form id="edit-as-create-as-send-url-create-as-form" enctype="multipart/form-data" class="p-2" style="border: 1px solid #ced4da; border-radius: 5px">
                <div class="d-flex">
                    <div class="w-65-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="edit-as-create-as-send-url-create-as-sms">
                            등록 연락처
                        </label>
                    </div>
                    <div class="me-1 size-input-sm">
                        <input class="form-control form-control-sm" id="edit-as-create-as-send-url-create-as-sms">
                    </div>
                    <button type="button" id="edit-as-create-as-send-sms">문자</button>
                </div>
                <div class="d-flex">
                    <div class="w-65-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="edit-as-create-as-send-url-create-as-email">
                            직접 등록
                        </label>
                    </div>
                    <div class="me-1 size-input-sm">
                        <input class="form-control form-control-sm" id="edit-as-create-as-send-url-create-as-email">
                    </div>
                    <button type="button" id="edit-as-create-as-send-email">메일</button>
                </div>
            </form>
        </div>
    </div>
</div>
