<div id="handle-as-form-area" style="overflow: auto; display: none" class="container-fluid mt-1" >
    <form id="handle-as-form" enctype="multipart/form-data">
        <input type="hidden" id="handle-as-form-id">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-ask-type">
                    문의유형
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)">
                <select disabled id="handle-as-form-ask-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($ask_types as $ask_type)
                        <option value="{{$ask_type->ID}}">{{$ask_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="handle-as-form-defect-type">
                    하자유형
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)">
                <select id="handle-as-form-defect-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($defect_types as $defect_type)
                        <option value="{{$defect_type->ID}}">{{$defect_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="handle-as-form-emergency-type">
                    레벨
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)">
                <select id="handle-as-form-emergency-type" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($emergency_types as $emergency_type)
                        <option value="{{$emergency_type->ID}}">{{$emergency_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="handle-as-form-prog-status">
                    진행상태
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)">
                <select id="handle-as-form-prog-status" class="form-select form-select-sm">
                    @foreach($prog_status as $status)
                        <option value="{{$status->ID}}" {{$status->ID == config('constants.DETAIL_CODES.PROG_STATUS.COMPLETE') ? 'selected' : ''}}>{{$status->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-plan-date">
                    처리예정일
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)">
                <input class="form-control form-control-sm" type="date" id="handle-as-form-plan-date">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label required-label" for="handle-as-form-complete-date">
                    처리완료일
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)">
                <input value="{{date('Y-m-d')}}" class="form-control form-control-sm" type="date" id="handle-as-form-complete-date">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label" for="handle-as-form-blling-date">
                    청구일
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)">
                <input class="form-control form-control-sm" type="date" id="handle-as-form-blling-date">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
                <label class="col-form-label" for="handle-as-form-user-name">
                    처리담당자
                </label>
            </div>
            <div style="min-width: calc((525px - .5rem) / 4); max-width: calc((525px - .5rem) / 4)" id="handle-as-form-manager"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="handle-as-form-ask-remark">
                    접수내용
                </label>
            </div>
            <div style="min-width: calc(752px + 1rem); max-width: calc(752px + 1rem)">
                <textarea style="height: 100px" class="form-control" id="handle-as-form-ask-remark"></textarea>
            </div>
        </div>
        <div class="d-flex mt-1">
            <div class="w-75-px me-1">
                <label class="col-form-label" for="">
                    &nbsp;
                </label>
            </div>
            <div style="min-width: calc(752px + 1rem); max-width: calc(752px + 1rem)">
                <button type="button" id="handle-as-toggle">&nbsp;</button>
            </div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-locker-name">
                    보관함명
                </label>
            </div>
            <div style="min-width: 200px; max-width: 200px">
                <input title="사물함 세부 정보로 이동" style="cursor: pointer" readonly class="form-control form-control-sm" id="handle-as-form-locker-name">
                <input type="hidden" id="handle-as-form-locker-id">
                <input type="hidden" id="handle-as-form-new-locker-id">
            </div>
            <div class="w-50-px ms-1">
                <button id="handle-as-choose-or-redirect-locker">
                    <img id="" src="{{asset('jqwidgets/styles/images/search.png')}}" />
                </button>
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label" for="handle-as-form-user-phone">
                    연락처
                </label>
            </div>
            <div style="min-width: 150px; max-width: 150px">
                <input readonly placeholder="고객 연락처 직접입력" class="form-control form-control-sm" id="handle-as-form-user-phone">
            </div>
            <div class="w-50-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label handle-as-no-member" for="handle-as-form-user-area1">
                    지역
                </label>
            </div>
            <div class="me-1" style="min-width: calc((225px - .5rem) / 2); max-width: calc((225px - .5rem) / 2)">
                <select disabled class="form-select form-select-sm handle-as-no-member" id="handle-as-form-user-area1">
                    <option value="">도/시</option>
                    @foreach($areas as $area)
                        <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="min-width: calc((229px - .5rem) / 2); max-width: calc((229px - .5rem) / 2)">
                <input readonly class="form-control form-control-sm handle-as-no-member" id="handle-as-form-user-area2">
            </div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-station-name">
                    Station 명
                </label>
            </div>
            <div style="min-width: calc(250px + .25rem); max-width: calc(250px + .25rem)">
                <input readonly class="form-control form-control-sm" id="handle-as-form-station-name">
            </div>
            <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label" for="handle-as-form-user-email">
                    E-Mail
                </label>
            </div>
            <div style="min-width: 150px; max-width: 150px">
                <input readonly placeholder="고객 연락처 직접입력" class="form-control form-control-sm" id="handle-as-form-user-email">
            </div>
            <div class="w-50-px d-flex align-items-center justify-content-end ms-1 me-1">
                <label class="col-form-label handle-as-no-member" for="handle-as-form-user-location">
                    소속
                </label>
            </div>
            <div style="min-width: calc(227px - .25rem); max-width: calc(227px - .25rem)">
                <input readonly class="form-control form-control-sm handle-as-no-member" id="handle-as-form-user-location">
            </div>
        </div>
    </form>
    <div class="position-relative" style="max-width: calc(827px + 1.25rem); min-width: calc(827px + 1.25rem)">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-station-type">
                    구분
                </label>
            </div>
            <div class="me-1" style="min-width: 125px; max-width: 125px">
                <select disabled class="form-select form-select-sm" id="handle-as-form-station-type">
                    <option value="">선택</option>
                    @foreach($station_types as $station_type)
                        <option value="{{$station_type->ID}}">{{$station_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="min-width: 125px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="handle-as-form-station-code">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="min-width: 150px; max-width: 150px"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="min-width: calc(225px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-station-maint-type">
                    유지보수
                </label>
            </div>
            <div class="me-1" style="min-width: 125px; max-width: 125px">
                <select disabled class="form-select form-select-sm" id="handle-as-form-station-maint-type">
                    <option value="">선택</option>
                    @foreach($maint_types as $maint_type)
                        <option value="{{$maint_type->ID}}">{{$maint_type->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
            <div style="min-width: 125px; max-width: 125px">
                <input type="date" readonly class="form-control form-control-sm" id="handle-as-form-station-maint-end-ymd">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="width: 150px; min-width: 150px; max-width: 150px"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="min-width: calc(225px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-station-repr-name">
                    대표자
                </label>
            </div>
            <div class="me-1" style="min-width: 125px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="handle-as-form-station-repr-name">
            </div>
            <div style="min-width: 125px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="handle-as-form-station-telephone">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="min-width: 150px; max-width: 150px"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="min-width: calc(225px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="handle-as-form-station-manager">
                    담당자
                </label>
            </div>
            <div class="me-1" style="min-width: 125px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="handle-as-form-station-manager">
            </div>
            <div style="min-width: 125px; max-width: 125px">
                <input readonly class="form-control form-control-sm" id="handle-as-form-station-mobile">
            </div>
            <div class="w-75-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="min-width: 150px; max-width: 150px"></div>
            <div class="w-50-px ms-1 me-1">
                &nbsp;
            </div>
            <div style="min-width: calc(225px - .25rem); max-width: calc(225px - .25rem)"></div>
        </div>
        <div class="position-absolute" id="handle-as-handle-as-area" style="left: calc(325px + .75rem);bottom: 0">
            <div class="d-flex">
                <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                    <label class="col-form-label required-label" for="handle-as-form-complete-remark">
                        처리내용
                    </label>
                </div>
                <div>
                    <textarea style="width: calc(427px + .25rem); height: 75px" class="form-control" id="handle-as-form-complete-remark"></textarea>
                </div>
            </div>
            <div class="d-flex mt-1">
                <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                    <label class="col-form-label" for="handle-as-form-attach-file">
                        첨부파일
                    </label>
                </div>
                <div style="width: 377px;">
                    <input readonly type="text" class="form-control form-control-sm" id="handle-as-form-attach-file-name" />
                </div>
                <div class="w-50-px ms-1">
                    <label style="width: 100%;" for="handle-as-form-attach-file">
                        <div style="padding: unset" id="handle-as-form-choose-attach-file">...</div>
                    </label>
                    <input style="display: none" type="file" id="handle-as-form-attach-file" />
                </div>
            </div>
        </div>
    </div>
</div>
<div class="p-1" id="handle-as-not-data">
    No data to display. Please select locker and AS
</div>
