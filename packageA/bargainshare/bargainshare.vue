<template>
<view>
<view :class="'container ' + (bargainData != '' ? 'show' : '')">
  <view class="goHomeFixed" @click.stop="gotoHome">
    <image :src="iconURL + '/sxsy.svg'" class="icon-leftReturn"></image>
    <text>去首页</text>
  </view>
  <view class="header-bg" :style="'background-image:url(' + $1 + ')'">
    <view @click.stop="showRule" class="header-active-info">
      活动规则
    </view>
  </view>
  <view class="goods-info">
    <view class="goods-info-product" @tap="launchBar">
      <!-- <image class='goods-user-header' style='background-image:url({{iconURL}}/default_pic.png)' src='{{bargainData.head_pic}}'></image>
      <view class='goods-user-name'>{{bargainData.nickname}}</view>
      <view class='goods-header-msg'>"我发现一件好货，快来一起砍价领回家"</view> -->
      <view class="goods-box" @tap="goBargainGoods">
        <image class="goods-img" :src="bargainData.goods_img"></image>
        <view class="goods-none" v-if="bargainData.is_enough==0">
          <image :src="iconURL + '/inequacy02.png'"></image>
        </view>

        <view class="goods-news">
          <view class="goods-name t10">{{bargainData.goods_name}}</view>
          <!--<view class="goods-standrad">{{bargainData.spec_name}}</view>-->
          <view class="goods-limit-box" v-if="bargainData.is_limit==1">
            仅剩<i>{{bargainData.actual_store_count}}</i>件/限量{{bargainData.store_count}}件
          </view>
          <view class="count-bottom">
            <view class="group-price">
              <text class="price-text">砍完</text>
              <text class="price-sign">￥</text>
              <text class="price">{{bargainData.floor_price}}</text>
              <text class="cost-price">￥{{bargainData.activity_price}}</text>
            </view>
            <view class="countdown" v-if="bargainData.is_self == 1 && (bargainData.status == 0 || bargainData.status == 1)">
              <text class="count-end">距结束</text>
              <view class="count-time">
                <i>{{h}}</i> :
                <i>{{m}}</i> :
                <i>{{s}}</i>
              </view>
            </view>
          </view>

        </view>
      </view>
      <view class="progress-box">
        <view class="progress">
          <view class="present" :style="'width:' + (bargainData.percent <= 100 ? bargainData.percent : 100) + '%'">

          </view>
        </view>
        <view class="percent-font" :style="'left:' + (bargainData.percent>=70?70:bargainData.percent) + '%'" v-if="bargainData.is_floor_price == 0">
          已砍¥{{bargainData.total_bargain_price}}
        </view>
        <view class="bargain-now-price">
          <text v-if="bargainData.is_floor_price == 0">
            ¥{{range_price}}
        </text>
          <text class="less-price" v-if="bargainData.is_floor_price == 1">
          已砍最低¥{{bargainData.floor_price}}
        </text>
        </view>
      </view>
      <view class="bargain-status-img">
        <image :src="iconURL + '/bargain-success.png'" v-if="bargainData.status == 3 || bargainData.status == 1"></image>
        <image :src="iconURL + '/bargain-fail.png'" v-if="bargainData.status == 2 || bargainData.status == 4"></image>
      </view>
    </view>
  </view>

  <!-- 砍价状态 -->
  <view class="bargain-stutar">{{bargainStutar}}</view>
  <!--砍价按钮-->
  <view class="bargain-box">
    <form report-submit="true" @submit="onShare" v-if="bargainData.is_self == 1 && bargainData.status == 0">
      <button class="bargin-btn" form-type="submit" open-type="share">
        继续邀请工友帮砍
      </button>
    </form>
    <form report-submit="true" @submit="launchBar" v-if="bargainData.is_self == 1 && (bargainData.status == 2 || bargainData.status == 3 || bargainData.status == 4)">
      <button class="bargin-btn" form-type="submit">
        重新发起砍价
      </button>
    </form>
    <form report-submit="true" @submit="getBargainByFriend" v-if="bargainData.is_self == 0 && bargainData.is_bargain == 0 && bargainData.is_floor_price == 0&&bargainData.status==0">
      <button class="bargin-btn" form-type="submit">
        帮TA砍一刀
      </button>
    </form>
    <form report-submit="true" @submit="launchBar" v-if="(bargainData.is_self == 0&&bargainData.is_bargain==1)||(bargainData.is_self == 0&&bargainData.status!=0)">
      <button class="bargin-btn" form-type="submit">
        我也发起砍价
      </button>
    </form>
    <form report-submit="true" @submit="launchBar" v-if="bargainData.is_self == 1 && bargainData.status == 0">
      <button class="bargin-btn out" form-type="submit">
        不砍了，立即购买
      </button>
    </form>
    <form report-submit="true" @submit="launchBar" v-if="bargainData.is_self == 1 && bargainData.status == 1">
      <button class="bargin-btn" form-type="submit">
        立即购买(¥{{bargainData.buy_price}})
      </button>
    </form>
  </view>


  <!--广告图-->
