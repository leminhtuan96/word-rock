<style type="text/css">
    #detail-as-create-notice {
        background: linear-gradient(180deg, #FFFFFF 0%, #C7D3FF 100%);
    }
    #detail-as-create-notice:hover {
        background: linear-gradient(180deg, #FFFFFF 0%, #889bdf 100%) !important;
        color: #000000 !important;
    }
    #detail-as-create-notice-dept {
        border: 1px solid #ced4da;
        min-height: 23.75px;
        min-width: 198px;
    }
    #detail-as-create-notice-form .jqx-widget-content-energyblue {
        border-right: 1px solid #ced4da;
    }
    #detail-as-create-notice-form #dropdownlistArrowdetail-as-create-notice-dept {
        min-height: 27px;
    }
    #detail-as-create-notice-form #dropdownlistContentdetail-as-create-notice-dept {
        font-size: 12px;
    }
    .jqx-fill-state-focus-energyblue {
        border: 1px solid #ced4da;
    }
    #detail-as-create-notice-form .jqx-input-label.jqx-input-label-energyblue {
        display: none;
    }

    .create-notice-button .create-notice-button-focus {
        background: linear-gradient(180deg, #FFFFFF 0%, #C7D3FF 100%);
    }

    .create-notice-button .create-notice-button-focus:hover {
        background: linear-gradient(180deg, #FFFFFF 0%, #889bdf 100%) !important;
        color: #000000 !important;
    }

    .create-notice-button .create-notice-button-second {
        background: linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%);
    }

    .create-notice-button .create-notice-button-second:hover {
        background: #FFF !important;
        color: #000000 !important;
    }
</style>
<div id="detail-as-loader">
</div>
<div class="page-area" id="detail-as" style="">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$detail_as_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='detail-as-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            ??????
                        </button>
                        <button class="me-1" type="button" id='detail-as-redirect-edit'>
                            <img width="17px" src="{{asset('icons/redirect.png')}}"/>
                            A/S ????????????
                        </button>
                        <button class="me-1" type="button" id='detail-as-redirect-handle'>
                            <img width="17px" src="{{asset('icons/redirect.png')}}"/>
                            A/S ????????????
                        </button>
                        <button style="{{$detail_as_permissions->PERMISSION_EXPORT != 'Y' ? 'display: none' : ''}}" class="me-1" type="button" id='detail-as-excel'>
                            <img src="{{asset('icons/excel.png')}}"/>
                            Excel ??????
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
                            <label for="detail-as-filter-keyword" style="min-width: 50px">
                                ????????????
                            </label>
                        </div>
                        <input placeholder="Station???, ??????????????? ???????????????."
                               class="form-control form-control-sm size-input-normal" type="search"
                               id="detail-as-filter-keyword"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="detail-as-filter-date-receipt-start" style="min-width: 85px">
                                ????????????
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-sm" type="date"
                               id="detail-as-filter-date-receipt-start"/>
                        <div class="d-flex align-items-center ms-1 me-1">
                            <label class="text-center" for="detail-as-filter-date-receipt-end" style="min-width: 20px">
                                ~
                            </label>
                        </div>
                        <input class="form-control form-control-sm size-input-sm" type="date"
                               id="detail-as-filter-date-receipt-end"/>
                        <div class="w-100-px d-flex align-items-center ms-1 me-1">
                            <input style="margin: unset" type="checkbox" class="form-check-input" id="detail-as-filter-use-date">
                            <label class="form-check-label" for="detail-as-filter-use-date">??????????????????</label>
                        </div>
                        <div class="w-85-px d-flex align-items-center ms-1 me-1">
                            <input style="margin: unset" type="checkbox" class="form-check-input" id="detail-as-filter-except-complete">
                            <label class="form-check-label" for="detail-as-filter-except-complete">??????????????????</label>
                        </div>
                        <div class="w-100-px d-flex align-items-center ms-1 me-3">
                            <input style="margin: unset" type="checkbox" class="form-check-input" id="detail-as-filter-only-complete">
                            <label class="form-check-label" for="detail-as-filter-only-complete">?????????????????????</label>
                        </div>
                        <div class="w-100-px d-flex align-items-center ms-1 me-1">
                            <span class="me-2">????????????:</span>
                            <span>{{$totalASCount}}</span>
                        </div>
                        <div class="w-100-px d-flex align-items-center ms-1 me-1">
                            <span class="me-2">????????????:</span>
                            <span>{{$completeASCount}}</span>
                        </div>
                        <div class="w-100-px d-flex align-items-center ms-1 me-1">
                            <span class="me-2">?????????:</span>
                            <span>{{round(($completeASCount / $totalASCount) * 100, 1)}} %</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="detail-as-splitter" style="height: 100%;">
            <div class="overflow-auto">
                <div id="detail-as-left-splitter" style="height: 100%;border: none">
                    <div class="p-1 overflow-auto">
                        <div id="detail-as-grid"></div>
                    </div>
                    <div class="p-1 overflow-auto">
                        <div class="d-flex align-items-center mb-1">
                            <b class="title-grid"><img src="{{asset('icons/edit.png')}}">????????????</b>
                            <button style="" class="ms-3" id="detail-as-create-notice">
                                <img width="17px" src="{{asset('icons/plus.png')}}"/>
                                ??????
                            </button>
                        </div>
                        <div id="detail-as-notice-grid"></div>
                        <form style="display: none; width: 99%" id="detail-as-create-notice-form" enctype="multipart/form-data">
                            <div class="row page-filter mt-1" style="">
                                <div class="col-lg-12">
                                    <div class="filter-area overflow-auto">
                                        <div class="d-flex">
                                            <div style="height: 27px;" class="w-75-px d-flex align-items-center justify-content-end me-1">
                                                <label class="col-form-label required-label" for="detail-as-create-notice-dept">
                                                    ?????? ??????
                                                </label>
                                            </div>
                                            <div id="detail-as-create-notice-dept"></div>
                                        </div>
                                        <div class="d-flex mt-1">
                                            <div class="w-75-px d-flex align-items-center justify-content-end me-1">
                                                <label class="col-form-label required-label" for="detail-as-create-notice-content">
                                                    ?????? ??????
                                                </label>
                                            </div>
                                            <div style="width: calc(100% - 225px - .75rem); min-width: 400px; max-width: 750px">
                                                <input placeholder="?????? ?????? ??????" class="form-control form-control-sm" type="text" id="detail-as-create-notice-content">
                                            </div>
                                            <div class="w-75-px ms-1 create-notice-button">
                                                <button class="w-100 create-notice-button-focus" id="detail-as-create-notice-submit">??????</button>
                                            </div>
                                            <div class="w-75-px ms-1">
                                                <button class="w-100 create-notice-button-second" id="detail-as-create-notice-cancel">??????</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="p-1 overflow-auto">
                <div class="d-flex align-items-center mb-1">
                    <b class="title-grid"><img src="{{asset('icons/edit.png')}}">????????????</b>
                </div>
                <div id="detail-as-new-as-notice-grid" class="mb-1"></div>
                <div class="d-flex align-items-center mb-1">
                    <b class="title-grid"><img src="{{asset('icons/edit.png')}}">????????????</b>
                </div>
                <div id="detail-as-new-notice-grid" class="mb-1"></div>
                <div class="d-flex align-items-center mb-1">
                    <b class="title-grid"><img src="{{asset('icons/edit.png')}}">???????????? ??????????????????</b>
                </div>
                <div id="detail-as-maintain-station-grid" class="mb-1"></div>
            </div>
        </div>
    </div>
</div>
