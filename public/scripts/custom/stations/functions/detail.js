function getStationDetailAndAS(station_id, sourceAS) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/stations/detail-and-as?id=${station_id}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                if (response.station) {
                    let station = response.station;
                    $('#stations-detail-station-id').val(station.ID);
                    $('#stations-detail-form-station-name').val(station.STATION_NAME ? station.STATION_NAME : '');
                    $('#stations-detail-form-station-repr-name').val(station.REPR_NM ? station.REPR_NM : '');
                    $('#stations-detail-form-station-group').val(station.STATION_GROUP ? station.STATION_GROUP : '');
                    $('#stations-detail-form-station-manager').val(station.MNGR_NM ? station.MNGR_NM : '');
                    $('#stations-detail-form-station-type').val(station.STATION_TYPE ? station.STATION_TYPE : '');
                    $('#stations-detail-form-station-hhld-cnt').val(station.HHLD_CNT ? station.HHLD_CNT : '');
                    $('#stations-detail-form-station-telephone').val(station.TEL_NO ? station.TEL_NO : '');
                    $('#stations-detail-form-station-reg-code').val(station.REG_CODE ? station.REG_CODE : '');
                    $('#stations-detail-form-station-ctrl-cnt').val(station.CTRL_CNT ? station.CTRL_CNT : '');
                    $('#stations-detail-form-station-mobile').val(station.MOBL_NO ? station.MOBL_NO : '');
                    $('#stations-detail-form-station-area1').val(station.AREA1_DIV ? station.AREA1_DIV : '');
                    $('#stations-detail-form-station-locker-cnt').val(station.LOCKER_CNT ? station.LOCKER_CNT : '');
                    $('#stations-detail-form-station-email').val(station.EMAIL ? station.EMAIL : '');
                    $('#stations-detail-form-station-area2').val(station.AREA2_NM ? station.AREA2_NM : '');
                    $('#stations-detail-form-station-detail-address').val(station.DTL_ADDR ? station.DTL_ADDR : '');
                    $("#stations-detail-form-station-maint-type").val(station.MAINT_TYPE ? station.MAINT_TYPE : '');
                    $("#stations-detail-form-station-maint-end-ymd").val(station.MAINT_END_YMD ? station.MAINT_END_YMD : '');
                }
                if (response.fee) {
                    updateFeeStationForm(response.fee);
                } else {
                    updateFeeStationForm(null);
                }
                sourceAS.localdata = response.as;
                $('#stations-detail-as-grid').jqxGrid('updatebounddata');

                setTimeout(function () {
                    $('#stations-detail').show();
                    $('#stations-detail-loader').jqxLoader('close');

                    //splitter
                    if (screenHeight > 700) {
                        $('#stations-detail-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: 230, min: 150 }, { min: 100}]});
                    } else {
                        $('#stations-detail-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '50%', min: 150 }, { size: '50%', min: 150}]});
                    }
                }, SET_TIMEOUT_LOADER);
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get station detail error. Please try again!');
                console.log('Get station detail error ' + errorThrown);
            }
        },
    });
}