<view class="user-ad" v-if="adList[0].ad_code != ''">
  <view class="swipers newSwipers indexAd white-bg-color" id="topHeight">
    <swiper :indicator-color="indicatorColor" :current="indexAdcurrent" indicator-active-color="#ffbb44" :indicator-dots="indicatorDots" :circular="circular" :autoplay="!autoplay" :interval="interval" :duration="duration">
      <swiper-item v-for="(item, index) in adList" :key="index" :style="(item.ad_code?'':'background-image:url(' + iconURL) + '/cstp.png)'">
        <image mode="aspectFill" class="adImg newAdimg" :src="item.ad_code"></image>
        <form class="index-from-indexAd new" @submit="goWebView" data-type="2" :data-item="item" report-submit="true">
          <button form-type="submit"></button>
        </form>
      </swiper-item>
    </swiper>
  </view>
</view>

  <!--砍价排行榜-->
  <view class="rank-box-bg">
    <!-- 闪送红包 -->
    <view :class="'conpun-postion-box ' + (takeoutAnimation ? 'takeout-active' : '')" v-if="showCountMode">
      <view class="conpun-postion-img" @tap="goTakeoutShop">
        <image class="imgbox" :src="iconURL + '/bargain-conpun-ad-imgbox.png'"></image>
        <image class="imgbtn" :src="iconURL + '/bargain-conpun-ad-imgbtn.png'"></image>
        <view class="text">红包天天送</view>
      </view>
    </view>
    <view class="rank-box">
      <view class="rank-title">
        帮砍列表
      </view>
      <view v-for="(item, index) in rankList" :key="index" class="rank-list-box">
        <view class="rank-list">
          <image class="rank-img" :src="item.head_pic"></image>
          <view class="rank-name">
            {{item.nickname}}
          </view>
          <view class="rank-price">
            砍掉￥{{item.bargain_price}}
          </view>
        </view>
      </view>
    </view>
  </view>

  <!--查看砍价商品-->
  <view class="load-goods" @tap="launchBar" :style="'padding-bottom:' + iphoneXBottom">
    查看砍价商品
  </view>
</view>

<!-- 帮砍弹窗 -->
<view class="drawer_screen" v-if="helpPriceMoudle"></view>
<view class="share-moudle-box" v-if="helpPriceMoudle&&bargainByFriendInfo.style==1">
  <view class="share-box">
    <view class="header-img">
      <image class="img" :src="bargainData.head_pic"></image>
      <view class="user-name">
        {{bargainData.nickname}}
      </view>
    </view>
    <view class="price">
      <text class="text">谢谢你帮我砍了</text>
      <i>¥</i>{{bargainByFriendInfo.bargain_price}}</view>
    <form report-submit="true" @submit="hideHelpPriceMoudle">
      <button class="button" form-type="submit">我知道了</button>
    </form>
    <text class="close-modal iconfont icon-btn_qiapianguanbianniux" @tap="hideHelpPriceMoudle">

    </text>
  </view>
</view>

