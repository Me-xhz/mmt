(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/coupon/coupon"],{"2f3b":function(t,e,a){"use strict";a.r(e);var n=a("46f0"),o=a("ce52");for(var s in o)"default"!==s&&function(t){a.d(e,t,function(){return o[t]})}(s);a("f4c7");var r=a("2877"),c=Object(r["a"])(o["default"],n["a"],n["b"],!1,null,null,null);e["default"]=c.exports},"46f0":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return o})},"5b7c":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=getApp().globalData,o=a("28c1"),s={data:function(){return{iconURL:n.dataBase.iconURL,vou:[],couponlist:[],currentTab:0,page:1,page_size:10,refresh:!0,couponType:!0,loading:!0,ac_load_btn:!0,isShowGoHome:!1,now_time:(new Date).getTime(),content:""}},components:{},props:{},onLoad:function(t){t&&t.entryType&&"external"==t.entryType?this.setData({isShowGoHome:!1}):this.setData({isShowGoHome:!0})},onShow:function(){var t=this.currentTab;this.setData({vou:[],refresh:!0,page:1}),this.getCouponList(t)},onPullDownRefresh:function(){var t=this.currentTap;this.setData({vou:[],refresh:!0,page:1}),this.getCouponList(t)},onReachBottom:function(){var t=this;if(t.refresh){t.setData({page:t.page+1});var e=t.currentTab;t.getCouponList(e)}},methods:{like:function(t){wx.switchTab({url:"/pages/index/index"})},swichNav:function(t){var e=this;if(!e.ac_load_btn)return!1;var a=t.currentTarget.dataset.current;e.setData({currentTab:a,vou:[],refresh:!0,page:1}),wx.pageScrollTo({scrollTop:0,duration:0}),e.getCouponList(a)},gotoHome:function(){wx.switchTab({url:"/pages/index/index"})},getCouponList:function(t,e){var a=this;o.showLoad(a),a.ac_load_btn=!1;var s=n.getPath.couponList,r={page:a.page,page_size:a.page_size,status:t};o.ApiGateWayTest(s,r,!0,function(t){if(t&&t.data&&1==t.data.success){var e=t.data.result.lists;if(e.length>0){for(var n in e)e[n]["checked"]=0;a.setData({vou:a.vou.concat(e),couponType:!0}),e.length<a.page_size&&a.setData({refresh:!1})}else a.setData({couponType:!1,refresh:!1});wx.stopPullDownRefresh()}else t&&t.data&&0==t.data.success&&a.setData({couponType:!1,content:t.data.msg});a.ac_load_btn=!0,o.hideLoad(a)})},setData:function(t){var e=this,a=[];Object.keys(t).forEach(function(n){a=n.split("."),t[n],e.$data,a.forEach(function(a,o){e[n]=t[n]})})}}};e.default=s},ce52:function(t,e,a){"use strict";a.r(e);var n=a("5b7c"),o=a.n(n);for(var s in n)"default"!==s&&function(t){a.d(e,t,function(){return n[t]})}(s);e["default"]=o.a},f4c7:function(t,e,a){"use strict";var n=a("f507"),o=a.n(n);o.a},f507:function(t,e,a){}},[["798b","common/runtime","common/vendor"]]]);