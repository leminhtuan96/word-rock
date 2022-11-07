<div id="notifications-loader">
</div>
<div style="display: none; width: calc(100% - 12px)" class="notifications-area p-1">
    <div class="row" style="height: auto;align-items: center;position: sticky;top: 0;z-index: 365;background-color: #fff;">
        <div class="col-lg-12">
            <div class="control-area">
                <button type="submit" id='notifications-submit'>
                    <img src="{{asset('jqwidgets/styles/images/check_black.png')}}" />
                    등 록
                </button>
                <button type="button" id='notifications-reset' >
                    <img width="17px" src="{{asset('icons/reset.png')}}" />
                    초기화
                </button>
            </div>
        </div>
    </div>
    <div class="mt-1" id="notifications-dockingLayout">
        <div data-container="notifications-list">
            <div id="notifications-dataTable"></div>
        </div>
        <div data-container="notifications-detail">
        </div>
    </div>
</div>
