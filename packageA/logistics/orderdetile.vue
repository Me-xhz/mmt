<template>
<view>
<view class="orderdetail">
    <view class="order-header">
        <view class="order-item">订单到货时间：{{orderInfo.box_confirm_time}}</view>
        <view class="order-item">提货码：{{orderInfo.get_sn}}</view>
        <view v-if="orderInfo.is_today == 0" class="order-state">非今日订单</view>
    </view>
    <view class="order-geo">
        <view v-if="orderInfo.order_status == 0" class="info-state">待提货</view>
        <view v-if="orderInfo.order_status == 1" class="info-state">已提货</view>
        <view v-if="orderInfo.order_status == 2" class="info-state">该订单已申请售后,请勿递送包裹</view>
        <view class="geo-box">
            <view class="geo-text">{{orderInfo.box_sn}}</view>
            <view class="geo-name">包裹位置</view>
        </view>
        <!-- <view class="geo-box">
            <text class="geo-text">暂无信息位置</text>
            <text @click="openTel" class="iconfont geo-name">&#xe938; 联系管理员</text>
        </view> -->
    </view>
    <view class="order-main">
      <view class="total-goods">共{{orderInfo.total_goods}}件商品</view>
      <view class="goods-item" v-for="(goods, index) in orderInfo.goods_info" :key="index">
        <view class="item-photo">
          <image :src="goods.sku_img"></image>
        </view>
        <view class="item-info">
          <view class="info-name">
            <text>{{goods.goods_name}}</text>
          </view>
          <view class="info-attr w80">
            <text>{{goods.spec_key_name}}</text>
          </view>
          <view class="info-price">
            <i class="icon-rmb">¥</i>{{goods.goods_price}}
          </view>
          <view class="info-amount info-amount-font">x{{goods.goods_num}}</view>
        </view>
      </view>
    </view>
    <view class="order-info">
        <view class="info-item">订单号：{{orderInfo.order_sn}}</view>
        <view class="info-item">物流单号：{{orderInfo.delivery_sn}}</view>
        <view class="info-item">收货人：{{orderInfo.consignee}}</view>
        <view class="info-item">手机号：{{orderInfo.mobile}}</view>
        <view v-if="orderInfo.order_status == 1 && orderInfo.order_confirm_time != ''" class="info-item">订单提货时间：{{orderInfo.order_confirm_time}}</view>
        <view v-if="orderInfo.order_status == 1" class="info-item">确认类型：{{orderInfo.confirm_type == 0 ? '用户确认收货' : '自提点确认收货'}}</view>
    </view>
    <view v-if="orderInfo.order_status == 0" @tap="submit" class="submit">确认提货</view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
const app = getApp().globalData;
const common = require("../../utils/common.js");

export default {
  data() {
    return {
      orderSn: "",
      orderInfo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.orderSn = options.orderSn;
    this.getOrder();
  },
  onUnload: function () {
    var that = this;
    var url = app.getPath.confirmorder;
    var data = {
      order_sn: that.orderInfo.order_sn
    };

    if (that.orderInfo.order_status == 0) {
      common.showModal('该订单未进行确认收货，是否确认收货?', '确认收货', function (res) {
        if (res.confirm) {
          common.showLoad(that);
          common.ApiLogistics(url, data, true, function (resData) {
            if (resData.success == 1) {
              common.toast(resData.msg);
            } else {
              common.toast(resData.msg);
              return;
            }

            common.hideLoad(that);
          });
        }
      });
    }
  },
  methods: {
    getOrder() {
      common.showLoad(this);
      var that = this;
      var url = app.getPath.getOrder;
      var data = {
        order_sn: this.orderSn
      };
      common.ApiLogistics(url, data, true, function (res) {
        if (res.success == 1) {
          that.setData({
            orderInfo: res.result
          });
        } else {
          var content = res.msg;
          var confirmText = '确定';
          common.showRidoModal(content, confirmText, function (data) {
            if (data.confirm) {
              wx.navigateBack({
                delta: 1
              });
            }
          });
        }

        common.hideLoad(that);
      });
    },

    submit() {
      var that = this;
      var url = app.getPath.confirmorder;
      var data = {
        order_sn: that.orderInfo.order_sn
      };
      var content = "是否确认提货？";
      var confirmText = '确定';
      common.showModal(content, confirmText, function (res) {
        if (res.confirm) {
          common.showLoad(that);
          common.ApiLogistics(url, data, true, function (resData) {
            if (resData.success == 1) {
              that.getOrder();
              common.toast(resData.msg);
              wx.navigateTo({
                url: '/packageA/logistics/delivery'
              });
            } else {
              common.toast(resData.msg);
              return;
            }

            common.hideLoad(that);
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
@import "./orderdetile.css";
</style>