function stationDetailShowChooseStationPopup(sourceAS, keyword) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/stations/get-by-keyword?keyword=${keyword}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                let source =
                    {
                        datatype: "array",
                        datafields: [
                            {name: 'ID', type: 'number'},
                            {name: 'STATION_NAME', type: 'string'},
                            {name: 'STATION_GROUP', type: 'string'},
                            {name: 'STATION_TYPE', type: 'number'},
                            {name: 'STATION_TYPE_NAME', type: 'string'},
                            {name: 'HHLD_CNT', type: 'number'},
                            {name: 'REG_CODE', type: 'string'},
                            {name: 'CTRL_CNT', type: 'number'},
                            {name: 'LOCKER_CNT', type: 'number'},
                            {name: 'AREA1_DIV', type: 'number'},
                            {name: 'AREA1_DIV_NAME', type: 'string'},
                            {name: 'AREA2_NM', type: 'string'},
                            {name: 'DTL_ADDR', type: 'string'},
                            {name: 'REPR_NM', type: 'string'},
                            {name: 'MNGR_NM', type: 'string'},
                            {name: 'TEL_NO', type: 'string'},
                            {name: 'MOBL_NO', type: 'string'},
                            {name: 'EMAIL', type: 'string'},
                        ],
                        root: "entry",
                        record: "content",
                        id: 'id',
                        localdata: response.data
                    };
                let dataAdapter = new $.jqx.dataAdapter(source);
                // create grid.
                $("#stations-detail-choose-station-window-content").jqxGrid(
                    {
                        width: 'calc(100% - 2px)',
                        source: dataAdapter,
                        sortable: true,
                        showfilterrow: true,
                        filterrowheight: ROW_HEIGHT + 7,
                        filterable: true,
                        autoheight: true,
                        pageable: true,
                        pagerheight: ROW_HEIGHT + 7,
                        columnsresize: true,
                        columnsreorder: true,
                        columnsheight: ROW_HEIGHT,
                        rowsheight: ROW_HEIGHT,
                        ready: function ()
                        {
                            // $("#stations-detail-choose-station-window-content").jqxGrid('selectrow', 0);
                        },
                        altrows: true,
                        columns: [
                            { text: '지역', align: 'center', datafield: 'AREA1_DIV_NAME', width: '10%'},
                            { text: '세부지역', align: 'center', datafield: 'AREA2_NM', width: '20%'},
                            { text: '구분', align: 'center', dataField: 'STATION_TYPE_NAME', width: '10%'},
                            { text: 'Station 명', align: 'center', datafield: 'STATION_NAME', width: '20%'},
                            { text: '담당자', align: 'center', datafield: 'MNGR_NM', width: '10%'},
                            { text: '대표연락처', align: 'center', datafield: 'TEL_NO', width: '15%'},
                            { text: 'Mobile', align: 'center', datafield: 'MOBL_NO', width: '15%'},
                        ]
                    });

                $("#stations-detail-choose-station-window").jqxWindow({height: (190 + (response.data.length > 0 ? (response.data.length > 10 ? 10 : response.data.length) * ROW_HEIGHT : ROW_HEIGHT))});
                $("#stations-detail-choose-station-window").jqxWindow('open');

                //handle choose parent
                $('#stations-detail-choose-station-window-ok').on('click', function () {
                    let selectedRowIndex = $('#stations-detail-choose-station-window-content').jqxGrid('getselectedrowindex');
                    let dataRecord = $("#stations-detail-choose-station-window-content").jqxGrid('getrowdata', selectedRowIndex);
                    $('#stations-detail-station-id').val(dataRecord.ID);
                    getStationDetailAndAS(dataRecord.ID, sourceAS);
                    $("#stations-detail-choose-station-window").jqxWindow('close');
                })
                $('#stations-detail-choose-station-window-content').on('rowdoubleclick', function (event)
                {
                    let args = event.args;
                    let dataRecord = args.row.bounddata;
                    $('#stations-detail-station-id').val(dataRecord.ID);
                    getStationDetailAndAS(dataRecord.ID, sourceAS);
                    $("#stations-detail-choose-station-window").jqxWindow('close');
                });
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get stations error. Please try again!');
                console.log('Get stations error ' + errorThrown);
            }
        },
    })
}

function redirectCreateStation() {
    let new_tab_title = 'Station 등록';
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
        let url = 'stations';
        setContentTab(url, index_selected, getStations);
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
    }
}

function redirectStationsLockers() {
    let new_tab_title = 'Station 내역';
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
        let url = 'stations/stations-lockers';
        setContentTab(url, index_selected, getStationsLockers);
    } else {
        $('#jqxTabs').jqxTabs('select', index_exist);
    }
}

function getFeeStationTemplate(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/stations/fee-template/${id}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                if (response.data) {
                    updateFeeStationForm(response.data)
                } else {
                    updateFeeStationForm(null)
                }
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get fee station template error. Please try again!');
                console.log('Get fee station template error ' + errorThrown);
            }
        },
    });
}

