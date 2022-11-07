<style type="text/css">
</style>
<div id="stations-loader">
</div>
<div class="page-area" id="stations">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$stations_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='stations-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="{{$stations_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='stations-create'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button style="{{$stations_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='stations-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$stations_permissions->PERMISSION_DELETE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='stations-delete'>
                            <img src="{{asset('icons/trash.png')}}"/>
                            삭제
                        </button>
                        <button type="button" id='stations-redirect-create-locker'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            보관함 등록
                        </button>
                        <button type="button" id='stations-free'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            이용요금
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row page-filter mt-1" style="">
            <div class="col-lg-12">
                <div class="filter-area overflow-auto">
                    <div class="d-flex">
                        <div class="d-flex align-items-center ms-1 me-1">
                            <label for="stations-filter-keyword" style="min-width: 30px">
                                Station 명
                            </label>
                        </div>
                        <input placeholder="Station 명을 입력하세요." class="form-control form-control-sm size-input-normal" type="search"
                               id="stations-filter-keyword"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="stations-splitter" style="height: 100%">
            <div style="overflow: auto;">
                @include('stations.create')
                @include('stations.edit')
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">Station 내역</b>
                <div id="stations-grid"></div>
            </div>
        </div>
    </div>
</div>
