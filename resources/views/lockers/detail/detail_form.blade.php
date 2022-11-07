<form id="lockers-detail-form" class="container-fluid mt-1" enctype="multipart/form-data">
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-name">
                명칭
            </label>
        </div>
        <div class="size-input-very-big">
            <input readonly class="form-control form-control-sm" type="text" id="lockers-detail-form-name">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="lockers-detail-form-unit-code">
                UNIT CODE
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="text" id="lockers-detail-form-unit-code">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-station-name">
                Station 명
            </label>
        </div>
        <div class="size-input-very-big">
            <input title="Station 상세내역 이동" style="cursor: pointer" class="form-control form-control-sm" type="text" id="lockers-detail-form-station-name" readonly>
            <input type="hidden" id="lockers-detail-form-station-id">
        </div>
        <div class="w-85-px me-1 ms-1 d-flex align-items-center justify-content-end">
            <label class="col-form-label" for="lockers-detail-form-radial-no">
                래디알 NO
            </label>
        </div>
        <div class="size-input-sm">
            <input readonly class="form-control form-control-sm" type="text" id="lockers-detail-form-radial-no">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-kind">
                종류
            </label>
        </div>
        <div class="size-input-m">
            <select disabled id="lockers-detail-form-kind" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($kinds['detail'] as $kind)
                    <option value="{{$kind->ID}}">{{$kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1"></div>
        <div class="size-input-sm"></div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-mcu-kind">
                MCU
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-mcu-kind">
                <option value="">선택</option>
                @foreach($mcu_kinds['detail'] as $mcu_kind)
                    <option value="{{$mcu_kind->ID}}">{{$mcu_kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-ctrl-box-type">
                형태
            </label>
        </div>
        <div class="size-input-m">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-ctrl-box-type">
                <option value="">선택</option>
                @foreach($ctrl_box_types['detail'] as $ctrl_box_type)
                    <option value="{{$ctrl_box_type->ID}}">{{$ctrl_box_type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1"></div>
        <div class="size-input-sm"></div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-sub-mcu-yn">
                보조 MCU
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-sub-mcu-yn">
                @foreach($sub_mcu_yn['detail'] as $sub_mcu)
                    <option value="{{$sub_mcu->ID}}">{{$sub_mcu->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-computer-type">
                컴퓨터
            </label>
        </div>
        <div class="size-input-very-very-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-computer-type">
                <option value="">선택</option>
                @foreach($comptr_types['detail'] as $comptr_type)
                    <option value="{{$comptr_type->ID}}">{{$comptr_type->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-25-adv-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-os">
                OS
            </label>
        </div>
        <div class="size-input-very-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-os">
                <option value="">선택</option>
                @foreach($os_kinds['detail'] as $os_kind)
                    <option value="{{$os_kind->ID}}">{{$os_kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px d-flex align-items-center justify-content-end ms-1 me-1">
            <label class="col-form-label" for="lockers-detail-form-rfid-reader">
                RFID 리더기
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-rfid-reader">
                <option value="">없음</option>
                @foreach($rfid_readers as $rfid_reader)
                    <option value="{{$rfid_reader->ID}}">{{$rfid_reader->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-webcam">
                웹캠
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-webcam">
                <option value="">없음</option>
                @foreach($webcams as $webcam)
                    <option value="{{$webcam->ID}}">{{$webcam->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-monitor-size">
                모니터
            </label>
        </div>
        <div class="size-input-m">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-monitor-size">
                <option value="">선택</option>
                @foreach($monitor_sizes['detail'] as $monitor_size)
                    <option value="{{$monitor_size->ID}}">{{$monitor_size->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-printer">
                영수증프린터
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-printer">
                <option value="">없음</option>
                @foreach($printers as $printer)
                    <option value="{{$printer->ID}}">{{$printer->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-card-terminal">
                신용카드결제기
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-card-terminal">
                <option value="">없음</option>
                @foreach($card_terminals as $card_terminal)
                    <option value="{{$card_terminal->ID}}">{{$card_terminal->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-locker-cnt">
                설치함수
            </label>
        </div>
        <div class="size-input-m">
            <input readonly class="form-control form-control-sm text-end" type="number" id="lockers-detail-form-locker-cnt">
        </div>
        <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-banknote-inserter">
                지폐투입기
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-banknote-inserter">
                <option value="">없음</option>
                @foreach($banknote_inserters as $banknote_inserter)
                    <option value="{{$banknote_inserter->ID}}">{{$banknote_inserter->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-banknote-dispenser">
                지폐방출기
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-banknote-dispenser">
                <option value="">없음</option>
                @foreach($banknote_dispensers as $banknote_dispenser)
                    <option value="{{$banknote_dispenser->ID}}">{{$banknote_dispenser->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="lockers-detail-form-lock-kind">
                락장치
            </label>
        </div>
        <div class="size-input-m">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-lock-kind">
                <option value="">선택</option>
                @foreach($lock_kinds['detail'] as $lock_kind)
                    <option value="{{$lock_kind->ID}}">{{$lock_kind->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-75-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-coin-inserter">
                동전투입기
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-coin-inserter">
                <option value="">없음</option>
                @foreach($coin_inserters as $coin_inserter)
                    <option value="{{$coin_inserter->ID}}">{{$coin_inserter->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-85-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="lockers-detail-form-coin-dispenser">
                동전방출기
            </label>
        </div>
        <div class="size-input-sm">
            <select disabled class="form-select form-select-sm" id="lockers-detail-form-coin-dispenser">
                <option value="">없음</option>
                @foreach($coin_dispensers as $coin_dispenser)
                    <option value="{{$coin_dispenser->ID}}">{{$coin_dispenser->EQUIP_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>
