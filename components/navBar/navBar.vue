<template>
<!--components/navBar/navBar.wxml-->
<view class="navbar-box" :style="'height: ' + navBarHeight + 'px'">
  <view :style="'height: ' + navBarHeight + 'px'"></view>
  <view class="navbar-menu" :style="'height: ' + navBarHeight + 'px'">
    <view :class="'menu-left ' + (!showBack || !showHome ? 'noborder' : '')">
      <view @tap="back" v-if="showBack" class="iconfont icon-btn_fanhuizuojiantoux"></view>
      <view @tap="backHome" v-if="showHome" class="iconfont icon-btn_shangxiangshouyex"></view>
    </view>
    <view class="menu-title">{{title}}</view>
  </view>
</view>
</template>

<script>
// components/navBar/navBar.js
// const app = getApp().globalData;

export default {
  data() {
    return {
      navBarHeight: getApp().globalData.navBarHeight
    };
  },

  components: {},
  props: {
    showHome: {
      type: Boolean,
      value: false
    },
    showBack: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: '买买提团购'
    }
  },
  methods: {
    backHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    back: function () {
      wx.navigateBack({
        delta: 1
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
@import "./navBar.css";
</style>