let screenHeight = screen.height;
let justCreatedAS = false;

function checkMobile() {
    let isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        isMobile = true;
    }
    return isMobile;
}

function htmlCalculateRefund() {
    return '<div id="stations-fee-form-calculate-fee-window">\n' +
        '        <div>\n' +
        '            <img width="14" height="14" src="../../images/help.png" alt=""/>\n' +
        '            <span id="stations-fee-form-calculate-fee-window-title">중도  환불금 계산</span>\n' +
        '        </div>\n' +
        '        <div>\n' +
        '            <div id="stations-fee-form-calculate-fee-window-content">\n' +
        '                <form id="stations-fee-form-calculate-fee-window-content-calculate">\n' +
        '                    <div class="d-flex">\n' +
        '                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">\n' +
        '                            <label class="col-form-label" for="stations-fee-form-start-of-use">\n' +
        '                                사용 시작일\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                        <div class="size-input-sm">\n' +
        '                            <input class="form-control form-control-sm" type="date" id="stations-fee-form-start-of-use">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="d-flex">\n' +
        '                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">\n' +
        '                            <label class="col-form-label required-label" for="stations-fee-form-end-of-use">\n' +
        '                                사용 종료일\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                        <div class="size-input-sm">\n' +
        '                            <input class="form-control form-control-sm" type="date" id="stations-fee-form-end-of-use">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="d-flex">\n' +
        '                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">\n' +
        '                            <label class="col-form-label required-label" for="stations-fee-form-early-termination-date">\n' +
        '                                중도 해지 일\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                        <div class="size-input-sm">\n' +
        '                            <input class="form-control form-control-sm" type="date" id="stations-fee-form-early-termination-date">\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="d-flex">\n' +
        '                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">\n' +
        '                            <label class="col-form-label" for="stations-fee-form-refund-deposit-true">\n' +
        '                                보증금 환불 여부\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                        <div class="size-input-sm d-flex align-items-center">\n' +
        '                            <input style="margin: unset" type="radio" class="form-check-input me-1" name="refund-deposit" value="false" id="stations-fee-form-refund-deposit-false" autocomplete="off">\n' +
        '                            <label class="form-check-label me-3" for="stations-fee-form-refund-deposit-false">O</label>\n' +
        '                            <input checked style="margin: unset" type="radio" class="form-check-input me-1" name="refund-deposit" value="true" id="stations-fee-form-refund-deposit-true" autocomplete="off">\n' +
        '                            <label class="form-check-label me-3" for="stations-fee-form-refund-deposit-true">X</label>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="d-flex fw-bold">\n' +
        '                        <div class="w-100-px d-flex align-items-center justify-content-end me-1">\n' +
        '                            <label class="col-form-label" for="stations-fee-form-refund-result">\n' +
        '                                위약금:\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                        <div class="size-input-sm d-flex align-items-center">\n' +
        '                            <span class="me-1" id="stations-fee-form-refund-result">0</span>\n' +
        '                            <span>원</span>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div>\n' +
        '                <div style="float: right; margin-top: 15px; margin-bottom: 10px">\n' +
        '                    <button type="button" id="stations-fee-form-calculate-fee-window-ok" style="margin-right: 10px">\n' +
        '                        <img width="18px" src="icons/check.png">\n' +
        '                        중도 환불금 계산\n' +
        '                    </button>\n' +
        '                    <button type="button" id="stations-fee-form-calculate-fee-window-cancel">\n' +
        '                        <img width="18px" src="icons/close.png">\n' +
        '                        취소\n' +
        '                    </button>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '<script type="text/javascript">\n' +
        '    initCalculateRefundForm();\n' +
        '</script>';
}

