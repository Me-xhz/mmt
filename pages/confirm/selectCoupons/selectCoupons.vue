<template>
<view>
<!--pages/confirm/selectCoupons/selectCoupons.wxml-->

<view class="cashgift-list select-padding" v-if="cashgifts && cashgifts.length">
  <view class="cashgift-list-box" v-for="(cashgift, index) in cashgifts" :key="index">
    <view :class="'list-item ' + (coupon_id == cashgift.id ? 'active' : '' )" @tap="touchCashgift" :data-item="cashgift">
      <view class="info-ac">
        <view class="ac-icon"></view>
      </view>
      <view class="item-info select-bg">
        <view class="color_theme info-name">
          {{cashgift.name}}
        </view>
        <view class="info-attr">
          {{cashgift.description}}
        </view>
        <view class="color_theme info-expires">{{cashgift.use_end_date}}</view>
      </view>
    </view>
  </view>
</view>

<view class="footbtn footbtn-return">
  <button type="warn" class="submit" @tap="touchClear">不使用优惠券</button>
</view>
</view>
</template>

<script>
// pages/confirm/selectCoupons/selectCoupons.js
var app = getApp().globalData;
var common = require("../../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      order_product: [],
      coupon_id: "",
      cashgifts: "",
      cashgift: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    if (options == undefined || options.order_product == undefined) {
      common.toast("请求参数错误");
      return;
    }

    var that = this;
    that.order_product = options.order_product;
    that.setData({
      coupon_id: options.coupon_id
    });
    that.getOrderCouponList();
  },
  onShow: function () {},
  methods: {
    getOrderCouponList: function () {
      var that = this;
      var uri = app.getPath.getOrderCouponList;
      var data = {
        order_product: that.order_product
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res.data.errorCode != 1) {
          var res = res.data.result;
          that.setData({
            cashgifts: res.data
          });
        } else {
          common.toast(res.data.msg);
        }
      });
    },
    touchCashgift: function (e) {
      var item = e.currentTarget.dataset.item;
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        cashgift: item
      });
      wx.navigateBack();
    },
    touchClear: function () {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.setData({
        cashgift: {
          id: -1
        }
      });
      wx.navigateBack();
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
@import "./selectCoupons.css";
</style>