<style>
    .jqx-file-upload-file-upload,
    .jqx-file-upload-buttons-container button {
        display: none;
    }
</style>
<div id="create-notices-loader">
</div>
<div class="page-area" id="create-notices">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='create-notices-reset'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button class="me-1" type="button" id='create-notices-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button class="me-1" type="button" id='create-notices-redirect-list'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            목록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div style="overflow: auto;">
            <form id="create-notices-form" class="mt-1 container-fluid" enctype="multipart/form-data">
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="create-notices-dept">
                            공지부서
                        </label>
                    </div>
                    <div class="size-input">
                        <select id="create-notices-dept" class="form-select form-select-sm">
                            <option value="">부서 선택</option>
                            @foreach($departments as $department)
                                <option
                                    value="{{$department->ID}}">{{($department->DEPT_TYPE == config('constants.DETAIL_CODES.DEPT_TYPE.DEPARTMENT') ? ' --- ' : ($department->DEPT_TYPE == config('constants.DETAIL_CODES.DEPT_TYPE.TEAM') ? ' --- --- ' : '')) . $department->DEPT_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="create-notices-name">
                            제목
                        </label>
                    </div>
                    <div class="size-input">
                        <input class="form-control form-control-sm" type="text" name="name" id="create-notices-name">
                    </div>
                </div>
                <div class="d-flex">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label required-label" for="create-notices-content">
                            공지내용
                        </label>
                    </div>
                    <div class="size-textarea">
                        <textarea id="create-notices-content"></textarea>
                    </div>
                </div>
                <div class="d-flex mt-1">
                    <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                        <label class="col-form-label" for="create-notices-attachments">
                            첨부파일
                        </label>
                    </div>
                    <div class="size-input">
                        <div style="border: none; padding: unset" id="create-notices-attachments"></div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

