{{--edit window--}}
<div id="edit-window-area">
    <div id="edit-window" style="display: none">
        <div class="window-title-area">
            <div class="d-flex align-items-center">
                <img style="margin-top: -1px" class="me-2" src="{{asset('icons/save.png')}}" alt="" />
                <span id="edit-window-title" class="window-title">확인</span>
            </div>
        </div>
        <div class="window-content-area">
            <div id="edit-window-content" class="window-content" >저장하시겠습니까?</div>
            <div class="d-flex justify-content-end window-button">
                <input class="window-button-focus" style="margin-right: 16px;" type="button" id="edit-window-ok" value="확인" />
                <input class="window-button-second" type="button" id="edit-window-cancel" value="취소" />
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#edit-window').jqxWindow({
                autoOpen: false,
                maxHeight: 180, maxWidth: 320, minHeight: 115, minWidth: 320, width: 320,
                resizable: false, isModal: true, modalOpacity: 0.3,
                okButton: $('#edit-window-ok'), cancelButton: $('#edit-window-cancel'),
                initContent: function () {
                    $('#edit-window-ok').jqxButton({ width: '65px' });
                    $('#edit-window-cancel').jqxButton({ width: '65px' });
                    $('#edit-window-ok').focus();
                }
            });
        });
    </script>
</div>

{{--delete window--}}
<div id="delete-window-area">
    <div id="delete-window" style="display: none">
        <div class="window-title-area">
            <div class="d-flex align-items-center">
                <img style="margin-top: -1px" class="me-2" src="{{asset('icons/trash.png')}}" alt="" />
                <span id="delete-window-title" class="window-title">확인</span>
            </div>
        </div>
        <div class="window-content-area">
            <div id="delete-window-content" class="window-content" >삭제하시겠습니까?</div>
            <div class="d-flex justify-content-end window-button" style="padding: 16px; background-color: #F9F9FA">
                <input class="window-button-second" style="margin-right: 16px;" type="button" id="delete-window-ok" value="확인" />
                <input class="window-button-focus" type="button" id="delete-window-cancel" value="취소" />
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#delete-window').jqxWindow({
                autoOpen: false,
                maxHeight: 180, maxWidth: 320, minHeight: 115, minWidth: 320, width: 320,
                resizable: false, isModal: true, modalOpacity: 0.3,
                okButton: $('#delete-window-ok'), cancelButton: $('#delete-window-cancel'),
                initContent: function () {
                    $('#delete-window-ok').jqxButton({ width: '65px' });
                    $('#delete-window-cancel').jqxButton({ width: '65px' });
                    $('#delete-window-ok').focus();
                }
            });
        });
    </script>
</div>

{{--error message window--}}
<div id="error-message-window-area">
    <div id="error-message-window" style="padding: 16px; display: none">
        <div class="d-flex justify-content-center message-header">
            <img src="{{asset('icons/multiply.png')}}" alt="" />
        </div>
        <div class="text-center" style="padding: unset">
            <div id="error-message-window-title" class="message-title"></div>
            <div id="error-message-window-content" class="message-content"></div>
            <div class="message-button-area">
                <input class="message-button-focus" type="button" id="error-message-window-cancel" value="확인" />
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#error-message-window').jqxWindow({
                autoOpen: false,
                maxHeight: 225, maxWidth: 320, minHeight: 187, minWidth: 270, width: 270,
                resizable: false, isModal: true, modalOpacity: 0.3,
                cancelButton: $('#error-message-window-cancel'),
                initContent: function () {
                    $('#error-message-window-cancel').jqxButton({ width: '71px' });
                    $('#error-message-window-cancel').focus();
                }
            });
            $('#error-message-window').on('close', function (event) {
                $('#error-message-window').jqxWindow('destroy');
                $('#error-message-window-area').html(htmlErrorMessageWindow())
            })
        });
    </script>
</div>

{{--success message window--}}
<div id="success-message-window-area">
    <div id="success-message-window" style="padding: 16px; display: none">
        <div class="d-flex justify-content-center message-header">
            <img src="{{asset('icons/accept.png')}}" alt="" />
        </div>
        <div class="text-center" style="padding: unset">
            <div id="success-message-window-title" class="message-title"></div>
            <div id="success-message-window-content" class="message-content"></div>
            <div class="message-button-area">
                <input class="message-button-focus" type="button" id="success-message-window-cancel" value="확인" />
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#success-message-window').jqxWindow({
                autoOpen: false,
                maxHeight: 225, maxWidth: 320, minHeight: 187, minWidth: 270, width: 270,
                resizable: false, isModal: true, modalOpacity: 0.3,
                cancelButton: $('#success-message-window-cancel'),
                initContent: function () {
                    $('#success-message-window-cancel').jqxButton({ width: '71px' });
                    $('#success-message-window-cancel').focus();
                }
            });
            $('#success-message-window').on('close', function (event) {
                $('#success-message-window').jqxWindow('destroy');
                $('#success-message-window-area').html(htmlSuccessMessageWindow())
            })
        });
    </script>
</div>

{{--401 message window--}}
<div id="401-error-message-window-area">
    <div id="401-error-message-window" style="padding: 16px; display: none">
        <div class="d-flex justify-content-center message-header">
            <img src="{{asset('icons/multiply.png')}}" alt="" />
        </div>
        <div class="text-center" style="padding: unset">
            <div id="401-error-message-window-title" class="message-title"></div>
            <div id="401-error-message-window-content" class="message-content"></div>
            <div class="message-button-area">
                <input class="message-button-focus" type="button" id="401-error-message-window-cancel" value="확인" />
            </div>
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $('#401-error-message-window').jqxWindow({
                autoOpen: false,
                maxHeight: 225, maxWidth: 320, minHeight: 187, minWidth: 270, width: 270,
                resizable: false, isModal: true, modalOpacity: 0.3,
                cancelButton: $('#401-error-message-window-cancel'),
                initContent: function () {
                    $('#401-error-message-window-cancel').jqxButton({ width: '71px' });
                    $('#401-error-message-window-cancel').focus();
                }
            });
            $('#401-error-message-window').on('close', function (event) {
                window.location.reload();
            })
        });
    </script>
</div>
