<style type="text/css">
    .jqx-validator-hint-arrow {
        background-image: url({{asset('jqwidgets/styles/images/multi-arrow.gif')}}) !important;
    }

    .jqx-validator-hint-light {
        background-color: #942724;
        height: 30px;
        padding: 5px;
    }
</style>
<div id="departments-loader">
</div>
<div class="page-area" id="departments">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$departments_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='departments-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button class="me-1" type="button" id='departments-create'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button style="{{$departments_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='departments-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$departments_permissions->PERMISSION_DELETE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='departments-delete'>
                            <img src="{{asset('icons/trash.png')}}"/>
                            삭제
                        </button>
                        <button style="{{$departments_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" type="button" id='departments-excel'>
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
                        <div class="d-flex align-items-center me-1">
                            <label for="notices-filter-type" style="min-width: 60px">
                                조직구분
                            </label>
                        </div>
                        <select id="departments-filter-type" class="form-select form-select-sm size-input-sm">
                            <option value="">부서 유형 선택</option>
                            @foreach($dept_type['detail'] as $item)
                                <option value="{{$item->ID}}">{{$item->CODED_NAME}}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="departments-splitter" style="height: 100%">
            <div style="overflow: auto;">
                @include('departments.create')
                @include('departments.edit')
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">조직 리스트</b>
                <div id="departments-grid"></div>
            </div>
        </div>
    </div>
</div>
