<template>
<!--packageA/logistics/nodelivery_detail.wxml-->
<view class="nodelivery-detail">
  <view class="detail-menu">
    <view class="title">基本信息</view>
    <view class="stutas" v-if="orderDetailInfo.is_have_back">用户已申请售后</view>
    <view class="detail-box">
      <view class="detail-item">订单号：{{orderDetailInfo.box_info.order_sn}}</view>
      <view class="detail-item">物流单号：{{orderDetailInfo.box_info.delivery_sn}}</view>
      <view class="detail-item">收货人：{{orderDetailInfo.box_info.consignee}}</view>
      <view class="detail-item">手机号：{{orderDetailInfo.box_info.mobile}}</view>
      <view class="detail-item">所在箱号：{{orderDetailInfo.box_info.box_sn}}</view>
      <view class="detail-item">是否取货码通知：{{orderDetailInfo.box_info.is_noticed}}</view>
      <view class="detail-item">取货码通知时间：{{orderDetailInfo.box_info.order_send_time}}</view>
      <view class="detail-item">到货确认时间：{{orderDetailInfo.box_info.order_send_time}}</view>
    </view>
  </view>
  <view class="detail-menu" v-if="orderDetailInfo.is_have_back == 1">
    <view class="title">售后信息</view>
    <view class="detail-box">
      <view class="detail-item">售后申请时间：{{orderDetailInfo.back_info.add_time}}</view>
      <view class="detail-item">申请角色：{{orderDetailInfo.back_info.back_user_type}}</view>
    </view>
  </view>
  <view class="detail-menu">
    <view class="title">商品信息</view>
    <view class="detail-box row" v-for="(item, index) in orderDetailInfo.goods_info" :key="index">
      <image class="detail-img" :src="item.sku_img"></image>
      <view class="detail-goods-info">
        <view class="goods-name">{{item.goods_name}}</view>
        <view class="goods-desc">{{item.spec_key_name}}</view>
        <view class="goods-price">¥{{item.goods_price}}</view>
        <view class="goods-number">x{{item.goods_num}}</view>
      </view>
    </view>
  </view>
  <view class="footer-button">
    <button class="back-btn" @tap="onBack" v-if="orderDetailInfo.is_show_way_button">送回仓库</button>
    <button class="back-btn-disabled" v-if="orderDetailInfo.box_info.status == 5" disabled>在途中</button>
  </view>
</view>
</template>

<script>
// packageA/logistics/nodelivery_detail.js
const app = getApp().globalData;
const common = require("../../utils/common.js");

export default {
  data() {
    return {
      orderDetailInfo: {},
      orderSn: 0
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.orderSn = options.orderSn;
    this.getDetailInfo();
  },
  methods: {
    getDetailInfo() {
      var that = this;
      var url = app.getPath.takeOrderDetail;
      var data = {
        order_sn: that.orderSn
      };
      common.ApiLogistics(url, data, true, function (resData) {
        if (resData.success == 1) {
          that.setData({
            orderDetailInfo: resData.result
          });
        } else {
          common.toast(resData.msg);
          return;
        }
      });
    },

    onBack() {
      var that = this;
      common.showModal('是否商品已清点完成，即将带回仓库', '确定', function (res) {
        if (res.confirm) {
          var url = app.getPath.unclaimedBackToWare;
          var data = {
            order_sn: that.orderSn
          };
          common.ApiLogistics(url, data, true, function (resData) {
            if (resData.success == 1) {
              that.getDetailInfo();
            } else {
              common.toast(resData.msg);
              return;
            }
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
@import "./nodelivery_detail.css";
</style>