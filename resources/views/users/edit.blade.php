<form style="display: none" id="users-edit-form" class="container-fluid mt-1" enctype="multipart/form-data">
    @csrf
    <input type="hidden" id="users-edit-id">
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-edit-name">
                이름
            </label>
        </div>
        <div class="size-input">
            <input readonly class="form-control form-control-sm" type="text" id="users-edit-name">
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-edit-loginId">
                아이디
            </label>
        </div>
        <div class="size-input">
            <input class="form-control form-control-sm" type="text" id="users-edit-loginId" readonly>
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-edit-area1">
                지 역
            </label>
        </div>
        <div class="size-input">
            <select id="users-edit-area1" class="form-select form-select-sm" disabled="true">
                <option value="">영역 선택</option>
                @foreach($areas['detail'] as $area)
                    <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="size-input ms-1 me-1">
            <input class="form-control form-control-sm" type="text" id="users-edit-area1-name">
        </div>
        <div class="w-100-px"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-edit-area2">
                소 속
            </label>
        </div>
        <div class="size-input">
            <input class="form-control form-control-sm" type="text" id="users-edit-area2" readonly>
        </div>
        <div class="w-100-px ms-1 me-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-edit-station">
                Station Name
            </label>
        </div>
        <div class="size-input">
            <input class="form-control form-control-sm" type="text" id="users-edit-station">
        </div>
        <div class="w-100-px me-1 ms-1">
            <button class="w-100" id="users-edit-station-search" >검 색</button>
        </div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-edit-level">
                레벨
            </label>
        </div>
        <div class=" size-input">
            <select id="users-edit-level" class="form-select form-select-sm">
                <option value="">레벨 선택</option>
                @foreach($levels['detail'] as $level)
                    <option value="{{$level->ID}}">{{$level->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-100-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="users-edit-department">
                소속(그룹)
            </label>
        </div>
        <div class="size-input">
            <select id="users-edit-department" class="form-select form-select-sm">
                <option value="">부서 선택</option>
                @foreach($departments as $department)
                    <option value="{{$department->ID}}">{{($department->UPPER_ID ? ' --- ' : '') . $department->DEPT_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-edit-email">
                E-Mail
            </label>
        </div>
        <div class="size-input">
            <input class="form-control form-control-sm" id="users-edit-email" readonly>
        </div>
        <div class="w-100-px ms-1 me-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-edit-mobile">
                연락처
            </label>
        </div>
        <div class="size-input">
            <input class="form-control form-control-sm" type="text" id="users-edit-mobile" readonly>
        </div>
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-edit-telephone">
                비상연락처
            </label>
        </div>
        <div class="size-input">
            <input class="form-control form-control-sm" type="text" id="users-edit-telephone" readonly>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-edit-use-flag">
                사용여부
            </label>
        </div>
        <div class="size-input">
            <select id="users-edit-use-flag" class="form-select form-select-sm">
                @foreach($use_flag['detail'] as $item)
                    <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-100-px ms-1 me-1"></div>
        <div class="size-input"></div>
    </div>
</form>
