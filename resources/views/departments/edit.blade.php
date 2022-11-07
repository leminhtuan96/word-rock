<div id="departments-edit-parent-window">
    <div>
        <img width="14" height="14" src="../../images/help.png" alt=""/>
        <span id="departments-edit-parent-window-title">조직/부서 선택</span>
    </div>
    <div>
        <div id="departments-edit-parent-window-content"></div>
        <div>
            <div style="float: right; margin-top: 15px;">
                <button type="button" id="departments-edit-parent-window-ok" style="margin-right: 10px">
                    <img width="18px" src="{{asset('icons/check.png')}}">
                    저장
                </button>
                <button type="button" id="departments-edit-parent-window-cancel">
                    <img width="18px" src="{{asset('icons/close.png')}}">
                    취소
                </button>
            </div>
        </div>
    </div>
</div>
<form style="display: none" id="departments-edit-form" class="container-fluid mt-1" enctype="multipart/form-data">
    @csrf
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="departments-edit-id">
                조직코드
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" name="id" id="departments-edit-id"
                   readonly>
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="departments-edit-type">
                조직구분
            </label>
        </div>
        <div class="size-input-m">
            <select disabled id="departments-edit-type" class="form-select form-select-sm">
                @foreach($dept_type['detail'] as $item)
                    <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div style="display: none;" id="departments-edit-parent-area">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="departments-edit-parent">
                상위조직명
            </label>
        </div>
        <div class="size-input-m position-relative">
            <input style="cursor: pointer;background-color: #83D5F6" class="form-control form-control-sm" type="text" name="parent"
                   id="departments-edit-parent" readonly>
            <img id="departments-edit-choose-parent" style="top:.4rem;right: .25rem;cursor: pointer" class="position-absolute" src="{{asset('jqwidgets/styles/images/search.png')}}" />
            <input type="hidden" id="departments-edit-parent-id">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label required-label" for="departments-edit-name">
                조직명
            </label>
        </div>
        <div class="size-input-m">
            <input class="form-control form-control-sm" type="text" name="name" id="departments-edit-name">
        </div>
    </div>
    <div class="d-flex">
        <div class="w-75-px d-flex align-items-center justify-content-end me-1">
            <label class="col-form-label" for="departments-edit-use-flag">
                사용여부
            </label>
        </div>
        <div class="size-input-m">
            <select id="departments-edit-use-flag" class="form-select form-select-sm">
                @foreach($use_flag['detail'] as $item)
                    <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                @endforeach
            </select>
        </div>
    </div>
</form>
