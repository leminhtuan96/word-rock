<style type="text/css">
    #handle-as-lockers-menu {
        background-color: #F5F5F5;
        border: none;
        border-radius: unset;
    }

    #handle-as-item-locker-active {
        color: var(--jqx-primary-color) !important;
        border-color: var(--jqx-primary) !important;
        background: var(--jqx-primary) !important;
        box-shadow: none;
    }

    /*#handle-as-lockers-menu ul li:first-child {*/
    /*    background: linear-gradient(180deg, #F0F6FD 0%, #D0E5FA 100%);*/
    /*    border: none;*/
    /*}*/

    #handle-as-lockers-menu ul li:hover {
        background: linear-gradient(180deg, #F0F6FD 0%, #D0E5FA 100%);
        border: none;
    }

    .title-area {
        font-weight: bold;
        font-size: 14px;
    }

    #handle-as-form-area .jqx-input-label.jqx-input-label-energyblue {
        display: none;
    }

</style>
{{--    choose locker--}}
<div id="handle-as-form-choose-locker-window" style="display: none">
    <div>
        <img width="14" height="14" src="../../images/help.png" alt=""/>
        <span style="text-transform: none" id="handle-as-form-choose-locker-window-title">Locker 선택</span>
    </div>
    <div>
        <div id="handle-as-form-choose-locker-window-content"></div>
        <div>
            <div style="float: right; margin-top: 15px;">
                <button type="button" id="handle-as-form-choose-locker-window-ok" style="margin-right: 10px">
                    <img width="18px" src="{{asset('icons/check.png')}}">
                    선택
                </button>
                <button type="button" id="handle-as-form-choose-locker-window-cancel">
                    <img width="18px" src="{{asset('icons/close.png')}}">
                    취소
                </button>
            </div>
        </div>
    </div>
</div>
<div id="handle-as-loader">
</div>
<div class="page-area" id="handle-as" style="">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button style="{{$handle_as_permissions->PERMISSION_SEARCH != 'Y' ? 'display: none' : ''}}"
                                class="me-1" type="button" id='handle-as-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button class="me-1" type="button" id='handle-as-reset'>
                            <img width="17px" src="{{asset('icons/plus.png')}}"/>
                            신규
                        </button>
                        <button style="{{$handle_as_permissions->PERMISSION_SAVE != 'Y' ? 'display: none' : ''}}"
                                class="me-1" type="button" id='handle-as-save'>
                            <img src="{{asset('icons/save.png')}}"/>
                            저장
                        </button>
                        <button style="{{$handle_as_permissions->PERMISSION_DELETE != 'Y' ? 'display: none' : ''}}"
                                class="me-1" type="button" id='handle-as-delete'>
                            <img src="{{asset('icons/trash.png')}}"/>
                            삭제
                        </button>
                        <button class="me-1" type="button" id='handle-as-redirect-edit'>
                            <img width="17px" src="{{asset('icons/redirect.png')}}"/>
                            A/S 접수등록
                        </button>
                        <button class="me-1" type="button" id='handle-as-free'>
                            <img width="17px" src="{{asset('icons/redirect.png')}}"/>
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
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="handle-as-filter-keyword" style="min-width: 50px">
                                통합검색
                            </label>
                        </div>
                        <input value="{{app('request')->input('keyword')}}" placeholder="Station명, 보관함명을 입력하세요."
                               class="form-control form-control-sm size-input-normal" type="search"
                               id="handle-as-filter-keyword"/>
                        <div class="d-flex align-items-center text-end ms-1 me-1">
                            <label for="handle-as-filter-date-receipt-start" style="min-width: 85px">
                                접수일자
                            </label>
                        </div>
                        <input value="{{app('request')->input('start')}}" {{app('request')->input('use_date') ? '' : 'readonly'}}
                               class="form-control form-control-sm size-input-sm" type="date"
                               id="handle-as-filter-date-receipt-start"/>
                        <div class="d-flex align-items-center ms-1 me-1">
                            <label class="text-center" for="handle-as-filter-date-receipt-end" style="min-width: 20px">
                                ~
                            </label>
                        </div>
                        <input value="{{app('request')->input('end')}}" {{app('request')->input('use_date') ? '' : 'readonly'}}
                               class="form-control form-control-sm size-input-sm" type="date"
                               id="handle-as-filter-date-receipt-end"/>
                        <div class="w-100-px d-flex align-items-center ms-1 me-1">
                            <input {{app('request')->input('use_date') ? '' : 'checked'}} style="margin: unset"
                                   type="checkbox" class="form-check-input" id="handle-as-filter-use-date">
                            <label class="form-check-label" for="handle-as-filter-use-date">일자검색제외</label>
                        </div>
                        <div class="w-85-px d-flex align-items-center ms-1 me-1">
                            <input {{app('request')->input('except_complete') ? 'checked' : ''}} style="margin: unset"
                                   type="checkbox" class="form-check-input" id="handle-as-filter-except-complete">
                            <label class="form-check-label" for="handle-as-filter-except-complete">일자검색제외</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div id="handle-as-splitter"
             style="height: 100%;">
            {{--search--}}
            <div style="overflow: auto;">
                <div class="d-flex p-1">

                    <div class="size-input-m" id='handle-as-lockers-menu'
                         style="visibility: hidden; min-height: 338px; max-height: 365px; overflow: auto;">
                        <ul>
                            @if($has_no_locker)
                                <li data-id="">{{$has_no_locker}}</li>
                            @endif
                            @foreach($lockers as $locker)
                                <li data-id="{{$locker->ID}}">{{$locker->LOCKER_NAME}}</li>
                            @endforeach
                        </ul>
                    </div>
                    @include('after_services.handle.handle_form')
                </div>
            </div>

            {{--table--}}
            <div class="p-1" style="overflow: auto;">
                <b class="title-grid"><img src="{{asset('icons/edit.png')}}">A/S 접수이력</b>
                <div id="handle-as-grid"></div>
            </div>
        </div>
    </div>
</div>
