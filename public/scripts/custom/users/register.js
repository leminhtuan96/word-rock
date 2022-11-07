function getRegisterUser() {
    $(document).ready(function () {
        try {
            if (!$("#register-user-loader").length) return;
            $('input').attr('autocomplete','off');

            //loader
            $("#register-user-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

            //control
            $("#register-user-create").jqxButton({});
            $("#register-user-save").jqxButton({});

            $('#register-user-duplicate-check').jqxButton({disabled: true, height: ROW_HEIGHT});

            // Create jqxValidator.
            $("#register-user-form").jqxValidator({
                hintType: "label",
                rules: [
                    { input: "#register-user-name", message: "이름을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#register-user-email", message: "E-Mail 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#register-user-telephone", message: "연락처 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#register-user-mobile", message: "비상연락처 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    { input: "#register-user-loginId", message: "아이디 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required'},
                    {
                        input: "#register-user-area1", message: "지역 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                            let value = $("#register-user-area1").val();
                            return !!value;
                        }
                    },
                    { input: "#register-user-area2", message: "지역 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required'},
                    { input: "#register-user-station-name", message: "소속 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required'},
                    { input: "#register-user-password", message: "패스워드 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#register-user-password", message: "패스워드 is invalid!", action: 'keyup, blur', rule: function (input, commit) {
                            let password = $("#register-user-password").val();
                            return password.length >= 6;
                        }
                    },
                    { input: "#register-user-passwordConfirm", message: "패스워드 확인 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#register-user-passwordConfirm", message: "패스워드 should match!", action: 'keyup, blur', rule: function (input, commit) {
                            let firstPassword = $("#register-user-password").val();
                            let secondPassword = $("#register-user-passwordConfirm").val();
                            return firstPassword === secondPassword;
                        }
                    },
                ]
            });

            //clear create form
            $('#register-user-create').on('click', function () {
                // $('#register-user-form').jqxValidator('hide');
                // $('#register-user-form').trigger("reset");
                resetRegisterUserPage();
            })

            //check duplicate login id
            $('#register-user-loginId').on('keyup blur', function () {
                if ($(this).val().length > 0) {
                    $('#register-user-duplicate-check').jqxButton({disabled: false});
                }
            })
            $('#register-user-duplicate-check').on('click', function () {
                $('#register-user-duplicate-check').jqxButton({disabled: true});
                let formData = new FormData();
                formData.append('loginId', $('#register-user-loginId').val());

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    url: '/api/users/check-login-id',
                    type: 'POST',
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: 'JSON',
                    success: function (response) {
                        if (response.code === 200) {
                            onlyShowSuccessMessage('Success!', response.message);
                            $('#register-user-loginId').prop('readonly', true);
                        } else {
                            onlyShowErrorMessage('Error!', response.message);
                            $('#register-user-duplicate-check').jqxButton({disabled: false});
                        }
                    },
                    error: function (err, status, errorThrown) {
                        if (err.status === 401) {
                            window.location.reload();
                        } else {
                            onlyShowErrorMessage('Error!', 'Check login id error. Please try again!');
                            console.log('Check login id error' + errorThrown);
                            $('#register-user-duplicate-check').jqxButton({disabled: false});
                        }
                    },
                });
            });

            $('#register-user-form').on('validationError', function () {
                $('#register-user-save').jqxButton({disabled: false});
            });

            $('#register-user-form').on('validationSuccess', function () {
                $("#edit-window").jqxWindow('open');
                $('#edit-window').on('close', function (event) {
                    if (event.type === 'close') {
                        if (event.args.dialogResult.OK) {
                            // click Ok
                            registerUser();
                        } else if (event.args.dialogResult.Cancel) {
                            // click Cancel
                            $('#register-user-save').jqxButton({disabled: false});
                        } else {
                            // click Close
                            $('#register-user-save').jqxButton({disabled: false});
                        }
                    } else {
                        $('#register-user-save').jqxButton({disabled: false});
                    }
                    $('#edit-window').jqxWindow('destroy');
                    $('#edit-window-area').html(htmlConfirmEditModal())
                });
            });

            $('#register-user').show();
            $('#register-user-loader').jqxLoader('close');

            //submit form
            $('#register-user-save').on('click', function () {
                //check which form to submit
                if ($('#register-user-loginId').is('[readonly]')) {
                    $('#register-user-save').jqxButton({disabled: true});
                    $('#register-user-form').jqxValidator('validate');
                } else {
                    onlyShowErrorMessage('Error!', '중복 아이디를 확인해주세요!');
                    $('#register-user-loginId').focus()
                    // $('#messageNotificationAjax').html(
                    //     htmlNotificationError('중복 아이디를 확인해주세요!')
                    // );
                }
            });

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
