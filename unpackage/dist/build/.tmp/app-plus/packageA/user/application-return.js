(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/user/application-return"],{"3f45":function(t,a,o){"use strict";o.r(a);var e=o("6b82"),n=o.n(e);for(var s in e)"default"!==s&&function(t){o.d(a,t,function(){return e[t]})}(s);a["default"]=n.a},"4ab8":function(t,a,o){},"6b82":function(t,a,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var e=getApp().globalData,n=o("28c1"),s={data:function(){return{iconURL:e.dataBase.iconURL,uploadInfo:{applyAmount:1,reason:"",backStatus:"",desc:"",telphone:""},submitImg:[],uploadImg:[],reasons:[],alertHidden:!0,textareaHidden:!1,type:0,orderId:"",rec_id:"",orderInfo:"",back_amount:"",shipping_fee:"",showShippingPrice:"",back_sn:"",imgLenth:"",imgNowLength:"",animationData:"",showfwModalStatus:!1}},components:{},props:{},onLoad:function(t){void 0==t||void 0==t.rec_id&&void 0==t.orderId?n.toast("请求参数错误"):(1==t.type?this.setData({type:1,orderId:t.orderId,reasons:["多拍/拍错/不想要","缺货","其他（请填写详细描述）"]}):2==t.type&&this.setData({type:2,rec_id:t.rec_id,reasons:["商品质量问题","发错","其他（请填写详细描述）"]}),this.getApplyDetail())},methods:{preventTouchMove:function(){},getApplyDetail:function(){var t=this,a=this.type;if(1==a)var o=e.getPath.applyBackMoney,s={order_id:t.orderId};else if(2==a)o=e.getPath.applyback,s={rec_id:t.rec_id};n.ApiGateWayTest(o,s,!0,function(a){if(1==a.data.success){a=a.data.result;2==t.type?(t.uploadInfo.backStatus=2,t.uploadInfo.applyAmount=a.products[0].amount):t.uploadInfo.backStatus=3,t.setData({orderInfo:a,uploadInfo:t.uploadInfo}),1==t.type?t.calculateBackAmount():t.calculateBackAmount2(),wx.hideLoading()}})},calculateBackAmount2:function(){for(var t=parseFloat(this.orderInfo.shipping_free_price||69),a=0,o=this.orderInfo.calculate_source.order_goods_remain_product,e=0;e<o.length;e++)a+=parseFloat(o[e].goods_price)*o[e].goods_num;for(var n=parseFloat(this.orderInfo.shipping_fee_should),s=!(0==this.orderInfo.calculate_source.back_shipping_fee_paid&&0==this.orderInfo.shipping_fee),u=parseFloat(this.orderInfo.products[0].shop_price)*this.uploadInfo.applyAmount,i=a-u,p=1==this.orderInfo.calculate_source.sku_remain_num&&this.uploadInfo.applyAmount==this.orderInfo.products[0].amount,r=i>t,l=0,d=0,c=Object.keys(this.orderInfo.prom_info);d<c.length;d++)l+=parseFloat(this.orderInfo.prom_info[c[d]])*this.uploadInfo.applyAmount;this.showShippingPrice=0,this.back_amount=u-l,0!=this.orderInfo.post_free&&(p?s&&(this.back_amount+=n,this.showShippingPrice=1):s||r||(this.back_amount-=n,this.showShippingPrice=2),this.shipping_fee=0==this.showShippingPrice?0:n,this.setData({back_amount:this.back_amount,shipping_fee:this.shipping_fee,showShippingPrice:this.showShippingPrice}))},calculateBackAmount:function(){this.setData({back_amount:parseFloat(this.orderInfo.order_amount).toFixed(2)})},submitApply:function(){var t=this,a=t;a.uploadInfo.backStatus?a.uploadInfo.reason?a.uploadInfo.desc&&""!=a.uploadInfo.desc?a.uploadInfo.desc.length<2?n.toast("字数不能少于2个字"):1==t.type?t.updtype1(a):t.updtype2(a):n.toast("请填写详细描述"):n.toast("请选择申请原因"):n.toast("请选择服务类型")},tapBack:function(){var t=this;t.setData({alertHidden:!0,textareaHidden:!1}),wx.navigateBack({delta:1})},updtype1:function(t){var a=this,o=e.getPath.submitbackordersn,s={order_id:a.orderId,reason_detail:t.uploadInfo.desc,reason:t.uploadInfo.reason};t.uploadInfo.telphone&&(s["contact"]=t.uploadInfo.telphone),a.submitImg(function(t){if(0!=t){t=JSON.parse(t.data);if(0==t.success)return void n.toast(t.msg);a.submitImg.push(t.result.url)}a.uploadImg.length==a.submitImg.length&&(s["pic_info"]=JSON.stringify(a.submitImg),n.ApiGateWayTest(o,s,!0,function(t){if(1==t.data.success){t=t.data.result;a.setData({back_sn:t.back_sn,alertHidden:!1,textareaHidden:!0})}wx.hideLoading()}))})},updtype2:function(t){var a=this,o=e.getPath.submitbackorder,s={rec_id:a.rec_id,reason_detail:t.uploadInfo.desc,back_number:t.uploadInfo.applyAmount,back_status:t.uploadInfo.backStatus,reason:t.uploadInfo.reason};t.uploadInfo.telphone&&(s["contact"]=t.uploadInfo.telphone),a.submitImg(function(t){if(0!=t){t=JSON.parse(t.data);a.submitImg.push(t.result.url)}a.uploadImg.length==a.submitImg.length&&(s["pic_info"]=JSON.stringify(a.submitImg),n.ApiGateWayTest(o,s,!0,function(t){if(1==t.data.success){t=t.data.result;a.setData({back_sn:t.back_sn,alertHidden:!1,textareaHidden:!0})}wx.hideLoading()}))})},updataimg:function(){var t=this;if(t.uploadImg.length<3){var a=parseInt(3)-parseInt(t.uploadImg.length);wx.chooseImage({count:a,success:function(a){t.uploadImg=t.uploadImg.concat(a.tempFilePaths),t.setData({uploadImg:t.uploadImg})}})}},delUploadImg:function(t){var a=t.currentTarget.dataset.index;this.uploadImg.splice(a,1),this.setData({uploadImg:this.uploadImg})},submitImg:function(t){var a=this,o=a.uploadImg,s={accept:"application/json","content-type":"multipart/form-data","x-application":"cilicili","x-platform":"wx","x-useragent":"host","x-ver":"v1.0"};if(s["X-Authorization"]=n.getStorageSync("token"),o.length>0)for(var u in o){var i=a.uploadImg[u],p={path:"order_back",img_type:1};wx.uploadFile({url:e.dataBase.uploadFile,filePath:i,name:"file",formData:p,header:s,success:t}),a.setData({imgLenth:o.length,imgNowLength:Number(u)+1}),n.showLoad(a.imgNowLength+"/"+a.imgLenth)}else t(!1)},go_product:function(t){var a=t.currentTarget.dataset.productId;wx.navigateTo({url:"../../pages/product/product?entryType=external&productId="+a})},GoretrunSQA:function(t){wx.navigateTo({url:"../user/returnSQA"})},setModalStatus:function(t){var a=wx.createAnimation({duration:200,timingFunction:"linear",delay:0});this.animation=a,a.translateY(300).step(),this.setData({animationData:a.export()}),this.setData({showfwModalStatus:!0,textareaHidden:!0}),setTimeout(function(){a.translateY(0).step(),this.setData({animationData:a}),0==t.currentTarget.dataset.status&&this.setData({showfwModalStatus:!1,textareaHidden:!1})}.bind(this),200)},setReasonBefore:function(t){if(t.currentTarget.dataset.item)var a=t.currentTarget.dataset.item;else a=this.reasons[t.detail.value["0"]];if(this.setData({uploadInfo:{applyAmount:this.uploadInfo.applyAmount,reason:a,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:this.uploadInfo.telphone}}),0==t.currentTarget.dataset.status)return this.setModalStatus(t),!1},touchAmountSub:function(){var t=this;1!=t.orderInfo.show_back_btn_allow&&(t.uploadInfo.applyAmount>1&&t.uploadInfo.applyAmount--,this.setData({uploadInfo:{applyAmount:t.uploadInfo.applyAmount,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:this.uploadInfo.telphone}}),this.calculateBackAmount())},touchAmountAdd:function(){var t=this;1!=t.orderInfo.show_back_btn_allow&&(t.uploadInfo.applyAmount<t.orderInfo.products[0].amount&&t.uploadInfo.applyAmount++,this.setData({uploadInfo:{applyAmount:t.uploadInfo.applyAmount,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:this.uploadInfo.telphone}}),this.calculateBackAmount())},back_amount_change:function(t){var a=this;a.uploadInfo.applyAmount=Number(t.detail.value),a.uploadInfo.applyAmount>=a.orderInfo.products[0].amount&&this.setData({uploadInfo:{applyAmount:a.orderInfo.products[0].amount,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:this.uploadInfo.telphone}})},back_amount_blur:function(t){var a=this;a.uploadInfo.applyAmount=Number(t.detail.value),(a.uploadInfo.applyAmount<=0||isNaN(a.uploadInfo.applyAmount))&&this.setData({uploadInfo:{applyAmount:1,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:this.uploadInfo.telphone}}),a.uploadInfo.applyAmount>=a.orderInfo.products[0].amount&&this.setData({uploadInfo:{applyAmount:a.orderInfo.products[0].amount,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:this.uploadInfo.telphone}}),this.calculateBackAmount()},filterSpecialCharacters:function(t){var a=t.detail.value;a=a.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,"");for(var o=new RegExp("[%--`~#$^&*=|{}\\[\\]<>/~#……&*——|{}【】]"),e="",n=0;n<a.length;n++)e+=a.substr(n,1).replace(o,"");this.setData({uploadInfo:{applyAmount:this.uploadInfo.applyAmount,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:e,telphone:this.uploadInfo.telphone}})},limittelphonelen:function(t){for(var a=t.detail.value,o=new RegExp("[%--`~#$^&*=|{}\\[\\]<>/~#……&*——|{}【】]"),e="",n=0;n<a.length;n++)e+=a.substr(n,1).replace(o,"");e&&e.length>15&&(e=e.substring(0,15)),this.setData({uploadInfo:{applyAmount:this.uploadInfo.applyAmount,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:e}})},delemphonelen:function(){this.setData({uploadInfo:{applyAmount:this.uploadInfo.applyAmount,reason:this.uploadInfo.reason,backStatus:this.uploadInfo.backStatus,desc:this.uploadInfo.desc,telphone:""}})},setData:function(t){var a=this,o=[];Object.keys(t).forEach(function(e){o=e.split("."),t[e],a.$data,o.forEach(function(o,n){a[e]=t[e]})})}}};a.default=s},be58:function(t,a,o){"use strict";var e=o("4ab8"),n=o.n(e);n.a},e1f2:function(t,a,o){"use strict";var e=function(){var t=this,a=t.$createElement;t._self._c},n=[];o.d(a,"a",function(){return e}),o.d(a,"b",function(){return n})},f15a:function(t,a,o){"use strict";o.r(a);var e=o("e1f2"),n=o("3f45");for(var s in n)"default"!==s&&function(t){o.d(a,t,function(){return n[t]})}(s);o("be58");var u=o("2877"),i=Object(u["a"])(n["default"],e["a"],e["b"],!1,null,null,null);a["default"]=i.exports}},[["09ab","common/runtime","common/vendor"]]]);