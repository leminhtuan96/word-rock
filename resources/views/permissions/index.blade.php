<style type="text/css">
    .jqx-grid-column-header {
        text-align: center;
    }
    .filter-area .jqx-input-label.jqx-input-label-energyblue {
        display: none;
    }
</style>
<div id="permissions-loader">
</div>
<div class="page-area" id="permissions">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$permissions_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='permissions-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="{{$permissions_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='permissions-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$permissions_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='permissions-excel'>
                            <img src="{{asset('icons/excel.png')}}"/>
                            Excel 저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row page-filter mt-1" style="">
            <div class="col-lg-12">
                <div class="filter-area overflow-auto">
                    <div class="d-flex">
                        <div class="d-flex align-items-center text-end me-1">
                            <label for="permissions-filter-user-level" style="min-width: 50px">
                                권한레벨
                            </label>
                        </div>
                        <select id="permissions-filter-user-level" class="form-select form-select-sm size-input-sm me-1">
                            <option value="">전체</option>
                            @foreach($levels['detail'] as $level)
                                <option value="{{$level->ID}}">{{$level->CODED_NAME}}</option>
                            @endforeach
                        </select>
                        <div class="d-flex align-items-center text-end me-1">
                            <label for="permissions-filter-page" style="min-width: 40px">
                                화면명
                            </label>
                        </div>
                        <div class="size-input-normal" id="permissions-filter-page"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div style="overflow: auto;">
            <div id="permissions-grid"></div>
        </div>
    </div>
</div>
