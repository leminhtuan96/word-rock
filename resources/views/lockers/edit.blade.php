<div id="lockers-edit-choose-station-window">
    <div>
        <img width="14" height="14" src="../../images/help.png" alt=""/>
        <span id="lockers-edit-choose-station-window-title">Station 선택</span>
    </div>
    <div>
        <div id="lockers-edit-choose-station-window-content"></div>
        <div>
            <div style="float: right; margin-top: 15px;">
                <button type="button" id="lockers-edit-choose-station-window-ok" style="margin-right: 10px">
                    <img width="18px" src="{{asset('icons/check.png')}}">
                    저장
                </button>
                <button type="button" id="lockers-edit-choose-station-window-cancel">
                    <img width="18px" src="{{asset('icons/close.png')}}">
                    취소
                </button>
            </div>
        </div>
    </div>
</div>
<form style="display: none" id="lockers-edit-form" class="container-fluid mt-1" enctype="multipart/form-data">
    <input type="hidden" id="lockers-edit-id">
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="lockers-edit-name">
                명칭
            </label>
        </div>
        <div class="size-input-very-big">
            <input class="form-control form-control-sm" type="text" id="lockers-edit-name">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label required-label" for="lockers-edit-unit-code">
                UNIT CODE
            </label>
        </div>
        <div class="size-input-sm">
            <input placeholder="E.g: xxxx-xxxx-xxxx" class="form-control form-control-sm" type="text" id="lockers-edit-unit-code">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="lockers-edit-station-name">
                Station 명
            </label>
        </div>
        <div class="size-input-very-big position-relative">
            <input style="cursor: pointer;background-color: #83D5F6" class="form-control form-control-sm pe-4" type="text" id="lockers-edit-station-name" readonly>
            <img style="top:.4rem;right: .25rem;cursor: pointer" id="lockers-edit-choose-station" class="position-absolute" src="{{asset('jqwidgets/styles/images/search.png')}}" />
            <input type="hidden" id="lockers-edit-station-id" >
            <input type="hidden" id="lockers-edit-station-code" >
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="lockers-edit-radial-no">
                래디알 NO
            </label>
        </div>
        <div class="size-input-sm">
            <input class="form-control form-control-sm" type="text" id="lockers-edit-radial-no">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-edit-kind">
                종류
            </label>
        </div>
        <div class="size-input-m">
            <select id="lockers-edit-kind" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($kinds['detail'] as $kind)
                    <option value="{{$kind->ID}}">{{$kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1"></div>
        <div class="size-input-sm"></div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-mcu-kind">
                MCU
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-mcu-kind">
                <option value="">선택</option>
                @foreach($mcu_kinds['detail'] as $mcu_kind)
                    <option value="{{$mcu_kind->ID}}">{{$mcu_kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-edit-ctrl-box-type">
                형태
            </label>
        </div>
        <div class="size-input-m">
            <select class="form-select form-select-sm" id="lockers-edit-ctrl-box-type">
                <option value="">선택</option>
                @foreach($ctrl_box_types['detail'] as $ctrl_box_type)
                    <option value="{{$ctrl_box_type->ID}}">{{$ctrl_box_type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1"></div>
        <div class="size-input-sm"></div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-sub-mcu-yn">
                보조 MCU
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-sub-mcu-yn">
                @foreach($sub_mcu_yn['detail'] as $sub_mcu)
                    <option value="{{$sub_mcu->ID}}">{{$sub_mcu->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-edit-computer-type">
                컴퓨터
            </label>
        </div>
        <div class="size-input-very-very-sm">
            <select class="form-select form-select-sm" id="lockers-edit-computer-type">
                <option value="">선택</option>
                @foreach($comptr_types['detail'] as $comptr_type)
                    <option value="{{$comptr_type->ID}}">{{$comptr_type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-25-adv-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-os">
                OS
            </label>
        </div>
        <div class="size-input-very-sm">
            <select class="form-select form-select-sm" id="lockers-edit-os">
                <option value="">선택</option>
                @foreach($os_kinds['detail'] as $os_kind)
                    <option value="{{$os_kind->ID}}">{{$os_kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
            <label class="col-form-label" for="lockers-edit-rfid-reader">
                RFID 리더기
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-rfid-reader">
                <option value="">없음</option>
                @foreach($rfid_readers as $rfid_reader)
                    <option value="{{$rfid_reader->ID}}">{{$rfid_reader->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-webcam">
                웹캠
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-webcam">
                <option value="">없음</option>
                @foreach($webcams as $webcam)
                    <option value="{{$webcam->ID}}">{{$webcam->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-edit-monitor-size">
                모니터
            </label>
        </div>
        <div class="size-input-m">
            <select class="form-select form-select-sm" id="lockers-edit-monitor-size">
                <option value="">선택</option>
                @foreach($monitor_sizes['detail'] as $monitor_size)
                    <option value="{{$monitor_size->ID}}">{{$monitor_size->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-printer">
                영수증프린터
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-printer">
                <option value="">없음</option>
                @foreach($printers as $printer)
                    <option value="{{$printer->ID}}">{{$printer->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-card-terminal">
                신용카드결제기
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-card-terminal">
                <option value="">없음</option>
                @foreach($card_terminals as $card_terminal)
                    <option value="{{$card_terminal->ID}}">{{$card_terminal->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-edit-locker-cnt">
                설치함수
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm text-end" type="number" id="lockers-edit-locker-cnt">
        </div>
        <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-banknote-inserter">
                지폐투입기
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-banknote-inserter">
                <option value="">없음</option>
                @foreach($banknote_inserters as $banknote_inserter)
                    <option value="{{$banknote_inserter->ID}}">{{$banknote_inserter->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-banknote-dispenser">
                지폐방출기
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-banknote-dispenser">
                <option value="">없음</option>
                @foreach($banknote_dispensers as $banknote_dispenser)
                    <option value="{{$banknote_dispenser->ID}}">{{$banknote_dispenser->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-edit-lock-kind">
                락장치
            </label>
        </div>
        <div class="size-input-m">
            <select class="form-select form-select-sm" id="lockers-edit-lock-kind">
                <option value="">선택</option>
                @foreach($lock_kinds['detail'] as $lock_kind)
                    <option value="{{$lock_kind->ID}}">{{$lock_kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-coin-inserter">
                동전투입기
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-coin-inserter">
                <option value="">없음</option>
                @foreach($coin_inserters as $coin_inserter)
                    <option value="{{$coin_inserter->ID}}">{{$coin_inserter->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-edit-coin-dispenser">
                동전방출기
            </label>
        </div>
        <div class="size-input-sm">
            <select class="form-select form-select-sm" id="lockers-edit-coin-dispenser">
                <option value="">없음</option>
                @foreach($coin_dispensers as $coin_dispenser)
                    <option value="{{$coin_dispenser->ID}}">{{$coin_dispenser->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>
