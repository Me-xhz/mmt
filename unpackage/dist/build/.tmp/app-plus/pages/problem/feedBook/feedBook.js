(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/problem/feedBook/feedBook"],{"38dd":function(e,t,n){},5599:function(e,t,n){"use strict";n.r(t);var o=n("dd90"),a=n("bbd8");for(var c in a)"default"!==c&&function(e){n.d(t,e,function(){return a[e]})}(c);n("e6c3f");var f=n("2877"),u=Object(f["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=u.exports},"585f":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=getApp().globalData,a=n("28c1"),c={data:function(){return{feedback:[],feedbackContent:"",feedbackPhone:"",currentWordNumber:""}},components:{},props:{},onLoad:function(e){},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},methods:{inputs:function(e){var t=this,n=e.detail.value,o=parseInt(n.length);t.setData({currentWordNumber:o,feedbackContent:n})},feedbackPhone:function(e){var t=this;t.setData({feedbackPhone:e.detail.value})},feedBackAdd:function(){var t=this,n=/^((13|14|15|17|18)[0-9]{1}\d{8})$/;if(""!=t.feedbackContent&&""!=t.feedbackPhone)if(t.feedbackContent.length<6)a.toast("反馈内容不得少于6个字");else if(n.test(t.feedbackPhone)){var c=o.getPath.feedbackadd,f={content:t.feedbackContent,mobile:t.feedbackPhone,msg_type:1};a.ApiGateWayTest(c,f,!0,function(t){if(t&&1==t.data.success){t=t.data.result;wx.showModal({title:"反馈成功",content:"（客服会尽快为您处理）",success:function(t){t.confirm?wx.navigateBack({delta:2}):t.cancel&&console.log(e("用户点击取消"," at pages\\problem\\feedBook\\feedBook.vue:144"))}})}})}else a.toast("请输入正确的手机号");else a.toast("内容或手机号不能为空")},setData:function(e){var t=this,n=[];Object.keys(e).forEach(function(o){n=o.split("."),e[o],t.$data,n.forEach(function(n,a){t[o]=e[o]})})}}};t.default=c}).call(this,n("0de9")["default"])},bbd8:function(e,t,n){"use strict";n.r(t);var o=n("585f"),a=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,function(){return o[e]})}(c);t["default"]=a.a},dd90:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=(e._self._c,e._f("0")(e.currentWordNumber));e.$mp.data=Object.assign({},{$root:{f0:n}})},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},e6c3f:function(e,t,n){"use strict";var o=n("38dd"),a=n.n(o);a.a}},[["4bfd","common/runtime","common/vendor"]]]);