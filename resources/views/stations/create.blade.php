<form id="stations-create-form" class="container-fluid mt-1" enctype="multipart/form-data">
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-create-name">
                명칭
            </label>
        </div>
        <div class="size-input-lg">
            <input class="form-control form-control-sm" type="text" id="stations-create-name">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-repr-name">
                대표
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-create-repr-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-create-group">
                그룹
            </label>
        </div>
        <div class="size-input-lg">
            <input class="form-control form-control-sm" type="text" id="stations-create-group">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-manager">
                담당자
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-create-manager">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-create-type">
                구분
            </label>
        </div>
        <div class="size-input-sm">
            <select id="stations-create-type" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($types['detail'] as $type)
                    <option value="{{$type->ID}}">{{$type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-hhld-cnt">
                세대정보
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm text-end" type="number" id="stations-create-hhld-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-telephone">
                연락처
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-create-telephone">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-create-reg-code">
                등록코드
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-create-reg-code">
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-ctrl-cnt">
                제어부 수량
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm text-end" type="number" id="stations-create-ctrl-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-mobile">
                Mobile
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-create-mobile">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-create-area1">
                지역
            </label>
        </div>
        <div class="size-input-sm">
            <select id="stations-create-area1" class="form-select form-select-sm">
                <option value="">도/시</option>
                @foreach($areas['detail'] as $area)
                    <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-locker-cnt">
                설치함수
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm text-end" type="number" id="stations-create-locker-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-create-email">
                E-Mail
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="email" id="stations-create-email">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-create-area2">
                &nbsp;
            </label>
        </div>
        <div class="size-input-sm">
            <input placeholder="시,군,구" class="form-control form-control-sm" type="text" id="stations-create-area2">
        </div>
        <div class="w-75-px me-1 ms-1">
        </div>
        <div class="size-input-sm">
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="stations-create-maint-type">
                유지보수
            </label>
        </div>
        <div class="size-input-sm">
            <select id="stations-create-maint-type" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($maint_types['detail'] as $maint_type)
                    <option value="{{$maint_type->ID}}">{{$maint_type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label " for="stations-create-detail-address">
                상세주소
            </label>
        </div>
        <div class="size-input-lg">
            <input class="form-control form-control-sm" type="text" id="stations-create-detail-address">
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="stations-create-maint-end-ymd">
                유지보수종료일
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="date" id="stations-create-maint-end-ymd">
        </div>
    </div>
</form>
