<template>
<view class="arrival-order">
  <view class="arrival-header">
    <view class="order-number">{{boxInfo.count}}</view>
    <view class="order-number-title">{{boxInfo.box_name}}箱子订单数</view>
  </view>
  <view class="order-list">
    <view class="order-item" v-for="(item, index) in items" :key="index">
      <view class="order-item-text">物流单号：{{item.delivery_sn}}</view>
      <view class="order-item-text">订单号：{{item.order_sn}}</view>
      <view class="order-item-text">收货人：{{item.consignee}}</view>
      <view class="order-item-text">手机号：{{item.mobile}}</view>
      <view class="order-item-text">装箱时间：{{item.add_time}}</view>
    </view>
  </view>
</view>
</template>

<script>
const app = getApp().globalData;
const common = require("../../utils/common.js");

export default {
  data() {
    return {
      items: [],
      boxInfo: {}
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.getBoxInfo(options.box_sn);
  },
  onShow: function () {},
  methods: {
    getBoxInfo(id) {
      var that = this;
      var uri = app.getPath.boxInfo;
      var data = {
        box_sn: id
      };
      common.ApiLogistics(uri, data, true, function (res) {
        if (res.success == 1) {
          that.setData({
            items: res.result.boxOrderInfo,
            boxInfo: res.result.boxInfo
          });
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
@import "./arrivalOrder.css";
</style>