<view class="help-bargain-coupon-box" :style="'background-image:url(' + $1 + ')'" v-if="helpPriceMoudle&&bargainByFriendInfo.style==2">
  <view class="help-bargain-coupon-header">
    <image :src="bargainData.head_pic">

    </image>
    <view class="user-msg">
      <view class="user-name">
        {{bargainData.nickname}}
      </view>
      <view class="bargain-money">
        谢谢你帮我砍了
        <view class="bargain-money-num">
          <i>￥</i>{{bargainByFriendInfo.bargain_price}}
        </view>
      </view>
    </view>
  </view>
  <view class="coupon-title">
    恭喜开启惊喜红包！
  </view>
  <view class="coupon-box" :style="'background-image:url(' + $1 + ')'">
    <view class="coupon-money">
      <i v-if="bargainByFriendInfo.coupon.coupon_type==0">￥</i>
      <i v-if="bargainByFriendInfo.coupon.coupon_type==1">折</i>
      <text>{{bargainByFriendInfo.coupon.value}}</text>
    </view>
    <view class="coupon-msg">
      <view class="coupon-help-title">
        {{bargainByFriendInfo.coupon.name}}
      </view>
      <view class="coupon-help-type">
        {{bargainByFriendInfo.coupon.description}}
      </view>
      <view class="coupon-help-type">
        {{bargainByFriendInfo.coupon.use_end_date}}
      </view>
    </view>
  </view>
  <view class="showMyPacket">
    （可至我的-我的优惠券中查看）
  </view>
  <view class="coupon-all-btn">
    <form report-submit="true" @submit="launchBar">
      <button class="to-bargain-btn" form-type="submit">
        我也发起砍价
      </button>
    </form>
    <form report-submit="true" @submit="gotoHome">
      <button class="use-bargain-coupon" form-type="submit">
        立即使用
      </button>
    </form>

  </view>
  <text class="close-modal iconfont icon-btn_qiapianguanbianniux" @tap="hideHelpPriceMoudle">

  </text>
</view>


<!-- <view class='share-moudle-box'>
  <view class="share-box">
    <view class='header-img'>
      <image class='img' src='{{bargainData.head_pic}}'></image>
      <view class="user-name">
        <view class="flex-start">
          {{bargainData.nickname}}
        </view>
        <view class="price flex-start">
          <text class="text">谢谢你帮我砍了</text>
          <i>¥</i>{{bargainByFriendInfo.bargain_price}}</view>
      </view>
    </view>
    <view class="bargain-coupon">
      <view class="coupon-title">
        恭喜开启惊喜红包
      </view>
      <view class="bargain-coupon-box">
        <view class="coupon-num">
          <view class="coupon-price">
            <i class="i">￥</i>9
          </view>
        </view>
        <view class=" coupon-msg">
            <view class="coupon-msg-title">全场通用</view>
            <view class="coupon-msg-type">满减券</view>
            <view class="coupon-msg-time">2019-10-10</view>
        </view>
      </view>
    </view>
  </view>
  <view class='price'>

    <form report-submit='true' bindsubmit='launchBar'>
      <button class='button' form-type='submit'>我也发起砍价</button>
    </form>
    <text class="close-modal iconfont icon-btn_qiapianguanbianniux" bindtap="hideHelpPriceMoudle">

    </text>
  </view>
</view> -->

<!-- 自己砍弹窗 -->
<view class="drawer_screen" v-if="shareMoudle"></view>
<view class="share-moudle-box" v-if="shareMoudle">
  <view class="share-box">
    <view class="header-img">
      <image class="img" :src="selfInfo.head_pic"></image>
      <view class="user-name">
        {{selfInfo.nickname}}
      </view>
    </view>
    <view class="price">
      <text class="text">成功砍了</text>
      <i>¥</i>{{selfInfo.bargain_price}}</view>
    <form report-submit="true" @submit="shareFromId">
      <button class="button" form-type="submit" open-type="share">分享到群</button>
    </form>
    <view class="msg">商品抢完后未能砍成即视为砍价失败！</view>
    <text class="close-modal iconfont icon-btn_qiapianguanbianniux" @tap="closeModal">

    </text>
  </view>
