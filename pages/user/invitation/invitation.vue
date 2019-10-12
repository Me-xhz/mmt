<template>
<view>
<!--pages/user/money/money.wxml-->
<view class="invitation" :style="'background-image:url(' + iconURL + '/invite_img_bg.png)'">
  <image class="content-top" :src="iconURL + '/invite_img_title.png'"></image>
  <view class="content-rule" @tap="setRuleModalStatus">活动规则</view>
  <view class="content-title-b">邀请新朋友注册小程序并完成首单</view>
  <view class="content-title-b">您将获得相应的现金券奖励</view>
  <view class="content-title-s">邀请现金券及时转入您的账户，可以在您购物的时候抵扣</view>
  <view class="content-gifts row" :style="'background-image:url(' + iconURL + '/invite_img_gifts.png)'">
    <!-- <image class="content-gifts-img" src="{{iconURL}}/invite_img_gifts.png"></image> -->
    <view class="gifts-coupon" v-for="(item, index) in coupon_arr" :key="index">
      <view class="coupon-title">{{item.title}}</view>
      <view class="coupon-content">{{item.content}}</view>
      <view class="coupon-price"><text class="price-symbol">¥</text>{{index < 3 ? user_info.award_info[index].coupon_info.coupon_price : "???"}}</view>
      <view class="coupon-tag">{{item.tag}}</view>
    </view>
  </view>
  <button class="content-button" open-type="share" :style="'background-image:url(' + iconURL + '/invite_img_button.png)'">
    邀 请 好 友
  </button>
  <view class="content-card" :style="'background-image:url(' + iconURL + '/invite_img_card.png)'">
    <view class="card-title">我的现金奖励</view>
    <view class="card-sum">总奖励现金(元)： <text class="sum-price">{{user_info.invite_money}}</text> 元</view>
    <view class="row card-item">
      <view class="card-col">
        <view class="col-up">{{user_info.invite_user_num}}<text class="small">人</text></view>
        <view class="col-text">邀请人数</view>
      </view>
      <view class="card-line"></view>
      <view class="card-col">
        <view class="col-up">{{user_info.invite_coupon_num}}<text class="small">个</text></view>
        <view class="col-text">奖励现金红包</view>
      </view>
    </view>
  </view>
  <!-- <view class='card-acode'>
    <image src="{{iconURL}}/invite_page_acode_v1.jpg" bindtap='viewPic' data-imgUrl="{{iconURL}}/invite_page_acode_v1.jpg"></image>
    <view class='acode-text'>邀请成功5人10人20人更有额外微信现金大红包！</view>
    <view class='acode-text'>具体请添加haoyousheng01客服微信号领取！</view>
  </view> -->
</view>
<!-- 规则弹窗 -->
<view class="drawer_screen" @tap="setRuleModalStatus" data-status="0" v-if="showRuleModalStatus"></view>
<view :animation="animationData" style="opacity:0" class="modal-box" v-if="showRuleModalStatus">
  <view class="box-header">{{user_info.rules.title}}</view>
  <view class="box-margin">
    <view class="box-text" v-for="(item, index) in user_info.rules.rule_content" :key="index">{{item}}</view>
    <view class="box-ps">
      注：
      <view class="box-text" v-for="(item, index) in user_info.rules.rule_tip" :key="index">{{item}}</view>
    </view>
  </view>
  <view class="iconfont icon-btn_qiapianguanbianniux" data-status="0" @tap="setRuleModalStatus"></view>
</view>
</view>
</template>

<script>
// pages/user/money/money.js
var app = getApp().globalData;
var common = require("../../../utils/common.js");

export default {
  data() {
    return {
      user_info: null,
      iconURL: app.dataBase.iconURL,
      coupon_arr: [{
        'title': '首次邀请',
        'content': '注册下单成功',
        'tag': '满10元使用'
      }, {
        'title': '邀请 2 人',
        'content': '注册下单成功',
        'tag': '满10元使用'
      }, {
        'title': '邀请 3 人',
        'content': '注册下单成功',
        'tag': '满10元使用'
      }, {
        'title': '邀请无上限',
        'content': '大额现金等你拿',
        'tag': '加油！'
      }],
      showRuleModalStatus: false,
      animationData: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.accountLog();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var pickup = common.getStorageSync('getpickup');
    console.log(pickup.pickup_id);
    return {
      title: that.user_info.share_title,
      path: '/pages/index/index?pickup_id=' + pickup.pickup_id + '&inviteId=' + that.user_info.invite_user,
      imageUrl: that.user_info.share_img,
      success: function (res) {
        console.log("转发成功");
      },
      fail: function (res) {
        console.log("转发失败");
      }
    };
  },
  methods: {
    accountLog: function () {
      var that = this;
      var uri = app.getPath.getInviteInfo;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res.data.success == 1) {
          that.setData({
            user_info: res.data.result
          });
        }
      });
    },
    // 弹窗
    setRuleModalStatus: function (e) {
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: "linear",
        delay: 0
      });
      animation.translateY(300).opacity(1).step();
      this.setData({
        animationData: animation.export()
      });
      this.setData({
        showRuleModalStatus: true
      });
      setTimeout(function () {
        animation.translateY('-150px').translateX('-50%').step();
        this.setData({
          animationData: animation
        });

        if (e.currentTarget.dataset.status == 0) {
          this.setData({
            showRuleModalStatus: false
          });
        }
      }.bind(this), 200);
    },
    viewPic: function (e) {
      wx.previewImage({
        current: e.currentTarget.dataset.imgurl,
        urls: [e.currentTarget.dataset.imgurl]
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
@import "./invitation.css";
</style>