function getFeeStationTemplateByStation(id) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/stations/get-fee-template-by-station/${id}`,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                if (response.data) {
                    updateFeeStationForm(response.data)
                } else {
                    updateFeeStationForm(null)
                }
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Get fee station template error. Please try again!');
                console.log('Get fee station template error ' + errorThrown);
            }
        },
    });
}

function updateFeeStation(id) {
    let formData = new FormData();
    formData.append('station_id', id);
    formData.append('default_time', $('#stations-fee-form-default-time').val().replace(',', ''));
    formData.append('one_additional_hour', $('#stations-fee-form-one-additional-hour').val().replace(',', ''));
    formData.append('two_additional_hour', $('#stations-fee-form-two-additional-hour').val().replace(',', ''));
    formData.append('repeat_time', $('#stations-fee-form-repeat-time').val().replace(',', ''));
    formData.append('base_rate', $('#stations-fee-form-base-rate').val().replace(',', ''));
    formData.append('one_extra_charge', $('#stations-fee-form-one-extra-charge').val().replace(',', ''));
    formData.append('two_extra_charge', $('#stations-fee-form-two-extra-charge').val().replace(',', ''));
    formData.append('recurring_fee', $('#stations-fee-form-recurring-fee').val().replace(',', ''));
    formData.append('weekly_basic_rate', $('#stations-fee-form-weekly-basic-rate').val().replace(',', ''));
    formData.append('weekly_recurring_fee', $('#stations-fee-form-weekly-recurring-rate').val().replace(',', ''));
    formData.append('monthly_basic_fee', $('#stations-fee-form-monthly-basic-fee').val().replace(',', ''));
    formData.append('monthly_recurring_fee', $('#stations-fee-form-monthly-recurring-fee').val().replace(',', ''));
    formData.append('deposit', $('#stations-fee-form-deposit').val().replace(',', ''));
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url: `/api/stations/fee`,
        type: 'POST',
        data: formData,
        cache : false,
        contentType : false,
        processData: false,
        dataType: 'JSON',
        success: function (response) {
            if (response.code === 200) {
                onlyShowSuccessMessage('Success!', response.message);
            } else {
                onlyShowErrorMessage('Error!', response.message);
            }
            $('#stations-detail-save').jqxButton({disabled: false});
        },
        error: function (err, status, errorThrown) {
            if (err.status === 401) {
                window.location.reload();
            } else {
                onlyShowErrorMessage('Error!', 'Update station fee error. Please try again!');
                console.log('Update station fee error' + errorThrown);
                $('#stations-detail-save').jqxButton({disabled: false});
            }
        },
    });
}

function initCalculateRefundForm() {
    $("#stations-fee-form-calculate-fee-window").jqxWindow({
        width: 300, height: 255, resizable: false,  isModal: true, autoOpen: false, cancelButton: $("#stations-fee-form-calculate-fee-window-cancel"), modalOpacity: 0.01
    });
    $('#stations-fee-form-calculate-fee-window-ok').jqxButton({});
    $('#stations-fee-form-calculate-fee-window-cancel').jqxButton({});

    $("#stations-fee-form-calculate-fee-window-content-calculate").jqxValidator({
        hintType: "label",
        rules: [
            {
                input: "#stations-fee-form-end-of-use",
                message: "사용 종료일 입력하세요.",
                action: 'keyup, blur',
                rule: function (input) {
                    return !!input.val();
                }
            },
            {
                input: "#stations-fee-form-early-termination-date",
                message: "중도 해지 일 입력하세요.",
                action: 'keyup, blur',
                rule: function (input) {
                    return !!input.val();
                }
            },
            {
                input: "#stations-fee-form-early-termination-date",
                message: "중도 해지 일 invalid.",
                action: 'keyup, blur',
                rule: function (input) {
                    return input.val() <= $("#stations-fee-form-end-of-use").val();
                }
            },
        ]
    });

    $("#stations-detail-redirect-fee").on('click', function () {
        if ($("#stations-detail-station-id").val()) {
            $("#stations-fee-form-calculate-fee-window").jqxWindow('open');
        }
    })
    $("#stations-fee-form-calculate-fee-window-ok").on('click', function () {
        $(this).jqxButton({disabled: true});
        $("#stations-fee-form-calculate-fee-window-content-calculate").jqxValidator('validate');
    });
    //error validate
    $('#stations-fee-form-calculate-fee-window-content-calculate').on('validationError', function () {
        $('#stations-fee-form-calculate-fee-window-ok').jqxButton({disabled: false});
    });
    //success validate
    $('#stations-fee-form-calculate-fee-window-content-calculate').on('validationSuccess', function () {
        calculateRefund();
        $('#stations-fee-form-calculate-fee-window-ok').jqxButton({disabled: false});
    });
    //close
    $('#stations-fee-form-calculate-fee-window').on('close', function (event) {
        $('#stations-fee-form-calculate-fee-window').jqxWindow('destroy');
        $('#stations-fee-form-calculate-fee-window-area').html(htmlCalculateRefund())
    });
}

function calculateRefund() {
    const refundDeposit = $("input[type='radio'][name='refund-deposit']:checked").val();
    const deposit = $("#stations-fee-form-deposit").val().replace(',', '');
    const monthlyBasicFee = $("#stations-fee-form-monthly-basic-fee").val().replace(',', '');
    const endOfUse = new Date($("#stations-fee-form-end-of-use").val());
    const earlyTerminationDate = new Date($("#stations-fee-form-early-termination-date").val());
    const diffTime = Math.abs(endOfUse - earlyTerminationDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let result;
    if (refundDeposit === 'true') {
        result = Math.round(+deposit + (diffDays * +monthlyBasicFee / 30));
    } else {
        result = Math.round(diffDays * +monthlyBasicFee / 30);
    }
    $("#stations-fee-form-refund-result").text(formatNumber(result));
}

function updateFeeStationForm(data) {
    if (data) {
        $('#stations-fee-form-default-time').val(data.DEFAULT_TIME ? formatNumber(data.DEFAULT_TIME) : 0);
        $('#stations-fee-form-one-additional-hour').val(data.ONE_ADDITIONAL_HOUR ? formatNumber(data.ONE_ADDITIONAL_HOUR) : 0);
        $('#stations-fee-form-two-additional-hour').val(data.TWO_ADDITIONAL_HOUR ? formatNumber(data.TWO_ADDITIONAL_HOUR) : 0);
        $('#stations-fee-form-repeat-time').val(data.REPEAT_TIME ? formatNumber(data.REPEAT_TIME) : 0);
        $('#stations-fee-form-base-rate').val(data.BASE_RATE ? formatNumber(data.BASE_RATE) : 0);
        $('#stations-fee-form-one-extra-charge').val(data.ONE_EXTRA_CHARGE ? formatNumber(data.ONE_EXTRA_CHARGE) : 0);
        $('#stations-fee-form-two-extra-charge').val(data.TWO_EXTRA_CHARGE ? formatNumber(data.TWO_EXTRA_CHARGE) : 0);
        $('#stations-fee-form-recurring-fee').val(data.RECURRING_FEE ? formatNumber(data.RECURRING_FEE) : 0);
        $('#stations-fee-form-weekly-basic-rate').val(data.WEEKLY_BASIC_RATE ? formatNumber(data.WEEKLY_BASIC_RATE) : 0);
        $('#stations-fee-form-weekly-recurring-rate').val(data.WEEKLY_RECURRING_FEE ? formatNumber(data.WEEKLY_RECURRING_FEE) : 0);
        $('#stations-fee-form-monthly-basic-fee').val(data.MONTHLY_BASIC_FEE ? formatNumber(data.MONTHLY_BASIC_FEE) : 0);
        $('#stations-fee-form-monthly-recurring-fee').val(data.MONTHLY_RECURRING_FEE ? formatNumber(data.MONTHLY_RECURRING_FEE) : 0);
        $('#stations-fee-form-deposit').val(data.DEPOSIT ? formatNumber(data.DEPOSIT) : 0);
    } else {
        $('#stations-fee-form-default-time').val(0);
        $('#stations-fee-form-one-additional-hour').val(0);
        $('#stations-fee-form-two-additional-hour').val(0);
        $('#stations-fee-form-repeat-time').val(0);
        $('#stations-fee-form-base-rate').val(0);
        $('#stations-fee-form-one-extra-charge').val(0);
        $('#stations-fee-form-two-extra-charge').val(0);
        $('#stations-fee-form-recurring-fee').val(0);
        $('#stations-fee-form-weekly-basic-rate').val(0);
        $('#stations-fee-form-weekly-recurring-rate').val(0);
        $('#stations-fee-form-monthly-basic-fee').val(0);
        $('#stations-fee-form-monthly-recurring-fee').val(0);
        $('#stations-fee-form-deposit').val(0);
    }
}
