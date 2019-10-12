<template>
<view>
<!--pages/user/order-express.wxml-->
<view class="container">
  <view class="order-express">
    <view class="express-header">
      <view class="header-item">
        <span class="item-title">物流公司：</span>
        <span class="item-content">{{topinfo.shipping_name}}</span>
      </view>
      <view class="header-item">
        <span class="item-title">运单编号：</span>
        <span class="item-content">{{topinfo.invoice_no}}</span>
      </view>
    </view>
    <view class="express-status" v-if="listinfo && listinfo.length">
      <view class="status-item first" v-if="listinfo && listinfo.length" v-for="(status, index) in listinfo" :key="index">
        <view class="item-title">
          {{status.content}}
        </view>
        <view class="item-content">{{status.datetime}}</view>
        <view class="item-vline"></view>
        <view class="item-dot"></view>
      </view>
      <view class="status-item first">
        <view class="item-title">商品已出库，快递揽收中</view>
        <view class="item-content">{{orderExpressModel.topinfo.shipping_time}}</view>
        <view class="item-vline tip"></view>
        <view class="item-dot"></view>
      </view>
    </view>
  </view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// pages/user/order-express.js
var app = getApp().globalData;
var common = require("../../utils/common.js");
var WxParse = require("../../wxParse/wxParse.js");

export default {
  data() {
    return {
      order: "",
      delivery_id: "",
      back_id: "",
      topinfo: "",
      listinfo: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    if (options == undefined || options.order == undefined || options.delivery_id == undefined) {
      common.toast("请求参数错误");
      return;
    }

    this.setData({
      order: options.order,
      delivery_id: options.delivery_id
    });

    if (options.back_id) {
      this.setData({
        back_id: options.back_id
      });
    }

    this.getexpress();
  },
  methods: {
    getexpress: function () {
      var that = this;
      common.showLoad(this);

      if (!that.back_id) {
        var uriTop = app.getPath.orderShippingTop;
        var data = {
          delivery_id: that.delivery_id
        };
      } else {
        var uriTop = app.getPath.backShippingTop;
        var data = {
          back_id: that.back_id
        };
      }

      common.ApiGateWayTest(uriTop, data, true, function (res) {
        if (res.data.success == 1) {
          that.setData({
            topinfo: res.data.result
          });
          var uriProcess = app.getPath.shippingProcess;
          var processData = {
            shipping_code: that.topinfo.shipping_code,
            invoice_no: that.topinfo.invoice_no
          };
          common.ApiGateWayTest(uriProcess, processData, true, function (res) {
            if (res.data.success == 0) {
              return;
            } else {
              var listinfo = res.data.result;

              for (var i in listinfo.process) {
                var _content = listinfo.process[i].content;
                var tel_reg = /\d{11}/g;

                var _match_tel = _content.match(tel_reg); // if (_match_tel){
                //   var replaceStr = '<block bindtap="opentel" data-tel="' + _match_tel[0] + '">' + _match_tel[0] + '</block>';;
                //   info.status[i].content = _content.replace(tel_reg, replaceStr);
                // }

              }

              that.setData({
                listinfo: listinfo.process
              });
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
@import "./order-express.css";
</style>