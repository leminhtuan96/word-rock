{{--submit nomal--}}
@if (session()->has('success'))
    <div id="messageNotificationSuccess">
        <div>
            {!! session()->get('success') !!}
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#messageNotificationSuccess").jqxNotification({
                width: 250, position: "top-left", opacity: 0.9,
                autoOpen: true, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "success"
            });
        });
    </script>
@endif
@if (session()->has('error'))
    <div id="messageNotificationError">
        <div>
            {!! session()->get('error') !!}
        </div>
    </div>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#messageNotificationError").jqxNotification({
                width: 250, position: "top-left", opacity: 0.9,
                autoOpen: true, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "error"
            });
        });
    </script>
@endif

{{--submit ajax--}}
<div id="messageNotificationAjax"></div>
