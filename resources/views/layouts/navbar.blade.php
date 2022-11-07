<nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="font-weight: bold">
    <div class="container-fluid">
        <a class="nav-item navbar-brand {{(auth()->check() && (auth()->user()->USER_LVL == config('constants.DETAIL_CODES.USER_LVL.ADMIN') || auth()->user()->USER_LVL == config('constants.DETAIL_CODES.USER_LVL.STAFF') || auth()->user()->USER_LVL == config('constants.DETAIL_CODES.USER_LVL.CALL_CENTER_STAFF'))) ? 'bar-detail-as' : ''}} navbar-brand"
           href="javascript:void(0)">
            <img height="30px" src="{{asset('images/new_logo.png')}}"/>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                @if(auth()->check())
                    @if(auth()->user()->USER_LVL == config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'))
                        <li class="nav-item bar-create-as">
                            <a class="nav-link" href="javascript:void(0)">회원 A/S 작성</a>
                        </li>
                        <li class="nav-item bar-edit-my-profile">
                            <a class="nav-link" href="javascript:void(0)">회원 정보수정</a>
                        </li>
                    @endif
                    @if(checkJoinTabPermission($edit_as_permissions) || checkJoinTabPermission($detail_as_permissions) || checkJoinTabPermission($handle_as_permissions))
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdown"
                               role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                A/S 접수
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                @if(checkJoinTabPermission($edit_as_permissions))
                                    <li><a class="nav-item dropdown-item bar-edit-as" href="javascript:void(0)">A/S
                                            접수등록</a></li>
                                @endif
                                @if(checkJoinTabPermission($detail_as_permissions))
                                    <li><a class="nav-item dropdown-item bar-detail-as" href="javascript:void(0)">A/S
                                            접수내역</a></li>
                                @endif
                                @if(checkJoinTabPermission($handle_as_permissions))
                                    <li><a class="nav-item dropdown-item bar-handle-as" href="javascript:void(0)">A/S
                                            처리등록</a></li>
                                @endif
                            </ul>
                        </li>
                    @endif
                    @if(checkJoinTabPermission($stations_permissions) || checkJoinTabPermission($stations_lockers_permissions) || checkJoinTabPermission($stations_detail_permissions))
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Station
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                @if(checkJoinTabPermission($stations_permissions))
                                    <li><a class="nav-item dropdown-item bar-stations" href="javascript:void(0)">Station
                                            등록</a></li>
                                @endif
                                @if(checkJoinTabPermission($stations_lockers_permissions))
                                    <li><a class="nav-item dropdown-item bar-stations-lockers"
                                           href="javascript:void(0)">Station 내역</a></li>
                                @endif
                                @if(checkJoinTabPermission($stations_detail_permissions))
                                    <li><a class="nav-item dropdown-item bar-stations-detail" href="javascript:void(0)">Station
                                            상세내역</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif
                    @if(checkJoinTabPermission($lockers_permissions) || checkJoinTabPermission($lockers_stations_permissions) || checkJoinTabPermission($lockers_detail_permissions) || checkJoinTabPermission($lockers_free_permissions))
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                보관함
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                @if(checkJoinTabPermission($lockers_permissions))
                                    <li><a class="nav-item dropdown-item bar-lockers" href="javascript:void(0)">보관함
                                            등록</a></li>
                                @endif
                                @if(checkJoinTabPermission($lockers_stations_permissions))
                                    <li><a class="nav-item dropdown-item bar-lockers-stations"
                                           href="javascript:void(0)">보관함 내역</a></li>
                                @endif
                                @if(checkJoinTabPermission($lockers_detail_permissions))
                                    <li><a class="nav-item dropdown-item bar-lockers-detail" href="javascript:void(0)">보관함
                                            상세내역</a></li>
                                @endif
                                @if(checkJoinTabPermission($lockers_free_permissions))
                                    <li><a class="nav-item dropdown-item" href="javascript:void(0)">보관함 요금설정</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif
                    @if(checkJoinTabPermission($register_user_permissions) || checkJoinTabPermission($approval_users_permissions) || checkJoinTabPermission($users_permissions))
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                관리자
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                @if(checkJoinTabPermission($register_user_permissions))
                                    <li><a class="nav-item dropdown-item bar-register-user" href="javascript:void(0)">관리자
                                            가입신청</a></li>
                                @endif
                                @if(checkJoinTabPermission($approval_users_permissions))
                                    <li><a class="nav-item dropdown-item bar-approval-users" href="javascript:void(0)">관리자
                                            가입승인</a></li>
                                @endif
                                @if(checkJoinTabPermission($users_permissions))
                                    <li><a class="nav-item dropdown-item bar-users" href="javascript:void(0)">관리자
                                            정보수정</a></li>
                                @endif
                            </ul>
                        </li>
                    @endif
                    @if(checkJoinTabPermission($equipments_permissions))
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                장비관리
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="nav-item dropdown-item bar-equipments" href="javascript:void(0)">장비등록</a>
                                </li>
                            </ul>
                        </li>
                    @endif
                    @if(checkJoinTabPermission($create_notice_permissions) || checkJoinTabPermission($list_notices_permissions))
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdown"
                               role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                공지사항
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                @if(checkJoinTabPermission($create_notice_permissions))
                                    <li><a class="nav-item dropdown-item bar-create-notices" href="javascript:void(0)">공지사항
                                            등록</a></li>
                                @endif
                                @if(checkJoinTabPermission($list_notices_permissions))
                                    <li><a class="nav-item dropdown-item bar-list-notices" href="javascript:void(0)">공지사항</a>
                                    </li>
                                @endif
                                {{--                        <li><a class="nav-item dropdown-item bar-detail-notices" href="javascript:void(0)">공지사항 상세</a></li>--}}
                            </ul>
                        </li>
                    @endif
                    @if(checkJoinTabPermission($departments_permissions) || checkJoinTabPermission($codes_permissions) || checkJoinTabPermission($permissions_permissions))
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdown"
                               role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                System
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                @if(checkJoinTabPermission($departments_permissions))
                                    <li><a class="nav-item dropdown-item bar-departments" href="javascript:void(0)">조직/부서
                                            관리</a></li>
                                @endif
                                @if(checkJoinTabPermission($codes_permissions))
                                    <li><a class="nav-item dropdown-item bar-codes" href="javascript:void(0)">공통코드
                                            관리</a></li>
                                @endif
                                @if(checkJoinTabPermission($permissions_permissions))
                                    <li><a class="nav-item dropdown-item bar-permissions"
                                           href="javascript:void(0)">권한관리</a></li>
                                @endif
                                @if(checkJoinTabPermission($permissions_station_fee_templates))
                                    <li><a class="nav-item dropdown-item bar-permissions-station-templates"
                                           href="javascript:void(0)">역 요금 템플릿</a></li>
                                @endif

                            </ul>
                        </li>
                    @endif

                @else
                    <li class="nav-item bar-guest-create-as">
                        <a class="nav-link" href="javascript:void(0)">비회원 A/S 작성</a>
                    </li>
                    <li class="nav-item bar-guest-register-user">
                        <a class="nav-link" href="javascript:void(0)">회원 가입신청</a>
                    </li>
                @endif
            </ul>
            <div class="d-flex right-navbar">
                {{--                <div class="ring bar-notifications" onclick="pushNotification()">--}}
                {{--                <div class="nav-item ring bar-notifications">--}}
                {{--                    <button type="button" class="btn btn-primary position-relative">--}}
                {{--                        <img src="{{asset('icons/ring.png')}}"/>--}}
                {{--                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">--}}
                {{--                        0--}}
                {{--                        <span class="visually-hidden">unread messages</span>--}}
                {{--                      </span>--}}
                {{--                    </button>--}}
                {{--                </div>--}}
                @if(auth()->check())
                    <div class="avatar" style="line-height: 2.5">
                        <img src="{{asset(auth()->user()->AVATAR ?: 'images/default_avatar.png')}}"/>
                    </div>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="dropdown">
                            <a class="nav-link dropdown-toggle" href="javascript:void(0)" id="navbarDropdown"
                               role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                안녕하세요. {{auth()->user()->USER_NAME}} 님
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="nav-item dropdown-item" href="{{route('logout')}}">Logout</a></li>
                            </ul>
                        </li>
                    </ul>
                @else
                    <div>
                        <a href="{{route('login')}}">로그인</a>
                    </div>
                @endif
            </div>
        </div>
    </div>
</nav>
<script type="text/javascript">
    $(function () {
        $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            //method 2: remove show from all siblings of all your parents
            $(this).parents('.dropdown-submenu').siblings().find('.show').removeClass("show");
            $(this).siblings().toggleClass("show");
            //collapse all after nav is closed
            $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
                $('.dropdown-submenu .show').removeClass("show");
            });
        });
    });

    const navLinks = document.querySelectorAll('.nav-item')
    const menuToggle = document.getElementById('navbarSupportedContent')
    const bsCollapse = new bootstrap.Collapse(menuToggle, {
        toggle: false
    })
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            bsCollapse.toggle()
        })
    })

    function pushNotification() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '{{route('send.notification')}}',
            type: 'POST',
            dataType: 'JSON',
            success: function (response) {
                console.log('Send notification successfully.');
            },
            error: function (err) {
                console.log('Send notification error' + err);
            },
        });
    }
</script>

