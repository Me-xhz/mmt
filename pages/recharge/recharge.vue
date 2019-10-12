<template>
<!--pages/recharge/recharge.wxml-->
<view class="page">
<!-- 手机号 -->
  <view class="mobile_wrap">
    <view class="tel">
      <input type="number" value="18039098805" maxlength="11" class="mobile"></input>
    </view>
    <view class="btn_wrap">
		<!-- 有问题，if没有条件 -->
      <view class="btn" v-if="true">
        <image :src="iconURL + '/btn_sjhsq@2x.png'"></image>
        <text>一键授权</text>
      </view>
      <view class="btn" v-else>
        <image :src="iconURL + '/btn_sjhysq@2x.png'"></image>
        <text>已授权</text>
      </view>
    </view>
  </view>
  <!-- 充话费 -->
  <view class="money_wrap">
    <view class="title">
      <text class="mr16">充话费</text><text class="t2">到账后生效，当月有效</text>
      <navigator class="record t2" url="./record/record">充值记录>></navigator>
    </view>
    <view class="clearfix">
      <view :class="'money_box mb26 ' + (selectIdx==index?'actived':'') + ' ' + (index%3!=0?'ml22':'')" v-for="(item, index) in arr" :key="index" :data-index="index" @click.stop="selectItem">
        <view :class="'text1 ' + (selectIdx==index?'actived':'')">100元</view>
        <view :class="'text2 ' + (selectIdx==index?'actived':'')">售价100元</view>
      </view>
    </view>
  </view>
  <view class="money_wrap">
    <view class="title">
      <text class="mr16">充话费</text><text class="t2">到账后生效，当月有效</text>
      <navigator class="record t2" url="./record/record">充值记录>></navigator>
    </view>
    <view class="clearfix">
      <view :class="'money_box mb26 ' + (selectIdx==index?'actived':'') + ' ' + (index%3!=0?'ml22':'')" v-for="(item, index) in arr" :key="index" :data-index="index" @click.stop="selectItem">
        <view :class="'text1 ' + (selectIdx==index?'actived':'')">100元</view>
        <view :class="'text2 ' + (selectIdx==index?'actived':'')">售价100元</view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
// pages/recharge/recharge.js
var app = getApp().globalData;
var common = require("../../utils/common.js");
var event = require("../../utils/event.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      selectIdx: 0,
      arr: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    selectItem: function (e) {
      // console.log(e.currentTarget.dataset.index)
      var index = e.currentTarget.dataset.index;
      this.setData({
        selectIdx: index
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
@import "./recharge.css";
</style>