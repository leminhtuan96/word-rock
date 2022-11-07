@extends('auth.layouts.master')

@push('script')
    <script type="text/javascript">
        $(document).ready(function () {
            $("#login-id").jqxInput({placeHolder: "아이디 (*)", height: 30, width: '100%', minLength: 1 });
            $("#login-password").jqxPasswordInput({ width: '100%', height: 30, placeHolder: "패스워드 (*)" });
            $("#login-remember").jqxCheckBox({ width: 120, height: 25 });
            let loginId = localStorage.getItem("loginId_world_locker");
            if (loginId) {
                $('#login-id').val(loginId);
                $("#login-remember").jqxCheckBox({ checked: true });
                $('#login-remember-hidden').val(true);
            }

            $("#login-remember").on('change', function (event) {
                let checked = event.args.checked;
                if (checked) {
                    $('#login-remember-hidden').val(checked);
                } else {
                    $('#login-remember-hidden').val('');
                }
            });

            // Create jqxValidator.
            $("#login-form").jqxValidator({
                rules: [
                    { input: "#login-id", message: "Login id is required!", action: 'keyup, blur', rule: 'required' },
                    { input: "#login-password", message: "패스워드 is required!", action: 'keyup, blur', rule: 'required' },
                    {
                        input: "#login-password", message: "패스워드 is invalid!", action: 'keyup, blur', rule: function (input, commit) {
                            let password = $("#login-password").val();
                            return password.length >= 6;
                        }
                    },
                ]
            });

            $('input').on('keypress', function (e) {
                if(e.which == 13) {
                    $('#login-form').jqxValidator('validate');
                }
            });

            $('.login-submit').on('click', function (e) {
                $('#login-form').jqxValidator('validate');
            });
            $('#login-form').on('validationSuccess', function () {
                let remember = $('#login-remember-hidden').val();
                if (remember) {
                    let loginIdNew = $('#login-id').val();
                    localStorage.setItem("loginId_world_locker", loginIdNew)
                } else {
                    localStorage.removeItem("loginId_world_locker");
                }
                $(this).submit();
            });
        });
    </script>
@endpush
@section('content')
    <style>
        .jqx-passwordinput-password-icon-light:after {
            content: '';
        }
        .jqx-validator-hint-arrow {
            background-image: url({{asset('jqwidgets/styles/images/multi-arrow.gif')}}) !important;
        }
        .jqx-validator-hint-light {
            background-color: #942724;
            height: 30px;
            padding: 5px;
        }
        .redirect-guest-create-as {
            text-decoration: none;
            color: #173C66;
            display:inline-block;
            width: 100%;
            line-height: 2;
            font-size: 16px
        }
        .redirect-guest-create-as:hover {
            text-decoration: none;
            color: #173C66;
        }
    </style>
    <div class="row login-page">
        <div class="col-sm-6 d-flex align-items-center left-login-page">
            <form id="login-form" class="col-sm-8 offset-sm-2" action="{{route('loginPost')}}" method="POST" enctype="multipart/form-data">
                @csrf
                <h1 class="mb-5">로그인</h1>
                <div class="mb-5">
                    <input name="loginId" id="login-id">
                </div>
                <div class="mb-4">
                    <input type="password" name="password" id="login-password">
                </div>
                <div class="mb-5">
                    <div id='login-remember'>
                        아이디 저장</div>
                    <input type="hidden" name="remember" id="login-remember-hidden">
                </div>
                <div class="row mb-4">
                    <div class="col-sm-6">
                        <button type="button" class="btn w-100 login-btn login-submit">로그인</button>
                    </div>
                    <div class="col-sm-6">
                        <button type="button" class="btn w-100 not-member-btn">
                            <a class="redirect-guest-create-as" style="" href="{{route('welcome', ['create_as' => 'Y'])}}">
                                비회원 작성
                            </a>
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        Don't have an account yet?
                        <a href="{{route('welcome', ['register' => 'Y'])}}">Register now</a>
                    </div>
                </div>
            </form>
        </div>
        @include('auth.inc.banner')
    </div>
@endsection
