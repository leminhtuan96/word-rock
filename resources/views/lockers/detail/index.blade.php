<style type="text/css">
</style>
<div id="lockers-detail-loader">
</div>
<div id="lockers-detail-choose-locker-window">
    <div>
        <img width="14" height="14" src="../../images/help.png" alt=""/>
        <span id="lockers-detail-choose-locker-window-title">보관함 선택</span>
    </div>
    <div>
        <div id="lockers-detail-choose-locker-window-content"></div>
        <div>
            <div style="float: right; margin-top: 15px;">
                <button type="button" id="lockers-detail-choose-locker-window-ok" style="margin-right: 10px">
                    <img width="18px" src="{{asset('icons/check.png')}}">
                    선택
                </button>
                <button type="button" id="lockers-detail-choose-locker-window-cancel">
                    <img width="18px" src="{{asset('icons/close.png')}}">
                    취소
                </button>
            </div>
        </div>
    </div>
</div>
<div class="page-area" id="lockers-detail">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='lockers-detail-redirect-create-locker'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            보관함 등록
                        </button>
                        <button class="me-1" type="button" id='lockers-detail-redirect-lockers-stations'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            보관함 정보
                        </button>
                        <button type="button" id='lockers-detail-redirect-free'>
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
                            <label for="lockers-detail-keyword" style="min-width: 30px">
                                통합검색
                            </label>
                        </div>
                        <div class="size-input-normal">
                            <input placeholder="Station명, 보관함명을 입력하세요."
                                   class="form-control form-control-sm" type="search"
                                   id="lockers-detail-keyword"/>
                            <input type="hidden" id="lockers-detail-locker-id" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="lockers-detail-splitter" style="height: 100%">
            <div style="overflow: auto;">
                @include('lockers.detail.detail_form')
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">A/S 접수이력</b>
                <div id="lockers-detail-as-grid"></div>
            </div>
        </div>
    </div>
</div>
