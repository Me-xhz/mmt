<template>
<view>
<!-- 返回首页悬浮框/分享进入显示 -->
<view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
  <image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
  <text>返回首页</text>
</view>
<view class="tab-bar">
  <view :class="'change-tab ' + (tab_change==0? 'active':'')" data-tab="0" @tap="swichNav">全部</view>
  <view :class="'change-tab ' + (tab_change==1? 'active':'')" data-tab="1" @tap="swichNav">待付款</view>
  <view :class="'change-tab ' + (tab_change==2? 'active':'')" data-tab="2" @tap="swichNav">待配货</view>
  <view :class="'change-tab ' + (tab_change==3? 'active':'')" data-tab="3" @tap="swichNav">配送中</view>
  <view :class="'change-tab ' + (tab_change==4? 'active':'')" data-tab="4" @tap="swichNav">退货/退款</view>
</view>

<view class="order-list" v-if="orders && orders.length > 0 && tab_change!=4">
  <view class="list-item" v-for="(order, index) in orders" :key="index" @tap="goOrderDetail" :data-orderid="order.order_id">
    <!-- 订单头部信息 -->
    <view class="header-row row">
      <view class="border-b row">
        <view class="header-lf w70">
          <text>订单号:</text>
          <text>{{order.order_sn}}</text>
        </view>
        <view class="header-rg w35">
          <text>{{order.status_desc}}</text>
        </view>
      </view>

    </view>
    <!-- 商品列表 -->
    <view class="order-main">
      <view class="date_wrap">
        <view class="tab footer-button">{{order.shippingTimeDesc}}</view>
        <!-- <view class='des'>{{order.shippingTimeDesc}}</view> -->
      </view>
      <view class="goods-item" v-for="(goods, index2) in order.products" :key="index2">
        <view class="item-photo">
          <image lazy-load="true" :src="goods.header_img"></image>
        </view>
        <view class="item-info">
          <view class="info-name">
            {{goods.goods_name}}
          </view>
          <view class="info-price">
            <i class="icon_rmb">¥</i>{{goods.shop_price}}
          </view>
          <view class="info-amount">x{{goods.amount}}</view>
          <view class="back-num" v-if="goods.back_num>0&&order.status!=9">
            已退款{{goods.back_num}}件
          </view>
        </view>
      </view>
    </view>
    <view class="item-footer">
      <view class="footer-sum">
        <view class="b-bottom">
          <i class="sum-nums">共计{{order.goods_count}}件，</i>
          <span>
            <i class="sum-text">实付款 </i>
            <i class="sum">
              <i class="icon_rmb">¥</i>
              <i class="p">{{order.order_amount}}</i>
            </i>
          </span>
        </view>
      </view>
    </view>
    <view class="item-footer buttons" v-if="order.order_btn.back_btn == 1 || order.order_btn.pay_btn == 1 || order.order_btn.cancel_btn == 1 || order.order_btn.comment_again_btn == 1 || order.order_btn.comment_btn == 1 || order.order_btn.receive_btn == 1">
      <button style="background-color:#ffe150;color:#555!important" class="footer-button" v-if="order.order_btn.pay_btn == 1" @click.stop="touchPay" :data-order-id="order.order_id">
        立即支付
      </button>
      <button type="default" class="footer-button back-order-btn" v-if="order.order_btn.back_btn == 1" @click.stop="phoneCall" data-status="1" :data-order-id="order.order_id">联系商家</button>
      <button type="default" class="footer-button back-order-btn" v-if="order.order_btn.comment_btn == 1" data-status="1" :data-order-id="order.order_id" open-type="contact" session-from="goodBuy" @click.stop="unLoad">联系客服</button>
      <button type="default" class="footer-button less-order" v-if="order.order_btn.cancel_btn == 1" @click.stop="touchCancel" :data-order-id="order.order_id">取消订单</button>
       <button class="footer-button to-comment" v-if="order.order_btn.receive_btn == 1" @click.stop="touchConfirm" :data-order-id="order.order_id">确认收货</button>

      <!-- <button   class="footer-button to-comment" wx:if="{{order.order_btn.comment_btn == 1}}" catchtap='touchComment' data-order-id='{{order.order_id}}'>立即评价</button> -->
      <!-- <button  class="footer-button to-comment" wx:if="{{order.order_btn.comment_again_btn == 1}}" catchtap='touchSubComment' data-order-id='{{order.order_id}}'>追加评价</button> -->
    </view>
  </view>