function htmlConfirmEditModal() {
    return '<div id="edit-window">\n' +
        '        <div class="window-title-area">\n' +
        '            <div class="d-flex align-items-center">\n' +
        '                <img style="margin-top: -1px" class="me-2" src="icons/save.png" alt="" />\n' +
        '                <span id="edit-window-title" class="window-title">확인</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="window-content-area">\n' +
        '            <div id="edit-window-content" class="window-content" >저장하시겠습니까?</div>\n' +
        '            <div class="d-flex justify-content-end window-button">\n' +
        '                <input class="window-button-focus" style="margin-right: 16px;" type="button" id="edit-window-ok" value="확인" />\n' +
        '                <input class="window-button-second" type="button" id="edit-window-cancel" value="취소" />\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <script type="text/javascript">\n' +
        '        $(document).ready(function () {\n' +
        '            $(\'#edit-window\').jqxWindow({\n' +
        '                autoOpen: false,\n' +
        '                maxHeight: 180, maxWidth: 320, minHeight: 115, minWidth: 320, width: 320,\n' +
        '                resizable: false, isModal: true, modalOpacity: 0.3,\n' +
        '                okButton: $(\'#edit-window-ok\'), cancelButton: $(\'#edit-window-cancel\'),\n' +
        '                initContent: function () {\n' +
        '                    $(\'#edit-window-ok\').jqxButton({ width: \'65px\' });\n' +
        '                    $(\'#edit-window-cancel\').jqxButton({ width: \'65px\' });\n' +
        '                    $(\'#edit-window-ok\').focus();\n' +
        '                }\n' +
        '            });\n' +
        '        });\n' +
        '    </script>';
}

function htmlConfirmDeleteModal() {
    return '<div id="delete-window">\n' +
        '        <div class="window-title-area">\n' +
        '            <div class="d-flex align-items-center">\n' +
        '                <img style="margin-top: -1px" class="me-2" src="icons/trash.png" alt="" />\n' +
        '                <span id="delete-window-title" class="window-title">확인</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="window-content-area">\n' +
        '            <div id="delete-window-content" class="window-content" >삭제하시겠습니까?</div>\n' +
        '            <div class="d-flex justify-content-end window-button" style="padding: 16px; background-color: #F9F9FA">\n' +
        '                <input class="window-button-second" style="margin-right: 16px;" type="button" id="delete-window-ok" value="확인" />\n' +
        '                <input class="window-button-focus" type="button" id="delete-window-cancel" value="취소" />\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <script type="text/javascript">\n' +
        '        $(document).ready(function () {\n' +
        '            $(\'#delete-window\').jqxWindow({\n' +
        '                autoOpen: false,\n' +
        '                maxHeight: 180, maxWidth: 320, minHeight: 115, minWidth: 320, width: 320,\n' +
        '                resizable: false, isModal: true, modalOpacity: 0.3,\n' +
        '                okButton: $(\'#delete-window-ok\'), cancelButton: $(\'#delete-window-cancel\'),\n' +
        '                initContent: function () {\n' +
        '                    $(\'#delete-window-ok\').jqxButton({ width: \'65px\' });\n' +
        '                    $(\'#delete-window-cancel\').jqxButton({ width: \'65px\' });\n' +
        '                    $(\'#delete-window-ok\').focus();\n' +
        '                }\n' +
        '            });\n' +
        '        });\n' +
        '    </script>';
}

function htmlNotificationSuccess(message) {
    return '<div id="messageNotificationSuccessAjax">\n' +
        '    <div>\n' +
        message +
        '    </div>\n' +
        '</div>\n' +
        '<script type="text/javascript">\n' +
        '    $(document).ready(function () {\n' +
        '        $("#messageNotificationSuccessAjax").jqxNotification({\n' +
        '            width: 250, position: "top-right", opacity: 0.9, appendContainer: "#main-splitter",\n' +
        '            autoOpen: true, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "success"\n' +
        '        });\n' +
        '    });\n' +
        '</' +
        'script>'
}

function htmlNotificationError(message) {
    return '<div id="messageNotificationErrorAjax">\n' +
        '    <div>\n' +
        message +
        '    </div>\n' +
        '</div>\n' +
        '<script type="text/javascript">\n' +
        '    $(document).ready(function () {\n' +
        '        $("#messageNotificationErrorAjax").jqxNotification({\n' +
        '            width: 250, position: "top-right", opacity: 0.9, appendContainer: "#main-splitter",\n' +
        '            autoOpen: true, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "error"\n' +
        '        });\n' +
        '    });\n' +
        '</' +
        'script>';
}

