function getEditMyProfile() {
    $(document).ready(function () {
       try {
           if (!$("#edit-my-profile-loader").length) return;
           $('input').attr('autocomplete','off');

           //stop submit
           $('form').submit(function (e) {
               e.preventDefault();
           });

           //loader
           $("#edit-my-profile-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

           //control
           $("#edit-my-profile-reset").jqxButton({});
           $("#edit-my-profile-save").jqxButton({});

           // form
           $('#edit-my-profile-change-password-submit').jqxButton({height: ROW_HEIGHT});

           // Create jqxValidator.
           $("#edit-my-profile-form").jqxValidator({
               hintType: "label",
               rules: [
                   { input: "#edit-my-profile-station-name", message: "소속 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                   {
                       input: "#edit-my-profile-level", message: "권한레벨 을(를) 입력하세요.", action: 'keyup, blur', rule: function (input, commit) {
                           let value = $("#edit-my-profile-level").val();
                           return !!value;
                       }
                   },
                   { input: "#edit-my-profile-email", message: "E-Mail 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                   { input: "#edit-my-profile-telephone", message: "연락처 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                   { input: "#edit-my-profile-mobile", message: "비상연락처 phone 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
               ]
           });

           $('#edit-my-profile-form').on('validationError', function () {
               $('#edit-my-profile-save').jqxButton({disabled: false});
           });
           $('#edit-my-profile-form').on('validationSuccess', function () {
               $("#edit-window").jqxWindow('open');
               $('#edit-window').on('close', function (event) {
                   if (event.type === 'close') {
                       if (event.args.dialogResult.OK) {
                           // click Ok
                           editMyProfile();
                       } else if (event.args.dialogResult.Cancel) {
                           // click Cancel
                           $('#edit-my-profile-save').jqxButton({disabled: false});
                       } else {
                           // click Close
                           $('#edit-my-profile-save').jqxButton({disabled: false});
                       }
                   } else {
                       $('#edit-my-profile-save').jqxButton({disabled: false});
                   }
                   $('#edit-window').jqxWindow('destroy');
                   $('#edit-window-area').html(htmlConfirmEditModal())
               });
           });

           $("#edit-my-profile-change-password-form").jqxValidator({
               hintType: "label",
               rules: [
                   { input: "#edit-my-profile-change-password-user-password", message: "패스워드 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                   {
                       input: "#edit-my-profile-change-password-user-password", message: "패스워드 is invalid!", action: 'keyup, blur', rule: function (input, commit) {
                           let password = $("#edit-my-profile-change-password-user-password").val();
                           return password.length >= 6;
                       }
                   },
                   { input: "#edit-my-profile-change-password-user-passwordConfirm", message: "패스워드 확인 을(를) 입력하세요.", action: 'keyup, blur', rule: 'required' },
                   {
                       input: "#edit-my-profile-change-password-user-passwordConfirm", message: "패스워드 should match!", action: 'keyup, blur', rule: function (input, commit) {
                           var password = $("#edit-my-profile-change-password-user-password").val();
                           var passwordConfirm = $("#edit-my-profile-change-password-user-passwordConfirm").val();
                           return password == passwordConfirm;
                       }
                   },
               ]
           });
           //change password
           $('#edit-my-profile-change-password-submit').on('click', function () {
               $('#edit-my-profile-change-password-submit').jqxButton({disabled: true});
               $('#edit-my-profile-change-password-form').jqxValidator('validate');
           })
           $('#edit-my-profile-change-password-form').on('validationError', function () {
               $('#edit-my-profile-change-password-submit').jqxButton({disabled: false});
           });
           $('#edit-my-profile-change-password-form').on('validationSuccess', function () {
               $("#edit-window").jqxWindow('open');
               $('#edit-window').on('close', function (event) {
                   if (event.type === 'close') {
                       if (event.args.dialogResult.OK) {
                           // click Ok
                           editMyProfileChangePassword();
                       } else if (event.args.dialogResult.Cancel) {
                           // click Cancel
                           $('#edit-my-profile-change-password-submit').jqxButton({disabled: false});
                       } else {
                           // click Close
                           $('#edit-my-profile-change-password-submit').jqxButton({disabled: false});
                       }
                   } else {
                       $('#edit-my-profile-change-password-submit').jqxButton({disabled: false});
                   }
                   $('#edit-window').jqxWindow('destroy');
                   $('#edit-window-area').html(htmlConfirmEditModal())
               });
           });

           //submit form
           $('#edit-my-profile-save').on('click', function () {
               $('#edit-my-profile-save').jqxButton({disabled: true});
               $('#edit-my-profile-form').jqxValidator('validate');
           });

           //reset
           $('#edit-my-profile-reset').on('click', function () {
              $('#edit-my-profile-change-password-form').trigger('reset');
              $('#edit-my-profile-change-password-form').jqxValidator('hide');
              $('#edit-my-profile-form').trigger('reset');
              $('#edit-my-profile-form').jqxValidator('hide');
           });

           setTimeout(function () {
               $('#edit-my-profile').show();
               $('#edit-my-profile-loader').jqxLoader('close');
           }, SET_TIMEOUT_LOADER);
       } catch (err) {
           console.log('Error: ', err)
       }
    });
}
