<form id="stations-detail-form" class="mt-1">
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-detail-form-station-name">
                명칭
            </label>
        </div>
        <div class="size-input-lg">
            <input readonly class="form-control form-control-sm" type="text" id="stations-detail-form-station-name">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-repr-name">
                대표
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="text"
                   id="stations-detail-form-station-repr-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-detail-form-station-group">
                그룹
            </label>
        </div>
        <div class="size-input-lg">
            <input readonly class="form-control form-control-sm" type="text" id="stations-detail-form-station-group">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-manager">
                담당자
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="text" id="stations-detail-form-station-manager">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-detail-form-station-type">
                구분
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled id="stations-detail-form-station-type" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($types['detail'] as $type)
                    <option value="{{$type->ID}}">{{$type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-hhld-cnt">
                세대정보
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm text-end" type="number"
                   id="stations-detail-form-station-hhld-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-telephone">
                연락처
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="text"
                   id="stations-detail-form-station-telephone">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-detail-form-station-reg-code">
                등록코드
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="{{$showCode ? '' : 'password'}}"
                   id="stations-detail-form-station-reg-code">
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-ctrl-cnt">
                제어부 수량
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm text-end" type="number"
                   id="stations-detail-form-station-ctrl-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-mobile">
                Mobile
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="text" id="stations-detail-form-station-mobile">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-detail-form-station-area1">
                지역
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled id="stations-detail-form-station-area1" class="form-select form-select-sm">
                <option value="">도/시</option>
                @foreach($areas['detail'] as $area)
                    <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-locker-cnt">
                설치함수
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm text-end" type="number"
                   id="stations-detail-form-station-locker-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-detail-form-station-email">
                E-Mail
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="email" id="stations-detail-form-station-email">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-detail-form-station-area2">
                &nbsp;
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly placeholder="시,군,구" class="form-control form-control-sm" type="text"
                   id="stations-detail-form-station-area2">
        </div>
        <div class="w-75-px me-1 ms-1">
        </div>
        <div class="size-input-sm">
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end ms-1 me-1">
            <label class="col-form-label" for="stations-detail-form-station-maint-type">
                유지보수
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled id="stations-detail-form-station-maint-type" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($maint_types['detail'] as $maint_type)
                    <option value="{{$maint_type->ID}}">{{$maint_type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label " for="stations-detail-form-station-detail-address">
                상세주소
            </label>
        </div>
        <div class="size-input-lg">
            <input readonly class="form-control form-control-sm" type="text"
                   id="stations-detail-form-station-detail-address">
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end ms-1 me-1">
            <label class="col-form-label" for="stations-detail-form-station-maint-end-ymd">
                유지보수종료일
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="date" id="stations-detail-form-station-maint-end-ymd">
        </div>
    </div>
</form>
