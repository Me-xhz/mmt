(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageB/rituall/rituall"],{"357c":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=getApp().globalData,o=a("28c1"),s={data:function(){return{iconURL:n.dataBase.iconURL,vou:[],currentTap:"0",page:1,page_size:5,refresh:!0,couponType:!0,complete:"",content:""}},components:{},props:{},onLoad:function(t){this.setData({page:1});var e=this.currentTap;this.getCouponList(e)},onPullDownRefresh:function(){var t=this.currentTap;this.setData({vou:[],refresh:!0,page:1}),this.getCouponList(t)},onReachBottom:function(){if(this.refresh){this.setData({page:this.page+1});var t=this.currentTap;this.getCouponList(t)}},methods:{like:function(t){wx.switchTab({url:"../../pages/index/index"})},swichNav:function(t){var e=t.currentTarget.dataset.current;this.setData({currentTap:e,vou:[],refresh:!0,page:1}),wx.pageScrollTo({scrollTop:0,duration:0}),this.getCouponList(e)},getCouponList:function(t,e){var a=this,s=n.getPath.getCouponList,u={page:a.page,page_size:a.page_size,status:t};o.ApiGateWayTest(s,u,!0,function(t){if(t&&t.data&&1==t.data.success){var e=t.data.result.data;if(e.length>0){for(var n in e)e[n]["checked"]=0;a.setData({vou:a.vou.concat(e),couponType:!0}),e.length<a.page_size&&a.setData({refresh:!1,complete:"没有更多啦~"})}else a.setData({couponType:!1,refresh:!1});wx.stopPullDownRefresh()}else t&&t.data&&0==t.data.success&&a.setData({couponType:!1,content:t.data.msg})})},unfoldCoupon:function(t){var e=t.currentTarget.dataset.checked;for(var a in this.vou)e==this.vou[a].id&&(this.vou[a].checked=!this.vou[a].checked);this.setData({vou:this.vou})},setData:function(t){var e=this,a=[];Object.keys(t).forEach(function(n){a=n.split("."),t[n],e.$data,a.forEach(function(a,o){e[n]=t[n]})})}}};e.default=s},5883:function(t,e,a){},c8ea:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})},d1b7:function(t,e,a){"use strict";var n=a("5883"),o=a.n(n);o.a},db7b:function(t,e,a){"use strict";a.r(e);var n=a("c8ea"),o=a("ddd4");for(var s in o)"default"!==s&&function(t){a.d(e,t,function(){return o[t]})}(s);a("d1b7");var u=a("2877"),r=Object(u["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},ddd4:function(t,e,a){"use strict";a.r(e);var n=a("357c"),o=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=o.a}},[["1788","common/runtime","common/vendor"]]]);