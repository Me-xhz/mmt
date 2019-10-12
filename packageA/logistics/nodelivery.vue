<template>
<view>
<view class="container">
  <view class="row node-number">
    <view class="text" @tap="showNumberModel">查看商品数量统计</view>
    <view class="number">订单数：{{boxOrderNumber}}</view>
    <picker @change="bindPickerChange" :value="index" :range="pickerArray" v-if="pageStyle == 1">
      <view class="row picker-select">
        <view>{{pickerArray[pickerIndex]}}</view>
        <view class="iconfont icon-btn_sanjiaoxiaojiantoux"></view>
      </view>
    </picker>
  </view>
  <view class="row searchbox">
    <picker mode="date" class="dataInpt" :value="dateValue" @change="bindTimeChange">{{dateValue == "" ? "选择日期" : dateValue}}</picker>
    <input class="searchInput" :value="searchValue" type="text" @input="searchInput" @confirm="searchCifim" placeholder="姓名/手机号/物流单号"></input>
  </view>

  <view class="list-pad">
    <view class="list-box" v-for="(item, index) in boxOrderInfo" :key="index" @tap="goDetail" :data-order-sn="item.order_sn">
      <view class="list-item">订单号：{{item.order_sn}}</view>
      <view class="list-item">物流单号：{{item.delivery_sn}}</view>
      <view class="list-item">收货人：{{item.consignee}}</view>
      <view class="list-item">手机号：{{item.mobile}}</view>
      <view class="list-item" v-if="pageStyle == 1">是否发送取货码：{{item.is_noticed}}</view>
      <view class="list-item" v-if="pageStyle == 1">取货码发送时间：{{item.order_send_time}}</view>
      <view v-if="item.is_have_back == 1" class="list-status">用户已申请售后</view>
      <view class="list-btn-box">
        <button class="list-btn">查看详情</button>
      </view>
    </view>
  </view>
</view>

<view class="drawer_screen" @tap="hideNumberModel" v-if="numberModelStatus"></view>
<view class="number-model-box" v-if="numberModelStatus">
  <view class="header-text">商品数量统计</view>
  <!-- <view class="row model-main">
    <text class="main-title">商品名称</text>
    <text class="main-number">数量</text>
  </view> -->
  <scroll-view class="row model-scroll" scroll-y="true">
    <view class="row model-list" v-for="(item, index) in numberList" :key="index">
      <text :class="'list-name ' + (item.type == 2 ? 'red' : '')">{{item.goods_name}}</text>
      <text class="list-number">*{{item.send_number}}</text>
    </view>
  </scroll-view>
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
      dateValue: "",
      searchValue: "",
      page: 1,
      page_size: 20,
      showEnd: false,
      boxOrderInfo: [],
      boxOrderNumber: 0,
      numberModelStatus: false,
      numberList: [],
      pickerArray: ['全部', '已售后', '未提货'],
      pickerIndex: 0,
      pageStyle: 1
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.setData({
      pageStyle: options.style
    });
    wx.setNavigationBarTitle({
      title: options.style == 2 ? '在途中订单' : options.style == 3 ? '售后到库订单' : '未提货订单'
    });
    this.searchSubmit();
    this.getNumberBox();
  },
  onReachBottom: function () {
    if (this.boxOrderInfo && this.boxOrderInfo.length % this.page_size == 0) {
      this.page = this.boxOrderInfo.length / this.page_size + 1;
      this.searchSubmit();
    } else {
      this.setData({
        showEnd: true
      });
      common.toast('没有更多了~');
    }
  },
  methods: {
    bindTimeChange(e) {
      this.setData({
        dateValue: e.detail.value
      });
      this.page = 1;
      this.page_size = 20;
      this.boxOrderInfo = [];
      this.searchSubmit();
      this.getNumberBox();
    },

    searchInput(e) {
      this.setData({
        searchValue: e.detail.value
      });
    },

    searchCifim() {
      this.page = 1;
      this.page_size = 20;
      this.boxOrderInfo = [];
      this.searchSubmit();
      this.getNumberBox();
    },

    searchSubmit() {
      common.showLoad(this);
      var that = this;
      var url = app.getPath.unclaimedInfo;
      var date = new Date(that.dateValue).getTime();
      var data = {
        key_word: that.searchValue,
        page: that.page,
        page_size: that.page_size,
        search_time: date,
        unclaimed_status: Number(that.pickerIndex),
        list_type: Number(that.pageStyle)
      };
      common.ApiLogistics(url, data, true, function (res) {
        if (res.success == 1) {
          if (res.result.boxOrderInfo && res.result.boxOrderInfo.length > 0) {
            that.boxOrderInfo = that.boxOrderInfo ? that.boxOrderInfo.concat(res.result.boxOrderInfo) : res.result.boxOrderInfo;
          }

          that.setData({
            boxOrderInfo: that.boxOrderInfo,
            boxOrderNumber: res.result.count
          });
        }

        common.hideLoad(that);
      });
    },

    getNumberBox() {
      var that = this;
      var url = app.getPath.unclaimedGoodsInfo;
      var date = new Date(that.dateValue).getTime();
      var data = {
        key_word: that.searchValue,
        search_time: date,
        unclaimed_status: Number(that.pickerIndex),
        list_type: Number(that.pageStyle)
      };
      common.ApiLogistics(url, data, true, function (resData) {
        if (resData.success == 1) {
          that.setData({
            numberList: resData.result.boxGoodsInfo
          });
        }
      });
    },

    showNumberModel() {
      this.setData({
        numberModelStatus: true
      });
    },

    hideNumberModel() {
      this.setData({
        numberModelStatus: false
      });
    },

    bindPickerChange(e) {
      this.setData({
        pickerIndex: e.detail.value
      });
      this.searchCifim();
    },

    goDetail(e) {
      var order_sn = e.currentTarget.dataset.orderSn;
      wx.navigateTo({
        url: './nodelivery_detail?orderSn=' + order_sn
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
@import "./nodelivery.css";
</style>