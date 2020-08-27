            // 查询并显示购物车
            function showCart(){
                $.ajax({
                    url:'http://localhost/code/kangjiashouye/kangjia/server/showlist.php',
                    dataType:'json',
                    success:function(res){
                        $('.myCart').html("");
                        $.each(res.data,function(index,item){
                            $('.cart-body').append(`
                            <ul class="myCart">
                            <li>
                            <div data-object="goods" class="row goods_847 cart-item enabled">
                                <div class="col-xs-1 c-ci-check">
                                    <label class="control-label">
                                        <span>${item.product_id}</span>
                                    </label>
                                </div>
                                <div class="col-xs-5 c-ci-title">
                                    <div class="row">
                                        <div class="col-xs-3">
                                                <img class="img-thumbnail" src="${item.product_img}" alt="">
                                        </div>
                                            <h5>${item.product_name}</h5>
                                    </div>
                                </div>
                                </div>
                                <div class="col-xs-1 c-ci-price">${item.product_price}</div>
                                <div class="col-xs-2 c-ci-quantity">
                                    <div class="product-quantity input-group input-group-sm" >
                                        <div class="spinner-buttons input-group-btn">
                                            <button type="button" class="btn-jian">-</button>
                                        </div>
                                        <input type="text" data-ident="goods_847" class="spinner-input form-control" value="${item.product_num}">
                                        <div class="spinner-buttons input-group-btn">
                                            <button type="button" class="btn-jia">+</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-1 c-ci-amount">
                                    <strong>${item.product_price}</strong>
                                </div>
                                <div class="col-xs-2 c-ci-opt">
                                    <ul class="list-unstyled">
                                        <li><button class="delProduct">删除该商品</button></li>
                                    </ul>
                                </div>
                            </li>
                            </ul>
                            `)
                        })
                    }
                })
            }
            showCart()
           
            //删除商品
            $('.cart-body').on('click','.delProduct',function(){
                var id = $(this).parent().parent().parent().parent().children(0).find('span').html()
                $.ajax({
                    url:"http://localhost/code/kangjiashouye/kangjia/server/delwq.php",
                    data:{
                        id:id
                    },
                    dataType:'json',
                    success:function(res){
                        if(res.code){
                            showCart()
                        }
                    }
                })
            })

            //增加商品
            $('.cart-body').on('click','.btn-jia',function(){
                var id = $(this).parent().parent().parent().parent().children(0).find('span').html()
                // console.log($('.btn-jia'))
                $.ajax({
                    url:"http://localhost/code/kangjiashouye/kangjia/server/updatewq.php",
                    dataType:'json',
                    data:{
                        type:'add',
                        id:id
                    },
                    success:function(res){
                        if(res.code){
                            alert('商品增加成功')
                            showCart()
                        }
                    }
                })
            })

             //减少商品
             $('.cart-body').on('click','.btn-jian',function(){
                var id = $(this).parent().parent().parent().parent().children(0).find('span').html()
                $.ajax({
                    url:"http://localhost/code/kangjiashouye/kangjia/server/updatewq.php",
                    dataType:'json',
                    data:{
                        type:'!add',
                        id:id
                    },
                    success:function(res){
                        if(res.code){
                            alert('商品减少成功'),
                            showCart()
                            console.log($('.delProduct').html())   
                        }
                    }
                })
            })





            /*
             购物车处理JS闭包
             主要处理购物车编辑时的数据及时更新
            @author vmcshop.com
            @version 1.150528
             */
            // void function(){
            //     var _alert = function(msg,target_el){
            //         $(target_el).popover({
            //             content:msg,
            //             placement:'top',
            //             trigger:'focus'
            //         }).popover('show');
            //         setTimeout(function(){
            //             $(target_el).popover('destroy');
            //         },2000);
            //     };
            //     /**
            //      * 修改数量遇到错误时的处理函数
            //      */


            //     var _data_bind_handler = function(path,obj_v,cart_object){
            //         switch (path) {
            //             case 'warning':
            //                     var wpanel = $(this).closest('.warning'),
            //                     cb = wpanel.closest('.cart-item').find('input:checkbox[data-ident]');
            //                     if(typeof obj_v =='undefined' || obj_v == ''){
            //                         wpanel.addClass('hide');
            //                         cb.removeProp('disabled');

            //                         if(!('disabled' in cart_object)||cart_object['disabled'] == 'false'){
            //                             cb.prop('checked',true);
            //                             cb.trigger('change',['ignore_request']);
            //                         }
            //                     }else{
            //                         wpanel.removeClass('hide');
            //                         cb.prop('checked',false);
            //                         cb.trigger('change',['ignore_request']);
            //                         cb.prop('disabled',true);
            //                     }
            //                 break;
            //             default:
            //         }

            //     };


            //     //json2html
            //     var _data_bind = function(scope,obj){
            //             $.each($(scope).find('[data-bind]'),function(i,el){
            //                 var path = $(el).attr('data-bind');
            //                 handler=$(el).attr('data-bind-handler');

            //                 str = 'obj["'+path.replace(/\//g,'"]["')+'"]';
            //                 str = str.replace(/(\*)/g,'"]$1obj["');
            //                 str = str.replace(/(\+)/g,'"]$1obj["');
            //                 var v=eval(str);
            //                 if($.type(v) == 'number'){
            //                     v = Math.round(parseFloat(v) * 100) / 100;
            //                 };
            //                 $(el).text(v);
            //                 _data_bind_handler.apply(el,[path,v,obj]);
            //             });
            //     }
            //     //促销即时展示隐藏
            //     var _fill_plist= function(scop,plist){
            //         var plist_ul = $($(scop).find('.promotion-list')),lis='';
            //         if(!plist_ul.length)return;
            //         plist_ul.empty();
            //         if(!plist)return;
            //         $.each(plist,function(idx,p){
            //             if(p.rule_type=='coupon'){
            //                 lis+='<li data-ruleid="'+p.rule_id+'"><span class="btn-group bg-label"><span class="btn btn-xs btn-danger">'+p.tag+'</span><span class="btn btn-danger btn-xs">券</span><a class="btn btn-xs btn-default" href="/cart-remove_coupon.html?obj_ident='+p.coupon_obj_ident+'">取消</a></span>&nbsp;'+p.solution+'</li>';
            //             }else{
            //                 lis+='<li data-ruleid="'+p.rule_id+'">';
            //                 if(p.tag!='送赠品'){
            //                     lis+='<span class="label label-danger">'+p.tag+'</span>';
            //                 }
            //                 lis+=p.solution;
            //             }
            //             lis+='</li>';
            //         });
            //         plist_ul.append(lis);
            //     }

            //     var _update = function(cart_result){
            //         var plist_goods = cart_result['promotions']&&cart_result['promotions']['goods']?cart_result['promotions']['goods']:false,
            //         plist_order = cart_result['promotions']&&cart_result['promotions']['order']?cart_result['promotions']['order']:false;
            //         $.each($('.cart-body .cart-item:not(".removeing")'),function(idx,item){
            //             var $el = $(this),
            //                 object_type = $el.data('object')?$el.data('object'):'goods';
            //             var index = $el.index('[data-object='+object_type+']');
            //             var object_item = cart_result['objects'][object_type][index];
            //             _data_bind(item,object_item);
            //             _fill_plist(item,plist_goods?plist_goods[object_item['obj_ident']]:false);
            //         });
            //         _data_bind($('.cart-footer'),cart_result);
            //         _fill_plist($('.cart-footer'),plist_order);
            //         //什么都没选，无法结算
            //         $('.checkout-btn')[cart_result['goods_count']<1?'addClass':'removeClass']('disabled');
            //         //包邮提前提示
            //         $('.shipping-tip').text(cart_result['free_shipping']?'包邮':'不含运费');
            //     }


            //     //var ipt_change_timer = 0;
            //     var cart_update_action = "/cart-update.html";
            //     var cart_disabled_action = "/cart-disabled.html";
            //     var cart_enabled_action = "/cart-enabled.html";
            //     var cart_remove_action = "/cart-remove.html";
            //     var cart_mv2fav_action = "/cart-mv2fav.html";
            //     //数量修改
            //     $('.cart-body .spinner-input').on('_change',function(e){
            //         var ipt = $(this);
            //         var obj_ident = ipt.data('ident'),
            //             obj_type = ipt.parents('[data-object]').data('object'),
            //             cur_val = ipt.val();
            //         // ipt_change_timer = setTimeout(function(){
            //         //     clearTimeout(ipt_change_timer);
            //             if(!obj_ident)return;
            //             $.getJSON(cart_update_action,{ident:obj_ident,num:cur_val,object_type:obj_type},function(re){
            //                 if(re.error){
            //                     ipt.val(ipt.attr('data-now'));
            //                     _alert(re.error,ipt);
            //                 }
            //                 if(re.success && re.data){
            //                     //location = re.redirect;
            //                     _update(re.data);
            //                     ipt.attr('data-now',cur_val);
            //                 }
            //             });
            //         //},300);
            //     });

            //     //全选状态
            //     var checkbox_all_status = (function(){
            //         var unchecked = $('.cart-body input:checkbox:not(:checked)');
            //         $('.cart-container input:checkbox[data-checkall]').prop('checked',!unchecked.length);
            //         return arguments.callee;
            //     })();
            //     //全选
            //     $('.cart-container input:checkbox[data-checkall]').on('change',function(e){
            //         var target_el = this;
            //         var status = $(this).prop('checked'),params = [];
            //         $($(this).attr('data-checkall')).prop('checked',status);
            //         checkbox_all_status();
            //         $.each($('.cart-body input:checkbox'),function(i,c){
            //             params.push(c.value);
            //             $(c).closest('.cart-item')[status?'addClass':'removeClass']('enabled');
            //         });
            //         $.getJSON(status?cart_enabled_action:cart_disabled_action,{ident:params},function(re){
            //             if(re.error){
            //                 _alert(re.error,target_el);
            //             }
            //             if(re.success && re.data){
            //                 //location = re.redirect;

            //                 _update(re.data);
            //             }
            //         });

            //     });
            //     //单选
            //     $('.cart-body input:checkbox[data-ident]').on('change',function(e,ignore_request){
            //         var target_el = this;
            //         var status = $(this).prop('checked');
            //         $(this).closest('.cart-item')[status?'addClass':'removeClass']('enabled');
            //         checkbox_all_status();//
            //         if(ignore_request)return;
            //         $.getJSON(status?cart_enabled_action:cart_disabled_action,{ident:[$(this).val()]},function(re){
            //             if(re.error){
            //                 _alert(re.error,target_el);
            //             }
            //             if(re.success && re.data){
            //                 //location = re.redirect;
            //                 _update(re.data);
            //                 // if(status){
            //                 //     $('.package_goods_' + $(target_el).val()).trigger('click');
            //                 // }
            //             }
            //         });

            //     });
            //     /**
            //      * 删除、移到收藏 处理函数
            //      */
            //     var _remove_handler = function(target_el,re,ident_arr){
            //         if(re.error){
            //             if(re.error == '购物车为空'){
            //                 return location = re.redirect;
            //             }
            //             _alert(re.error,target_el);
            //         }
            //         if(re.success && re.data){
            //             checkbox_all_status();//更新全选状态
            //             //location = re.redirect;
            //             $('.cart-item.'+ident_arr.join(',.cart-item.')).addClass('removeing').fadeOut('fast',function(e){
            //                 $(this).remove();
            //             });
            //             _update(re.data);
            //         }
            //     };
            //     /**
            //      * 删除点击
            //      */
            //     $('.cart-container a[data-remove]').on('click',function(e){
            //         var target_el = this;
            //         var ident_arr =[];
            //         var object_arr =[];
            //         $.each($($(this).attr('data-remove')),function(i,el){
            //             ident_arr.push($(el).attr('data-ident')||el.value);
            //             object_arr.push($(el).parents('[data-object]').data('object')||'goods');
            //         });
            //         if(ident_arr.length && confirm('确认删除？')){
            //             $.post(cart_remove_action,{ident:ident_arr,obj_name:object_arr},function(re){
            //                 _remove_handler(target_el,re,ident_arr)
            //             },'json');
            //         }
            //     });
            //     /**
            //      * 移动到收藏夹
            //      */
            //     $('.cart-container a[data-mvtofav]').on('click',function(e){
            //         var target_el = this;
            //         var ident_arr =[];
            //         $.each($($(this).attr('data-mvtofav')),function(i,el){
            //             ident_arr.push($(el).attr('data-ident')||el.value);
            //         });
            //         if(ident_arr.length && confirm('确认移动到收藏夹？')){
            //             $.post(cart_mv2fav_action,{ident:ident_arr},function(re){
            //                 _remove_handler(target_el,re,ident_arr)
            //             },'json');
            //         }
            //     });
            //     /*
            //     *商品brief
            //     */
            //     $('.brief').map(function(){
            //         var _this=$(this)
            //         var repertory_id=$(this).attr('data-brief');
            //         var url='https://www.konka.com/index.php/openapi/goods/products/goods_id/'+repertory_id;
            //         $.post(url,{},function(res){
            //             _this.html(res.data.brief)
            //         })
            //     })
            // }();
           
               
