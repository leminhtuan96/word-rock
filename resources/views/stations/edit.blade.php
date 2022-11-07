<form style="display: none" id="stations-edit-form" class="container-fluid mt-1" enctype="multipart/form-data">
    <input type="hidden" id="stations-edit-id">
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-edit-name">
                명칭
            </label>
        </div>
        <div class="size-input-lg">
            <input class="form-control form-control-sm" type="text" id="stations-edit-name">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-repr-name">
                대표
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-edit-repr-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-edit-group">
                그룹
            </label>
        </div>
        <div class="size-input-lg">
            <input class="form-control form-control-sm" type="text" id="stations-edit-group">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-manager">
                담당자
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-edit-manager">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-edit-type">
                구분
            </label>
        </div>
        <div class="size-input-sm">
            <select id="stations-edit-type" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($types['detail'] as $type)
                    <option value="{{$type->ID}}">{{$type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-hhld-cnt">
                세대정보
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm text-end" type="number" id="stations-edit-hhld-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-telephone">
                연락처
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-edit-telephone">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-edit-reg-code">
                등록코드
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-edit-reg-code">
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-ctrl-cnt">
                제어부 수량
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm text-end" type="number" id="stations-edit-ctrl-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-mobile">
                Mobile
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="stations-edit-mobile">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="stations-edit-area1">
                지역
            </label>
        </div>
        <div class="size-input-sm">
            <select id="stations-edit-area1" class="form-select form-select-sm">
                <option value="">도/시</option>
                @foreach($areas['detail'] as $area)
                    <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-locker-cnt">
                설치함수
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm text-end" type="number" id="stations-edit-locker-cnt">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="stations-edit-email">
                E-Mail
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="email" id="stations-edit-email">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="stations-edit-area2">
                &nbsp;
            </label>
        </div>
        <div class="size-input-sm">
            <input placeholder="시,군,구" class="form-control form-control-sm" type="text" id="stations-edit-area2">
        </div>
        <div class="w-75-px me-1 ms-1">
        </div>
        <div class="size-input-sm">
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end ms-1 me-1">
            <label class="col-form-label" for="stations-edit-maint-type">
                유지보수
            </label>
        </div>
        <div class="size-input-sm">
            <select id="stations-edit-maint-type" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($maint_types['detail'] as $maint_type)
                    <option value="{{$maint_type->ID}}">{{$maint_type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label " for="stations-edit-detail-address">
                상세주소
            </label>
        </div>
        <div class="size-input-lg">
            <input class="form-control form-control-sm" type="text" id="stations-edit-detail-address">
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end ms-1 me-1">
            <label class="col-form-label" for="stations-edit-maint-end-ymd">
                유지보수종료일
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="date" id="stations-edit-maint-end-ymd">
        </div>
    </div>
</form>
