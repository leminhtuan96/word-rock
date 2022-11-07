function getCreateNotification() {
    $(document).ready(function () {
        //loader
        $("#create-notification-loader").jqxLoader({ autoOpen: true, width: 100, height: 60, imagePosition: 'top' });

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

        //splitter
        $('#create-notification-splitter').jqxSplitter({ width: '100%', height: 'calc(100vh - 59px - 25px)'})


        $("#create-notification-submit").jqxButton({});
        $("#create-notification-reset").jqxButton({});

        //grid
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '/api/users/get-users-to-push-notification',
            type: 'GET',
            cache : false,
            contentType : false,
            processData: false,
            dataType: 'JSON',
            success: function (response) {
                if (response.code === 200) {
                    console.log(response.data)
                    let source =
                        {
                            datatype: "array",
                            datafields: [
                                { name: 'id', type: 'number' },
                                { name: 'name', type: 'string' },
                                { name: 'email', type: 'string' },
                                { name: 'phone', type: 'string' },
                            ],
                            root: "entry",
                            record: "content",
                            id: 'id',
                            localdata: response.data
                        };
                    var dataAdapter = new $.jqx.dataAdapter(source);
                    // create grid.
                    $("#create-notification-select-users-grid").jqxGrid(
                        {
                            width: '100%',
                            source: dataAdapter,
                            sortable: true,
                            filterable: true,
                            autoheight: true,
                            pageable: true,
                            ready: function ()
                            {
                                // called when the Grid is loaded. Call methods or set properties here.
                            },
                            selectionmode: 'checkbox',
                            altrows: true,
                            columns: [
                                { text: 'ID', datafield: 'id', width: '10%' },
                                { text: 'Name', datafield: 'name', width: '30%' },
                                { text: 'Email', datafield: 'email', width: '30%'},
                                { text: 'Phone', datafield: 'phone', width: '25%' },
                            ]
                        });
                    $('#create-notification-form').show();
                    $('#create-notification-loader').jqxLoader('close');
                }

            },
            error: function (err) {
                console.log('Get users error' + err);
            },
        });

        $("#create-notification-title").jqxInput({placeHolder: "Title", height: 30, width: '80%', minLength: 1});

        $('#create-notification-description').jqxEditor({
            height: 300,
            width: '100%',
            tools: "bold italic underline | format font size | color background | left center right | outdent indent | ul ol | image | link | clean | html"
        });

        $('#create-notification-files').jqxFileUpload({browseTemplate: 'success', width: '100%', fileInputName: 'fileToUpload' });

        $('form').submit(function (e) {
            e.preventDefault();
        });
        $("#create-notification-submit").on('click', function () {
            let formData = new FormData();
            let nameFiles = [];
            $('.jqx-file-upload-file-input').each(function (index) {
                if ($(this)[0].files.length !== 0) {
                    if (!nameFiles.includes($(this)[0].files[0].name)) {
                        nameFiles.push($(this)[0].files[0].name);
                        formData.append('files[]', $(this)[0].files[0]);
                    }
                }
            });
            formData.append('title', $('#create-notification-title').val());
            formData.append('description', $('#create-notification-description').jqxEditor('val'));
            let rowindexs = $('#create-notification-select-users-grid').jqxGrid('selectedrowindexes');
            for (let i = 0; i < rowindexs.length; i++) {
                formData.append('user_ids[]', $('#create-notification-select-users-grid').jqxGrid('getcellvalue', rowindexs[i], 'id'));
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: '/api/notifications/store',
                type: 'POST',
                data: formData,
                cache : false,
                contentType : false,
                processData: false,
                dataType: 'JSON',
                success: function (response) {
                    console.log('Send notification successfully.');
                    resetCreateNotification();
                },
                error: function (err) {
                    console.log('Send notification error' + err);
                },
            });
        });

        //reset
        $('#create-notification-reset').on('click', function () {
            resetCreateNotification();
        });

        function resetCreateNotification() {
            let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
            $.get('notifications/create', function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
                getCreateNotification();
            });
        }
    });
}