</view>

<!--规则黑透弹窗-->
<view :class="'rules-pop-hold ' + (showRules?'hide':'show')">
  <view class="rules-pop">
    <view class="rules-content">
      <view class="rules-title">低价购买攻略</view>
      <view class="rules-line"></view>
      <!-- 活动规则内容 -->
      <scroll-view class="rules-text-box" scroll-y="true">
        <view class="rules-text" v-for="(item, index) in rule.rule_content" :key="index">
          <text>{{item}}</text>
        </view>
      </scroll-view>
    </view>
    <form report-submit="true" @submit="showRule">
        <button :class="'iconfont icon-btn_guanbianniux icon-closs ' + (showRules?'hide':'show')" form-type="submit"></button>
      </form>
  </view>
  <view class="rules-pop-md" @tap="showRule"></view>
</view>
<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// packageA/bargainshare/bargainshare.js
//获取应用实例
var app = getApp().globalData;
var common = require("../../utils/common.js");
var event = require("../../utils/event.js");

export default {
  data() {
    return {
      bargainData: "",
      iconURL: app.dataBase.iconURL,
      helpPriceMoudle: false,
      bargaining_id: 0,
      d: "00",
      h: "00",
      m: "00",
      s: "00",
      rankList: [],
      page: 1,
      page_size: 20,
      bargainStutar: "",
      rule: {},
      bargainByFriendInfo: {},
      showRules: true,
      iphoneXBottom: "0rpx",
      range_price: 0,
      shareMoudle: false,
      selfInfo: {},
      showCountMode: false,
      takeoutAnimation: false,
      // 广告
      duration: 500,
      interval: 5000,
      indexAdcurrent: 0,
      indicatorColor: "#fff",
      indicatorActiveColor: "#eb3c39",
      circular: true,
      autoplay: false,
      adList: [],
      indicatorDots: false,
      entryData: ""
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getAd();
    that.bargaining_id = options.bargaining_id;

    if (options.self_info && options.self_info != '') {
      that.setData({
        selfInfo: JSON.parse(options.self_info),
        shareMoudle: true
      });
    } // 外部带商品店铺


    that.setData({
      entryData: options
    });
    var options = that.entryData;
    var pickupId = common.getStorageSync('getpickup'); // 判断是否第一次进入 且是从外部进入，如二维码扫码 && app.firstlaunchApp

    if (options && (options.atitude || options.pickup_id) && !pickupId) {
      that.getExternal(options.pickup_id).then(function () {
        // 关闭开关，让app知道已经不是第一次进入当前页
        app.firstlaunchApp = false; // 清空data内携带参数

        that.entryData = {}; // 外部已带经纬度定位，无需再调用定位接口，所以将缓存定位改为真，让页面可以显示

        common.setStorageSync('authSetting', {
          'scope.userLocation': true
        });
      });
    }

    wx.getSystemInfo({
      success: function (res) {
        var model = res.model;

        if (model.search('iPhone X') != -1) {
          that.setData({
            iphoneXBottom: '68rpx'
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getBargainingInfo();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var pickup = common.getStorageSync('getpickup');
    return {
      title: that.bargainData.share_title,
      path: '/packageA/bargainshare/bargainshare?bargaining_id=' + that.bargaining_id + '&pickup_id=' + pickup.pickup_id,
      imageUrl: that.bargainData.share_img
    };
  },
  methods: {
    // 从外部二维码扫码，带经纬度和外部标识external
    getExternal: function (pickup_id) {
      var that = this;
      var uri = app.getPath.getpickup;
      var data = {
        pickup_id: pickup_id
      };
      return new Promise(function (resolve, reject) {
        // 获取提货点
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res && res.data && res.data.success == 1) {
            var res = res.data.result.cities.pick_up;
            common.setStorage({
              key: 'getpickup',
              data: {
                'pickup_id': res.pickup_id,
                'cityName': res.pickup_name,
                'pickup_address': res.pickup_address,
                'pickup_contact': res.pickup_contact,
                'pickup_phone': res.pickup_phone,
                'pickup_type': res.pickup_type
              }
            }, function (res) {
              resolve('获取id成功');
            });
            common.setStorage({
              key: 'city',
              data: {
                'pickup_id': res.pickup_id,
                'warehouse_id': res.warehouse_id,
                'cityName': res.city_name,
                'is_pick_up': 1
              }
            });
          }
        });
      });
    },
    //获取广告图
    getAd: function () {
      var that = this;
      var uri = app.getPath.adlist;
      var data = {
        pid: 10
      };
      return new Promise(function (resolve, reject) {
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res && res.data && res.data.success == 1) {
            var data = res.data.result;

            if (data.length > 1) {
              that.setData({
                indicatorDots: true
              });
            } else {
              that.setData({
                indicatorDots: false
              });
            }

            that.setData({
              adList: data,
              indexAdcurrent: 0,
              // share_title: data.share_title,
              indicatorDots: data.length > 1 ? true : false // keyWord: data.keyword

            });
            resolve('successAd');
          }
        });
      });
    },
    adclose: function (ad_id, is_close) {
      var that = this;
      var uri = app.getPath.adclose;
      var data = {
        ad_id,
        is_close
      };
      common.ApiGateWayTest(uri, data, true, function (res) {});
    },
    // 跳转指定专题页
    goWebView: function (e) {
      common.goAdWebView(e);
    },

    // 获取砍价信息
    getBargainingInfo() {
      var that = this;
      var uri = app.getPath.bargainInfo;
      var data = {
        activity_bargaining_id: that.bargaining_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (resData.success == 1 && resData.result.activity_bargaining_id) {
          var bargainStutar = "";

          if (resData.result.is_self == 1 && resData.result.status == 0) {
            var bargainStutar = "商品抢完后未能砍成即视为砍价失败";
          } else if (resData.result.is_self == 1 && resData.result.status == 2) {
            var bargainStutar = "砍价超时，失败了";
          } else if (resData.result.is_self == 1 && resData.result.status == 1) {
            var bargainStutar = "砍价成功，请在倒计时结束前购买";
          } else if (resData.result.is_self == 1 && resData.result.status == 3) {
            var bargainStutar = "砍价已完成";
          } else if (resData.result.is_self == 1 && resData.result.status == 4) {
            var bargainStutar = "支付已过期";
          }

          that.setData({
            bargainData: resData.result,
            bargaining_id: resData.result.activity_bargaining_id,
            bargainStutar: bargainStutar,
            range_price: (Number(resData.result.activity_price) - Number(resData.result.floor_price)).toFixed(2)
          });
          that.getRank();
          that.getTeamRule();
          that.getIsShowShopCouponAd();
          var nowtime = new Date().getTime() / 1000;

          if (resData.result.end_time > nowtime) {
            that.countDown(resData.result.end_time);
          }
        } else {
          return;
        }
      });
    },

    // 帮朋友砍价
    getBargainByFriend() {
      var that = this;
      var uri = app.getPath.bargainByFriend;
      var checkOrderUri = app.getPath.checkDistance;
      var data = {
        activity_bargaining_id: that.bargaining_id
      };
      var checkOrderData = {
        activity_bargaining_id: that.bargaining_id ? that.bargaining_id : 0,
        time_atitude: app.dataBase.userAtitude
      };
      common.ApiGateWayTest(checkOrderUri, checkOrderData, true, function (resData) {
        if (resData.data.success == 1) {
          common.ApiGateWayTest(uri, data, true, function (res) {
            var resData = res.data;

            if (resData.success == 1) {
              that.setData({
                bargainByFriendInfo: resData.result,
                helpPriceMoudle: true
              });
              that.getBargainingInfo();
            } else {
              common.toast(resData.msg);
              return;
            }
          });
        } else {
          common.toast(resData.data.msg);
          return;
        }
      });
    },

    // 隐藏帮砍弹窗
    hideHelpPriceMoudle(e) {
      var that = this;
      common.formIdUpdate(e);
      that.setData({
        helpPriceMoudle: false
      });
    },

    // 分享隐藏
    shareFromId(e) {
      var that = this;
      common.formIdUpdate(e);
      common.showLoad(this);
      setTimeout(() => {
        common.hideLoad(that);
        that.setData({
          shareMoudle: false
        });
      }, 2000);
    },

    //  获取砍价排行榜
    getRank() {
      var that = this;
      var uri = app.getPath.bargainList;
      var data = {
        page: that.page,
        page_size: that.page_size,
        activity_bargaining_id: that.bargaining_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (resData.success == 1) {
          that.setData({
            rankList: resData.result
          });
        }
      });
    },

    // 倒计时函数
    countDown(endtime) {
      var that = this;
      var nowtime = new Date().getTime() / 1000;
      var lesstime = endtime - nowtime;
      clearInterval(that.timeStart);
      that.timeStart = setInterval(() => {
        if (lesstime > 0) {
          lesstime--;
          var d = parseInt(lesstime / 60 / 60 / 24);
          var h = parseInt(lesstime / 60 / 60 % 24) + d * 24;
          var m = parseInt(lesstime / 60 % 60);
          var s = parseInt(lesstime % 60);

          if (h < 10) {
            h = "0" + h;
          }

          if (m < 10) {
            m = "0" + m;
          }

          if (s < 10) {
            s = "0" + s;
          }

          that.setData({
            h: h,
            m: m,
            s: s
          });
        } else {
          clearInterval(that.timeStart);
          that.getBargainingInfo();
        }
      }, 1000);
    },

    //规则的显示隐藏
    showRule(e) {
      var that = this;
      common.formIdUpdate(e);
      this.setData({
        showRules: !that.showRules
      });
    },

    //关闭自己砍价弹窗
    closeModal() {
      var that = this;
      that.setData({
        shareMoudle: false
      });
    },

    //获取拼团规则
    getTeamRule() {
      var that = this;
      var uri = app.getPath.bargainRule;
      var data = {
        activity_bargain_id: that.bargainData.activity_bargain_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        that.setData({
          rule: res.data.result.rule
        });
      });
    },

    // 分享获取上报
    onShare(e) {
      var that = this;
      common.formIdUpdate(e);
    },

    // 发起砍价
    launchBar(e) {
      var that = this;
      common.formIdUpdate(e);
      var pickup = common.getStorageSync('getpickup');
      wx.navigateTo({
        url: '../bargain/bargain?activity_bargain_id=' + that.bargainData.activity_bargain_id + '&entryType=external'
      });
    },

    // 立即购买
    goPay(e) {
      var that = this;
      common.formIdUpdate(e);
    },

    // 返回首页
    gotoHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },

    // 是否有可领取优惠券
    getIsShowShopCouponAd() {
      var that = this;
      var uri = app.getPath.isShowShopCouponAd;
      var data = {
        type: 1
      };
      common.ApiGateWayTest(uri, data, true, res => {
        var resData = res.data;

        if (resData.success == 1) {
          if (resData.result.status == 1) {
            that.shop_id = resData.result.shop_id;
            that.setData({
              showCountMode: true
            });
          } else {
            that.setData({
              showCountMode: false
            });
          }
        } else {
          common.toast(resData.msg);
          return;
        }
      });
    },

    // 跳转店铺
    goTakeoutShop() {
      var that = this;
      wx.navigateTo({
        url: '/packageA/takeout-shop/takeout-shop?entryType=external&shop_id=' + that.shop_id
      });
    },

    // 滚动判断
    onPageScroll() {
      console.log(this.takeoutAnimation);

      if (!this.takeoutAnimation) {
        this.setData({
          takeoutAnimation: true
        });
      } else {
        clearTimeout(this.scroll);
        this.scroll = setTimeout(() => {
          if (this.takeoutAnimation) {
            this.setData({
              takeoutAnimation: false
            });
          }
        }, 1000);
      }
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
@import "./bargainshare.css";
</style>