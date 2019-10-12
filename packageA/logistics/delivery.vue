<template>
<view class="container">
  <view class="row inputBox">
    <input :value="inputValue" class="delivery-input" placeholder="请输入取货码" type="number" focus="true" @input="deliveryInput"></input>
    <button @tap="submit" class="btn-sm">确认</button>
  </view>
  <view class="scan" @tap="scanCode">
    扫一扫
  </view>
</view>
</template>

<script>
const app = getApp().globalData;
const common = require("../../utils/common.js");

export default {
  data() {
    return {
      inputValue: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {},
  onShow: function () {},
  methods: {
    deliveryInput(e) {
      this.setData({
        inputValue: e.detail.value
      });
    },

    submit() {
      var that = this;
      wx.navigateTo({
        url: '../../packageA/logistics/orderdetile?orderSn=' + that.inputValue
      });
      that.setData({
        inputValue: ""
      });
    },

    scanCode() {
      var that = this;
      wx.scanCode({
        success(res) {
          that.inputValue = res.result;
          that.submit();
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
@import "./delivery.css";
</style>