<div id="edit-as-form-area" style="overflow: auto; display: none" class="container-fluid mt-1" >
    <form id="edit-as-form" enctype="multipart/form-data">
        <input type="hidden" id="edit-as-form-id">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="edit-as-form-ask-type">
                    문의유형
                </label>
            </div>
            <div class="size-input-m">
                <select id="edit-as-form-ask-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($ask_types as $ask_type)
                        <option value="{{$ask_type->ID}}">{{$ask_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="edit-as-form-defect-type">
                    하자유형
                </label>
            </div>
            <div class="size-input-m">
                <select id="edit-as-form-defect-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($defect_types as $defect_type)
                        <option value="{{$defect_type->ID}}">{{$defect_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="edit-as-form-emergency-type">
                    레벨
                </label>
            </div>
            <div class="size-input-m">
                <select id="edit-as-form-emergency-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($emergency_types as $emergency_type)
                        <option value="{{$emergency_type->ID}}">{{$emergency_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-form-plan-date">
                    처리예정일
                </label>
            </div>
            <div class="size-input-m">
                <input class="form-control form-control-sm" type="date" id="edit-as-form-plan-date">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label" for="edit-as-form-complete-date">
                    처리완료일
                </label>
            </div>
            <div class="size-input-m">
                <input class="form-control form-control-sm" type="date" id="edit-as-form-complete-date">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label" for="edit-as-form-user-name">
                    처리담당자
                </label>
            </div>
            <div class="size-input-m" id="edit-as-form-manager"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="edit-as-form-ask-remark">
                    접수내용
                </label>
            </div>
            <div style="width: calc(750px + 1rem); min-width: calc(600px + 1rem); max-width: calc(750px + 1rem)">
                <textarea style="height: 100px" class="form-control" id="edit-as-form-ask-remark"></textarea>
            </div>
        </div>
        <div class="d-flex mt-1">
            <div class="w-75-px me-1">
                <label class="col-form-label required-label" for="">
                    &nbsp;
                </label>
            </div>
            <div style="width: calc(750px + 1rem); min-width: calc(600px + 1rem); max-width: calc(750px + 1rem)">
                <button type="button" id="edit-as-toggle">처리내용 표시</button>
            </div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-form-locker-name">
                    보관함명
                </label>
            </div>
            <div class="size-input-m">
                <input style="cursor: pointer" readonly class="form-control form-control-sm" id="edit-as-form-locker-name">
                <input type="hidden" id="edit-as-form-locker-id">
                <input type="hidden" id="edit-as-form-new-locker-id">
            </div>
            <div class="w-50-px ms-1">
                <button id="edit-as-choose-or-redirect-locker">
                    <img id="" src="{{asset('jqwidgets/styles/images/search.png')}}" />
                </button>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label" for="edit-as-form-user-phone">
                    연락처
                </label>
            </div>
            <div class="size-input-sm">
                <input placeholder="고객 연락처 직접입력" class="form-control form-control-sm" id="edit-as-form-user-phone">
            </div>
            <div class="w-50-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label no-member" for="edit-as-form-user-area1">
                    지역
                </label>
            </div>
            <div class="me-1" style="width: calc((225px - .5rem) / 2); min-width: calc((175px - .5rem) / 2); max-width: calc((225px - .5rem) / 2)">
                <select disabled class="form-select form-select-sm no-member" id="edit-as-form-user-area1">
                    <option value="">도/시</option>
                    @foreach($areas as $area)
                        <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="width: calc((225px - .5rem) / 2); min-width: calc((175px - .5rem) / 2); max-width: calc((225px - .5rem) / 2)">
                <input readonly class="form-control form-control-sm no-member" id="edit-as-form-user-area2">
            </div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-form-station-name">
                    Station 명
                </label>
            </div>
            <div style="width: calc(250px + .25rem); min-width: calc(200px + .25rem); max-width: calc(250px + .25rem)">
                <input readonly class="form-control form-control-sm" id="edit-as-form-station-name">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label" for="edit-as-form-user-email">
                    E-Mail
                </label>
            </div>
            <div class="size-input-sm">
                <input placeholder="고객 연락처 직접입력" class="form-control form-control-sm" id="edit-as-form-user-email">
            </div>
            <div class="w-50-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label no-member" for="edit-as-form-user-location">
                    소속
                </label>
            </div>
            <div style="width: calc(225px - .25rem); min-width: calc(175px - .25rem); max-width: calc(225px - .25rem)">
                <input readonly class="form-control form-control-sm no-member" id="edit-as-form-user-location">
            </div>
        </div>
    </form>
    <div class="position-relative" style="max-width: calc(825px + 1.25rem); min-width: calc(675 + 1.25rem)">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="edit-as-form-station-type">
                    구분
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <select disabled class="form-select form-select-sm" id="edit-as-form-station-type">
                    <option value="">선택</option>
                    @foreach($station_types as $station_type)
                        <option value="{{$station_type->ID}}">{{$station_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-form-station-code">
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
                <label class="col-form-label" for="edit-as-form-station-maint-type">
                    유지보수
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <select disabled class="form-select form-select-sm" id="edit-as-form-station-maint-type">
                    <option value="">선택</option>
                    @foreach($maint_types as $maint_type)
                        <option value="{{$maint_type->ID}}">{{$maint_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input type="date" readonly class="form-control form-control-sm" id="edit-as-form-station-maint-end-ymd">
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
                <label class="col-form-label" for="edit-as-form-station-repr-name">
                    대표자
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-form-station-repr-name">
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-form-station-telephone">
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
                <label class="col-form-label" for="edit-as-form-station-manager">
                    담당자
                </label>
            </div>
            <div class="me-1" style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-form-station-manager">
            </div>
            <div style="width: 125px; min-width: 100px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="edit-as-form-station-mobile">
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
        <div id="edit-as-send-url-create-as-area" class="position-absolute" style="left: calc(365px + 1rem);bottom: calc(0.375rem + 1px)">
            <b class="mb-2 d-block">직접 작성 안내</b>
            <form id="edit-as-send-url-create-as-form" enctype="multipart/form-data" class="p-2" style="border: 1px solid #ced4da; border-radius: 5px">
                <div class="d-flex">
                    <div class="w-65-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="edit-as-send-url-create-as-sms">
                            등록 연락처
                        </label>
                    </div>
                    <div class="me-1 size-input-sm">
                        <input class="form-control form-control-sm" id="edit-as-send-url-create-as-sms">
                    </div>
                    <button type="button" id="edit-as-send-sms">문자</button>
                </div>
                <div class="d-flex">
                    <div class="w-65-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="edit-as-send-url-create-as-email">
                            직접 등록
                        </label>
                    </div>
                    <div class="me-1 size-input-sm">
                        <input class="form-control form-control-sm" id="edit-as-send-url-create-as-email">
                    </div>
                    <button type="button" id="edit-as-send-email">메일</button>
                </div>
            </form>
        </div>
        <div class="position-absolute" id="edit-as-handle-as-area" style="display: none; left: calc(325px + .75rem);bottom: 0">
            <div class="d-flex">
                <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                    <label class="col-form-label" for="edit-as-form-complete-remark">
                        처리내용
                    </label>
                </div>
                <div>
                    <textarea readonly style="width: calc(275px + .25rem); height: 75px" class="form-control" id="edit-as-form-complete-remark"></textarea>
                </div>
            </div>
            <div class="d-flex mt-1">
                <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                    <label class="col-form-label" for="edit-as-form-attach-file">
                        첨부파일
                    </label>
                </div>
                <div style="width: 225px;">
                    <input readonly type="text" class="form-control form-control-sm" id="edit-as-form-attach-file-name" />
                </div>
                <div class="w-50-px ms-1">
                    <label style="width: 100%; background-color: #e9ecef" for="">
                        <div style="padding: unset" id="edit-as-form-choose-attach-file">...</div>
                    </label>
                    <input style="display: none" type="file" id="edit-as-form-attach-file" />
                </div>
            </div>
        </div>
    </div>
</div>
