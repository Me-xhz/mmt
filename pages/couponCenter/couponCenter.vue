<template>
<!--pages/couponCenter/couponCenter.wxml-->
<view class="list">
<!-- 返回首页悬浮框/分享进入显示 -->
  <view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
    <image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
    <text>返回首页</text>
  </view>

  <view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_orange01.png)'" v-for="(bonus, index) in lists" :key="index">
    <!-- 左侧面额 -->
    <view class="coupon_val color-coupon" v-if="bonus.coupon_type==1">
      <text class="text">{{bonus.value}}</text>
      <text class="icon">折</text>
    </view>
    <view class="coupon_val color-coupon" v-else>
      <text class="icon">¥</text>
      <text class="text">{{bonus.value}}</text>
    </view>
    <!-- 优惠券信息 -->
    <view class="coupon_info color_gray_dark col-50">
      <view class="list_title">{{bonus.use_type}}</view>
      <view class="dom-attr">{{bonus.description}}</view>
      <view class="list_time">{{bonus.use_end_date}}</view>
    </view>
    <!-- 右侧领取部位 -->
    <form class="get_coupon_btn col-30" @submit="addCoupon" report-submit="true" :data-id="bonus.id" v-if="bonus.give_type==3">
      <button class="getCoupon" formType="submit">
        <span class="get_coupon">领取</span>
      </button>
    </form>
    <span class="list_button_img" v-if="bonus.give_type==2">
            <image mode="widthFix" :src="iconURL + '/is_used_102.png'"></image>
          </span>
    <span class="list_button_img" v-if="bonus.give_type==1">
            <image mode="widthFix" :src="iconURL + '/receive_over02.png'"></image>
          </span>
  </view>

  <!--<view-->
    <!--class='coupon'-->
    <!--style='background-image:url({{iconURL}}/coupon_orange01.png)'-->
    <!--wx:for="{{lists}}">-->
    <!--&lt;!&ndash; 判断折扣类型 &ndash;&gt;-->
    <!--<view class='price' wx:if="{{item.coupon_type==0}}"><text class='small'>￥</text>{{item.value}}</view>-->
    <!--<view class='price' wx:if="{{item.coupon_type==1}}">{{item.value}}<text class='small'>折</text></view>-->
    <!--<view class='coupon_info'>-->
      <!--<view class='des ellipsis'>{{item.use_type}}</view>-->
      <!--<view class='des ellipsis'>{{item.description}}</view>-->
      <!--<view class='des ellipsis'>{{item.use_end_date}}</view>-->
    <!--</view>-->
    <!--<button class='btn' wx:if="{{item.give_type==3}}" data-id='{{item.id}}' bindtap='addCoupon'>领取</button>-->
    <!--<view class='give_type' wx:else>-->
      <!--<image src='{{iconURL}}/is_used_102.png' wx:if="{{item.give_type==2}}"></image>-->
      <!--<image src='{{iconURL}}/receive_over02.png' wx:if="{{item.give_type==1}}"></image>-->
    <!--</view>-->

  <!--</view>-->
      <!-- 暂无红包 -->
  <view v-if="lists && lists.length <= 0">
    <view class="coupon-empty">
      <view class="coupon-empty-image">
        <image :src="iconURL + '/img_coupon_empty02.png'"></image>
      </view>
      <text class="coupon-empty-text">优惠券被抢光啦，请关注下次活动哦~</text>
    </view>
  </view>
  <button class="to_share" open-type="share">
    <image :src="iconURL + '/button-icon-share01.png'"></image>
  </button>
</view>
</template>

<script>
// pages/couponCenter/couponCenter.js
var app = getApp().globalData;
var common = require("../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      lists: [],
      share_info: {},
      isShowGoHome: false,
      entryData: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getallcouponlist(); // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数

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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var pickup = common.getStorageSync('getpickup');
    return {
      title: that.share_info.share_title,
      path: '/pages/couponCenter/couponCenter?pickup_id=' + pickup.pickup_id,
      imageUrl: that.share_info.share_img,
      success: function (res) {
        common.toast('分享成功');
      },
      fail: function (res) {
        common.toast('分享失败');
      }
    };
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
              key: 'city',
              data: {
                'pickup_id': res.pickup_id,
                'warehouse_id': res.warehouse_id,
                'cityName': res.city_name,
                'is_pick_up': 1
              }
            });
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
          }
        });
      });
    },
    // 返回首页
    gotoHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    getallcouponlist: function () {
      var that = this;
      var uri = app.getPath.getallcouponlist;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res && res.data && res.data.success == 1) {
          var result = res.data.result;
          that.setData({
            lists: result.lists,
            share_info: result.share_info
          });
        }
      });
    },
    addCoupon: function (e) {
      var that = this; // 跳转登录

      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      var uri = app.getPath.addCoupon;
      var lists = that.lists;
      var data = {
        coupon_id: e.currentTarget.dataset.id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res && res.data && res.data.success == 1) {
          var result = res.data.result;
          common.toast(result.state_desc);
          that.getallcouponlist();
        }
      });
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
@import "./couponCenter.css";
</style>