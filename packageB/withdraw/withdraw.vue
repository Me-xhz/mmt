<template>
<view>
<view class="withdraw">
  <view class="header-main" :style="'background-image: url(' + $1 + ')'">
    <view class="title">恭喜获得</view>
    <view class="price">{{red_packet_info.red_packet_in_cash || 0.00}}<i>元</i></view>
  </view>
  <view class="swiper-list">
    <swiper class="swiper-box" vertical="true" autoplay="true" interval="3000" circular="true">
      <swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="index">
        <view class="row item" v-for="(items, index2) in item" :key="index2">
          <image class="logo" :src="items.head_pic" mode="widthFix"></image>
          <view class="row text">
            <view class="name">{{items.nickname}}</view>
            <i v-if="items.type == 1">下单成功，从手气红包获得了</i>
            <i v-if="items.type == 2">邀请好友，从手气红包开出</i>
          </view>
          <view class="price"><i>{{items.red_packet_in_cash}}</i>元</view>
        </view>
      </swiper-item>
    </swiper>
    <view class="swiper-no-hove"></view>
  </view>
  <view class="footer-btn">
    <form report-submit="true" @submit="onWithdraw">
      <button form-type="submit">立即提现</button>
    </form>
    <image class="prompt-img" :src="iconURL + '/invitation-guide-prompt.gif'" mode="widthFix"></image>
  </view>
</view>

<!-- 引导弹窗 -->
<view class="curtain" v-if="popupShow" catchtouchmove="bindtouchmove"></view>
<view class="popup-model" v-if="popupShow" catchtouchmove="bindtouchmove">
  <view class="title">提现成功</view>
  <view class="price-msg">
    <view class="price">{{red_packet_info.red_packet_in_cash || 0.00}}</view>
    <view class="text">元已存入您的账户</view>
  </view>
  <view class="text-log">可在微信钱包中查看</view>
  <view class="row popup-footer-btn">
    <navigator target="miniProgram" open-type="exit" @tap="onWithdrawOut">
      <view class="btn left">立即查看</view>
    </navigator>
    <view class="btn right" @tap="onWithdrawOut">确定</view>
  </view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// packageB/withdraw/withdraw.js
var app = getApp().globalData;
const common = require("../../utils/common.js");

export default {
  data() {
    return {
      red_packet_info: {},
      swiperList: [],
      rid: 0,
      iconURL: app.dataBase.iconURL,
      is_first: 0,
      popupShow: false,
      showRedEnvel: false,
      showRedEnvelType: 0
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.rid = options.rid;
    this.getCsShowRedPacketInfo();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  methods: {
    // 获取提现信息
    getCsShowRedPacketInfo() {
      var that = this;
      var url = app.getPath.csShowRedPacketInfo;
      var data = {
        red_packet_id: that.rid
      };
      common.ApiCoordination(url, data, true, function (res) {
        var resData = res.data;

        if (resData.success == 1) {
          var swiperList = [];

          for (var i = 0; i < resData.result.invite_list.length; i += 3) {
            swiperList.push(resData.result.invite_list.slice(i, i + 3));
          }

          that.setData({
            red_packet_info: resData.result.red_packet,
            swiperList: swiperList
          });
        }
      });
    },

    // 立即提现
    onWithdraw(e) {
      common.formIdUpdate(e);
      var that = this;
      common.showLoad(that);
      var pickupId = common.getStorageSync('getpickup');
      // app.aldstat.sendEvent("withdraw_report", {
      //   "提货点": pickupId.cityName
      // });
      var url = app.getPath.rpCashOut;
      var data = {
        red_packet_id: that.rid
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var resData = res.data;
        common.hideLoad(that);

        if (resData.success == 1) {
          if (resData.result.success) {
            that.setData({
              popupShow: true,
              is_first: resData.result.is_first
            });
          } else {
            common.toast(resData.msg);
            return;
          }
        } else {
          common.toast(resData.msg);
          return;
        }
      });
    },

    // 提现成功-返回
    onWithdrawOut() {
      var that = this;

      if (that.is_first == 1) {
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 1]; //当前界面

        var prevPage = pages[pages.length - 2]; //上一个页面

        prevPage.setData({
          showRedEnvel: true,
          showRedEnvelType: 2
        });
        wx.navigateBack({
          delta: 1
        });
      } else {
        wx.navigateBack({
          delta: 1
        });
      }
    },

    // 滚动溢出
    bindtouchmove() {
      return false;
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
@import "./withdraw.css";
</style>