</view>
<!--售后列表显示-->
<view class="order-list" v-if="backorders && backorders.length > 0 && tab_change==4">
  <view class="list-item" v-for="(order, index) in backorders" :key="index" @tap="goBackOrderDetail" :data-orderid="order.back_id">
    <!-- 订单头部信息 -->
    <!-- 订单头部信息 -->
    <view class="header-row row">
      <view class="border-b row">
        <view class="header-lf w70">
          <text>售后单号:</text>
          <text>{{order.back_sn}}</text>
        </view>
        <view class="header-rg w35">
          <text>{{order.status_desc}}</text>
        </view>
      </view>
    </view>
    <!-- 商品列表 -->
    <view class="order-main">
      <view class="date_wrap">
        <view class="tab footer-button">{{order.shippingTimeDesc}}</view>
        <!-- <view class='des'>{{order.shippingTimeDesc}}</view> -->
      </view>
      <view class="goods-item">
        <view class="item-photo">
          <image lazy-load="true" :src="order.header_img"></image>
        </view>
        <view class="item-info">
          <view class="info-name">
            {{order.goods_name}}
          </view>
          <view class="info-price">
            <i class="icon_rmb">¥</i>{{order.shop_price}}
          </view>
          <view class="show-back-time">
            申请时间：{{order.format_create_time}}
          </view>
          <view class="info-amount">x{{order.goods_num}}</view>

        </view>
      </view>
    </view>
    <view class="item-footer">
      <view class="footer-sum">
        <view>
          <i class="sum-nums">共计{{order.goods_num}}件，</i>
          <span>
            <i class="sum-text">实付款 </i>
            <i class="sum">
              <i class="icon_rmb">¥</i>
              <i class="p">{{order.refund_money}}</i>
            </i>
          </span>
        </view>
      </view>
    </view>
  </view>
</view>
<view class="empty" v-if="orders && orders.length <= 0 && tab_change!=4">
  <view class="empty-item">
    <image class="item-logo" :src="iconURL + '/icon_order_empty02.png'" mode="widthFix"></image>
    <view class="item-text">暂无订单</view>
  </view>
</view>
<view class="empty" v-if="tab_change==4&& backorders && backorders.length <= 0">
  <view class="empty-item">
    <image class="item-logo" :src="iconURL + '/icon_order_empty02.png'" mode="widthFix"></image>
    <view class="item-text">暂无订单</view>
  </view>
