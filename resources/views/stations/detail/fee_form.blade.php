<div id="stations-fee-form-calculate-fee-window-area">
    <div id="stations-fee-form-calculate-fee-window">
        <div>
            <img width="14" height="14" src="../../images/help.png" alt=""/>
            <span id="stations-fee-form-calculate-fee-window-title">중도  환불금 계산</span>
        </div>
        <div>
            <div id="stations-fee-form-calculate-fee-window-content">
                <form id="stations-fee-form-calculate-fee-window-content-calculate">
                    <div class="d-flex">
                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="stations-fee-form-start-of-use">
                                사용 시작일
                            </label>
                        </div>
                        <div class="size-input-sm">
                            <input class="form-control form-control-sm" type="date" id="stations-fee-form-start-of-use">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="stations-fee-form-end-of-use">
                                사용 종료일
                            </label>
                        </div>
                        <div class="size-input-sm">
                            <input class="form-control form-control-sm" type="date" id="stations-fee-form-end-of-use">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label required-label" for="stations-fee-form-early-termination-date">
                                중도 해지 일
                            </label>
                        </div>
                        <div class="size-input-sm">
                            <input class="form-control form-control-sm" type="date" id="stations-fee-form-early-termination-date">
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="stations-fee-form-refund-deposit-true">
                                보증금 환불 여부
                            </label>
                        </div>
                        <div class="size-input-sm d-flex align-items-center">
                            <input style="margin: unset" type="radio" class="form-check-input me-1" name="refund-deposit" value="false" id="stations-fee-form-refund-deposit-false" autocomplete="off">
                            <label class="form-check-label me-3" for="stations-fee-form-refund-deposit-false">O</label>
                            <input checked style="margin: unset" type="radio" class="form-check-input me-1" name="refund-deposit" value="true" id="stations-fee-form-refund-deposit-true" autocomplete="off">
                            <label class="form-check-label me-3" for="stations-fee-form-refund-deposit-true">X</label>
                        </div>
                    </div>
                    <div class="d-flex fw-bold">
                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
                            <label class="col-form-label" for="stations-fee-form-refund-result">
                                위약금:
                            </label>
                        </div>
                        <div class="size-input-sm d-flex align-items-center">
                            <span class="me-1" id="stations-fee-form-refund-result">0</span>
                            <span>원</span>
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <div style="float: right; margin-top: 15px; margin-bottom: 10px">
                    <button type="button" id="stations-fee-form-calculate-fee-window-ok" style="margin-right: 10px">
                        <img width="18px" src="{{asset('icons/check.png')}}">
                        중도 환불금 계산
                    </button>
                    <button type="button" id="stations-fee-form-calculate-fee-window-cancel">
                        <img width="18px" src="{{asset('icons/close.png')}}">
                        취소
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        initCalculateRefundForm();
    </script>
</div>

<form id="stations-fee-form" class="stations-fee-form-container">
    <div class="stations-fee-form-left">
        <div class="stations-fee-form-general-rate">
            <div class="stations-fee-form-general-rate-title">일반요금</div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-default-time" class="required-label">기본시간</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-default-time">
            </div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-one-additional-hour" class="required-label">추가1시간</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-one-additional-hour">
            </div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-two-additional-hour" class="required-label">추가2시간</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-two-additional-hour">
            </div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-repeat-time" class="required-label">반복시간</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-repeat-time">
            </div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-base-rate" class="required-label">기본요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-base-rate">
            </div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-one-extra-charge" class="required-label">추가1요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-one-extra-charge">
            </div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-two-extra-charge" class="required-label">추가2요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-two-extra-charge">
            </div>
            <div class="stations-fee-form-general-rate-item">
                <label for="stations-fee-form-recurring-fee" class="required-label">반복요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-recurring-fee">
            </div>
        </div>
        <div class="stations-fee-form-regular-rate">
            <div class="stations-fee-form-regular-rate-title">정기요금</div>
            <div class="stations-fee-form-regular-rate-item">
                <label for="stations-fee-form-weekly-basic-rate" class="required-label">주간기본요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-weekly-basic-rate">
            </div>
            <div class="stations-fee-form-regular-rate-item">
                <label for="stations-fee-form-weekly-recurring-rate" class="required-label">주간반복요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-weekly-recurring-rate">
            </div>
            <div class="stations-fee-form-regular-rate-item">
                <label for="stations-fee-form-monthly-basic-fee" class="required-label">월간기본요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-monthly-basic-fee">
            </div>
            <div class="stations-fee-form-regular-rate-item">
                <label for="stations-fee-form-monthly-recurring-fee" class="required-label">월간반복요금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-monthly-recurring-fee">
            </div>
            <div class="stations-fee-form-regular-rate-item">
                <label for="stations-fee-form-deposit" class="required-label">보증금</label>
                <input class="form-control form-control-sm text-end" id="stations-fee-form-deposit">
            </div>
        </div>
    </div>
    <div class="stations-fee-form-right">
        <div class="stations-fee-form-load-setting">
            <label for="stations-fee-form-template" class="">설정불러오기</label>
            <select id="stations-fee-form-template" class="form-select form-select-sm">
                <option value="">선택</option>
                @foreach($feeTemplates as $feeTemplate)
                    <option value="{{$feeTemplate->ID}}">{{$feeTemplate->NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>
