(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/flashSale/flashSale"],{"3eed":function(t,i,e){"use strict";var n=function(){var t=this,i=t.$createElement;t._self._c},a=[];e.d(i,"a",function(){return n}),e.d(i,"b",function(){return a})},"567d":function(t,i,e){"use strict";e.r(i);var n=e("3eed"),a=e("84bf");for(var o in a)"default"!==o&&function(t){e.d(i,t,function(){return a[t]})}(o);e("79b9");var r=e("2877"),s=Object(r["a"])(a["default"],n["a"],n["b"],!1,null,null,null);i["default"]=s.exports},"79b9":function(t,i,e){"use strict";var n=e("9352"),a=e.n(n);a.a},"84bf":function(t,i,e){"use strict";e.r(i);var n=e("c1f8"),a=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,function(){return n[t]})}(o);i["default"]=a.a},9352:function(t,i,e){},c1f8:function(t,i,e){"use strict";function n(t){return r(t)||o(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function o(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function r(t){if(Array.isArray(t)){for(var i=0,e=new Array(t.length);i<t.length;i++)e[i]=t[i];return e}}Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=getApp().globalData,c=e("28c1"),u=function(){return e.e("components/countDown/countDown").then(e.bind(null,"513f"))},l={data:function(){return{iconURL:s.dataBase.iconURL,actived_idx:1,activity_id:0,page:1,page_size:10,activitylist:[],good_list:[],total:0,timer_btn:!1}},components:{countdown:u},props:{},onLoad:function(t){this.getActivitylist()},onReady:function(){},onReachBottom:function(){var t=this;t.total!=t.good_list.length&&(t.setData({page:this.page+1}),t.getActivitygoodslist())},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},methods:{getDate:function(){var t=this,i=setInterval(function(){var e=(new Date).getTime(),n=t.activitylist[1].progress.start_time-e,a=t.activitylist[1].progress.end_time-e;n<=0&&a>=0&&(c.showLoad(t),t.setData({good_list:[],timer_btn:!0}),t.getActivitygoodslist(),clearInterval(i))},1e3)},actived:function(t){var i=this,e=t.currentTarget.dataset;i.setData({activity_id:e.activity_id,actived_idx:e.actived_idx,page:1,good_list:[]}),i.getActivitygoodslist()},getActivitylist:function(){var t=this,i=s.getPath.activitylist;c.ApiGateWayTest(i,{},!0,function(i){i=i.data;if(1==i.success){var e=0,n=i.result.lists.filter(function(t){return 1==t.progress.state}),a=i.result.lists.filter(function(t){return 2==t.progress.state});e=n.length>0?n[0].activity_id:a[0].activity_id,t.setData({activitylist:i.result.lists,activity_id:e}),t.getDate()}})},getActivitygoodslist:function(t){var i=this,e=s.getPath.activitygoodslist,a={page:this.page,page_size:this.page_size,activity_id:this.activity_id};c.ApiGateWayTest(e,a,!0,function(t){t=t.data;var e=t.result.lists;for(var a in i.activitylist)if(i.activitylist[a].activity_id==i.activity_id)var o=i.activitylist[a].progress.state;if(1==t.success){for(var r=0;r<e.length;r++)e[r].state=o;i.setData({good_list:[].concat(n(i.good_list),n(e)),total:t.result.total}),c.hideLoad(i)}})},goToProduct:function(t){var i=t.currentTarget.dataset.goodsid;s.checkSessionKey&&c.formIdUpdate(t),wx.navigateTo({url:"/pages/product/product?entryType=external&productId="+i})},setData:function(t){var i=this,e=[];Object.keys(t).forEach(function(n){e=n.split("."),t[n],i.$data,e.forEach(function(e,a){i[n]=t[n]})})}}};i.default=l}},[["47fc","common/runtime","common/vendor"]]]);