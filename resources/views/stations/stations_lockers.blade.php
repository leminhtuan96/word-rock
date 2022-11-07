<style type="text/css">
    #stations-lockers-excel a {
        text-decoration: none;
        color: inherit;
    }
</style>
<div id="stations-lockers-loader">
</div>
<div class="page-area" id="stations-lockers">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <form class="d-flex">
                        <button style="{{$stations_lockers_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='stations-lockers-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="{{$stations_lockers_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='stations-lockers-excel'>
                            <a href="{{route('stations.export')}}">
                                <img src="{{asset('icons/excel.png')}}"/>
                                Excel 저장
                            </a>
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div class="row page-filter mt-1" style="">
            <div class="col-lg-12">
                <div class="filter-area overflow-auto">
                    <div class="d-flex">
                        <div class="d-flex align-items-center ms-1 me-1">
                            <label for="stations-lockers-filter-station-name" style="min-width: 30px">
                                Station 명
                            </label>
                        </div>
                        <input placeholder="Station 명을 입력하세요." class="form-control form-control-sm size-input-normal" type="text"
                               id="stations-lockers-filter-station-name"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="stations-lockers-splitter" style="height: 100%">
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">Station 내역</b>
                <div id="stations-lockers-stations-grid"></div>
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">보관함  내역</b>
                <div id="stations-lockers-lockers-grid"></div>
            </div>
        </div>
    </div>
</div>
