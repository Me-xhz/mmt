<template>
<!--pages/user/money/money.wxml-->
<view class="list">
  <view class="item" v-for="(item, index) in account_info" :key="index">
    <view class="des t4">{{item.name}}</view>
    <view class="time t2">{{item.add_time}}</view>
    <view class="price">{{item.points}}</view>
  </view>
  <view class="empty" v-if="account_info.length==0">
    <view class="empty-item">
      <image class="item-logo" :src="iconURL + '/icon_order_empty02.png'"></image>
      <view class="item-text">暂无积分记录</view>
    </view>
  </view>
</view>
</template>

<script>
// pages/user/money/money.js
var app = getApp().globalData;
var common = require("../../../utils/common.js");

export default {
  data() {
    return {
      account_info: [],
      iconURL: app.dataBase.iconURL
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.accountLog();
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
  onReachBottom: function () {}
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  // }
  ,
  methods: {
    accountLog: function () {
      var that = this;
      var uri = app.getPath.pointsinfo;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res.data.success == 1) {
          that.setData({
            account_info: res.data.result
          }); // that.data.account_info.reverse()         
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
@import "./integral.css";
</style>