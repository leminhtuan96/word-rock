<!DOCTYPE html>
<html lang="en">
<head>
    <title id='Description'>World Locker
    </title>
    <link rel="stylesheet" href="{{asset('jqwidgets/styles/jqx.base.css?v=20')}}" type="text/css"/>
    <link rel="stylesheet" href="{{asset('jqwidgets/styles/jqx.energyblue.css')}}" type="text/css"/>
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('icons/logo.png')}}" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="{{asset('styles/custom.css?v=20')}}" type="text/css"/>
    @stack('style')

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
    <script type="text/javascript" src="{{asset('scripts/jquery-1.12.4.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcore.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdata.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdata.export.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxtabs.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxbuttons.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxscrollbar.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxpanel.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdatatable.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcheckbox.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxlistbox.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcombobox.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdropdownlist.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxmenu.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxradiobutton.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdatetimeinput.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcalendar.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxtextarea.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxinput.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxpasswordinput.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdropdownbutton.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxcolorpicker.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxwindow.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxeditor.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxtooltip.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxribbon.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxlayout.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxdockinglayout.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxtree.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxfileupload.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.sort.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.filter.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.selection.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.edit.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.pager.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.columnsresize.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.columnsreorder.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxgrid.export.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxexport.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxloader.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxsplitter.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxtree.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxexpander.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxvalidator.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxnotification.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxwindow.js')}}"></script>
    <script type="text/javascript" src="{{asset('jqwidgets/jqxnumberinput.js')}}"></script>

{{--    <script src="https://cdn.ckeditor.com/ckeditor5/27.1.0/classic/ckeditor.js"></script>--}}

    <script type="text/javascript" src="{{asset('sampledata/generatedata.js')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/demos.js?v=20')}}"></script>

    <!-- JSZip -->
    <script type="text/javascript" src="{{asset('scripts/jszip.min.js')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/constants.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/helper.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/ajax.js?v=20')}}"></script>

    {{--function--}}
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/functions/create.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/functions/detail.js?v=24')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/functions/edit.js?v=24')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/functions/guest_create.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/functions/handle.js?v=24')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/codes/functions/index.js?v=20')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/departments/functions/index.js?v=22')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/equipments/functions/index.js?v=20')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/lockers/functions/detail.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/lockers/functions/index.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/lockers/functions/lockers_stations.js?v=20')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/notices/functions/create.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/notices/functions/detail.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/notices/functions/list.js?v=20')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/permissions/functions/index.js?v=20')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/stations/functions/detail.js?v=23')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/stations/functions/index.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/stations/functions/stations_lockers.js?v=20')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/users/functions/approval.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/users/functions/index.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/users/functions/register.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/users/functions/edit_my_profile.js?v=20')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/notifications/index.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/notifications/create.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/users/index.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/users/register.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/users/approval.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/users/edit_my_profile.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/codes/index.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/departments/index.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/notices/create.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/notices/list.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/notices/detail.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/stations/index.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/stations/stations_lockers.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/stations/detail.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/lockers/index.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/lockers/lockers_stations.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/lockers/detail.js?v=22')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/equipments/index.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/create.js?v=20')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/guest_create.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/edit.js?v=23')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/handle.js?v=25')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/after_services/detail.js?v=28')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/permissions/index.js?v=21')}}"></script>

    <script type="text/javascript" src="{{asset('scripts/custom/handle_tab.js?v=24')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/navbar.js?v=21')}}"></script>
    <script type="text/javascript" src="{{asset('scripts/custom/master.js?v=20')}}"></script>

    <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase.js"></script>
    @stack('scripts')
</head>
<body class="d-flex flex-column h-100 default" id='jqxWidget'>
@include('layouts.navbar')
<main id="main" role="main" class="container-fluid" style="margin-top: 55px;height: calc(100vh - 55px);overflow: auto;">
    {{--Modal--}}
    @include('inc.modal')
    <!--Notifications-->
    @include('inc.message')
    <div class="mt-1" id="main-splitter">
        <div class="sidebar-area overflow-auto">
            @include('layouts.sidebar')
        </div>
        <div class="content-area" style="padding: unset">
            @yield('content')
        </div>
    </div>
</main>
</body>
</html>
