<style type="text/css">
</style>
<div id="list-notices-loader">
</div>
<div class="page-area" id="list-notices">
    <div class="static-page p-1">
        <div class="row page-control">
            <div class="col-lg-12">
                <div class="control-area overflow-auto">
                    <div class="d-flex">
                        <button class="me-1" type="button" id='list-notices-search'>
                            <img src="{{asset('icons/search.png')}}"/>
                            조회
                        </button>
                        <button class="me-1" type="button" id='list-notices-redirect-create'>
                            <img src="{{asset('icons/plus.png')}}"/>
                            글쓰기
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row page-filter mt-1" style="">
            <div class="col-lg-12">
                <div class="filter-area overflow-auto">
                    <div class="d-flex">
                        <select id="list-notices-filter-type" class="form-select form-select-sm size-input-very-sm me-1">
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="title_content">제목 + 내용</option>
                            <option value="author">작성자</option>
                        </select>
                        <input placeholder="" class="form-control form-control-sm size-input-normal" type="text" id="list-notices-filter-keyword" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page-content">
        <div style="overflow: auto;">
            <div id="list-notices-grid"></div>
        </div>
    </div>
</div>
