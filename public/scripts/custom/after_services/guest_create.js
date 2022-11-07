function getGuestCreateAS() {
    $(document).ready(function () {
        try {
            if (!$("#guest-create-as-loader").length) return;
            $('input').attr('autocomplete','off');
            //loader
            $("#guest-create-as-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#guest-create-as-reset").jqxButton({});
            $("#guest-create-as-save").jqxButton({});


            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //create form
            // $('#guest-create-as-ask-remark').jqxEditor({
            //     height: 200,
            //     width: '100%',
            //     tools: "bold italic underline | format font size | color background | left center right | outdent indent | ul ol | link | clean | html"
            // });
            $('#guest-create-as-images').jqxFileUpload({
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
            $("#guest-create-as-form").jqxValidator({
                hintType: "label",
                rules: [
                    {
                        input: "#guest-create-as-ask-type", message: "문의유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#guest-create-as-ask-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#guest-create-as-defect-type", message: "하자유형 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#guest-create-as-defect-type").val();
                            return !!value;
                        }
                    },
                    {
                        input: "#guest-create-as-station-area1", message: "지역 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#guest-create-as-station-area1").val();
                            return !!value;
                        }
                    },
                    { input: "#guest-create-as-station-area2", message: "지역 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#guest-create-as-location-name", message: "소속 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#guest-create-as-email", message: "E-Mail invalid!", action: 'keyup, blur', rule: 'email' },
                ]
            });

            $('#guest-create-as-form').on('validationError', function () {
                $('#guest-create-as-save').jqxButton({disabled: false});
            });

            $('#guest-create-as-form').on('validationSuccess', function () {
                if (!$('#guest-create-as-telephone').val() && !$('#guest-create-as-email').val()) {
                    onlyShowErrorMessage('Error!', '연락처나 이메일 중에 하나는 반드시 입력하셔야 합니다.');
                    $('#guest-create-as-save').jqxButton({disabled: false});
                    return;
                }
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            guestCreateAS();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#guest-create-as-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#guest-create-as-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#guest-create-as-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            $('#guest-create-as').show();
            $('#guest-create-as-loader').jqxLoader('close');

            //handle images
            $('#guest-create-as-images').on('select', function (event) {
                $('#guest-create-as-preview').html('');
                $('.jqx-file-upload-file-input').each(function (index) {
                    if ($(this)[0].files.length !== 0) {
                        $('#guest-create-as-preview').append(
                            '<img data-id="' + $(this)[0].files[0].name + '" src="' + URL.createObjectURL($(this)[0].files[0]) + '" height="100px" />\n'
                        )
                    }
                });
            })
            $('#guest-create-as-images').on('remove', function (event) {
                let fileNameRemove = event.args.file;
                $('#guest-create-as-preview').children('img').each(function (index) {
                    if ($(this).attr('data-id') === fileNameRemove) {
                        $(this).remove();
                    }
                });
            })

            //submit
            $('#guest-create-as-save').on('click', function () {
                $('#guest-create-as-save').jqxButton({disabled: true});
                $('#guest-create-as-form').jqxValidator('validate');
            });

            //reset
            $('#guest-create-as-reset').on('click', function () {
                resetGuestCreateASPage();
            })

            //function
        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
