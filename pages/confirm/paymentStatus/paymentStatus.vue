<template>
<view>
<!--pages/confirm/paymentStatus/paymentStatus.wxml-->
<!-- <view class='payment_header'>
  <view class='font_16'><text>收货人：{{consignee.consignee}} {{consignee.mobile}}</text></view>
  <view class='font_16'><text>收货地址：<block wx:for='{{consignee.regions}}'>{{item.name}}</block>{{consignee.address}}</text></view>
</view> -->

<view class="payment_box">
  <view class="user-ad">
    <view class="swipers newSwipers indexAd white-bg-color" id="topHeight" v-if="adList[0].ad_link != ''">
      <swiper :indicator-color="indicatorColor" :current="indexAdcurrent" indicator-active-color="#ffbb44" :indicator-dots="indicatorDots" :circular="circular" :autoplay="!autoplay" :interval="interval" :duration="duration">
        <swiper-item v-for="(item, index) in adList" :key="index" :style="(item.ad_code?'':'background-image:url(' + iconURL) + '/cstp.png)'">
          <image mode="aspectFill" class="adImg newAdimg" :src="item.ad_code"></image>
          <form class="index-from-indexAd new" @submit="goWebView" data-type="2" :data-item="item" report-submit="true">
            <button form-type="submit"></button>
          </form>
        </swiper-item>
      </swiper>
    </view>
  </view>
  <view class="title_wrap">
    <view class="iconfont icon-img_zhifuchenggongx" style="color:#7ed321!important" v-if="success == 1"></view>
    <view class="iconfont icon-img_zhifushibaix" style="color:#eb3c39!important" v-if="success == 0"></view>
    <view class="tc font_17">{{msg}}</view>
  </view>
  <view class="btns row">
    <!-- <button type='default' bindtap='goOrderDetail' class='btn col'>查看订单</button> -->
    <button type="default" style="background-color: #fff!important;" @tap="goOrderList" class="btn col">查看订单</button>
    <button type="warn" style="background-color:#ffe150!important;color:#303030!important;border:none" @tap="goHome" v-if="success == 1" class="btn col">继续逛逛</button>
    <button type="warn" @tap="onPay" v-if="success == 0" style="background-color:#ffe150!important;color:#303030!important;border:none" class="btn col onPay">重新支付</button>
  </view>

</view>

<!-- 推荐商品 -->
<!-- <view class='title'>
  <image src='{{iconURL}}/img_pay_goods01.png'></image>
</view>
<view class='recommend'>
  <goodList list="{{recommend_good_list}}" type="2" align="left"></goodList>
</view> -->

<!-- 自动发放优惠券弹窗 -->
<view class="drawer_screen" v-if="showNewCouponModalStatus"></view>
<view :animation="animationData" style="opacity:0" class="nc_manu_box" v-if="showNewCouponModalStatus">
  <image class="new-coupon-img" mode="widthFix" :src="newCouponImg"></image>
  <view class="new-coupon-btn">
    <form @submit="goCouponList" report-submit="true">
      <button hover-class="none" formType="submit">立即领取</button>
    </form>
  </view>
  <view class="iconfont icon-btn_qiapianguanbianniux" @tap="hideNewCouponModalStatus"></view>
</view>

<!-- 领取红包弹窗 -->
<envelopes :show="showRedEnvel" :rid="red_packet_id" :showType="showRedEnvelType"></envelopes>
</view>
</template>

