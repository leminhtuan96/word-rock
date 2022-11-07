<!DOCTYPE html>
<html lang="en">
<head>
    <title id="Description">
        {{Route::currentRouteName() == 'login' ? 'Sign in ' : 'Sign up '}} world stock
    </title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{asset('jqwidgets/styles/jqx.base.css')}}" type="text/css"/>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="{{asset('styles/auth-custom.css')}}" type="text/css" />

    <script type="text/javascript" src="{{asset('scripts/jquery-1.12.4.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcore.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdata.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxinput.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxpasswordinput.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxtooltip.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcheckbox.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdatetimeinput.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcalendar.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/globalization/globalize.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxbuttons.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxscrollbar.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxlistbox.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdropdownlist.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxexpander.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxvalidator.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxnotification.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxtextarea.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxeditor.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdropdownbutton.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxfileupload.js')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/demos.js')}}"></script>

    @stack('script')
</head>
<body>
<div class="container-fluid">
    <!--Notifications-->
    @include('auth.inc.message')

    @yield('content')

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</div>
</body>
</html>
