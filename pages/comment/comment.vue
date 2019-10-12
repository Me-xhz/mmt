<template>
<view>
<!--pages/comment/comment.wxml-->
<scroll-view class="app-content" scroll-y="true" @scrolltolower="getComments" style="height: 100%;">
  <view class="product-comment-box">
    <view class="product-comment-buttons">
      <view @tap="getCommentType" :class="(grade == 0 ? 'active' : '')" data-type="0">全部{{subtotal.total}}</view>
      <view @tap="getCommentType" :class="(grade == 3 ? 'active' : '')" data-type="3">好评{{subtotal.good}}</view>
      <view @tap="getCommentType" :class="(grade == 2 ? 'active' : '')" data-type="2">中评{{subtotal.medium}}</view>
      <view @tap="getCommentType" :class="(grade == 1 ? 'active' : '')" data-type="1">差评{{subtotal.bad}}</view>
      <view @tap="getCommentType" :class="(grade == 4 ? 'active' : '')" data-type="4">有图{{subtotal.picture}}</view>
      <view @tap="getCommentType" :class="(grade == 5 ? 'active' : '')" data-type="5">追加{{subtotal.again}}</view>
    </view>
    <view class="modul-review-manu conment" v-for="(commentList, index) in commentsList" :key="index">
      <view class="review-manu_header">
        <image :src="commentList.author.avatar"></image>
        <view class="header-user_name">
          <span>{{commentList.author.nickname}}</span>
        </view>
      </view>
      <view class="review-manu_main">
        <view class="manu_main_text">
          <i :class="'limitLineHeight' + (commentList.wordsCut ? ' cut' : '')">{{commentList.content}}</i>
          <!-- wx:if="{{commentList.words}}" -->
          <view class="limit-words" v-if="commentList.words" @tap="limitWord" :data-iscut="commentList.wordsCut" data-listnum="infoindex">{{limitWords}}
            <image class="show" v-if="commentList.wordsCut"></image>
            <image class="hidden" v-if="!commentList.wordsCut"></image>
          </view>
        </view>
        <view v-if="commentList.imgInfo">
          <view class="manu_main_imgs" v-for="(img, index2) in commentList.imgInfo" :key="index2" @tap="setCommentImage" :data-current="img.img" :data-idx="lidx">
            <span :src="img.img" :style="'background-image: url(' + img.thumbImg + ');'"></span>
          </view>
        </view>
      </view>
      <view class="review-manu_reply" v-if="commentList.office_info">
        <i :class="'limitLineHeight' + (commentList.wordsCut ? ' cut' : '')">小鹅回复：{{commentList.office_info}}</i>
        <!-- wx:if="{{commentList.words}}" -->
        <view class="limit-words" v-if="commentList.words" @tap="limitWord" :data-iscut="commentList.wordsCut" data-listnum="infoindex">{{limitWords}}
          <image class="show" v-if="commentList.wordsCut"></image>
          <image class="hidden" v-if="!commentList.wordsCut"></image>
        </view>
      </view>
      <view class="review-manu_additional" v-if="commentList.again_info">
        <view class="manu_additional_header">
          <view class="manu_additional_header">
            <i v-if="commentList.ctime > 0">{{commentList.ctime}}天后追加评价</i>
            <i v-if="commentList.ctime == 0">当天追加评价</i>
          </view>
          <view class="manu_additional_text" v-if="commentList.again_info.content">
            <i :class="'limitLineHeight' + (commentList.wordsCut ? ' cut' : '')">{{commentList.again_info.content}}</i>
            <!-- wx:if="{{commentList.words}}" -->
            <view class="limit-words" v-if="commentList.words" @tap="limitWord" :data-iscut="commentList.wordsCut" data-listnum="infoindex">{{limitWords}}
              <image class="show" v-if="commentList.wordsCut"></image>
              <image class="hidden" v-if="!commentList.wordsCut"></image>
            </view>
          </view>
        </view>
        <view v-if="commentList.again_info.imgInfo">
          <view class="manu_main_imgs" v-for="(img, index2) in commentList.again_info.imgInfo" :key="index2" @tap="setAgainImage" :data-current="img.img" data-idx="lidx">
            <span :swiper-src="img.img" :style="'background-image: url(' + img.thumbImg + ');'"></span>
          </view>
        </view>
      </view>
      <view class="review-manu_reply" v-if="commentList.office_again_info">
        <i :class="'limitLineHeight' + (commentList.wordsCut ? ' cut' : '')">小鹅回复：{{commentList.office_again_info}}</i>
        <!-- wx:if="{{commentList.words}}" -->
        <view class="limit-words" v-if="commentList.words" @tap="limitWord" :data-iscut="commentList.wordsCut" data-listnum="infoindex">{{limitWords}}
          <image class="show" v-if="commentList.wordsCut"></image>
          <image class="hidden" v-if="!commentList.wordsCut"></image>
        </view>
      </view>
      <view class="reviw-manu_attrs row">
        <view class="col-70">
          <i>{{commentList.attr_name}}</i>
        </view>
        <view class="col-30">
          <i>{{commentList.created_at}}</i>
        </view>
      </view>
    </view>
  </view>

  <view class="loading-more theme-loading" v-if="isLoading && !isLastPage">正在加载...</view>
  <view class="loading-more theme-loading" v-if="!isLoading && isLastPage && commentsList.length > 0">没有更多啦~</view>

  <view class="product-comment-null" v-if="!isLoading && commentsList.length <= 0">
    <view class="null-header-img">
      <image :src="iconURL + '/icon-payment-lose.png'"></image>
    </view>
    <view class="null-text">
      OOPS~~~暂无评价
    </view>
  </view>
