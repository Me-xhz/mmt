(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/user/detail"],{"040f":function(t,e,a){"use strict";a.r(e);var o=a("94fc"),r=a("744a");for(var n in r)"default"!==n&&function(t){a.d(e,t,function(){return r[t]})}(n);a("6656");var i=a("2877"),s=Object(i["a"])(r["default"],o["a"],o["b"],!1,null,null,null);e["default"]=s.exports},"39cd":function(t,e,a){},6656:function(t,e,a){"use strict";var o=a("39cd"),r=a.n(o);r.a},"744a":function(t,e,a){"use strict";a.r(e);var o=a("91fe"),r=a.n(o);for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);e["default"]=r.a},"91fe":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(a("bb74"));function r(t){return t&&t.__esModule?t:{default:t}}var n,i=getApp().globalData,s=a("28c1"),d=a("0669"),u=(0,o.default)(300),c={data:function(){return{iconURL:i.dataBase.iconURL,ORDER_STATUS:i.ORDER_STATUS,reasons:["多拍/拍错/不想要","缺货"],iphoneXBottom:"0rpx",order_id:"",order:{},h:"00",m:"00",s:"00",qrcodeWidth:u,showCountMode:!1,shopCouponImg:"",isShowGoHome:!1,orderId:"",animationData:"",showfwModalStatus:!1,textareaHidden:!1}},components:{},props:{},onLoad:function(t){var e=this;if(wx.getSystemInfo({success:function(t){var a=t.model;-1!=a.search("iPhone X")&&e.setData({iphoneXBottom:"68rpx"})}}),void 0!=t&&void 0!=t.orderId){t&&t.entryType&&"external"==t.entryType?this.setData({isShowGoHome:!1}):this.setData({isShowGoHome:!0});var a=t.orderId;this.setData({orderId:a})}else s.toast("请求参数错误")},onShow:function(){void 0!=this.orderId?this.loadProductDetail(this.orderId):s.toast("请求参数错误")},onReady:function(){},onShareAppMessage:function(){var t=this;s.getStorageSync("getpickup");return{title:t.order.share_title,path:"/packageA/groupbuy/groupbuy?pickup_id="+t.order.pickup_id+"&found_id="+t.order.found_id,imageUrl:t.order.share_img}},methods:{callManager:function(t){var e=t.currentTarget.dataset.tel;wx.makePhoneCall({phoneNumber:e})},countTime:function(t,e){var a,o,r,n,i=this,s=this,d=e-t,u=setInterval(function(){if(d-=1,!(d>=0))return clearInterval(u),s.loadProductDetail(),!1;a=Math.floor(d/60/60/24,10),o=Math.floor(d/60/60%24)+24*a,r=Math.floor(d/60%60),n=Math.floor(d%60),o=o>9?o:"0"+o,r=r>9?r:"0"+r,n=n>9?n:"0"+n,i.setData({h:o,m:r,s:n})},1e3)},setModalStatus:function(t){var e=wx.createAnimation({duration:200,timingFunction:"linear",delay:0});this.animation=e,e.translateY(300).step(),this.setData({animationData:e.export()}),this.setData({showfwModalStatus:!0,textareaHidden:!0}),setTimeout(function(){e.translateY(0).step(),this.setData({animationData:e}),0==t.currentTarget.dataset.status&&this.setData({showfwModalStatus:!1,textareaHidden:!1})}.bind(this),200)},setReasonBefore:function(t){var e=this;if(t.currentTarget.dataset.item)var a=t.currentTarget.dataset.item;else a=this.reasons[t.detail.value["0"]];if(1!=t.currentTarget.dataset.status)return this.setModalStatus(t),!1;s.showModal("是否确定退款？","确定",function(t){t.confirm&&(e.refund(a),e.setData({showfwModalStatus:!1}))})},refund:function(t){var e=t.target.dataset.orderId;wx.navigateTo({url:"/packageA/user/application-return?type=1&orderId="+e})},loadProductDetail:function(t){var e=this;s.showLoad(this);var a=i.getPath.orderDetail,o={order_id:e.orderId};s.ApiGateWayTest(a,o,!0,function(t){var a=t.data.result;if(12!=a.status)wx.hideShareMenu();else{var o=(new Date).getTime()/1e3;a.found_end_time>=o&&e.countTime(o,a.found_end_time)}e.setData({order:a}),e.getIsShowShopCouponAd(),a.status==i.ORDER_STATUS.PICKING&&(n=new d("canvas",{text:a.get_sn,width:u,height:u,colorDark:"#000000",colorLight:"white",correctLevel:d.CorrectLevel.H})),s.hideLoad(e)})},goprodcut:function(t){var e=t.currentTarget.dataset.productId;wx.navigateTo({url:"../../pages/product/product?entryType=external&productId="+e})},touchComment:function(t){var e=t.currentTarget.dataset.orderId;wx.navigateTo({url:"../user/order-review?order="+e})},go_application_return:function(t){var e=t.currentTarget.dataset.goods;e.back_info&&0!=e.back_info.back_id?wx.navigateTo({url:"../user/order-return-detail?entryType=external&id="+e.back_info.back_id}):wx.navigateTo({url:"../user/application-return?type=2&rec_id="+e.rec_id})},touchCancel:function(t){var e=this,a=t.currentTarget.dataset.orderId,o=i.getPath.cancelOrder,r={order_id:a},n="是否取消该订单？",d="确定";s.showModal(n,d,function(t){t.confirm&&s.ApiGateWayTest(o,r,!0,function(t){1==t.data.success?(wx.pageScrollTo({scrollTop:0,duration:100}),s.toast(t.data.msg),e.loadProductDetail()):s.toast(t.data.msg)})})},touchConfirm:function(t){var e=this,a=t.currentTarget.dataset.orderId,o=i.getPath.confirmReceive,r={order_id:a},n="你确定已收到宝贝吗？",d="确定";s.showModal(n,d,function(t){t.confirm&&s.ApiGateWayTest(o,r,!0,function(t){1==t.data.success?(wx.pageScrollTo({scrollTop:0,duration:100}),s.toast(t.data.msg),e.loadProductDetail()):s.toast(t.data.msg)})})},touchPay:function(t){var e=this,a=t.currentTarget.dataset.orderId,o=i.getPath.doPay,r={order_id:a,payment_code:"wxpay"};s.ApiGateWayTest(o,r,!0,function(t){if(1==t.data.success){var a=t.data.result;s.doWechatPay(a,function(t){s.toast("支付成功"),wx.navigateTo({url:"/pages/confirm/paymentStatus/paymentStatus?order_id="+r.order_id+"&payment_code="+r.payment_code})},function(t){s.toast("支付失败"),e.loadProductDetail()})}})},checkPay:function(t){var e=this,a=i.getPath.checkPay,o={order_id:t};s.ApiGateWayTest(a,o,!0,function(t){e.loadProductDetail()})},touchSubComment:function(t){var e=t.currentTarget.dataset.orderId;wx.navigateTo({url:"../user/add-order-review?order="+e})},touchExpress:function(t){var e=t.currentTarget.dataset;wx.navigateTo({url:"../user/order-express?order="+e.order.id+"&delivery_id="+e.delivery_id})},setClipboard:function(){wx.setClipboardData({data:this.order.order_sn,success:function(){s.toast("复制成功")},fail:function(){s.toast("复制失败，请重试")}})},gotoHome:function(){wx.switchTab({url:"/pages/index/index"})},phoneCall:function(){s.phoneCall(i.globalData.hotline)},golinkkf:function(){i.dataBase.pageUrl="http://q.url.cn/s/6l3eQOm?_type=wpa&_wv=2",s.goWebview()},toShare:function(t){s.formIdUpdate(t)},save:function(){console.log(t("save"," at packageA\\user\\detail.vue:644")),wx.showActionSheet({itemList:["保存图片"],success:function(e){console.log(t(e.tapIndex," at packageA\\user\\detail.vue:648")),0==e.tapIndex&&n.exportImage(function(t){wx.saveImageToPhotosAlbum({filePath:t})})}})},getIsShowShopCouponAd:function(){var t=this,e=i.getPath.isShowShopCouponAd,a={type:1};s.ApiGateWayTest(e,a,!0,function(e){var a=e.data;1==a.success?1==a.result.status?(t.shop_id=a.result.shop_id,t.setData({showCountMode:!0,shopCouponImg:a.result.coupon_img})):t.setData({showCountMode:!1}):s.toast(a.msg)})},goShop:function(t){var e=this;wx.navigateTo({url:"/packageA/takeout-shop/takeout-shop?shop_id="+e.shop_id+"&entryType=external"})},toDetail:function(t){var e=this;s.formIdUpdate(t),wx.navigateTo({url:"/packageA/groupbuy/groupbuy?found_id="+e.order.found_id+"&entryType=external"})},setData:function(t){var e=this,a=[];Object.keys(t).forEach(function(o){a=o.split("."),t[o],e.$data,a.forEach(function(a,r){e[o]=t[o]})})}}};e.default=c}).call(this,a("0de9")["default"])},"94fc":function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},r=[];a.d(e,"a",function(){return o}),a.d(e,"b",function(){return r})}},[["0eee","common/runtime","common/vendor"]]]);