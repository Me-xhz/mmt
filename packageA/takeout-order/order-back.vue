<template>
<view>
<!--main sn-->
<view class="container">
    <!-- 返回首页悬浮框/分享进入显示 -->
    <view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
        <image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
        <text>返回首页</text>
    </view>
    <view class="sns-header row row-center">
        <view class="col">{{backInfo.status_desc}}</view>
        <button class="message t3" show-message-card="true" open-type="contact" session-from="goodBuy">联系客服</button>
    </view>
    <!-- Goods -->
    <view class="order-main">
        <view class="goods-item no-border">
            <view class="item-photo">
                <image :src="backInfo.back_goods_info.header_img"></image>
            </view>
            <view class="item-info">
                <view class="info-name">
                    {{backInfo.back_goods_info.goods_name}}
                </view>
                <view class="info-price">
                    <i class="icon_rmb">¥</i>{{backInfo.back_goods_info.shop_price}}
                </view>
                <view class="info-amount">x{{backInfo.back_goods_info.back_num}}</view>
            </view>
        </view>
    </view>
    <!--order msg-->
    <view class="order-msg-box">
        <view class="order-msg">
            <view class="msg-header row">
                <span class="header-title t4">退款金额</span>
                <span class="col header-price">
          <i class="font-bold">
            <i class="icon_rmb">¥</i>{{backInfo.refund_money}}
          </i>
        </span>
            </view>
        </view>
        <view class="order-msg">
            <view class="msg-header row">
                <span class="header-title t4">申请原因</span>
                <span class="header-txt col tr">{{backInfo.reason_desc}}</span>
            </view>
        </view>
        <view class="order-msg-mainbox">
            <view class="msg-header">
                <span class="header-title t4">详细描述</span>
            </view>
            <text>{{backInfo.describe}}</text>
            <view class="msg-imgbox" v-if="backInfo.back_img_info.length > 0">
                <view class="box-img" v-for="(item, index) in backInfo.back_img_info" :key="index">
                    <image :src="item"></image>
                </view>
            </view>
        </view>
    </view>

    <view class="order-sns">
        <p>
            <i class="sns-title t4">申请时间：</i>
            <i class="sns-txt t4">{{backInfo.format_create_time}}</i>
        </p>
        <p class="allowselect">
            <i class="sns-title t4 forbiddenselect">订单编号：</i>
            <i class="sns-txt t4 allowselect">{{backInfo.order_sn}}</i>
        </p>
        <p class="allowselect">
            <i class="sns-title t4 forbiddenselect">售后单号：</i>
            <i class="sns-txt t4 allowselect">{{backInfo.back_sn}}</i>
        </p>
    </view>
</view>
<!--GO KF-->
<view class="order-kf">
    <view class="phone-kf t3" @tap="phoneCall">联系客服</view>
    <view class="t2 phone-kf-time">
        <text>服务时间：</text>
        <text>9:00-18:00</text>
    </view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// pages/user/order-return-detail.js
var app = getApp().globalData;
var common = require("../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      back_id: '',
      isShowGoHome: false,
      backInfo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    if (options == undefined || options.order_id == undefined) {
      common.toast("请求参数错误");
      return;
    } // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数


    if (options && options.entryType && options.entryType == 'external') {
      this.setData({
        isShowGoHome: false
      });
    } else {
      this.setData({
        isShowGoHome: true
      });
    }

    var that = this;
    that.setData({
      back_id: options.order_id
    });
  },
  onShow: function () {
    if (this.back_id == undefined) {
      common.toast("请求参数错误");
      return;
    }

    this.getBackDetail();
  },
  methods: {
    // 返回首页
    gotoHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    // Idontk:function(){
    //   var that = this;
    //   common.showModal('是否和提货点人员确认已寄回','确认',function(r){
    //     if (r.cancel){
    //       return false;
    //     }
    //     var url = app.getPath.backReturnPickup;
    //     var data = {
    //       back_id: that.data.back_id,
    //     };
    //     common.ApiGateWayTest(url, data, true, function (res) {
    //       var res = res.data;
    //       if(res.success==1){
    //         common.toast(res.msg)
    //         that.getBackDetail();
    //       }
    //     })
    //   })
    // },
    //获取数据
    getBackDetail: function () {
      var that = this;
      var e = that;
      common.showLoad(this);
      var url = app.getPath.shopOrderBackDetail;
      var data = {
        back_id: that.back_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        if (res.data.success == 1) {
          var res = res.data.result.data;
          that.setData({
            backInfo: res
          });
        }

        common.hideLoad(that);
      });
    },
    //前往订单进度
    go_aftermarketSchedule: function (e) {
      var id = e.currentTarget.dataset.back_sn;
      wx.redirectTo({
        url: '../user/aftermarket-schedule?id=' + id
      });
    },
    // 拨打客服电话
    phoneCall: function () {
      common.phoneCall(app.globalData.hotline);
    },
    //跳转在线客服
    golinkkf: function () {
      app.dataBase.pageUrl = 'http://q.url.cn/s/6l3eQOm?_type=wpa&_wv=2';
      common.goWebview();
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
@import "./order-back.css";
</style>