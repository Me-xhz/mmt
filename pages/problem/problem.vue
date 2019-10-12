<template>
<!--pages/problem/problem.wxml-->
<view class="problemBox">
  <scroll-view class="outermost" :scroll-y="true">
    <view class="problem">
      <!-- 问题列表 -->
      <view class="problem-block" v-for="(item, index) in questionList.textList" :key="index">
        <view class="question-name row" @tap="showToggle" :data-id="index">
          <view class="contant-lf">
            <text class="problemTitle">{{item.name}}</text>
            <text class="subtitle">{{item.title}}</text>
          </view>
          <view class="contant-rf">
            <view :class="'iconfont icon-btn_xiangxiajiantouhongx down ' + (item.isSubShow?'uprotate':'uprotate2') + ' '"></view>
          </view>
        </view>
        <!-- 二级列表=>问题内容 -->
        <view class="second-list" v-if="item.isSubShow">
          <view class v-for="(subItem, index2) in item.subItems" :key="index2">
            <view class="question-row row" @tap="showThirdToggle" :data-id="index">
              <text class="subText">{{subItem.name}}  </text>
              <view :class="'iconfont icon-btn_xiangyoudajiantoux right ' + (subItem.isThirdShow?'downRotate':'downRotate2')"></view>
            </view>
            <!-- 三级列表=>解决方案 -->
            <view class="third-list" v-if="subItem.isThirdShow">
              <view class="third-question" v-for="(third, index) in subItem.threeItem" :key="index">
                <text class="subText width647">{{third.answer}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="problem">
      <!-- 视频列表 -->
      <view class="problem-block" v-for="(item, index) in questionList.videoList" :key="index">
        <view class="question-name row" @tap="openVideo" :data-src="item.src">
          <view class="video-lf">
            <text class="problemTitle">{{item.name}}</text>
            <text class="subtitle">{{item.title}}</text>
          </view>
          <view class="video-rf">
            <view class="right-play color_theme iconfont icon-btn_bofangx" style="color:#555"></view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>

  <!-- 服务 -->
  <view class="serveBox">
    <!-- <view class='qr_wrap'>
      <view class='qr'><image src='/images/img/qrcode_for_gh_5851c2478fb8_258.jpg'></image></view>
      <view class='qr_text'>请扫描二维码,关注"买买提APP"公众号进行在线客服反馈;或点击下方留言反馈按钮,进行问题描述,我们会尽快为您处理</view>
    </view> -->
    <text class="serveTime">服务时间：9:00-18:00</text>

    <!-- 联系客服 -->
     <view class="contact" @tap="callPhone">
      <text class="text">联系客服:0591-62751447</text>
    </view>

    <!-- 留言反馈按钮 -->
    <view class="confirm-btn" @tap="toFeedBook">
      <text class="txt">留言反馈</text>
    </view>
  </view>

  <view class="full-video" v-if="showVideo">
    <video :src="videoSrc" autoplay="true"></video>
    <view class="video-close iconfont icon-btn_qiapianguanbianniux" @tap="closeVideo"></view>
  </view>
</view>
</template>

<script>
// pages/problem/problem.js
var app = getApp().globalData;
var common = require("../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      subindex: 0,
      questionList: [],
      moblie: '10086',
      showVideo: false,
      videoSrc: '',
      k: false,
      key: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuestionList();
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
  onReachBottom: function () {}
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  // }
  ,
  methods: {
    showToggle(e) {
      var id = e.currentTarget.dataset.id;
      var key = "questionList.textList[" + id + "].isSubShow";
      var val = this.questionList.textList[id].isSubShow;
      this.setData({
        'subindex': id
      });
      this.questionList.textList.forEach((i, index) => {
        var k = "questionList.textList[" + index + "].isSubShow";
        this.setData({
          [k]: false
        });

        if (index == id) {
          this.setData({
            [key]: !val
          });
        }

        i.subItems.forEach((j, subindex) => {
          var k = "questionList.textList[" + index + "].subItems[" + subindex + "].isThirdShow";
          this.setData({
            [k]: false
          });
        });
      });
    },

    showThirdToggle(e) {
      var id = e.currentTarget.dataset.id;
      var val = this.questionList.textList[this.subindex].subItems[id].isThirdShow;
      var key = "questionList.textList[" + this.subindex + "].subItems[" + id + "].isThirdShow";
      this.questionList.textList[this.subindex].subItems.forEach((i, index) => {
        var k = "questionList.textList[" + this.subindex + "].subItems[" + index + "].isThirdShow";
        this.setData({
          [k]: false
        });

        if (index == id) {
          this.setData({
            [key]: !val
          });
        }
      });
    },

    callPhone: function () {
      common.phoneCall(app.globalData.hotline);
    },
    toFeedBook: function () {
      wx.navigateTo({
        url: '/pages/problem/feedBook/feedBook'
      });
    },
    getQuestionList: function () {
      var that = this;
      var uri = app.getPath.questionlist;
      var data = {};
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res && res.data && res.data.success == 1) {
          let question_list = res.data.result;

          for (let i = 0; i < question_list.textList.length; i++) {
            question_list.textList[i].isSubShow = false;

            for (let j = 0; j < question_list.textList[i].subItems.length; j++) {
              question_list.textList[i].subItems[j].isThirdShow = false;
            }
          }

          that.setData({
            questionList: question_list
          });
        }
      });
    },
    openVideo: function (e) {
      var src = e.currentTarget.dataset.src;
      this.setData({
        videoSrc: src,
        showVideo: true
      });
    },
    closeVideo: function () {
      this.setData({
        showVideo: false,
        videoSrc: ''
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
@import "./problem.css";
</style>