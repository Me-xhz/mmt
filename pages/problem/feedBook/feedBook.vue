<template>
<!--pages/problem/feedBook/feedBook.wxml-->
<view class="leaveMsg">
  <view class="main">
    <text class="mainTitle">问题和意见</text>
    <view class="contant">
      <textarea class="textarea" placeholder="请简要描述您的问题和意见，至少6个字" maxlength="120" @input="inputs" :value="feedbackContent"></textarea>
      <text class="maxlength">{{currentWordNumber|0}}/120</text>
    </view>

    <!-- 联系电话 -->
    <view class="contactPhone">
      <text class="contactText">联系电话</text>
      <input class="phoneNum" placeholder="请输入您的联系方式" @input="feedbackPhone" type="number" :value="feedbackPhone"></input>
    </view>
  </view>

  <view class="sub-btn-bgc" @tap="feedBackAdd">
    <text class="sub-txt">留言反馈</text>
  </view>
</view>
</template>

<script>
// pages/problem/feedBook/feedBook.js
var app = getApp().globalData;
var common = require("../../../utils/common.js");

export default {
  data() {
    return {
      feedback: [],
      feedbackContent: '',
      feedbackPhone: '',
      currentWordNumber: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  onReachBottom: function () {}
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  // }
  ,
  methods: {
    // 获取textarea的值
    inputs: function (e) {
      var that = this;
      var value = e.detail.value;
      var len = parseInt(value.length); //最多字数限制
      // if (len > that.data.max) return;
      // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行

      that.setData({
        currentWordNumber: len,
        'feedbackContent': value
      });
    },
    // 获取电话号码的input值
    feedbackPhone: function (e) {
      var that = this;
      that.setData({
        'feedbackPhone': e.detail.value
      });
    },
    // 
    feedBackAdd: function () {
      var that = this;
      var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;

      if (that.feedbackContent == '' || that.feedbackPhone == '') {
        common.toast('内容或手机号不能为空');
        return;
      }

      if (that.feedbackContent.length < 6) {
        common.toast('反馈内容不得少于6个字');
        return;
      }

      if (!reg.test(that.feedbackPhone)) {
        common.toast('请输入正确的手机号');
        return;
      }

      ;
      var uri = app.getPath.feedbackadd;
      var data = {
        content: that.feedbackContent,
        mobile: that.feedbackPhone,
        msg_type: 1 // console.log(data)

      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res && res.data.success == 1) {
          var res = res.data.result;
          wx.showModal({
            title: '反馈成功',
            content: '（客服会尽快为您处理）',
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                wx.navigateBack({
                  delta: 2
                });
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
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
@import "./feedBook.css";
</style>