$(document).ready(function () {
    try {
        $('#jqxTabs').jqxTabs({ height: 'calc(100vh - 70px)', showCloseButtons: true, reorder: true, theme:'energyblue'});
        //init tab
        $('#jqxTabs').jqxTabs('select', 0);

        //close-all-tabs-btn
        $('#close-all-tabs-btn').jqxButton({height: ROW_HEIGHT});
        $('#close-all-tabs-btn').on('click', function () {
            const lengthTabs = $('#jqxTabs').jqxTabs('length');
            let i = 0;
            while (i < lengthTabs) {
                $('#jqxTabs').jqxTabs('removeAt', 0);
                i++;
            }
        })


        let today = formatOnlyDate(new Date());
        let params = (new URL(document.location)).searchParams;

        //check user
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            url: `/api/auth/get-info`,
            type: 'GET',
            dataType: 'JSON',
            success: function (response) {
                if (response.code === 200) {
                    let userInfo = response.data;
                    if (userInfo) {
                        if (userInfo.USER_LVL === DETAIL_CODES.USER_LVL.APARTMENT_MANAGER) {
                            let url = 'as/create';
                            setContentTab(url, 0, getCreateAS);
                        } else {
                            $.ajax({
                                url: 'as/detail',
                                type: 'GET',
                                success: function (data) {
                                    $('#jqxTabs').jqxTabs('setContentAt', 0, data);
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
                            let create_as = params.get("create_as");
                            if (create_as) {
                                openCreateAsTab();
                            }
                        }
                    } else {
                        let url = 'as/guest-create';
                        setContentTab(url, 0, getGuestCreateAS);
                        //register
                        let register = params.get("register");
                        if (register) {
                            // window.history.replaceState(null, null, window.location.pathname);
                            openRegisterUserTab('회원 가입신청');
                        }
                    }
                } else {
                    onlyShowErrorMessage('Error!', response.message);
                }
            },
            error: function (err, status, errorThrown) {
                if (err.status === 401) {
                    window.location.reload();
                } else {
                    onlyShowErrorMessage('Error!', 'Get info user error. Please try again!');
                    console.log('Get info user error ' + errorThrown);
                }
            },
        });

        //notifications
        $(document).on('click','.bar-notifications', function () {
            let new_tab_title = 'Notifications';
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
                $.get('notifications', function (data) {
                    $('#jqxTabs').jqxTabs('addLast', new_tab_title, data);
                    $('#jqxTabs').jqxTabs('ensureVisible', -1);
                    getNotifications();
                });
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //create notification
        $(document).on('click','.bar-create-notification', function () {
            let new_tab_title = 'Create notification';
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
                $.get('notifications/create', function (data) {
                    $('#jqxTabs').jqxTabs('addLast', new_tab_title, data);
                    $('#jqxTabs').jqxTabs('ensureVisible', -1);
                    getCreateNotification();
                });
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //users
        $(document).on('click','.bar-users', function () {
            let new_tab_title = '관리자 정보수정';
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
                let url = 'users';
                setContentTab(url, index_selected, getUsers);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-register-user', function () {
            openRegisterUserTab('관리자 가입신청');
        });
        $(document).on('click','.bar-guest-register-user', function () {
            openRegisterUserTab('회원 가입신청');
        });
        $(document).on('click','.bar-approval-users', function () {
            let new_tab_title = '관리자 가입승인';
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
                let url = 'users/approval-users';
                setContentTab(url, index_selected, getApprovalUsers);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-edit-my-profile', function () {
            let new_tab_title = '회원 정보수정';
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
                let url = 'users/edit-my-profile';
                setContentTab(url, index_selected, getEditMyProfile);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //codes
        $(document).on('click','.bar-codes', function () {
            let new_tab_title = '공통코드 관리';
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
                let url = 'codes';
                setContentTab(url, index_selected, getCodes);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //departments
        $(document).on('click','.bar-departments', function () {
            let new_tab_title = '조직/부서 관리';
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
                let url = 'departments';
                setContentTab(url, index_selected, getDepartments);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //notices
        $(document).on('click','.bar-list-notices', function () {
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
        $(document).on('click','.bar-create-notices', function () {
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
        $(document).on('click','.bar-detail-notices', function () {
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
                let url = 'notices/detail';
                setContentTab(url, index_selected, getDetailNotices);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //stations
        $(document).on('click','.bar-stations', function () {
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
                let url = `stations`;
                setContentTab(url, index_selected, getStations);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-stations-lockers', function () {
            let new_tab_title = 'Station 내역';
            let index_exist = null;
            //check tab exist
            $('#jqxTabs .jqx-tabs-headerWrapper ul li').each(function (index) {
                let title = $(this).find('.jqx-tabs-titleContentWrapper').text();
                if (title === new_tab_title ) {
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
        });
        $(document).on('click','.bar-stations-detail', function () {
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
                let url = 'stations/detail';
                setContentTab(url, index_selected, getStationsDetail);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //lockers
        $(document).on('click','.bar-lockers', function () {
            let new_tab_title = '보관함 등록';
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
                let url = 'lockers';
                setContentTab(url, index_selected, getLockers);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-lockers-stations', function () {
            let new_tab_title = '보관함 내역';
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
                let url = 'lockers/lockers-stations';
                setContentTab(url, index_selected, getLockersStations);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-lockers-detail', function () {
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
                let url = 'lockers/detail';
                setContentTab(url, index_selected, getLockersDetail);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //equipments
        $(document).on('click','.bar-equipments', function () {
            let new_tab_title = '장비등록';
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
                let url = 'equipments';
                setContentTab(url, index_selected, getEquipments);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //as
        $(document).on('click','.bar-create-as', function () {
            openCreateAsTab();
        });
        $(document).on('click','.bar-guest-create-as', function () {
            let new_tab_title = '비회원 A/S 작성';
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
                let url = 'as/guest-create';
                setContentTab(url, index_selected, getGuestCreateAS);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-edit-as', function () {
            let new_tab_title = 'A/S 접수등록';
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
                let url = `as/edit?start=${today}&end=${today}&except_complete=Y`;
                setContentTab(url, index_selected, getEditAS);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-handle-as', function () {
            let new_tab_title = 'A/S 처리등록';
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
                let url = `as/handle?start=${today}&end=${today}&except_complete=Y`;
                setContentTab(url, index_selected, getHandleAS);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });
        $(document).on('click','.bar-detail-as', function () {
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
                let url = `as/detail`;
                $.ajax({
                    url: url,
                    type: 'GET',
                    success: function (data) {
                        $('#jqxTabs').jqxTabs('setContentAt', index_selected, data);
                        getDetailAS('', today, today, '', 'Y')
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

        //permissions
        $(document).on('click','.bar-permissions', function () {
            let new_tab_title = '권한관리';
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
                let url = `permissions`;
                setContentTab(url, index_selected, getPermissions);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        });

        //clear validation when change tab
        $('#jqxTabs').on('selecting', function (event) {
            $('form').jqxValidator('hide');
        });

        //clear window when close tab
        $('#jqxTabs').on('removed', function (event) {
            let titleCloseTab = event.args.title;
            //as
            if (titleCloseTab === 'A/S 접수등록') {
                if ($("#edit-as-form-choose-locker-window").length) $('#edit-as-form-choose-locker-window').jqxWindow('destroy');
            }
            if (titleCloseTab === 'A/S 처리등록') {
                if ($("#handle-as-form-choose-locker-window").length) $('#handle-as-form-choose-locker-window').jqxWindow('destroy');
            }
            //station
            if (titleCloseTab === 'Station 상세내역') {
                if ($("#stations-detail-choose-station-window").length) $('#stations-detail-choose-station-window').jqxWindow('destroy');
            }
            if (titleCloseTab === 'Station 상세내역') {
                if ($("#stations-fee-form-calculate-fee-window").length) $('#stations-fee-form-calculate-fee-window').jqxWindow('destroy');
            }
            //locker
            if (titleCloseTab === '보관함 등록') {
                if ($("#lockers-create-choose-station-window").length) $('#lockers-create-choose-station-window').jqxWindow('destroy');
                if ($("#lockers-edit-choose-station-window").length) $('#lockers-edit-choose-station-window').jqxWindow('destroy');
            }
            if (titleCloseTab === '보관함 상세내역') {
                if ($("#lockers-detail-choose-locker-window").length) $('#lockers-detail-choose-locker-window').jqxWindow('destroy');
            }
            //user
            if (titleCloseTab === '관리자 가입승인') {
                if ($("#approval-users-choose-station-window").length) $('#approval-users-choose-station-window').jqxWindow('destroy');
            }
            //department
            if (titleCloseTab === '조직/부서 관리') {
                if ($("#departments-create-parent-window").length) $('#departments-create-parent-window').jqxWindow('destroy');
                if ($("#departments-edit-parent-window").length) $('#departments-edit-parent-window').jqxWindow('destroy');
            }
            //codes
            if (titleCloseTab === '공통코드 관리') {
                if ($("#detail-codes-popup-edit").length) $('#detail-codes-popup-edit').jqxWindow('destroy');
                if ($("#master-codes-popup-edit").length) $('#master-codes-popup-edit').jqxWindow('destroy');
            }
        });

        //click tab
        $('#jqxTabs').on('selected', function (event)
        {
            const selectedTab = event.args.item;
            const title = $('#jqxTabs').jqxTabs('getTitleAt', selectedTab);
            if (title === 'A/S 접수내역' && justCreatedAS) {
                justCreatedAS = false;
                searchDetailAS();
            }
        });

        //function
        function openRegisterUserTab(new_tab_title) {
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
                let url = `users/register`;
                setContentTab(url, index_selected, getRegisterUser);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        }

        function openCreateAsTab() {
            let new_tab_title = '회원 A/S 작성';
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
                let url = `as/create`;
                setContentTab(url, index_selected, getCreateAS);
            } else {
                $('#jqxTabs').jqxTabs('select', index_exist);
            }
        }
    } catch (err) {
        console.log('Error: ', err)
    }
});
