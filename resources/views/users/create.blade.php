<form id="users-create-form" class="container-fluid mt-1" enctype="multipart/form-data">
    @csrf
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-create-name">
                이름
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="text" id="users-create-name">
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-create-loginId">
                아이디
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="text" id="users-create-loginId">
        </div>
        <div class="w-100-px me-1 ms-1">
            <button class="w-100" id="users-create-duplicate-check">중복체크</button>
        </div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-create-password">
                패스워드
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="password" id="users-create-password">
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-create-passwordConfirm">
                패스워드 확인
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="password" id="users-create-passwordConfirm">
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-create-area1">
                지 역
            </label>
        </div>
        <div class=" size-input">
            <select id="users-create-area1" class="form-select form-select-sm">
                <option value="">영역 선택</option>
                @foreach($areas['detail'] as $area)
                    <option value="{{$area->ID}}">{{$area->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class=" size-input ms-1 me-1">
            <input class="form-control form-control-sm" type="text" id="users-create-area1-name">
        </div>
        <div class="w-100-px"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-create-area2">
                소 속
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="text" id="users-create-area2">
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-create-station">
                Station Name
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="text" id="users-create-station">
        </div>
        <div class="w-100-px me-1 ms-1">
            <button class="w-100" id="users-create-station-search">검 색</button>
        </div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-create-level">
                레벨
            </label>
        </div>
        <div class=" size-input">
            <select id="users-create-level" class="form-select form-select-sm">
                <option value="">레벨 선택</option>
                @foreach($levels['detail'] as $level)
                    <option value="{{$level->ID}}">{{$level->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-100-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label" for="users-create-department">
                소속(그룹)
            </label>
        </div>
        <div class=" size-input">
            <select id="users-create-department" class="form-select form-select-sm">
                <option value="">부서 선택</option>
                @foreach($departments as $department)
                    <option
                        value="{{$department->ID}}">{{($department->UPPER_ID ? ' --- ' : '') . $department->DEPT_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-create-email">
                E-Mail
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" id="users-create-email">
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="users-create-mobile">
                연락처
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="text" id="users-create-mobile">
        </div>
        <div class="w-100-px d-flex align-items-center justify-content-end me-1 ms-1">
            <label class="col-form-label required-label" for="users-create-telephone">
                비상연락처
            </label>
        </div>
        <div class=" size-input">
            <input class="form-control form-control-sm" type="text" id="users-create-telephone">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-100-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="users-create-use-flag">
                사용여부
            </label>
        </div>
        <div class=" size-input">
            <select id="users-create-use-flag" class="form-select form-select-sm">
                @foreach($use_flag['detail'] as $item)
                    <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
        <div class="w-100-px me-1 ms-1"></div>
        <div class="size-input"></div>
    </div>
</form>