</view>
<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// packageA/takeout-order/takeout-order.js
var app = getApp().globalData;
var common = require("../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      tab_change: 0,
      page_size: 5,
      page: 1,
      orders: [],
      backorders: [],
      isShowGoHome: false,
      entryData: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this; // 模板消息跳转退货退款

    if (options.tab_change) {
      that.setData({
        tab_change: options.tab_change
      });
    }

    var that = this; // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数

    if (options && options.entryType && options.entryType == 'external') {
      this.setData({
        isShowGoHome: false
      });
    } else {
      this.setData({
        isShowGoHome: true
      });
    } // 外部带商品店铺


    this.setData({
      entryData: options
    });
    var options = that.entryData;
    var pickupId = common.getStorageSync('getpickup'); // 判断是否第一次进入 且是从外部进入，如二维码扫码 && app.firstlaunchApp

    if (options && (options.atitude || options.pickup_id) && !pickupId) {
      that.getExternal(options.pickup_id).then(function () {
        // 关闭开关，让app知道已经不是第一次进入当前页
        app.firstlaunchApp = false; // 清空data内携带参数

        that.entryData = {}; // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示

        common.setStorageSync('authSetting', {
          'scope.userLocation': true
        });
      });
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.page = 1;
    this.page_size = 5;
    this.orders = [];
    this.backorders = [];
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 50
    });
    this.getOrderList();
    this.getBackOrderList();
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function () {
    var that = this;
    that.orders = [];
    that.backorders = [];
    that.page = 1;
    that.page_size = 5;
    that.getOrderList();
    that.getBackOrderList();
  },
  onReachBottom: function () {
    var that = this;

    if (that.orders && that.orders.length % that.page_size == 0) {
      that.page = that.orders.length / that.page_size + 1;

      if (this.tab_change != 4) {
        that.getOrderList();
      } else {
        that.getBackOrderList();
      }
    }
  },
  methods: {
    // 从外部二维码扫码，带经纬度和外部标识external
    getExternal: function (pickup_id) {
      var that = this;
      var uri = app.getPath.getpickup;
      var data = {
        pickup_id: pickup_id
      };
      return new Promise(function (resolve, reject) {
        // 获取提货点
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res && res.data && res.data.success == 1) {
            var res = res.data.result.cities.pick_up;
            common.setStorage({
              key: 'getpickup',
              data: {
                'pickup_id': res.pickup_id,
                'cityName': res.pickup_name,
                'pickup_address': res.pickup_address,
                'pickup_contact': res.pickup_contact,
                'pickup_phone': res.pickup_phone,
                'pickup_type': res.pickup_type
              }
            }, function (res) {
              resolve('获取id成功');
            });
            common.setStorage({
              key: 'city',
              data: {
                'pickup_id': res.pickup_id,
                'warehouse_id': res.warehouse_id,
                'cityName': res.city_name,
                'is_pick_up': 1
              }
            });
          }
        });
      });
    },

    //切换订单列表
    swichNav(e) {
      var that = this;
      common.showLoad(that); // wx.pageScrollTo({
      //   scrollTop: 0,
      //   duration:50
      // })

      that.setData({
        tab_change: e.currentTarget.dataset.tab
      });
      this.onPullDownRefresh();
    },

    //获取订单列表
    getOrderList() {
      var that = this;
      var url = app.getPath.shopOrderList;
      var data = {
        page: that.page,
        page_size: that.page_size,
        status: this.tab_change
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;
        var allOrders = res.result.data;

        if (res.success === 1) {
          that.orders = that.orders ? that.orders.concat(allOrders) : allOrders;
          that.setData({
            orders: that.orders
          });
          common.hideLoad(that);
        } else {
          common.toast(res.data.msg);
        }
      });
    },

    //获取售后订单
    getBackOrderList() {
      var that = this;
      var url = app.getPath.shopOrderBack;
      var data = {
        page: that.page,
        page_size: that.page_size
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;
        var allOrders = res.result.orderBackInfo;

        if (res.success === 1) {
          that.backorders = that.backorders ? that.backorders.concat(allOrders) : allOrders;
          that.setData({
            backorders: that.backorders
          });
          common.hideLoad(that);
        } else {
          common.toast(res.data.msg);
        }
      });
    },

    //跳转售后单详情
    goBackOrderDetail(e) {
      var order = e.currentTarget.dataset.orderid;
      wx.navigateTo({
        url: './order-back?entryType=external&order_id=' + order
      });
    },

    //取消订单
    touchCancel: function (e) {
      var that = this;
      var orderId = e.currentTarget.dataset.orderId;
      var url = app.getPath.shopCancelOrder;
      var data = {
        order_id: orderId
      };
      var content = '是否取消该订单？';
      var confirmText = '确定';
      common.showModal(content, confirmText, function (res) {
        res.confirm && common.ApiGateWayTest(url, data, true, function (res) {
          if (res.data.success == 1) {
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 100
            });
            common.toast(res.data.msg);
            that.onPullDownRefresh();
          } else {
            common.toast(res.data.msg);
          }
        });
      });
    },
    //跳转订单详情
    goOrderDetail: function (e) {
      var order = e.currentTarget.dataset.orderid;
      wx.navigateTo({
        url: './order-detail?entryType=external&order_id=' + order
      });
    },
    // 立即支付
    touchPay: function (e) {
      var that = this;
      var orderId = e.currentTarget.dataset.orderId;
      var payUri = app.getPath.doPay;
      var payData = {
        order_type: 2,
        order_id: orderId,
        payment_code: 'wxpay'
      };
      common.ApiGateWayTest(payUri, payData, true, function (res) {
        if (res.data.success == 1) {
          var data = res.data.result;
          common.doWechatPay(data, function (res) {
            common.toast('支付成功'); // 支付成功后二次验证，修改后台状态

            that.checkPay(orderId);
          }, function (failres) {
            common.toast('支付失败');
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 100
            }); // that.onPullDownRefresh();
          });
        }
      });
    },
    //确认收货
    touchConfirm: function (e) {
      var that = this;
      var orderId = e.currentTarget.dataset.orderId;
      var uri = app.getPath.confirmReceive;
      var data = {
        order_id: orderId
      };
      var content = '你确定已收到宝贝吗？';
      var confirmText = '确定';
      common.showModal(content, confirmText, function (res) {
        res.confirm && common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.data.success == 1) {
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 100
            });
            common.toast(res.data.msg);
            that.onPullDownRefresh();
          } else {
            common.toast(res.data.msg);
          }
        });
      });
    },
    checkPay: function (orderId) {
      var that = this;
      var uri = app.getPath.checkPay;
      var data = {
        order_id: orderId,
        order_type: 2
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 100
        });
        that.onPullDownRefresh();
      });
    },
    touchExpress: function (e) {
      var item = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../user/order-express?order=' + item.order.order_id + '&delivery_id=' + item.delivery_id
      });
    },
    touchComment: function (e) {
      var order = e.currentTarget.dataset.orderId;
      wx.navigateTo({
        url: '../user/order-review?order=' + order
      });
    },
    touchSubComment: function (e) {
      var order = e.currentTarget.dataset.orderId;
      wx.navigateTo({
        url: '../user/add-order-review?order=' + order
      });
    },
    // 申请退款
    refund: function (e) {
      var that = this;
      var orderId = e.target.dataset.orderId;
      wx.navigateTo({
        url: '/packageA/user/application-return?type=1&orderId=' + orderId
      });
    },
    // 返回首页
    gotoHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    // 拨打客服电话
    phoneCall: function () {
      common.phoneCall(app.globalData.hotline);
    },

    //阻止冒泡
    unLoad() {},

    //跳转在线客服
    golinkkf: function () {
      app.dataBase.pageUrl = 'http://q.url.cn/s/6l3eQOm?_type=wpa&_wv=2';
      common.goWebview();
    },
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          that[key] = obj[key];
        });
      });
    }
  }
};
</script>
<style>
@import "./takeout-order.css";
</style>