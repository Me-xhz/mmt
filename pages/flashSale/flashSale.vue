<template>
<view>
<!--pages/flashSale/flashSale.wxml-->
<!-- <view class='ad'>
  <image
    src='{{item.header_img}}'
    wx:for="{{activitylist}}"
    wx:key="{{item.activity_id}}"
    hidden='{{item.activity_id!=activity_id}}'>
  </image>
</view> -->
<view class="status_bar">
  <view :class="'status ' + (item.activity_id==activity_id?'actived':'')" v-for="(item, index) in activitylist" :key="index" :data-activity_id="item.activity_id" :data-actived_idx="index" @tap="actived">
    <view>{{item.name}}</view>
    <view class="text">{{item.progress.des}}</view>
  </view>
</view>
<!-- state  0:已结束  1：正在进行  2：预告 -->
<view class="countDown mt16" v-for="(item, index) in activitylist" :key="index" :hidden="item.activity_id!=activity_id">
    <view class="countDown-line-lf"></view>
    <text :data-activity_id="item.activity_id">
      <block v-if="item.progress.state==0">本场已结束</block>
      <block v-if="item.progress.state==1">距结束</block>
      <block v-if="item.progress.state==2">距开始</block>
    </text>
    <countDown :timestamp="item.progress.start_time" v-if="item.progress.state==2"></countDown>
    <countDown :timestamp="item.progress.end_time" v-if="item.progress.state==1"></countDown>
    <view class="countDown-line-rt"></view>
</view>
<!-- 商品列表 -->
<view class="good_list" scroll-y="true">
    <view class="good_wrap" v-for="(item, index) in good_list" :key="index">
      <view class="good_pic">
          <view class="inequacy" v-if="item.is_enough==0">
              <image class :src="iconURL + '/inequacy02.png'"></image>
          </view>

          <image :src="item.list_img"></image>
      </view>
      <view class="good_info">
        <view class="good_name">
          <text class="good_tag" v-if="item.activity_label">{{item.activity_label}}</text>
          {{item.goods_name}}
        </view>

        <view class="good_price" :style="'margin-top:' + (item.state==0?'60':'0') + 'rpx'">￥<text class="larger">{{item.shop_price}}</text><text class="small">￥{{item.market_price}}</text></view>

        <view class="sale_bar" v-if="item.state==1 && item.is_enough == 1">
            <view class="left">已售{{item.goods_sell_num}}份</view>
            <view class="right">剩余{{item.goods_amount - item.goods_sell_num}}份</view>
        </view>
        <view class="sale_bar_enough" v-if="item.state==1 && item.is_enough == 0">
          <view class="bar_enough">已抢完</view>
        </view>
        <view class="good_num" v-if="item.state==2">限量{{item.goods_amount}}件</view>

        <!-- <view class='percent_bar middle_pos' wx:if="{{item.state==1}}">
          <view class='percent' style='width:{{item.percent}}%'></view>
          <text class='percent_num' wx:if="{{item.percent>0}}">{{item.percent}}%</text>
          <text class='percent_num' style='font-style:oblique;' wx:if="{{item.percent==0}}">已售罄</text>
        </view> -->
        <!-- <view class='bb'></view> -->
        <view class="get_btn">
          <button class="btn3" v-if="item.state==0">原价购买</button>
          <button class="btn1" v-if="item.state==1">立即抢购</button>
          <button class="btn2" v-if="item.state==2">即将开始</button>
        </view>
      </view>
      <form @submit="goToProduct" class="flashSale-from-goods" :data-goodsId="item.goods_id" report-submit="true">
        <button form-type="submit"></button>
      </form>
    </view>
  <view class="no_more" :hidden="good_list.length!=total || good_list.length==0">没有更多了</view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// pages/flashSale/flashSale.js
var app = getApp().globalData;
var common = require("../../utils/common.js");
import countdown from "../../components/countDown/countDown";

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      actived_idx: 1,
      activity_id: 0,
      page: 1,
      page_size: 10,
      activitylist: [],
      good_list: [],
      total: 0,
      timer_btn: false
    };
  },

  components: {
    countdown
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActivitylist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    if (that.total != that.good_list.length) {
      that.setData({
        page: this.page + 1
      });
      that.getActivitygoodslist();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {}
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  // }
  ,
  methods: {
    // 时间
    getDate: function () {
      var that = this;
      var timer = setInterval(function () {
        var timestamp = new Date().getTime();
        var btn1 = that.activitylist[1].progress.start_time - timestamp;
        var btn2 = that.activitylist[1].progress.end_time - timestamp;

        if (btn1 <= 0 && btn2 >= 0) {
          common.showLoad(that);
          that.setData({
            good_list: [],
            timer_btn: true
          });
          that.getActivitygoodslist();
          clearInterval(timer);
        }
      }, 1000);
    },
    // 判断选中
    actived: function (e) {
      var that = this;
      var d = e.currentTarget.dataset;
      that.setData({
        activity_id: d.activity_id,
        actived_idx: d.actived_idx,
        page: 1,
        good_list: []
      });
      that.getActivitygoodslist();
    },

    // 获取上面部分信息
    getActivitylist() {
      var that = this;
      var uri = app.getPath.activitylist;
      common.ApiGateWayTest(uri, {}, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          var activity_id = 0;
          var activityListStart = res.result.lists.filter(item => {
            return item.progress.state == 1;
          });
          var activityListSoon = res.result.lists.filter(item => {
            return item.progress.state == 2;
          });

          if (activityListStart.length > 0) {
            activity_id = activityListStart[0].activity_id;
          } else {
            activity_id = activityListSoon[0].activity_id;
          }

          that.setData({
            activitylist: res.result.lists,
            activity_id: activity_id
          });
          that.getDate();
        }
      });
    },

    // 获取商品列表信息
    getActivitygoodslist(callback) {
      var that = this;
      var uri = app.getPath.activitygoodslist;
      var data = {
        page: this.page,
        page_size: this.page_size,
        activity_id: this.activity_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var res = res.data;
        var lists = res.result.lists; // var nowState = that.data.activitylist[that.data.actived_idx];

        for (let i in that.activitylist) {
          if (that.activitylist[i].activity_id == that.activity_id) {
            var nowState = that.activitylist[i].progress.state;
          }
        }

        if (res.success == 1) {
          // 给所有的商品列表项添加状态
          for (var i = 0; i < lists.length; i++) {
            lists[i].state = nowState;
          }

          that.setData({
            good_list: [...that.good_list, ...lists],
            total: res.result.total
          });
          common.hideLoad(that);
        }
      });
    },

    // 跳转商品页
    goToProduct(e) {
      var goodsid = e.currentTarget.dataset.goodsid;

      if (app.checkSessionKey) {
        common.formIdUpdate(e);
      }

      wx.navigateTo({
        url: '/pages/product/product?entryType=external&productId=' + goodsid
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
@import "./flashSale.css";
</style>