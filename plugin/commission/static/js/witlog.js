define(['core', 'tpl'], function (core, tpl) {
    var modal = {
        page: 1,
    };
    modal.init = function (params) {
        FoxUI.tab({
            container: $('#tab'),
            handlers: {
                tab1: function () {
                    modal.changeTab(0)
                },
                tab2: function () {
                    modal.changeTab(1)
                }
            }
        });
        $('.fui-content').infinite({
            onLoading: function () {
                modal.getList()
            }
        });
        modal.getList()
    };
    modal.changeTab = function (type) {
        $('.container').html(''),
        $('.infinite-loading').show(),
        $('.content-empty').hide(),
        modal.page = 1,
        modal.getList()
    };
    modal.getList = function () {
        core.json('commission/witlog/trans_list', {
            page: modal.page
        }, function (ret) {
            var result = ret.result;
            if (result.total <= 0) {
                $('.container').hide();
                $('.content-empty').show();
                $('.fui-content').infinite('stop')
            } else {
                if(modal.page == 1){
                    $('.container').html('');
                }
                $('.container').show();
                $('.content-empty').hide();
                $('.fui-content').infinite('init');
                if (result.list.length <= 0 || result.list.length < result.pagesize) {
                    $('.fui-content').infinite('stop')
                }
            }
            modal.page++;
            core.tpl('.container', 'tpl_to_wit_list', result, modal.page > 1)
        })
    };
    return modal
});