function getCreateAS() {
    $(document).ready(function () {
        try {
            if (!$("#create-as-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#create-as-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#create-as-reset").jqxButton({});
            $("#create-as-save").jqxButton({});


            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //create form
            // $('#create-as-ask-remark').jqxEditor({
            //     height: 200,
            //     width: '100%',
            //     tools: "bold italic underline | format font size | color background | left center right | outdent indent | ul ol | link | clean | html"
            // });
            $('#create-as-images').jqxFileUpload({
                browseTemplate: 'success',
                width: '100%',
                fileInputName: 'fileToUpload',
                accept: 'image/*'
            });
            $('input').on('keypress', function (e) {
                if(e.which == 13) {
                    e.preventDefault();
                }
            });

            // Create jqxValidator.
            $("#create-as-form").jqxValidator({
                hintType: "label",
                rules: [
                    {
                        input: "#create-as-ask-type", message: "문의유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#create-as-ask-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#create-as-defect-type", message: "하자유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#create-as-defect-type").val();
                            return !!value;
                        }
                    },
                    { input: "#create-as-telephone", message: "연락처 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#create-as-locker-id", message: "보관함명 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#create-as-locker-id").val();
                            return !!value;
                        }
                    },
                ]
            });

            $('#create-as-form').on('validationError', function () {
                $('#create-as-save').jqxButton({disabled: false});
            });

            $('#create-as-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            createAS();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#create-as-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#create-as-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#create-as-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            $('#create-as').show();
            $('#create-as-loader').jqxLoader('close');

            //handle images
            $('#create-as-images').on('select', function (event) {
                $('#create-as-preview').html('');
                $('.jqx-file-upload-file-input').each(function (index) {
                    if ($(this)[0].files.length !== 0) {
                        $('#create-as-preview').append(
                            '<img data-id="' + $(this)[0].files[0].name + '" src="' + URL.createObjectURL($(this)[0].files[0]) + '" height="100px" />\n'
                        )
                    }
                });
            })
            $('#create-as-images').on('remove', function (event) {
                let fileNameRemove = event.args.file;
                $('#create-as-preview').children('img').each(function (index) {
                    if ($(this).attr('data-id') === fileNameRemove) {
                        $(this).remove();
                    }
                });
            })

            //submit
            $('#create-as-save').on('click', function () {
                $('#create-as-save').jqxButton({disabled: true});
                $('#create-as-form').jqxValidator('validate');
            });

            //reset
            $('#create-as-reset').on('click', function () {
                resetCreateASPage();
            })
        } catch (err) {
            console.log('Error: ', err)
        }

    });

}
