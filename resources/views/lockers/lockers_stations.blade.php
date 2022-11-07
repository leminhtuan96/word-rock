<style type="text/css">
    #lockers-stations-excel a {
        text-decoration: none;
        color: inherit;
    }
</style>
<div id="lockers-stations-loader">
</div>
<div class="page-area" id="lockers-stations">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <form class="d-flex">
                        <button style="{{$lockers_stations_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='lockers-stations-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="{{$lockers_stations_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='lockers-stations-excel'>
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
                            <label for="lockers-stations-filter-station-name" style="min-width: 30px">
                                Station 명
                            </label>
                        </div>
                        <input placeholder="Station 명을 입력하세요." class="form-control form-control-sm size-input-normal" type="search"
                               id="lockers-stations-filter-station-name"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="lockers-stations-splitter" style="height: 100%">
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">Station 내역</b>
                <div id="lockers-stations-stations-grid"></div>
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">보관함  내역</b>
                <div id="lockers-stations-lockers-grid"></div>
            </div>
        </div>
    </div>
</div>
