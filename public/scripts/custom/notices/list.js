function getListNotices(type = '', keyword = '') {
    $(document).ready(function () {
        try {
            if (!$("#list-notices-loader").length) return;
            $('input').attr('autocomplete','off');

            let image_types = ['gif', 'jpg', 'jpeg', 'png'];
            let excel_types = ['xlsx', 'xls', 'xlsm'];
            let doc_types = ['docx', 'doc'];
            let video_types = ['wmv', 'mov', 'avi', 'divx', 'mpeg', 'mpg', 'm4p'];
            let pdf_types = ['pdf'];
            let zip_types = ['zip', 'rar'];

            //stop submit
            $('form').submit(function (e) {
                e.preventDefault();
            });

            //loader
            $("#list-notices-loader").jqxLoader({autoOpen: true, width: 100, height: 60, imagePosition: 'top'});

            //control
            $("#list-notices-search").jqxButton({});
            $("#list-notices-redirect-create").jqxButton({});

            //filter
            $('#list-notices-filter-type').val(type ? type : 'title');
            $('#list-notices-filter-keyword').val(keyword);

        //get notices
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                url: `/api/notices/list?type=${type}&keyword=${keyword}`,
                type: 'GET',
                dataType: 'JSON',
                success: function (response) {
                    if (response.code === 200) {
                        let source =
                            {
                                datatype: "array",
                                datafields: [
                                    {name: 'ID', type: 'number'},
                                    {name: 'SUBJECT', type: 'string'},
                                    {name: 'ATTACH_FILES', type: 'string'},
                                    {name: 'DEPT_ID', type: 'number'},
                                    {name: 'DEPT_NAME', type: 'string'},
                                    {name: 'READ_CNT', type: 'number'},
                                    {name: 'CREATED_AT', type: 'string'},
                                    {name: 'USER_NAME', type: 'string'},
                                ],
                                root: "entry",
                                record: "content",
                                id: 'id',
                                localdata: response.data
                            };
                        let dataAdapter = new $.jqx.dataAdapter(source);
                        // create grid.
                        $("#list-notices-grid").jqxGrid(
                            {
                                width: 'calc(100% - 2px)',
                                source: dataAdapter,
                                sortable: true,
                                filterable: true,
                                autoheight: true,
                                pageable: true,
                                pagerheight: ROW_HEIGHT + 7,
                                pagesizeoptions: PAGE_SIZE_OPTIONS,
                                pagesize: localStorage.getItem('list-notices-pagesize') ?? PAGE_SIZE_DEFAULT,
                                columnsresize: true,
                                columnsreorder: true,
                                columnsheight: ROW_HEIGHT,
                                rowsheight: ROW_HEIGHT,
                                ready: function () {
                                    // $("#list-notices-grid").jqxGrid('selectrow', 0);
                                },
                                altrows: true,
                                columns: [
                                    {text: '번호', align: 'center', cellsalign: 'center', datafield: 'ID', width: '10%'},
                                    {text: '제목', align: 'center', datafield: 'SUBJECT', width: '35%'},
                                    {
                                        text: '첨부파일', align: 'center', cellsalign: 'center', datafield: 'ATTACH_FILES', width: '15%',
                                        cellsrenderer: function (row, columnfield, value, defaulthtml, columnproperties) {
                                            let html = '<div class="text-center">';
                                            value.split(',').forEach(function (item) {
                                                if (item) {
                                                    let extension = item.split('.')[item.split('.').length - 1];
                                                    if (excel_types.includes(extension)) {
                                                        html += '<img height="24" class="p-1" src="/icons/excel.png" />'
                                                    } else if (doc_types.includes(extension)) {
                                                        html += '<img height="24" class="p-1" src="/icons/word.png" />'
                                                    } else if (image_types.includes(extension)) {
                                                        html += '<img height="24" class="p-1" src="/icons/image.png" />'
                                                    } else if (video_types.includes(extension)) {
                                                        html += '<img height="24" class="p-1" src="/icons/video.png" />'
                                                    } else if (pdf_types.includes(extension)) {
                                                        html += '<img height="24" class="p-1" src="/icons/pdf.png" />'
                                                    } else if (zip_types.includes(extension)) {
                                                        html += '<img height="24" class="p-1" src="/icons/zip.png" />'
                                                    } else {
                                                        html += '<img height="24" class="p-1" src="/icons/file.png" />'
                                                    }
                                                }
                                            })
                                            html += '</div>';
                                            return html;
                                        }
                                    },
                                    {text: '공지부서', align: 'center', datafield: 'DEPT_NAME', width: '15%'},
                                    {text: '작성일', align: 'center', cellsalign: 'center', datafield: 'CREATED_AT', width: '15%'},
                                    {text: '조회수', align: 'center', cellsalign: 'center', datafield: 'READ_CNT', width: '10%'},
                                ]
                            });

                        setTimeout(function () {
                            $('#list-notices').show();
                            $('#list-notices-loader').jqxLoader('close');
                        }, SET_TIMEOUT_LOADER);
                    } else {
                        onlyShowErrorMessage('Error!', response.message);
                    }
                },
                error: function (err, status, errorThrown) {
                    if (err.status === 401) {
                        window.location.reload();
                    } else {
                        onlyShowErrorMessage('Error!', 'Get notices list error. Please try again!');
                        console.log('Get notices list error ' + errorThrown);
                    }
                },
            });
            //save page size
            $("#list-notices-grid").on("pagesizechanged", function (event) {
                // event arguments.
                let args = event.args;
                // new page size.
                let pagesize = args.pagesize;
                localStorage.setItem('list-notices-pagesize', pagesize);
            });

            //search
            $('#list-notices-search').on('click', function () {
                listNoticesSearchNotices();
            });
            $('#list-notices-filter-keyword').on('keypress', function (e) {
                if(e.which == 13) {
                    listNoticesSearchNotices();
                }
            });

            //redirect create notice
            $('#list-notices-redirect-create').on('click', function () {
                let new_tab_title = '공지사항 등록';
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
                    let url = 'notices/create';
                    setContentTab(url, index_selected, getCreateNotices);
                } else {
                    $('#jqxTabs').jqxTabs('select', index_exist);
                }
            });

            //redirect detail notice
            $('#list-notices-grid').on('rowclick', function (event)
            {
                let args = event.args;
                let rowData = args.row.bounddata;
                if (rowData) {
                    let new_tab_title = '공지사항 상세';
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
                            url: `notices/detail?id=${rowData.ID}`,
                            type: 'GET',
                            success: function (data) {
                                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                                getDetailNotices(rowData.ID);
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
                        $.ajax({
                            url: `notices/detail?id=${rowData.ID}`,
                            type: 'GET',
                            success: function (data) {
                                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                                getDetailNotices(rowData.ID);
                            },
                            error: function (err) {
                                if (err.status === 401) {
                                    window.location.reload();
                                } else {
                                    onlyShowErrorMessage('Error!', 'Open tab error. Please try again!');
                                }
                            }
                        });
                    }
                }
            });

            //function

        } catch (err) {
            console.log('Error: ', err)
        }

    });
}
