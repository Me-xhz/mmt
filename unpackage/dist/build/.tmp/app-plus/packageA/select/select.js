(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["packageA/select/select"],{"071b":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},c=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return c})},"1ab4":function(t,e,a){"use strict";a.r(e);var i=a("9a5d"),c=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=c.a},"9a5d":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=getApp().globalData,c=a("28c1"),n=(a("b6a1"),function(){return a.e("components/activeGoodsList/activeGoodsList").then(a.bind(null,"da60"))}),s={data:function(){return{iconURL:i.dataBase.iconURL,shopList:[],page:1,page_size:10,activity_id:"",refresh:!0,activity_detail:{},check_activity:!0,isShowGoHome:!1,entryData:""}},components:{goodlist:n},props:{},onLoad:function(t){var e=this;t&&t.entryType&&"external"==t.entryType?this.setData({isShowGoHome:!1}):this.setData({isShowGoHome:!0}),this.setData({entryData:t,activity_id:t.id});t=e.entryData;var a=c.getStorageSync("getpickup");t&&(t.atitude||t.pickup_id)&&!a?e.getExternal(t.pickup_id).then(function(){i.firstlaunchApp=!1,e.entryData={},c.setStorageSync("authSetting",{"scope.userLocation":!0}),e.getIndexProducts()}):e.getIndexProducts()},onShow:function(){var t=this;t.get_activitydetail()},onReachBottom:function(){this.refresh&&(this.setData({page:this.page+1}),this.getIndexProducts())},onShareAppMessage:function(){var e=this,a=c.getStorageSync("getpickup");return{title:e.activity_detail.share_title,path:"packageA/select/select?id="+e.activity_id+"&pickup_id="+a.pickup_id,imageUrl:e.activity_detail.share_img,success:function(e){console.log(t("转发成功"," at packageA\\select\\select.vue:139"))},fail:function(e){console.log(t("转发失败"," at packageA\\select\\select.vue:142"))}}},methods:{getExternal:function(t){var e=i.getPath.getpickup,a={pickup_id:t};return new Promise(function(t,i){c.ApiGateWayTest(e,a,!0,function(e){if(e&&e.data&&1==e.data.success){e=e.data.result.cities.pick_up;c.setStorage({key:"getpickup",data:{pickup_id:e.pickup_id,cityName:e.pickup_name,pickup_address:e.pickup_address,pickup_contact:e.pickup_contact,pickup_phone:e.pickup_phone,pickup_type:e.pickup_type}},function(e){t("获取id成功")}),c.setStorage({key:"city",data:{pickup_id:e.pickup_id,warehouse_id:e.warehouse_id,cityName:e.city_name,is_pick_up:1}})}})})},gotoHome:function(){wx.switchTab({url:"/pages/index/index"})},getIndexProducts:function(){var t=this,e=i.getPath.normalActivityList,a={page:this.page,page_size:this.page_size,normal_activity_id:this.activity_id};return new Promise(function(i,n){c.ApiGateWayTest(e,a,!0,function(e){if(e&&e.data){var a=e.data;if(1==a.success){var n=a.result.lists;t.setData({shopList:t.shopList.concat(n)}),a.result.lists.length<t.page_size?t.refreshFun(!1):t.refreshFun(!0)}else 0==a.success&&t.refreshFun(!1);i("productsSuccess")}else c.toast("网络错误")})})},get_activitydetail:function(){var e=this,a=i.getPath.normalActivityDetail,n={normal_activity_id:this.activity_id};c.ApiGateWayTest(a,n,!0,function(a){1==a.data.success?e.setData({activity_detail:a.data.result.data}):(setTimeout(function(){console.log(t(a.data.msg," at packageA\\select\\select.vue:244")),wx.showToast({title:"出错啦",icon:"none",duration:1500})},600),e.setData({check_activity:!1})),wx.setNavigationBarTitle({title:a.data.result.data.name})})},refreshFun:function(t){this.setData({refresh:t})},setData:function(t){var e=this,a=[];Object.keys(t).forEach(function(i){a=i.split("."),t[i],e.$data,a.forEach(function(a,c){e[i]=t[i]})})}}};e.default=s}).call(this,a("0de9")["default"])},a123:function(t,e,a){},c081:function(t,e,a){"use strict";a.r(e);var i=a("071b"),c=a("1ab4");for(var n in c)"default"!==n&&function(t){a.d(e,t,function(){return c[t]})}(n);a("c423");var s=a("2877"),o=Object(s["a"])(c["default"],i["a"],i["b"],!1,null,null,null);e["default"]=o.exports},c423:function(t,e,a){"use strict";var i=a("a123"),c=a.n(i);c.a}},[["9df7","common/runtime","common/vendor"]]]);