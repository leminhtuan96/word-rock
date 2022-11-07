function resetLockersStationsPage(station_name = '') {
    let currentTab = $('#jqxTabs').jqxTabs('selectedItem');
    $.ajax({
        url: 'lockers/lockers-stations',
        type: 'GET',
        success: function (data) {
            $('#jqxTabs').jqxTabs('setContentAt', currentTab, data);
            getLockersStations(station_name);
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

function lockersStationsSearchStations() {
    let station_name = $('#lockers-stations-filter-station-name').val() ? $('#lockers-stations-filter-station-name').val() : '';
    resetLockersStationsPage(station_name);
}

function lockersStationsRedirectDetailStation(id) {
    let new_tab_title = 'Station 상세내역';
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
            url: 'stations/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                getStationsDetail(id);
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
            url: 'stations/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                getStationsDetail(id);
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

function lockersStationsRedirectDetailLocker(id) {
    let new_tab_title = '보관함 상세내역';
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
            url: 'lockers/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                getLockersDetail(id);
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
            url: 'lockers/detail',
            type: 'GET',
            success: function (data) {
                $('#jqxTabs').jqxTabs('setContentAt', index_exist, data);
                getLockersDetail(id);
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

function showLockersStationsGrid(call_api_cnt) {
    if (call_api_cnt === 2) {
        setTimeout(function () {
            $('#lockers-stations').show();
            $('#lockers-stations-loader').jqxLoader('close');

            //splitter
            $('#lockers-stations-splitter').jqxSplitter({ width: '100%', height: PAGE_CONTENT_HEIGHT, orientation: 'horizontal', panels: [{ size: '55%', min: 150 }, { size: '45%', min: 100}]});
        }, SET_TIMEOUT_LOADER);
    }
}
