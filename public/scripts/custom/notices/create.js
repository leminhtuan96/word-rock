function getCreateNotices() {
    $(document).ready(function () {
        try {
            if (!$("#create-notices-loader").length) return;
            $('input').attr('autocomplete','off');
            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //loader
            $("#create-notices-loader").jqxLoader({autoOpen: true, width: 100, height: 60, imagePosition: 'top'});

            //control
            $("#create-notices-reset").jqxButton({});
            $("#create-notices-save").jqxButton({});
            $("#create-notices-redirect-list").jqxButton({});

            //create form
            $('#create-notices-content').jqxEditor({
                height: 300,
                width: '100%',
                tools: "bold italic underline | format font size | color background | left center right | outdent indent | ul ol | image | link | clean | html"
            });
            $('#create-notices-attachments').jqxFileUpload({
                browseTemplate: 'success',
                width: '100%',
                fileInputName: 'fileToUpload'
            });
            $('input').on('keypress', function (e) {
                if(e.which == 13) {
                    e.preventDefault();
                }
            });

            // Create jqxValidator.
            $("#create-notices-form").jqxValidator({
                hintType: "label",
                rules: [
                    {input: "#create-notices-name", message: "제목 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required'},
                    {
                        input: "#create-notices-content", message: "공지내용 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit)
                        {
                            let html = $('#create-notices-content').val();
                            let div = document.createElement("div");
                            div.innerHTML = html;
                            let editorValue = div.textContent || div.innerText || "";
                            let charCode = editorValue.charCodeAt(0);
                            return !(editorValue.length === 1 && charCode === 8203 || editorValue === "" || editorValue === '');
                        }
                    },
                ]
            });

            $('#create-notices-form').on('validationError', function () {
                $('#create-notices-save').jqxButton({disabled: false});
            });
            $('#create-notices-form').on('validationSuccess', function () {
                $('#create-notices-save').jqxButton({disabled: true});
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            createNoticesSubmit();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#create-notices-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#create-notices-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#create-notices-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            $('#create-notices-loader').jqxLoader('close');
            $('#create-notices').show();

            //reset
            $('#create-notices-reset').on('click', function () {
                resetCreateNoticesPage();
            })

            //save
            $('#create-notices-save').on('click', function () {
                $('#create-notices-form').jqxValidator('validate');
            })

            //redirect list notice
            $('#create-notices-redirect-list').on('click', function () {
                let new_tab_title = '공지사항';
                let index_exist = null;
                //check tab exist
                $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
                    let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
                    if (title === new_tab_title) {
                        index_exist = index;
                        return false;
                    }
                });
                if (index_exist === null) {
                    $('#jqxTabs').jqxTabs('addLast', new_tab_title, '');
                    $('#jqxTabs').jqxTabs('ensureVisible', -1);
                    let index_selected = $("#jqxTabs").val();
                    let url = 'notices/list';
                    setContentTab(url, index_selected, getListNotices);
                } else {
                    $('#jqxTabs').jqxTabs('select', index_exist);
                }
            });

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    })
}
