(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/logistics/arrival"],{"0106":function(t,n,o){"use strict";o.r(n);var i=o("52b1"),a=o("64d2");for(var e in a)"default"!==e&&function(t){o.d(n,t,function(){return a[t]})}(e);o("0880");var s=o("2877"),c=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,null,null);n["default"]=c.exports},"05da":function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=getApp().globalData,a=o("28c1"),e={data:function(){return{itemList:[],inputValue:""}},components:{},props:{},onLoad:function(t){this.getboxlist()},onShow:function(){},methods:{arrivalInput:function(t){var n=this,o=t.detail.value,i=/^[a-zA-Z]{2}\d{7}[a-zA-Z]{1}\d{2}$/,e="中转箱码为："+o,s="确认";12!=o.length||0!=i.test(o)?12!=o.length||1!=i.test(o)||a.showModal(e,s,function(t){t.confirm&&n.confirmbox(o)}):a.toast("请输入正确的提货箱码")},getboxlist:function(){a.showLoad(this);var t=this,n=i.getPath.getboxlist;a.ApiLogistics(n,"",!0,function(n){1==n.success?t.setData({itemList:n.result.box_group_list}):a.toast(n.msg),a.hideLoad(t)})},confirmbox:function(t){a.showLoad(this);var n=this,o=i.getPath.confirmbox,e={box_sn:t};a.ApiLogistics(o,e,!0,function(t){a.toast(t.msg),n.setData({inputValue:""}),1==t.success&&n.getboxlist(),a.hideLoad(n)})},scanCode:function(){var t=this;wx.scanCode({success:function(n){t.confirmbox(n.result)}})},goArrivalOrder:function(t){var n=this,o=t.currentTarget.dataset.box_sn;wx.showModal({content:"箱子是否已经到达自提点？",cancelText:"确定",cancelColor:"#EB3C39",confirmText:"取消",confirmColor:"#000",success:function(t){t.cancel&&(n.confirmbox(o),n.getboxlist())}})},setData:function(t){var n=this,o=[];Object.keys(t).forEach(function(i){o=i.split("."),t[i],n.$data,o.forEach(function(o,a){n[i]=t[i]})})}}};n.default=e},"0880":function(t,n,o){"use strict";var i=o("0fe8"),a=o.n(i);a.a},"0fe8":function(t,n,o){},"52b1":function(t,n,o){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.list.status})},a=[];o.d(n,"a",function(){return i}),o.d(n,"b",function(){return a})},"64d2":function(t,n,o){"use strict";o.r(n);var i=o("05da"),a=o.n(i);for(var e in i)"default"!==e&&function(t){o.d(n,t,function(){return i[t]})}(e);n["default"]=a.a}},[["29aa","common/runtime","common/vendor"]]]);