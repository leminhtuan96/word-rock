<form id="equipments-create-form" class="container-fluid mt-1" enctype="multipart/form-data">
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-kind">
                장비분류
            </label>
        </div>
        <div class="size-input-m">
            <select id="equipments-create-kind" class="form-select form-select-sm">
                @foreach($kinds['detail'] as $kind)
                    <option value="{{$kind->ID}}">{{$kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="equipments-create-name">
                장비명
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-create-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-model">
                모델명
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-create-model">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-manu-name">
                제조사
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-create-manu-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-manu-ym">
                제조년월
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-create-manu-ym">
        </div>
    </div>
    <div id="create-computer-kind">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-create-os">
                    OS
                </label>
            </div>
            <div class="size-input-m">
                <select id="equipments-create-os" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($os_kinds['detail'] as $os_kind)
                        <option value="{{$os_kind->ID}}">{{$os_kind->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
    <div style="display: none" id="create-monitor-kind">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-create-touch-method">
                    터치방식
                </label>
            </div>
            <div class="size-input-m">
                <select id="equipments-create-touch-method" class="form-select form-select-sm">
                    <option value="">선택</option>
                    @foreach($touch_methods['detail'] as $touch_method)
                        <option value="{{$touch_method->ID}}">{{$touch_method->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
    </div>
    <div style="display: none" id="create-other-kind">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-create-power">
                    전원
                </label>
            </div>
            <div class="size-input-m">
                <input class="form-control form-control-sm" type="text" id="equipments-create-power">
            </div>
        </div>
    </div>
    <div style="display: none" id="equipments-create-interface-area">
        <div class="d-flex">
            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="equipments-create-interface">
                    인터페이스
                </label>
            </div>
            <div class="size-input-m">
                <input class="form-control form-control-sm" type="text" id="equipments-create-interface">
            </div>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-purc-mth">
                구매방법
            </label>
        </div>
        <div class="size-input-m">
            <select id="equipments-create-purc-mth" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($purchase_methods['detail'] as $purchase_method)
                    <option value="{{$purchase_method->ID}}">{{$purchase_method->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-purc-name">
                구매처
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-create-purc-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-telephone">
                연락처
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" id="equipments-create-telephone">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="equipments-create-use-flag">
                사용여부
            </label>
        </div>
        <div class=" size-input-m">
            <select id="equipments-create-use-flag" class="form-select form-select-sm">
                @foreach($use_flag['detail'] as $item)
                    <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>
