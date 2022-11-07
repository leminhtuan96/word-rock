function getDetailNotices(notice_id = '') {
    $(document).ready(function () {
        try {
            if (!$("#detail-notices-loader").length) return;
            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //loader
            $("#detail-notices-loader").jqxLoader({autoOpen: true, width: 100, height: 60, imagePosition: 'top'});

            //control
            $('#detail-notices-redirect-list').jqxButton({});



            $('#detail-notices').show();
            $('#detail-notices-loader').jqxLoader('close');

            //redirect list
            $('#detail-notices-redirect-list').on('click', function () {
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

            //previous notice
            $('#detail-notices-content-before-redirect').on('click', function () {
                let id = $(this).attr('data-id');
                resetDetailNoticesPage(id);
            })

            //next notice
            $('#detail-notices-content-after-redirect').on('click', function () {
                let id = $(this).attr('data-id');
                resetDetailNoticesPage(id);
            })

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
