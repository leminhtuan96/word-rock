<form style="display: none" id="equipments-edit-form" class="container-fluid mt-1" enctype="multipart/form-data">
    <input type="hidden" id="equipments-edit-id">
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-kind">
                장비분류
            </label>
        </div>
        <div class="size-input-m">
            <select id="equipments-edit-kind" class="form-select form-select-sm">
                @foreach($kinds['detail'] as $kind)
                    <option value="{{$kind->ID}}">{{$kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="equipments-edit-name">
                장비명
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-edit-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-model">
                모델명
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-edit-model">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-manu-name">
                제조사
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-edit-manu-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-manu-ym">
                제조년월
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-edit-manu-ym">
        </div>
    </div>
    <div id="edit-computer-kind">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-edit-os">
                    OS
                </label>
            </div>
            <div class="size-input-m">
                <select id="equipments-edit-os" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($os_kinds['detail'] as $os_kind)
                        <option value="{{$os_kind->ID}}">{{$os_kind->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
    <div style="display: none" id="edit-monitor-kind">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-edit-touch-method">
                    터치방식
                </label>
            </div>
            <div class="size-input-m">
                <select id="equipments-edit-touch-method" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($touch_methods['detail'] as $touch_method)
                        <option value="{{$touch_method->ID}}">{{$touch_method->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
    <div style="display: none" id="edit-other-kind">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-edit-power">
                    전원
                </label>
            </div>
            <div class="size-input-m">
                <input class="form-control form-control-sm" type="text" id="equipments-edit-power">
            </div>
        </div>
    </div>
    <div style="display: none" id="equipments-edit-interface-area">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-edit-interface">
                    인터페이스
                </label>
            </div>
            <div class="size-input-m">
                <input class="form-control form-control-sm" type="text" id="equipments-edit-interface">
            </div>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-purc-mth">
                구매방법
            </label>
        </div>
        <div class="size-input-m">
            <select id="equipments-edit-purc-mth" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($purchase_methods['detail'] as $purchase_method)
                    <option value="{{$purchase_method->ID}}">{{$purchase_method->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-purc-name">
                구매처
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-edit-purc-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-telephone">
                연락처
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-edit-telephone">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-edit-use-flag">
                사용여부
            </label>
        </div>
        <div class=" size-input-m">
            <select id="equipments-edit-use-flag" class="form-select form-select-sm">
                @foreach($use_flag['detail'] as $item)
                    <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>
