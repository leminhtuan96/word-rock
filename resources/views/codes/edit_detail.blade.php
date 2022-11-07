<form id="detail-codes-popup-edit">
    <div>편집</div>
    <div style="overflow: hidden;">
        <input type="hidden" id="detail-codes-popup-edit-id">
        <input type="hidden" id="detail-codes-popup-edit-uid">
        <input type="hidden" id="detail-codes-popup-edit-master-id">
        <input type="hidden" id="detail-codes-popup-edit-master-uid">
        <div class="d-flex">
            <div class="w-50-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="detail-codes-popup-edit-code">
                    코드
                </label>
            </div>
            <div class="size-input">
                <input class="form-control form-control-sm" type="text" name="code" id="detail-codes-popup-edit-code">
            </div>
        </div>
        <div class="d-flex">
            <div class="w-50-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="detail-codes-popup-edit-name">
                    코드명
                </label>
            </div>
            <div class="size-input">
                <input class="form-control form-control-sm" type="text" name="name" id="detail-codes-popup-edit-name">
            </div>
        </div>
        <div class="d-flex">
            <div class="w-50-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label required-label" for="detail-codes-popup-edit-sort">
                    표시순서
                </label>
            </div>
            <div class="size-input">
                <input class="form-control form-control-sm" type="number" name="sort" id="detail-codes-popup-edit-sort">
            </div>
        </div>
        <div class="d-flex">
            <div class="w-50-px d-flex align-items-center justify-content-end me-1">
                <label class="col-form-label" for="detail-codes-popup-edit-use-flag">
                    사용여부
                </label>
            </div>
            <div class="size-input">
                <select id="detail-codes-popup-edit-use-flag" class="form-select form-select-sm">
                    @foreach($use_flag['detail'] as $item)
                        <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <div class="d-flex justify-content-end mt-2 mb-2">
            <button style="margin-right: 5px;" type="button" id="detail-codes-popup-edit-save">
                <img width="15px" src="{{asset('icons/check.png')}}">
                저장
            </button>
{{--            <button style="margin-right: 5px;" id="detail-codes-popup-edit-delete" type="button">--}}
{{--                <img width="15px" src="{{asset('icons/trash.png')}}">--}}
{{--                삭제--}}
{{--            </button>--}}
            <button id="detail-codes-popup-edit-cancel" type="button">
                <img width="15px" src="{{asset('icons/close.png')}}">
                취소
            </button>
        </div>
    </div>
</form>
