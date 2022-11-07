<style type="text/css">
    .jqx-validator-hint-arrow {
        background-image: url({{asset('jqwidgets/styles/images/multi-arrow.gif')}}) !important;
    }

    .jqx-validator-hint-light {
        background-color: #942724;
        height: 30px;
        padding: 5px;
    }
    #detail-codes-popup-edit table tr,
    #master-codes-popup-edit table tr {
        height: 50px;
    }
</style>
<div id="codes-loader">
</div>
<div class="page-area" id="codes">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$codes_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='codes-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="display: none" type="button" class="me-1" id='codes-reset'>
                            <img src="{{asset('icons/refresh.png')}}"/>
                            신규
                        </button>
                        <button style="{{$codes_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='codes-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$codes_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" type="button" id='codes-excel'>
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
                            <label for="codes-code" style="min-width: 30px">
                                공통코드
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="search" id="codes-code" />
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="codes-name" style="min-width: 60px">
                                코드명
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="search" id="codes-name" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="codes-splitter" style="height: 100%">
            <div class="p-1" style="overflow: auto;">
                @include('codes.edit_master')
                <div id="master-codes-grid"></div>
            </div>
            <div class="p-1" style="overflow: auto;">
                @include('codes.edit_detail')
                <div id="detail-codes-grid"></div>
            </div>
        </div>
    </div>
</div>
