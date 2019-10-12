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
    <view :class="'col ' + (backInfo.show_order_status.type == 1 ? 'danger' : '')">{{backInfo.show_order_status.title}}</view>
    <!-- <navigator url="/pages/problem/problem" class='message t3'>联系客服</navigator> -->
    <button class="message t3" show-message-card="true" open-type="contact" session-from="goodBuy">联系客服</button>
    <!-- <view class="header-button" bindtap="go_aftermarketSchedule" data-back_sn='{{backInfo.back_id}}' wx:if="{{backInfo.is_history_show == 1}}">查看进度</view> -->
  </view>
  <!-- 申请售后信息 -->
  <view class="idontk" v-if="backInfo.status == 2 && backInfo.back_type != 3">
    <view class="t1">是否已将退换货商品寄放至提货点位置？</view>
    <view class="t3 btn" @tap="Idontk">已寄回</view>
  </view>
  <!-- 提货码 -->
  <!-- 换货已发出 -->
  <view class="qrCode" v-if="backInfo.status == 5&&backInfo.get_sn.length>0">
    <!-- <view class='qr'>
      <image src='http://temp.im/300x300'></image>
    </view> -->
    <view class="code">
      <text class="small">提货码：</text><text>{{backInfo.get_sn}}</text>
    </view> 
    <view class="des">
      <view>提货时请向工作人员出示提货码</view>
      <view>请勿将提货码告知他人，防止包裹丢失</view>
    </view>
  </view>
  <!-- 拒绝原因 -->
  <view class="refuse_remark t4" v-if="backInfo.refuse_remark!=''&&(backInfo.status==6||backInfo.status==7)">
    拒绝原因：{{backInfo.refuse_remark}}
  </view>
  <!-- Goods -->
  <view class="order-main">
    <view class="goods-item no-border" v-for="(item, index) in backInfo.goods_info" :key="index" @tap="go_product" :data-product-id="backInfo.goods_info.goods_id">
      <view class="item-photo">
        <image :src="item.header_img"></image>
      </view>
      <view class="item-info">
        <view class="info-name">
          {{item.goods_name}}
        </view>
        <view class="info-attr">{{item.sku_key_name}}</view>
        <view class="info-price">
          <i class="icon_rmb">¥</i>{{item.shop_price}}
        </view>
        <view class="info-amount">x{{item.amount}}</view>
      </view>
    </view>
  </view>
  <!--order msg-->
  <view class="order-msg-box">
    <view class="order-msg" v-if="backInfo.back_type !=1">
      <view class="msg-header row">
        <span class="header-title t4">退款金额</span>
        <span class="col header-price">
          <i class="font-bold">
            <i class="icon_rmb">¥</i>{{backInfo.back_amount}}
          </i>
          <!-- <i wx:if="{{!showback_fee}}" class="header-txt_del">（若使用余额或者优惠券，将一并退回）</i> -->
        </span>
      </view>
    </view>
    <view class="order-msg">
      <view class="msg-header row">
        <span class="header-title t4">申请原因</span>
        <span class="header-txt col tr">{{backInfo.reason}}</span>
      </view>
    </view>
    <view class="order-msg-mainbox">
      <view class="msg-header">
        <span class="header-title t4">详细描述</span>
      </view>
      <text>{{backInfo.reason_detail}}</text>
      <view class="msg-imgbox" v-if="backInfo.back_goods_pics.length > 0">
        <view class="box-img" v-for="(item, index) in backInfo.back_goods_pics" :key="index">
          <image v-if="item" :src="item"></image>
        </view>
      </view>
    </view>
  </view>

  <view class="order-sns">
    <p>
      <i class="sns-title t4">申请时间：</i>
      <i class="sns-txt t4">{{backInfo.goods_info[0].add_time}}</i>
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
  
  <view class="order-msg-box" v-if="backInfo.contact">
    <view class="order-msg">
      <view class="msg-header row">
        <span class="header-title">联系方式</span>
        <span class="header-txt col tr">{{backInfo.contact}}</span>
      </view>
    </view>
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
<!-- <view class="order-kf">
  <view class="kf-time">
    服务时间：9:00-23:00
  </view>
  <view class="kf-type row">
    <view class="col w50 kf-ol" bindtap="golinkkf">
      <button open-type='contact' hover-class="none" session-from='cilicili'>
        <image src="{{iconURL}}/icon_kfOnline.png"></image>
        <text>在线客服</text>
      </button>
    </view>
    <view bindtap='phoneCall' class="col w50 kf-ol no-margin">
      <image src="{{iconURL}}/icon_kfTel.png" />
      <text>电话客服</text>
    </view>
  </view>
</view> -->

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
      isShowGoHome: false,
      back_id: "",
      backInfo: "",
      back_fee: "",
      showback_fee: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    if (options == undefined || options.id == undefined) {
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
      back_id: options.id
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
    Idontk: function () {
      var that = this;
      common.showModal('是否和提货点人员确认已寄回', '确认', function (r) {
        if (r.cancel) {
          return false;
        }

        var url = app.getPath.backReturnPickup;
        var data = {
          back_id: that.back_id
        };
        common.ApiGateWayTest(url, data, true, function (res) {
          var res = res.data;

          if (res.success == 1) {
            common.toast(res.msg);
            that.getBackDetail();
          }
        });
      }); // wx.showToast({
      //   title: '商品已确认寄回',
      //   icon: 'none',
      //   duration: 2000
      // })
    },
    //获取数据
    getBackDetail: function () {
      var that = this;
      var e = that;
      common.showLoad(this);
      var url = app.getPath.getbackdetail;
      var data = {
        back_id: that.back_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        if (res.data.success == 1) {
          var res = res.data.result;
          e.backInfo = res.data;
          e.back_fee = 0;
          e.showback_fee = false;

          if (parseFloat(e.backInfo.back_shipping.shipping_fee) > 0) {
            e.back_fee = e.backInfo.back_shipping.shipping_fee;
            e.showback_fee = 1;
          }

          if (parseFloat(e.backInfo.back_shipping.shipping_fee_return) > 0) {
            e.back_fee = e.backInfo.back_shipping.shipping_fee_return;
            e.showback_fee = 2;
          }
        }

        that.setData({
          backInfo: that.backInfo,
          back_fee: e.back_fee,
          showback_fee: e.showback_fee
        });
        common.hideLoad(that);
      });
    },
    //前往商品详情页
    go_product: function (e) {
      var productId = e.currentTarget.dataset.productId;
      wx.navigateTo({
        url: '../product/product?entryType=external&productId=' + productId
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
@import "./order-return-detail.css";
</style>