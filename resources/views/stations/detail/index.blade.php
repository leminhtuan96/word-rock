<style type="text/css">
    .stations-fee-form-container {
        margin-left: calc(75px + .25rem);
        margin-bottom: 5px;
        display: flex;
    }
    .stations-fee-form-left {
        width: 420px;
        min-width: 420px;
    }
    .stations-fee-form-right {
        padding: 23px;
    }
    .stations-fee-form-header {
        display: flex;
        justify-content: space-between;
    }
    .stations-fee-form-general-rate,
    .stations-fee-form-regular-rate {
        position: relative;
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        padding: 10px 0 0;
        margin-top: 1rem;
        border-top: 1px solid #ced4da;
    }
    .stations-fee-form-general-rate-title,
    .stations-fee-form-regular-rate-title {
        position: absolute;
        top: -6px;
        background-color: #fff;
        padding-right: 5px;
    }
    .stations-fee-form-load-setting,
    .stations-fee-form-general-rate-item,
    .stations-fee-form-regular-rate-item {
        width: 100px;
        min-width: 100px;
        margin-top: .35rem;
    }
    @media only screen and (min-width: 1080px) {
        .stations-detail-top {
            display: flex;
        }
    }
    @media only screen and (max-width: 1079px) {
        #stations-detail-form {
            padding-bottom: 10px;
            border-bottom: 1px solid #ced4da;
        }
        .stations-fee-form-container {
            padding-top: 10px;
        }
    }
</style>
<div id="stations-detail-loader">
</div>
<div id="stations-detail-choose-station-window">
    <div>
        <img width="14" height="14" src="../../images/help.png" alt=""/>
        <span id="stations-detail-choose-station-window-title">Station 선택</span>
    </div>
    <div>
        <div id="stations-detail-choose-station-window-content"></div>
        <div>
            <div style="float: right; margin-top: 15px;">
                <button type="button" id="stations-detail-choose-station-window-ok" style="margin-right: 10px">
                    <img width="18px" src="{{asset('icons/check.png')}}">
                    선택
                </button>
                <button type="button" id="stations-detail-choose-station-window-cancel">
                    <img width="18px" src="{{asset('icons/close.png')}}">
                    취소
                </button>
            </div>
        </div>
    </div>
</div>
<div class="page-area" id="stations-detail">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='stations-detail-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button class="me-1" type="button" id='stations-detail-redirect-create-station'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            Station 등록
                        </button>
                        <button class="me-1" type="button" id='stations-detail-redirect-stations-lockers'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            보관함 정보
                        </button>
                        <button type="button" id='stations-detail-redirect-fee'>
                            <img src="{{asset('icons/dollar.png')}}"/>
                            중도환불계산
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
                            <label for="stations-detail-keyword" style="min-width: 30px">
                                통합검색
                            </label>
                        </div>
                        <div class="size-input-normal">
                            <input placeholder="Station명, 보관함명을 입력하세요."
                                   class="form-control form-control-sm" type="search"
                                   id="stations-detail-keyword"/>
                            <input type="hidden" id="stations-detail-station-id" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="stations-detail-splitter" style="height: 100%">
            <div class="stations-detail-top" style="overflow: auto;">
                @include('stations.detail.detail_form')
                @include('stations.detail.fee_form')
            </div>
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">A/S 접수이력</b>
                <div id="stations-detail-as-grid"></div>
            </div>
        </div>
    </div>
</div>
