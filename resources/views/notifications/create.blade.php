<style>
    .jqx-file-upload-file-upload,
    .jqx-file-upload-buttons-container button {
        display: none;
    }
</style>
<div id="create-notification-loader">
</div>
<form style="display: none;width: calc(100% - 12px)" id="create-notification-form" class="create-notification-area p-1" enctype="multipart/form-data">
    <div class="row" style="height: auto;align-items: center;position: sticky;top: 0;z-index: 365;background-color: #fff;">
        <div class="col-lg-12">
            <div class="control-area">
                <button type="submit" id='create-notification-submit'>
                    <img src="{{asset('jqwidgets/styles/images/check_black.png')}}" />
                    등 록
                </button>
                <button type="button" id='create-notification-reset' >
                    <img width="17px" src="{{asset('icons/reset.png')}}" />
                    초기화
                </button>
            </div>
        </div>
    </div>
    <div class="mt-1" id="create-notification-splitter">
        <div data-container="create-notification-select-users">
            <div id="create-notification-select-users-grid">

            </div>
        </div>
        <div data-container="create-notification-input">
            <div class="row mt-3" style="padding: 5px">
                <div class="col-lg-12">
                    <input type="text" id="create-notification-title" />
                </div>
                <div class="col-lg-12 mt-3">
                    <textarea id="create-notification-description"></textarea>
                </div>
                <div class="col-lg-12 mt-3">
                    <div id="create-notification-files">
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>
