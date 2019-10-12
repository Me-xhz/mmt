<template>
<view class="cashCoupon" :style="'background-image:url(' + iconURL + '/img_getcash_bg.png)'">
  <view class="content" :style="'background-image:url(' + iconURL + '/img_getcash_card.png)'">
    <view class="cashCoupon_box">

      <view class="cashCoupon_header">
        <view class="head_portrait">
          <image :src="user.head_pic" :style="'background-image:url(' + iconURL + '/default_pic.png)'"></image>
        </view>
        <view class="title">该优惠券由 <text class="title_name">【{{user.nickname}}】</text> 提供</view>
      </view>

      <view class="title_pic"><image :style="'background-image:url(' + iconURL + '/img_getcash_title.png)'"></image></view>

      <scroll-view class="cashCoupon_main" scroll-y="true">
        <view class="card_bg row" v-for="(item, index) in bonuslist" :key="index" :style="'background-image:url(' + iconURL + '/img_getcash_coupon.png)'">
          <view class="coupon_left"><text class="coupon_left_text">{{item.name}}</text></view>
          <view class="coupon_right">
            <view class="coupon_right_price"><text class="symbol">￥</text>{{item.value}}</view>
            <view class="coupon_right_text">{{item.description}}</view>
          </view>
          <view class="coupon_time">有效期:{{item.use_start_time}}-{{item.use_end_time}}</view>
        </view>
      </scroll-view>

      <!-- 一键领取按钮 -->
      <view class="cashCoupon_bottom" :style="'background-image:url(' + iconURL + '/img_getcash_top.png)'">
        <view class="cashCoupon_bottom_btn" @tap="exchange" :style="'background-image:url(' + iconURL + '/img_getcash_btn.png)'">一键领取</view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
// pages/cashCoupon/cashCoupon.js
var app = getApp().globalData;
var common = require("../../utils/common.js");
var event = require("../../utils/event.js");
var icon_url = app.dataBase.iconURL;

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      checkSessionKey: "",
      bonuslist: "",
      user: "",
      state: "",
      shareInfo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    that.setData(options);

    if (!app.checkSessionKey) {
      event.on('checkSessionKey', this, function (data) {
        this.setData({
          checkSessionKey: data
        });
        that.getBonuslist();
        that.getShare();
      });
    } else {
      that.getBonuslist();
      that.getShare();
    } // common.getUserSessionKey().then(function () {
    //   that.setData({
    //     checkSessionKey: true
    //   })
    //   that.getBonuslist();
    //   that.getShare();
    // }).catch(function () {
    //   that.setData({
    //     checkSessionKey: false
    //   })
    // })

  },
  methods: {
    // 领券列表
    getBonuslist: function () {
      var that = this;
      var uri = app.getPath.bonuslist;
      var data = {
        bonus_sn: that.bonus_sn
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          that.setData({
            bonuslist: res.result.lists,
            user: res.result.user
          });
        }
      });
    },
    // 领券
    exchange: function () {
      var that = this;
      var uri = app.getPath.exchange;
      var data = {
        bonus_sn: that.bonus_sn
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          common.toast(res.result.msg);
          that.setData({
            state: res.result.state
          });
        }
      });
    },
    // 分享信息
    getShare: function () {
      var that = this;
      var uri = app.getPath.share;
      var data = {
        bonus_sn: that.bonus_sn
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          that.setData({
            shareInfo: res.result[0]
          });
        }
      });
    } // onShareAppMessage:function(){
    //   var that = this;
    //   var shareInfo = that.data.shareInfo;
    //   return {
    //     title: shareInfo.description,
    //     path: '/pages/cashCoupon/cashCoupon?bonus_sn=' + shareInfo.bonus_sn,
    //     imageUrl: shareInfo.img,
    //     success: function (res) {
    //     }
    //   };
    // }
    ,
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
@import "./cashCoupon.css";
</style>