</scroll-view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// pages/comment/comment.js
var app = getApp().globalData;
var common = require("../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      productId: 0,
      subtotal: {},
      comments: {},
      commentsList: [],
      grade: 0,
      page: 0,
      page_size: 5,
      limitWords: "展开",
      isLoading: true,
      isLastPage: false,
      comment: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    if (options == undefined || options.productId == undefined) {
      common.toast("请求参数错误");
      return;
    }

    this.productId = options.productId;
    this.getCommentsNum();
    this.getComments();
  },
  methods: {
    getCommentsNum: function () {
      var that = this;
      common.showLoad(that);
      var url = "/Api/api.product.seeCommentsNum";
      var data = {
        product: this.productId
      };
      common.ApiGateWayTest(url, data, function (res) {
        var error_code = res.error_code;

        if (error_code == 0) {
          var subtotal = res.subtotal;
          that.setData({
            subtotal: subtotal
          });
          common.hideLoad(that);
        } else {
          common.hideLoad(that);
          common.toast("网络错误");
        }
      });
    },
    getComments: function () {
      if (this.comments.paged && this.comments.paged.more == 0) return;

      if (this.comments.length > 0) {
        this.setData({
          isLoading: true
        });
      }

      var that = this;
      var url = "/Api/api.product.seeComments";
      that.page = that.page + 1;
      var data = {
        grade: that.grade,
        page: that.page,
        page_size: that.page_size,
        product: that.productId
      };
      common.ApiGateWayTest(url, data, function (res) {
        var error_code = res.error_code;

        if (error_code == 0) {
          var comments = res;
          var commentsList = that.commentsList;
          var listlen = commentsList.length ? commentsList.length : 0;

          for (var key in comments.reviews) {
            if (comments.reviews[key]) {
              commentsList.push(comments.reviews[key]);
            }

            if (commentsList[listlen].content.length > 248) {
              commentsList[listlen].words = true;
              commentsList[listlen].wordsCut = true;
            } else {
              commentsList[listlen].words = false;
              commentsList[listlen].wordsCut = false;
            }

            listlen++;
          }

          that.setData({
            comments: comments,
            commentsList: commentsList,
            isLoading: false,
            isLastPage: res.paged.more == 0 ? true : false
          });
        } else {
          common.toast("网络错误");
        }
      });
    },
    // 评论图
    setCommentImage: function (e) {
      var commentList = this.commentsList;
      var current = e.currentTarget.dataset.current;
      var idx = e.currentTarget.dataset.idx;
      var imgUrl = [];

      for (var i = 0; commentList[idx].imgInfo.length > i; i++) {
        imgUrl.push(commentList[idx].imgInfo[i].img);
      }

      wx.previewImage({
        current: current,
        urls: imgUrl
      });
    },
    setAgainImage: function (e) {
      var commentList = this.commentsList;
      var current = e.currentTarget.dataset.current;
      var idx = e.currentTarget.dataset.idx;
      var imgUrl = [];

      for (var i = 0; commentList[idx].again_info.imgInfo.length > i; i++) {
        imgUrl.push(commentList[idx].again_info.imgInfo[i].img);
      }

      wx.previewImage({
        current: current,
        urls: imgUrl
      });
    },
    limitWord: function (e) {
      var iscut = e.currentTarget.dataset.iscut;
      var infoidx = e.currentTarget.dataset.listnum;
      this.comment[infoidx].wordsCut = !iscut;

      if (iscut) {
        this.setData({
          comment: this.comment,
          limitWords: "收起"
        });
      } else {
        this.setData({
          comment: this.comment,
          limitWords: "展开"
        });
      }
    },
    getCommentType: function (e) {
      var typegrade = e.currentTarget.dataset.type;
      this.setData({
        grade: typegrade,
        page: 0,
        isLoading: true,
        comments: {},
        commentsList: []
      });
      this.getComments();
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
@import "./comment.css";
</style>