<style type="text/css">
    #detail-notices-content-main {
        min-height: 300px;
        max-height: 550px;
        overflow: auto
    }
</style>
<div id="detail-notices-loader">
</div>
<div class="page-area" id="detail-notices">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='detail-notices-redirect-list'>
                            <img src="{{asset('icons/redirect.png')}}"/>
                            목록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div style="height: calc(100vh - 55px - 100px); min-width: 400px" class="control-area overflow-auto">
            <div id="detail-notices-content" class="container">
                @if($notice)
                    <div class="mt-3" id="detail-notices-content-title">
                        <h3>{{$notice->SUBJECT}}</h3>
                    </div>
                    <hr/>
                    <div id="detail-notices-content-contact" class="d-flex">
                        <div id="detail-notices-content-contact-dept">
                            {{$notice->dept ? ($notice->dept->DEPT_NAME . ' | ') : ''}}
                        </div>
                        <div id="detail-notices-content-contact-created-by">
                            {{$notice->author->USER_NAME . ' | '}}
                        </div>
                        <div id="detail-notices-content-contact-created-at">
                            {{$notice->CREATED_AT}}
                        </div>
                    </div>
                    <hr/>
                    @if($notice->ATTACH_FILES)
                        <?php
                            $image_types = ['gif', 'jpg', 'jpeg', 'png'];
                            $excel_types = ['xlsx', 'xls', 'xlsm'];
                            $doc_types = ['docx', 'doc'];
                            $video_types = ['wmv', 'mov', 'avi', 'divx', 'mpeg', 'mpg', 'm4p'];
                            $pdf_types = ['pdf'];
                            $zip_types = ['zip', 'rar'];
                            $attachments = json_decode($notice->ATTACH_FILES);
                        ?>
                        <div id="detail-notices-content-attachments" class="text-end">
                            <ul style="list-style-type: none">
                                @foreach($attachments as $attachment)
                                    <?php
                                        $attach_ext_arr = explode('.', $attachment);
                                        $extension = $attach_ext_arr[count($attach_ext_arr) - 1];
                                        $attach_name_arr = explode('/', $attachment);
                                        $name = $attach_name_arr[count($attach_name_arr) - 1];
                                    ?>
                                    <li>
                                        <a target="_blank" href="{{asset($attachment)}}">
                                            @if(in_array($extension, $excel_types))
                                                <img class="p-1" src="{{asset('icons/excel.png')}}" />
                                            @elseif(in_array($extension, $doc_types))
                                                <img class="p-1" src="{{asset('icons/word.png')}}" />
                                            @elseif(in_array($extension, $image_types))
                                                <img class="p-1" src="{{asset('icons/image.png')}}" />
                                            @elseif(in_array($extension, $video_types))
                                                <img class="p-1" src="{{asset('icons/video.png')}}" />
                                            @elseif(in_array($extension, $pdf_types))
                                                <img class="p-1" src="{{asset('icons/pdf.png')}}" />
                                            @elseif(in_array($extension, $zip_types))
                                                <img class="p-1" src="{{asset('icons/zip.png')}}" />
                                            @else
                                                <img class="p-1" src="{{asset('icons/file.png')}}" />
                                            @endif
                                            {{$name}}
                                        </a>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                        <hr/>
                    @endif
                    <div id="detail-notices-content-main">
                        {!! $notice->CONTENT !!}
                    </div>
                    <hr/>
                    <div id="detail-notices-content-before">
                        [이전글]
                        @if(isset($previous))
                            <a data-id="{{$previous->ID}}" href="javascript:void(0)" id="detail-notices-content-before-redirect">
                                {{$previous->SUBJECT}}
                            </a>
                        @else
                            <span class="ms-1">
                                이전글이 없습니다.
                            </span>
                        @endif
                    </div>
                    <hr/>
                    <div id="detail-notices-content-after" class="mb-3">
                        [이전글]
                        @if(isset($next))
                            <a data-id="{{$next->ID}}" href="javascript:void(0)" id="detail-notices-content-after-redirect">
                                {{$next->SUBJECT}}
                            </a>
                        @else
                            <span class="ms-1">
                                다음글이 없습니다.
                            </span>
                        @endif
                    </div>
                @endif
            </div>
        </div>

    </div>
</div>
