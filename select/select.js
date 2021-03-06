var Cascader = {
            init: function (o) {
                return (function () {
                    o.placeholder = o.placeholder || 'please select'
                    Cascader.fillHtml(o);
                })()
            },
            fillHtml: function (o) {
                var html = '<span class="me-cascade-picker-wrap">\
                                    <span class="me-cascade-picker-content"></span>\
                                    <input type="text" placeholder="'+ o.placeholder + '" class="me-cascade-picker-input box-sizing" autocomplete="off" readonly="true"/>\
                                    <span class="me-cascade-picker-span"></span>\
                                    <i class="me-cascade-arrow me-ion-o-arrow-down box-sizing me-ion-icon"></i>\
                                    <i class="me-cascade-cross me-ion-a-cancel me-ion-icon me-hide"></i>\
                                </span>',
                    list_menu = '<div class="me-cascade-list-wrap fadeInDown me-hide" id="wrap">\
                                 </div>',
                    ele = o.ele,
                    ele_property = o.ele.replace(/\./g, '').replace(/#/g, ''),
                    num = o.num || 3,
                    $html = $(html);
                $list_menu = $(list_menu);
                $html.attr('id', 'me-cascade-picker-wrap-' + ele_property);
                /*input 框样式*/
                if (o.input_style) {
                    if (typeof o.input_style == 'string') {
                        $html.find('.me-cascade-picker-input,me-cascade-picker-content').addClass(o.input_style.replace(/#/g, '').replace(/\./g, ''));
                    } else {
                        $html.find('.me-cascade-picker-input,.me-cascade-picker-content').css(o.input_style);
                    }
                    $html.find('.me-cascade-picker-content').css({ 'border': 'none' });
                }
                if(o.box_style){
                     if (typeof o.box_style == 'string') {
                        $html.addClass(o.box_style.replace(/#/g, '').replace(/\./g, ''))
                     }else{
                         $html.css(o.box_style);
                     }
                }
                /*下拉框样式*/
                if (o.list_style) {
                    if (typeof o.list_style == 'string') {
                        $list_menu.addClass(o.list_style.replace(/#/g, '').replace(/\./g, ''));
                    } else {
                        $list_menu.css(o.list_style);
                    }
                }
                $html.find('.me-cascade-picker-input').attr('id', 'me-cascade-picker-input-' + ele_property);
                $list_menu.attr('id', 'me-cascade-list-wrap-' + ele_property)
                for (var i = 0; i < num; i++) {
                    $list_menu.append('<ul class="me-cascade-list"></ul>');
                }
                $(ele).append($html);                
                $('body').append($list_menu)                
                Cascader.bindEvent(o);
                o.cb && o.cb();
            },
            bindEvent: function (o) {
                var key = [],
                    input = $(o.ele).find('.me-cascade-picker-input'),
                    ele_property = o.ele.replace(/\./g, '').replace(/#/g, ''),
                    input_parent = $(o.ele).find('.me-cascade-picker-wrap'),
                    list = $('body').find('#me-cascade-list-wrap-' + ele_property);
                /*点击还原初始状态*/
                $(document).on('click', function (e) {
                    e.stopPropagation();
                    if (!$(e.target).hasClass('me-cascader-menu-item') && !$(e.target).hasClass('me-cascade-picker-input') && !$(e.target).hasClass('me-cascade-list')) {
                        $('.me-cascade-list-wrap').removeClass('me-show').addClass('me-hide');
                        $('.me-cascade-arrow').removeClass('rotate');
                        input.removeClass('active');
                    }
                })
                /* 控制下拉框展示方向*/
                input.on('click', function () {
                    var list = $('body').find('#me-cascade-list-wrap-' + o.ele.replace(/\./g, '').replace(/#/g, '')),
                        input = $(o.ele).find('.me-cascade-picker-input'),
                        wrap_offsetTop = list.offset().top,
                        input_offsetLeft = input.offset().left,
                        input_parent = $(o.ele).find('.me-cascade-picker-wrap'),
                        input_offsetTop = input.offset().top - $(window).scrollTop(),
                        wrap_height = list.height(),
                        out_height = input_parent.height(),
                        domClientHeight = $(window).height(),
                        wrap_offsetBottom = domClientHeight - input_offsetTop;
                    list.toggleClass('me-hide');
                    $(this).addClass('active').siblings('i.me-cascade-arrow').toggleClass('rotate');
                    if (wrap_offsetBottom < wrap_height) {
                        list.css({ 'top': input_offsetTop + $(window).scrollTop() - wrap_height - 5 + 'px', 'left': input_offsetLeft + 'px' });
                    } else {
                        list.css({ 'top': input_offsetTop + $(window).scrollTop() + out_height + 5 + 'px', 'left': input_offsetLeft + 'px' });
                    }
                })
                /*icon-arrow show/hide*/
                input_parent.hover(function () {
                    if ($(this).find('.me-cascade-picker-content').text().length > 0) {
                        $(this).find('i.me-cascade-arrow').removeClass('me-show').addClass('me-hide').end().find('i.me-cascade-cross').removeClass("me-hide").addClass('me-show');
                    } else {
                        $(this).find('i.me-cascade-arrow').removeClass("me-hide").addClass('me-show').end().find('i.me-cascade-cross').removeClass('me-show').addClass('me-hide');
                    }
                }, function () {
                    $(this).find('i.me-cascade-arrow').removeClass("me-hide").addClass('me-show').end().find('i.me-cascade-cross').removeClass('me-show').addClass('me-hide');
                })
                /*叉*/
                input_parent.find('i.me-cascade-cross').click(function () {
                    $(this).siblings('.me-cascade-picker-content').text('').siblings('.me-cascade-picker-input').attr('placeholder', o.placeholder);
                    $(this).addClass('me-hide').removeClass('me-show').siblings('i.me-cascade-arrow').removeClass('me-hide').addClass('me-show');
                    list.find('ul').not(':eq(0)').empty().end().find('li').removeClass('me-cascader-menu-item-active')
                })
                /*级联*/
                list.on('click', "li", function () {
                    if ($(this).attr('disabled') == 'disabled') {
                        return false;
                    }
                    $(this).addClass('me-cascader-menu-item-active me-ion-load-c').siblings().removeClass('me-cascader-menu-item-active');
                    var indexParent = $(this).parent('ul').index();
                    if (indexParent == 0) {
                        key = [];
                    }
                    if (indexParent < o.num && key.length == o.num) {
                        key.pop();
                    }
                    if (indexParent < o.num - 1) {
                        $(this).parent('ul').nextAll().empty();
                        $(this).removeClass('me-ion-o-arrow-right').addClass('me-ion-load-c');
                    }
                    key[indexParent] = $(this).text();
                    if (key.length == o.num) {
                        $(this).parents('.me-cascade-list-wrap').removeClass('me-show').addClass('me-hide');
                        input.siblings('.me-cascade-picker-content').text(key.join('/'));
                        input.attr('placeholder', '').removeClass('active').siblings('.me-cascade-arrow').removeClass('rotate');
                    }
                })
            },
            /*requestHeader: function (o) {
                var obj = o.ajx,
                    flag = obj.flag.split('.'),
                    wrapId = '#me-cascade-list-wrap-'+(o.ele.replace(/\./g, '').replace(/#/g, '')),
                    result = obj.resList.split('.')[0],
                    resultList = obj.resList.substr(obj.resList.indexOf('.')+1),
                    opts={'tokenid':'9FA096A46617D3D26C17025CBF1FEC2A1491454653814'};
                    flag.shift();
                    if(obj.responses.constructor == Array){
                        for(var i=0;i<obj.responses.length;i++){
                            opts[obj.responses[i]] = obj.formValue[i];
                        }
                    }
                me.ajax({
                    key: obj.url,
                    type:'get',
                    data:opts,
                    callback: function (result) {
                        if(result[flag] == obj.flagVal){
                            resultList = resultList.split('.');
                            for(var j=0;j<resultList.length;j++){
                                result = result[resultList[j]];
                            }
                            for (var i = 0; i < result.length; i++) {
                                var str = '<li class="me-cascader-menu-item me-ion-o-arrow-right" pcType = "'+result[i].pcType+'" parentId="' + result[i].pcCode + '">' + result[i].pcName + '</li>';
                                if(obj.rendeIndex){
                                    $(wrapId + ' ul').eq(obj.rendeIndex).append(str)
                                }else{
                                    $(wrapId + ' ul').eq(0).append(str)
                                }
                                if (obj.rendeIndex > 0 && obj.rendeIndex < o.num) {
                                    $(wrapId + ' ul').eq(obj.rendeIndex - 1).find('li').removeClass('me-ion-load-c').addClass('me-ion-o-arrow-right');
                                }
                            }
                            o.cb && o.cb();
                        }
                    }
                })
            }*/
        }
        Cascader.init({
            ele: '#container',
            num: 3,
            placeholder: 'please select',
            box_style:'.large',
            cb: function () {
                getData({
                    type: 'WL_CAR'
                })
                $('#me-cascade-list-wrap-container').on('click', 'li', function () {
                    var index = $(this).parent().index();
                    if (index == 0) {
                        getData({
                            type: 'WL_car',
                            provinceCode: $(this).attr('code')
                        }, 1)
                    } else if (index == 1) {
                        getData({
                            type: 'WL_car',
                            cityCode: $(this).attr('code')
                        }, 2)
                    }
                })
            }
        })

        Cascader.init({
            ele: '#content',
            num: 3,
            placeholder: 'please select',
            box_style:{'border':'1px solid red','width':'250px'},
            cb: function () {
                getData1({
                    type: 'WL_CAR'
                })
                $('#me-cascade-list-wrap-content').on('click', 'li', function () {
                    var index = $(this).parent().index();
                    if (index == 0) {
                        getData1({
                            type: 'WL_car',
                            provinceCode: $(this).attr('code')
                        }, 1)
                    } else if (index == 1) {
                        getData1({
                            type: 'WL_car',
                            cityCode: $(this).attr('code')
                        }, 2)
                    }
                })
            }
        })
        function getData(obj, index) {
            me.ajax({
                key: 'http://10.10.22.60:8959/website/insBasicInfo/getAreaInfo.mxd',
                type: 'get',
                data: obj,
                callback: function (data) {
                    if (data.errCode == '0') {
                        var list = data.result;
                        for (var i = 0; i < list.length; i++) {
                            if (index) {
                                $('#me-cascade-list-wrap-container ul').eq(index - 1).find('li').removeClass('me-ion-load-c').addClass('me-ion-o-arrow-right')
                                if (index == 1) {
                                    var str = '<li class="me-cascader-menu-item me-ion-o-arrow-right" code = "' + list[i].cityCode + '">' + list[i].cityName + '</li>'
                                } else if (index == 2) {
                                    var str = '<li class="me-cascader-menu-item me-ion-o-arrow-right" code = "' + list[i].districtCode + '">' + list[i].districtName + '</li>'
                                }
                                $('#me-cascade-list-wrap-container ul').eq(index).append(str);
                            } else {
                                var str = '<li class="me-cascader-menu-item me-ion-o-arrow-right" code = "' + list[i].provinceCode + '">' + list[i].provinceName + '</li>';
                                $('#me-cascade-list-wrap-container ul').eq(0).append(str)
                            }

                        }
                    }
                }
            })
        }

        function getData1(obj, index) {
            me.ajax({
                key: 'http://10.10.22.60:8959/website/insBasicInfo/getAreaInfo.mxd',
                type: 'get',
                data: obj,
                callback: function (data) {
                    if (data.errCode == '0') {
                        var list = data.result;
                        for (var i = 0; i < list.length; i++) {
                            if (index) {
                                $('#me-cascade-list-wrap-content ul').eq(index - 1).find('li').removeClass('me-ion-load-c').addClass('me-ion-o-arrow-right')
                                if (index == 1) {
                                    var str = '<li class="me-cascader-menu-item me-ion-o-arrow-right" code = "' + list[i].cityCode + '">' + list[i].cityName + '</li>'
                                } else if (index == 2) {
                                    var str = '<li class="me-cascader-menu-item me-ion-o-arrow-right" code = "' + list[i].districtCode + '">' + list[i].districtName + '</li>'
                                }
                                $('#me-cascade-list-wrap-content ul').eq(index).append(str);
                            } else {
                                var str = '<li class="me-cascader-menu-item me-ion-o-arrow-right" code = "' + list[i].provinceCode + '">' + list[i].provinceName + '</li>';
                                $('#me-cascade-list-wrap-content ul').eq(0).append(str)
                            }

                        }
                    }
                }
            })
        }