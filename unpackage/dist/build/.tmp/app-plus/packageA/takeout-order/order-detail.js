(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/takeout-order/order-detail"],{"0667":function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement;t._self._c},o=[];e.d(a,"a",function(){return r}),e.d(a,"b",function(){return o})},"2fbd":function(t,a,e){"use strict";var r=e("a2e5"),o=e.n(r);o.a},"8a7d":function(t,a,e){"use strict";e.r(a);var r=e("0667"),o=e("e6f5");for(var n in o)"default"!==n&&function(t){e.d(a,t,function(){return o[t]})}(n);e("2fbd");var i=e("2877"),d=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);a["default"]=d.exports},a2e5:function(t,a,e){},a893:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=getApp().globalData,o=e("28c1"),n={data:function(){return{iconURL:r.dataBase.iconURL,ORDER_STATUS:r.ORDER_STATUS,reasons:["多拍/拍错/不想要","缺货"],iphoneXBottom:"0rpx",order_id:"",order:{},isShowGoHome:!1,animationData:"",showfwModalStatus:!1,textareaHidden:!1}},components:{},props:{},onLoad:function(t){var a=this;if(void 0!=t&&void 0!=t.order_id){t&&t.entryType&&"external"==t.entryType?a.setData({isShowGoHome:!1}):a.setData({isShowGoHome:!0});var e=t.order_id;this.setData({order_id:e})}else o.toast("请求参数错误")},onShow:function(){void 0!=this.order_id?this.loadProductDetail(this.order_id):o.toast("请求参数错误")},methods:{setModalStatus:function(t){var a=wx.createAnimation({duration:200,timingFunction:"linear",delay:0});this.animation=a,a.translateY(300).step(),this.setData({animationData:a.export()}),this.setData({showfwModalStatus:!0,textareaHidden:!0}),setTimeout(function(){a.translateY(0).step(),this.setData({animationData:a}),0==t.currentTarget.dataset.status&&this.setData({showfwModalStatus:!1,textareaHidden:!1})}.bind(this),200)},setReasonBefore:function(t){var a=this;if(t.currentTarget.dataset.item)var e=t.currentTarget.dataset.item;else e=this.reasons[t.detail.value["0"]];if(1!=t.currentTarget.dataset.status)return this.setModalStatus(t),!1;o.showModal("是否确定退款？","确定",function(t){t.confirm&&(a.refund(e),a.setData({showfwModalStatus:!1}))})},refund:function(t){var a=t.target.dataset.orderId;wx.navigateTo({url:"/packageA/user/application-return?type=1&orderId="+a})},loadProductDetail:function(t){var a=this,e=r.getPath.shopOrderDetail,n={order_id:a.order_id};o.showLoad(a),o.ApiGateWayTest(e,n,!0,function(t){var e=t.data.result;a.setData({order:e}),o.hideLoad(a)})},goprodcut:function(t){t.currentTarget.dataset.productId},touchComment:function(t){var a=t.currentTarget.dataset.orderId;wx.navigateTo({url:"../user/order-review?order="+a})},go_application_return:function(t){var a=t.currentTarget.dataset.goods;a.back_info&&0!=a.back_info.back_id?wx.navigateTo({url:"../user/order-return-detail?entryType=external&id="+a.back_info.back_id}):wx.navigateTo({url:"../user/application-return?type=2&rec_id="+a.rec_id})},touchCancel:function(t){var a=this,e=t.currentTarget.dataset.orderId,n=r.getPath.shopCancelOrder,i={order_id:e},d="是否取消该订单？",s="确定";o.showModal(d,s,function(t){t.confirm&&o.ApiGateWayTest(n,i,!0,function(t){1==t.data.success?(wx.pageScrollTo({scrollTop:0,duration:100}),o.toast(t.data.msg),a.loadProductDetail()):o.toast(t.data.msg)})})},touchConfirm:function(t){var a=this,e=t.currentTarget.dataset.orderId,n=r.getPath.confirmReceive,i={order_id:e},d="你确定已收到宝贝吗？",s="确定";o.showModal(d,s,function(t){t.confirm&&o.ApiGateWayTest(n,i,!0,function(t){1==t.data.success?(wx.pageScrollTo({scrollTop:0,duration:100}),o.toast(t.data.msg),a.loadProductDetail()):o.toast(t.data.msg)})})},touchPay:function(t){var a=this,e=t.currentTarget.dataset.orderId,n=r.getPath.doPay,i={order_type:"2",order_id:e,payment_code:"wxpay"};o.ApiGateWayTest(n,i,!0,function(t){if(1==t.data.success){var r=t.data.result;o.doWechatPay(r,function(t){o.toast("支付成功"),a.checkPay(e)},function(t){o.toast("支付失败"),a.loadProductDetail()})}})},checkPay:function(t){var a=this,e=r.getPath.checkPay,n={order_id:t,order_type:2};o.ApiGateWayTest(e,n,!0,function(t){a.loadProductDetail()})},touchSubComment:function(t){var a=t.currentTarget.dataset.orderId;wx.navigateTo({url:"../user/add-order-review?order="+a})},touchExpress:function(t){var a=t.currentTarget.dataset;wx.navigateTo({url:"../user/order-express?order="+a.order.id+"&delivery_id="+a.delivery_id})},setClipboard:function(){wx.setClipboardData({data:this.order.order_sn,success:function(){o.toast("复制成功")},fail:function(){o.toast("复制失败，请重试")}})},gotoHome:function(){wx.switchTab({url:"/pages/index/index"})},phoneCall:function(){o.phoneCall(r.globalData.hotline)},golinkkf:function(){r.dataBase.pageUrl="http://q.url.cn/s/6l3eQOm?_type=wpa&_wv=2",o.goWebview()},setData:function(t){var a=this,e=[];Object.keys(t).forEach(function(r){e=r.split("."),t[r],a.$data,e.forEach(function(e,o){a[r]=t[r]})})}}};a.default=n},e6f5:function(t,a,e){"use strict";e.r(a);var r=e("a893"),o=e.n(r);for(var n in r)"default"!==n&&function(t){e.d(a,t,function(){return r[t]})}(n);a["default"]=o.a}},[["b0a5","common/runtime","common/vendor"]]]);