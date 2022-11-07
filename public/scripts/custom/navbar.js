$(document).ready(function () {
    let today = formatOnlyDate(new Date());
    $('.bar-logo').on('click', function () {
        let new_tab_title = 'A/S 접수내역';
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
            $.ajax({
                url: 'as/detail',
                type: 'GET',
                success: function (data) {
                    $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                    getDetailAS('', today, today, '', 'Y');
                },
                error: function (err) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
                    }
                }
            });
        } else {
            $('#jqxTabs').jqxTabs('select', index_exist);
        }
    });
});
