<style type="text/css">
</style>
<div id="lockers-loader">
</div>
<div class="page-area" id="lockers">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$lockers_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='lockers-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button style="{{$lockers_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='lockers-create'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button style="{{$lockers_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='lockers-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$lockers_permissions->PERMISSION_DELETE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='lockers-delete'>
                            <img src="{{asset('icons/trash.png')}}"/>
                            삭제
                        </button>
                        <button style="{{$lockers_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='lockers-copy'>
                            <img src="{{asset('icons/duplicate.png')}}"/>
                            복사
                        </button>
                        <button type="button" id='lockers-redirect-create-station'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            Station 등록
                        </button>
                        <button type="button" id='lockers-free'>
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
                            <label for="lockers-filter-name" style="min-width: 30px">
                                보관함명
                            </label>
                        </div>
                        <input placeholder="보관함명을 입력하세요." class="form-control form-control-sm size-input-normal" type="search"
                               id="lockers-filter-name"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="lockers-splitter" style="height: 100%">
            <div style="overflow: auto;">
                @include('lockers.create')
                @include('lockers.edit')
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">보관함 내역</b>
                <div id="lockers-grid"></div>
            </div>
        </div>
    </div>
</div>
