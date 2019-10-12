<template>
<!--pages/recharge/record/record.wxml-->
<view class="list">
  <view class="item" v-for="(item, index) in 123456" :key="index">
    <image class="tel_icon" :src="iconURL + '/btn_sjhsq@2x.png'"></image>
    <view class="des t4">123</view>
    <view class="time t2">123</view>
    <view class="price">1</view>
  </view>
</view>
</template>

<script>
// pages/recharge/record/record.js
var app = getApp().globalData;
var common = require("../../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  onShareAppMessage: function () {},
  methods: {
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
@import "./record.css";
</style>