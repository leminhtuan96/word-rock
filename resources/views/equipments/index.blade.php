<style type="text/css">
</style>
<div id="equipments-loader">
</div>
<div class="page-area" id="equipments">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$equipments_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='equipments-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="{{$equipments_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='equipments-create'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button style="{{$equipments_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='equipments-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$equipments_permissions->PERMISSION_DELETE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='equipments-delete'>
                            <img src="{{asset('icons/trash.png')}}"/>
                            삭제
                        </button>
                        <button style="{{$equipments_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" type="button" id='equipments-excel'>
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
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="equipments-filter-kind" style="min-width: 50px">
                                장비분류
                            </label>
                        </div>
                        <select id="equipments-filter-kind" class="form-select form-select-sm size-input-sm">
                            <option value="">선택</option>
                            @foreach($kinds['detail'] as $kind)
                                <option value="{{$kind->ID}}">{{$kind->CODED_NAME}}</option>
                            @endforeach
                        </select>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="equipments-filter-name" style="min-width: 60px">
                                장비명
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="equipments-filter-name"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="equipments-filter-model" style="min-width: 60px">
                                모델명
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="equipments-filter-model"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="equipments-filter-purc-name" style="min-width: 60px">
                                구매처
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-normal" type="text"
                               id="equipments-filter-purc-name"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="equipments-splitter" style="height: 100%">
            <div style="overflow: auto;">
                @include('equipments.create')
                @include('equipments.edit')
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">장비 내역</b>
                <div id="equipments-grid"></div>
            </div>
        </div>
    </div>
</div>