<script>
// pages/confirm/paymentStatus/paymentStatus.js
var app = getApp().globalData;
var common = require("../../../utils/common.js");
import goodlist from "../../../components/goodList/goodList";

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      // 上拉加载部分
      refresh: true,
      page: 1,
      recommend_good_list: [],
      showNewCouponModalStatus: false,
      newCouponImg: '',
      duration: 500,
      interval: 5000,
      indexAdcurrent: 0,
      indicatorColor: "#fff",
      indicatorActiveColor: "#eb3c39",
      circular: true,
      autoplay: false,
      adList: [],
      indicatorDots: false,
      showRedEnvel: false,
      showRedEnvelType: 1,
      red_packet_id: 0,
      order_id: "",
      payment_code: "",
      msg: "",
      success: "",
      animationData: ""
    };
  },

  components: {
    goodlist
  },
  props: {},
  onLoad: function (options) {
    if (options == undefined) {
      common.toast("请求参数错误");
      return;
    }

    wx.showShareMenu({
      withShareTicket: true
    });
    var that = this;
    that.setData({
      order_id: options.order_id,
      payment_code: options.payment_code
    });
    that.getcheckPay();
    this.getAd();
  },
  onShow: function () {
    this.getRecommendGoodList();
  },
  // 上拉触底事件
  onReachBottom: function (e) {
    if (this.refresh) {
      this.setData({
        page: this.page + 1
      });
      this.getRecommendGoodList();
    }
  },
  // 分享
  onShareAppMessage: function (res) {
    var that = this;
    var pickup = common.getStorageSync('getpickup');
    var entry_share_info = common.getStorageSync('entry_share_info');

    if (res.target && res.target.dataset.shareinfo) {
      let shareInfo = res.target.dataset.shareinfo;

      if (shareInfo && shareInfo.fromButton == 'notice') {
        return {
          title: entry_share_info.urge_share_text,
          path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
          imageUrl: entry_share_info.urge_share_img
        };
      } else if (shareInfo && shareInfo.fromButton == 'envelopes') {
        return {
          title: entry_share_info.invite_share_text,
          path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&user_id=' + entry_share_info.user_id,
          imageUrl: entry_share_info.invite_share_img
        };
      } else {
        return {
          title: entry_share_info.invite_share_text,
          path: '/pages/index/index?pickup_id=' + pickup.pickup_id,
          imageUrl: entry_share_info.invite_share_img
        };
      }
    } else {
      return {
        title: entry_share_info.invite_share_text,
        path: '/pages/index/index?pickup_id=' + pickup.pickup_id,
        imageUrl: entry_share_info.invite_share_img
      };
    }
  },
  methods: {
    getcheckPay: function () {
      var that = this;
      var uri = app.getPath.checkPay;
      var newCouponUri = app.getPath.paySuccessCoupon;
      var data = {
        order_id: that.order_id,
        payment_code: that.payment_code
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res.data.success == 1) {
          that.setData({
            msg: res.data.msg,
            success: res.data.success
          });

          if (res.data.result.couponInfo.list_img && Object.prototype.toString.call(res.data.result.couponInfo) === '[object Object]') {
            that.showNewCouponModalStatus();
            that.setData({
              newCouponImg: res.data.result.couponInfo.list_img
            });
          }

          that.getSendRpAfterOrder();
        } else {
          // app.aldstat.sendEvent("下单未支付");
          that.setData({
            msg: res.data.msg,
            success: res.data.success
          });
        }
      }); // if (that.data.payment_type && that.data.payment_type == 'true'){
      //   that.setData({
      //     msg: '订单支付失败',
      //     success: 0
      //   })
      // }else{
      // }
    },
    goOrderList: function () {
      var that = this;
      wx.redirectTo({
        url: '../../../packageA/user/dingdan?entryType=external&currentTab=0'
      });
    },
    goOrderDetail: function () {
      var that = this;
      wx.redirectTo({
        url: '../../../packageA/user/detail?orderId=' + that.order_id
      });
    },
    goHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    onPay: function () {
      var that = this;
      var payUri = app.getPath.doPay;
      var payData = {
        order_id: that.order_id,
        payment_code: that.payment_code
      };
      common.ApiGateWayTest(payUri, payData, true, function (res) {
        if (res.data.success == 1) {
          var data = res.data.result;
          common.doWechatPay(data, function (res) {
            that.getcheckPay();
          }, function (failres) {});
        }
      });
    },
    // 新人自动发放优惠券弹窗
    showNewCouponModalStatus: function (e) {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: "linear",
        delay: 0
      });
      this.setData({
        animationData: animation.export()
      });
      this.setData({
        showNewCouponModalStatus: true
      });
      setTimeout(function () {
        animation.translateY('-100px').translateX('-50%').opacity(1).step();
        this.setData({
          animationData: animation
        });
      }.bind(this), 200);
    },
    // 隐藏新人自动发放优惠券弹窗
    hideNewCouponModalStatus: function (e) {
      common.formIdUpdate(e);
      this.setData({
        showNewCouponModalStatus: false
      });
    },
    goCouponList: function (e) {
      var that = this;
      wx.redirectTo({
        url: '../../../pages/coupon/coupon?entryType=external'
      });
    },
    // 上拉加载部分
    getRecommendGoodList: function () {
      var that = this;
      var url = app.getPath.highSaleGoods;
      var page_size = 10;
      var data = {
        page: this.page,
        page_size
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          that.setData({
            recommend_good_list: [...that.recommend_good_list, ...res.result.products]
          });

          if (res.result.products.length < page_size) {
            that.refreshFun(false);
          } else {
            that.refreshFun(true);
          }
        }
      });
    },
    //获取广告图
    getAd: function () {
      var that = this;
      var uri = app.getPath.adlist;
      var data = {
        pid: 7
      };
      return new Promise(function (resolve, reject) {
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res && res.data && res.data.success == 1) {
            var data = res.data.result;

            if (data.length > 1) {
              that.setData({
                indicatorDots: true
              });
            } else {
              that.setData({
                indicatorDots: false
              });
            }

            that.setData({
              adList: data,
              indexAdcurrent: 0,
              // share_title: data.share_title,
              indicatorDots: data.length > 1 ? true : false // keyWord: data.keyword

            });
            resolve('successAd');
          }
        });
      });
    },
    adclose: function (ad_id, is_close) {
      var that = this;
      var uri = app.getPath.adclose;
      var data = {
        ad_id,
        is_close
      };
      common.ApiGateWayTest(uri, data, true, function (res) {});
    },
    // 跳转指定专题页
    goWebView: function (e) {
      common.goAdWebView(e);
    },
    // 是否允许上拉加载
    refreshFun: function (data) {
      this.setData({
        refresh: data
      });
    },

    // 红包-是否有领取红包
    getSendRpAfterOrder() {
      var that = this;
      var url = app.getPath.sendRpAfterOrder;
      var data = {
        order_id: that.order_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var resData = res.data;

        if (resData.success == 1) {
          var entry_share_info = {
            user_id: resData.result.user_id,
            invite_share_img: resData.result.invite_share_img,
            invite_share_text: resData.result.invite_share_text,
            urge_share_img: resData.result.urge_share_img,
            urge_share_text: resData.result.urge_share_text
          };
          common.setStorageSync('entry_share_info', entry_share_info);

          if (resData.result.is_send) {
            that.setData({
              showRedEnvel: true,
              showRedEnvelType: 1,
              red_packet_id: resData.result.red_packet_id
            });
          } else {
            that.setData({
              showRedEnvel: true,
              showRedEnvelType: 2
            });
          }
        } else {
          common.toast(resData.msg);
          return;
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
@import "./paymentStatus.css";
</style>