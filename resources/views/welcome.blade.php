@extends('layouts.master')
@section('content')
    <style>
        .jqx-tabs-headerWrapper {
            background: linear-gradient(180deg, #F0F6FD 0%, #D0E5FA 100%);

        }
        #jqxTabs .jqx-tabs-close-button-light {
            background-image: url({{asset('jqwidgets/styles/images/close.png')}});
        }
        #jqxTabs .jqx-tabs-headerWrapper ul li {
            border-color: #aaa;
        }
        #jqxTabs .jqx-tabs-headerWrapper ul li:hover {
            background: #D0E5FA;
        }
        #jqxTabs .jqx-tabs-headerWrapper ul li.jqx-tabs-title-selected-top {
            background: #FFF;
            border-bottom: 1px solid #fff;
        }
        #jqxTabs .jqx-tabs-headerWrapper ul li.jqx-tabs-title-selected-top:hover {
            background: #FFF;
        }
        #close-all-tabs-btn {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 1;
            color: #fff;
            background: linear-gradient(180deg, #FFFFFF 0%, #e63946 100%);
        }
    </style>
    <div id='jqxWidget' style="position: relative">
        <button id="close-all-tabs-btn">x</button>
        <div id='jqxTabs'>
            <ul style='margin-left: 30px;'>
                @if(auth()->check())
                    @if(auth()->user()->USER_LVL == config('constants.DETAIL_CODES.USER_LVL.APARTMENT_MANAGER'))
                        <li>회원 A/S 작성</li>
                    @else
                        <li>A/S 접수내역</li>
                    @endif
                @else
                    <li>비회원 A/S 작성</li>
                @endif
            </ul>
            <div></div>
        </div>
    </div>
@endsection
