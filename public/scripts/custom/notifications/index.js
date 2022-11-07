function getNotifications() {
    $(document).ready(function () {
        //loader
        $("#notifications-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

        // dockingLayout
        // let layout = [{
        //     type: 'layoutGroup',
        //     orientation: 'horizontal',
        //     items: [{
        //         type: 'layoutGroup',
        //         orientation: 'vertical',
        //         width: '50%',
        //         minWidth: '30%',
        //         items: [{
        //             type: 'documentGroup',
        //             height: '100%',
        //             items: [{
        //                 type: 'documentPanel',
        //                 title: 'Select users',
        //                 contentContainer: 'create-notification-select-users'
        //             }]
        //         }]
        //     }, {
        //         type: 'layoutGroup',
        //         orientation: 'vertical',
        //         width: '50%',
        //         minWidth: '30%',
        //         items: [{
        //             type: 'documentGroup',
        //             height: '100%',
        //             items: [{
        //                 type: 'documentPanel',
        //                 title: 'Form push notification',
        //                 contentContainer: 'create-notification-input'
        //             }]
        //         }]
        //     }]
        // }];
        // $('#create-notification-dockingLayout').jqxDockingLayout({ width: '100%', height: 'calc(100vh - 59px - 42px - 42px - 45px)', layout: layout });


        $("#notifications-submit").jqxButton({});
        $("#notifications-reset").jqxButton({});

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '/api/notifications',
            type: 'GET',
            dataType: 'JSON',
            success: function (response) {
                console.log(response);
                if (response.code === 200) {

                    // prepare the data
                    let source =
                        {
                            localdata: response.data,
                            dataType: "array",
                            datafields:
                                [
                                    {name: 'id', type: 'number'},
                                    {name: 'title', type: 'string'},
                                    {name: 'created_by', type: 'string'},
                                    {name: 'created_at', type: 'string'},
                                    {name: 'is_read', type: 'number'}
                                ],

                            // sortcolumn: 'firstname',
                            // sortdirection: 'asc'
                        };
                    let dataAdapter = new $.jqx.dataAdapter(source);
                    // create jqxDataTable.
                    $("#notifications-dataTable").jqxDataTable(
                        {
                            source: dataAdapter,
                            pageable: true,
                            altRows: true,
                            filterable: true,
                            sortable: true,
                            height: 'auto',
                            pageSize: 20,
                            width: '100%',
                            columns: [
                                {
                                    text: 'ID',
                                    className: 'table-header-background',
                                    dataField: 'id',
                                    width: '10%'
                                },
                                {
                                    text: 'Title',
                                    className: 'table-header-background',
                                    dataField: 'title',
                                    width: '20%'
                                },
                                {
                                    text: 'Created by',
                                    className: 'table-header-background',
                                    dataField: 'created_by'
                                },
                                {
                                    text: 'Created at',
                                    className: 'table-header-background',
                                    dataField: 'created_at'
                                },
                                {
                                    text: 'Status',
                                    className: 'table-header-background',
                                    dataField: 'is_read'
                                },
                            ]
                        });
                    $('.notifications-area').show();
                    $('#notifications-loader').jqxLoader('close');
                }
            },
            error: function (err) {
                console.log('Get notifications list error ' + err);
            },
        });

        $("#notifications-reset").on('click', function () {
            resetNotifications();
        })

        function resetNotifications() {
            let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
            $.get('notifications', function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
                getNotifications();
            });
        }
    });
}
