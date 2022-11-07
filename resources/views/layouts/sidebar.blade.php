<div style="border: none;" id='sidebar-tree'>
    <ul>
        @if(auth()->check())
            @if(auth()->user()->USER_LVL == config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'))
                <li class="bar-create-as">
                    <img style='float: left; margin-right: 5px;' src='{{asset('images/contactsIcon.png')}}'/><span
                        item-title="true">회원 A/S 작성</span>
                </li>
                <li class="bar-edit-my-profile">
                    <img style='float: left; margin-right: 5px;' src='{{asset('images/contactsIcon.png')}}'/><span
                        item-title="true">회원 정보수정</span>
                </li>
            @endif
            @if(checkJoinTabPermission($edit_as_permissions) || checkJoinTabPermission($detail_as_permissions) || checkJoinTabPermission($handle_as_permissions))
                <li>
                    <img style='float: left; margin-right: 5px;' src='{{asset('images/folder.png')}}'/>
                    <span item-title="true">A/S 접수</span>
                    <ul>
                        @if(checkJoinTabPermission($edit_as_permissions))
                            <li class="bar-edit-as">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">A/S 접수등록</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($detail_as_permissions))
                            <li class="bar-detail-as">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">A/S 접수내역</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($handle_as_permissions))
                            <li class="bar-handle-as">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">A/S 처리등록</span>
                            </li>
                        @endif
                    </ul>
                </li>
            @endif
            @if(checkJoinTabPermission($stations_permissions) || checkJoinTabPermission($stations_lockers_permissions) || checkJoinTabPermission($stations_detail_permissions))
                <li>
                    <img style='float: left; margin-right: 5px;' src="{{asset('images/folder.png')}}"/>
                    <span item-title="true">Stations</span>
                    <ul>
                        @if(checkJoinTabPermission($stations_permissions))
                            <li class="bar-stations">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">Station 등록</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($stations_lockers_permissions))
                            <li class="bar-stations-lockers">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">Station 내역</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($stations_detail_permissions))
                            <li class="bar-stations-detail">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">Station 상세내역</span>
                            </li>
                        @endif
                    </ul>
                </li>
            @endif
            @if(checkJoinTabPermission($lockers_permissions) || checkJoinTabPermission($lockers_stations_permissions) || checkJoinTabPermission($lockers_detail_permissions) || checkJoinTabPermission($lockers_free_permissions))
                <li>
                    <img style='float: left; margin-right: 5px;' src="{{asset('images/folder.png')}}"/>
                    <span item-title="true">보관함</span>
                    <ul>
                        @if(checkJoinTabPermission($lockers_permissions))
                            <li class="bar-lockers">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">보관함 등록</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($lockers_stations_permissions))
                            <li class="bar-lockers-stations">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">보관함 내역</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($lockers_detail_permissions))
                            <li class="bar-lockers-detail">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">보관함 상세내역</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($lockers_free_permissions))
                            <li class="">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">보관함 요금설정</span>
                            </li>
                        @endif
                    </ul>
                </li>
            @endif
            @if(checkJoinTabPermission($register_user_permissions) || checkJoinTabPermission($approval_users_permissions) || checkJoinTabPermission($users_permissions))
                <li>
                    <img style='float: left; margin-right: 5px;' src="{{asset('images/folder.png')}}"/>
                    <span item-title="true">관리자</span>
                    <ul>
                        @if(checkJoinTabPermission($register_user_permissions))
                            <li class="bar-register-user">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">관리자 가입신청</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($approval_users_permissions))
                            <li class="bar-approval-users">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">관리자 가입승인</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($users_permissions))
                            <li class="bar-users">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">관리자 정보수정</span>
                            </li>
                        @endif
                    </ul>
                </li>
            @endif
            @if(checkJoinTabPermission($equipments_permissions))
                <li>
                    <img style='float: left; margin-right: 5px;' src="{{asset('images/folder.png')}}"/>
                    <span item-title="true">장비관리</span>
                    <ul>
                        <li class="bar-equipments">
                            <img style='float: left; margin-right: 5px;' src='{{asset('images/contactsIcon.png')}}'/>
                            <span item-title="true">장비등록</span>
                        </li>
                    </ul>
                </li>
            @endif
            @if(checkJoinTabPermission($create_notice_permissions) || checkJoinTabPermission($list_notices_permissions))
                <li class="">
                    <img style='float: left; margin-right: 5px;' src="{{asset('images/folder.png')}}"/>
                    <span item-title="true">공지사항</span>
                    <ul>
                        @if(checkJoinTabPermission($create_notice_permissions))
                            <li class="bar-create-notices">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">공지사항 등록</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($list_notices_permissions))
                            <li class="bar-list-notices">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">공지사항</span>
                            </li>
                        @endif
                        {{--                <li class="bar-detail-notices">--}}
                        {{--                    <img style='float: left; margin-right: 5px;' src='{{asset('images/contactsIcon.png')}}' />--}}
                        {{--                    <span item-title="true">공지사항 상세</span>--}}
                        {{--                </li>--}}
                    </ul>
                </li>
            @endif
            @if(checkJoinTabPermission($departments_permissions) || checkJoinTabPermission($codes_permissions) || checkJoinTabPermission($permissions_permissions))
                <li item-expanded='false'>
                    <img style='float: left; margin-right: 5px;' src="{{asset('images/folder.png')}}"/>
                    <span item-title="true">System</span>
                    <ul>
                        @if(checkJoinTabPermission($departments_permissions))
                            <li class="bar-departments">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">조직/부서 관리</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($codes_permissions))
                            <li class="bar-codes">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">공통코드 관리</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($permissions_permissions))
                            <li class="bar-permissions">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">권한관리</span>
                            </li>
                        @endif
                        @if(checkJoinTabPermission($permissions_station_fee_templates))
                            <li class="bar-station-fee-template">
                                <img style='float: left; margin-right: 5px;'
                                     src='{{asset('images/contactsIcon.png')}}'/>
                                <span item-title="true">역 요금 템플릿</span>
                            </li>
                        @endif
                    </ul>
                </li>
            @endif

        @else
            <li class="bar-guest-create-as">
                <img style='float: left; margin-right: 5px;' src='{{asset('images/contactsIcon.png')}}'/><span
                    item-title="true">비회원 A/S 작성</span>
            </li>
            <li class="bar-guest-register-user">
                <img style='float: left; margin-right: 5px;' src='{{asset('images/contactsIcon.png')}}'/><span
                    item-title="true">회원 가입신청</span>
            </li>
        @endif
    </ul>

</div>