function htmlErrorMessageWindow() {
    return '<div id="error-message-window" style="padding: 16px; display: none">\n' +
        '        <div class="d-flex justify-content-center message-header">\n' +
        '            <img src="icons/multiply.png" alt="" />\n' +
        '        </div>\n' +
        '        <div class="text-center" style="padding: unset">\n' +
        '            <div id="error-message-window-title" class="message-title"></div>\n' +
        '            <div id="error-message-window-content" class="message-content"></div>\n' +
        '            <div class="message-button-area">\n' +
        '                <input class="message-button-focus" type="button" id="error-message-window-cancel" value="확인" />\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <script type="text/javascript">\n' +
        '        $(document).ready(function () {\n' +
        '            $(\'#error-message-window\').jqxWindow({\n' +
        '                autoOpen: false,\n' +
        '                maxHeight: 225, maxWidth: 320, minHeight: 187, minWidth: 270, width: 270,\n' +
        '                resizable: false, isModal: true, modalOpacity: 0.3,\n' +
        '                cancelButton: $(\'#error-message-window-cancel\'),\n' +
        '                initContent: function () {\n' +
        '                    $(\'#error-message-window-cancel\').jqxButton({ width: \'71px\' });\n' +
        '                    $(\'#error-message-window-cancel\').focus();\n' +
        '                }\n' +
        '            });\n' +
        '            $(\'#error-message-window\').on(\'close\', function (event) {\n' +
        '                $(\'#error-message-window\').jqxWindow(\'destroy\');\n' +
        '                $(\'#error-message-window-area\').html(htmlErrorMessageWindow())\n' +
        '            })\n' +
        '        });\n' +
        '    </script>';
}

function htmlSuccessMessageWindow() {
    return '<div id="success-message-window" style="padding: 16px; display: none">\n' +
        '        <div class="d-flex justify-content-center message-header">\n' +
        '            <img src="icons/accept.png" alt="" />\n' +
        '        </div>\n' +
        '        <div class="text-center" style="padding: unset">\n' +
        '            <div id="success-message-window-title" class="message-title"></div>\n' +
        '            <div id="success-message-window-content" class="message-content"></div>\n' +
        '            <div class="message-button-area">\n' +
        '                <input class="message-button-focus" type="button" id="success-message-window-cancel" value="확인" />\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <script type="text/javascript">\n' +
        '        $(document).ready(function () {\n' +
        '            $(\'#success-message-window\').jqxWindow({\n' +
        '                autoOpen: false,\n' +
        '                maxHeight: 225, maxWidth: 320, minHeight: 187, minWidth: 270, width: 270,\n' +
        '                resizable: false, isModal: true, modalOpacity: 0.3,\n' +
        '                cancelButton: $(\'#success-message-window-cancel\'),\n' +
        '                initContent: function () {\n' +
        '                    $(\'#success-message-window-cancel\').jqxButton({ width: \'71px\' });\n' +
        '                    $(\'#success-message-window-cancel\').focus();\n' +
        '                }\n' +
        '            });\n' +
        '            $(\'#success-message-window\').on(\'close\', function (event) {\n' +
        '                $(\'#success-message-window\').jqxWindow(\'destroy\');\n' +
        '                $(\'#success-message-window-area\').html(htmlSuccessMessageWindow())\n' +
        '            })\n' +
        '        });\n' +
        '    </script>';
}

//show error
function onlyShowErrorMessage(title, content) {
    $('#error-message-window-title').html(title)
    $('#error-message-window-content').html(content)
    $("#error-message-window").jqxWindow('open');
}

//show success
function onlyShowSuccessMessage(title, content) {
    $('#success-message-window-title').html(title)
    $('#success-message-window-content').html(content)
    $("#success-message-window").jqxWindow('open');
}

//format date
function formatOnlyDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function setContentTab(url, index_selected, callbackFunction) {
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
            callbackFunction();
        },
        error: function (err) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
            }
        }
    });
}

function formatNumber(value) {
    value = String(value);
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    let val = (value / 1).toFixed('').replace('.', ',');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
