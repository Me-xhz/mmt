(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/user/my-order-return"],{"1afa":function(e,t,a){"use strict";var r=a("29ef"),n=a.n(r);n.a},"29ef":function(e,t,a){},"862d":function(e,t,a){"use strict";a.r(t);var r=a("9492"),n=a.n(r);for(var o in r)"default"!==o&&function(e){a.d(t,e,function(){return r[e]})}(o);t["default"]=n.a},9492:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=getApp().globalData,n=a("28c1"),o={data:function(){return{iconURL:r.dataBase.iconURL,page_size:5,page:1,isEmpty:!1,orders:""}},components:{},props:{},onLoad:function(e){},onShow:function(){this.page=1,this.page_size=5,this.orders="",this.loadOrderList()},onReachBottom:function(){var e=this;e.orders&&e.orders.length%e.page_size==0&&(e.page=e.orders.length/e.page_size+1,e.loadOrderList())},onPullDownRefresh:function(){var e=this;e.orders="",e.page=1,e.page_size=5,e.loadOrderList()},methods:{loadOrderList:function(){var e=this;n.showLoad(this);var t=r.getPath.getbackorderlist,a={page:e.page,page_size:e.page_size};n.ApiGateWayTest(t,a,!0,function(t){if(1==t.data.success){var a=t.data.result.data;e.orders=e.orders?e.orders.concat(a):a,e.setData({orders:e.orders}),n.hideLoad(e),wx.stopPullDownRefresh()}})},cancel_back:function(e){var t=this,a=r.getPath.backcancel,o={back_id:e.currentTarget.dataset.back_sn};n.ApiGateWayTest(a,o,!0,function(e){e=e.data;1==e.success&&0==e.result.state&&(n.toast(e.result.state_desc),t.orders="",t.page=1,t.page_size=5,t.loadOrderList())})},go_order_return_detail:function(e){var t=e.currentTarget.dataset.back_sn;wx.navigateTo({url:"../user/order-return-detail?entryType=external&id="+t})},go_aftermarketSchedule:function(e){var t=e.currentTarget.dataset.back_sn;wx.redirectTo({url:"../user/aftermarket-schedule?id="+t})},setData:function(e){var t=this,a=[];Object.keys(e).forEach(function(r){a=r.split("."),e[r],t.$data,a.forEach(function(a,n){t[r]=e[r]})})}}};t.default=o},"9cf7":function(e,t,a){"use strict";a.r(t);var r=a("f6cc"),n=a("862d");for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);a("1afa");var s=a("2877"),c=Object(s["a"])(n["default"],r["a"],r["b"],!1,null,null,null);t["default"]=c.exports},f6cc:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"a",function(){return r}),a.d(t,"b",function(){return n})}},[["bc80","common/runtime","common/vendor"]]]);