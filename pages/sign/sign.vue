<template>
<view>
<!--pages/sign/sign.wxml-->
<view class="sign_wrap">

  <!-- 返回首页悬浮框/分享进入显示 -->
  <view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
    <image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
    <text>返回首页</text>
  </view>

  <view class="sign-info" :style="'background-image:url(' + iconURL + '/signin-info-bg.png)'">
    <view class="switch_wrap" @tap="switchChange" :data-open_msg="signcount.open_msg">
      <view :class="'switch ' + (signcount.open_msg==1?'checked':'')"><view class="box"></view></view>
      <view class="signin-remind-switch">{{signcount.open_msg==1?"已提醒":"提醒我开启"}}</view>
    </view>

    <view class="money">
      <text class="small">￥</text>{{signcount.money}}</view>
    <text class="money_des">签到已领取现金金额</text>
    <!-- 7天签到 -->
    <view class="sevenDays">
      <view class="dayItem" v-for="(item, idx) in gift_list" :key="idx">
        <view class="redPacket">
          <image class="pack" v-if="idx+1<=signcount.count" :src="iconURL + '/signin_gift_receive.png'"></image>
          <image class="pack" v-if="idx+1>signcount.count" :src="iconURL + '/signin_gift_unget.png'"></image>
          <image class="box" v-if="idx==2||idx==6" :src="iconURL + '/signin_gift_box.png'"></image>
        </view>
        <view :class="'text ' + (idx+1==signcount.days?'today':'')">{{idx+1==signcount.days?'今天':item.text}}</view>
        <view class="tag-text font_w600" v-if="idx+1==3" :style="'background-image:url(' + iconURL + '/signin_gift_tag_little.png)'">送额外红包</view>
        <view class="tag-text font_w600" v-if="idx+1==7" :style="'background-image:url(' + iconURL + '/signin_gift_tag_little.png)'">送大额红包</view>
      </view>
    </view>
    <view class="sevenDays-progress row" :style="'background-image:url(' + iconURL + '/signin-gifts-progress.png)'">
      <view class="sign-bar" :animation="animationData" :style="'width:' + signcount.count*14.3 + '%;'"></view>
      <view class="progress-list" v-for="(item, idx) in gift_list" :key="idx">
      <!-- 动画的那块 -->
        <view class="action-box" v-if="goAc&&idx+1==signcount.count" :style="'background-image:url(' + iconURL + '/tyx@2x.png)'">
          <image :src="iconURL + '/dgdh.gif?' + random"></image>
        </view>
        <view class="action-box" v-else :style="'background-image:url(' + iconURL + '/signin-progress-' + (idx+1>signcount.count?'un':'') + 'press.png)'"></view>
        <view class="points"><text class="small" v-if="idx+1>signcount.count">+</text>{{idx+1>signcount.count?signcount.points[idx].points:""}}{{!signcount.points[idx]?0:""}}</view>
      </view>
    </view>
    <view class="signin-text-remind">签到积分现金双赢，现金买好物，积分抽大奖，购物还送积分！</view>
    <view class="signin-text-rule" @tap="showButton">活动规则</view>
    <!-- 签到按钮 -->
    <form report-submit="true" class="signin-button-block" @submit="sign">
      <button v-if="signcount.sign==0" class="signin-button-image" :style="'background-image:url(' + iconURL + '/signin-button-unpress.png)'" formType="submit"></button>
      <button v-else class="signin-button-image" :style="'background-image:url(' + iconURL + '/signin-button-press.png)'" formType="submit"></button>
    </form>
      <!-- <image class='signin-button-image' src='{{iconURL}}/signin-button-{{signcount.sign==0?"un":""}}press.png' bindtap='sign'></image> -->
  </view>
  <!-- 开启提醒/活动规则 -->
  <view class="signin-remind-bottom row">
    <view class="signin-text-score">你的积分：<text class="big">{{signcount.now_points}}</text></view>
    <!-- <view class="signin-remind-line"></view> -->
    <view class="signin-score-list" @tap="goIntegralList">
      积分明细
      <text class="iconfont icon-btn_xiangyoudajiantoux icon-right" @tap="goIntegralList"></text>
    </view>
  </view>



  <view class="score-block" v-if="signcount.invite.status==1 || signcount.points_game.status==1">
    <!-- <button class='to_share score-block-image {{signcount.invite.status!=0&&signcount.points_game.status!=0?"two":""}}' open-type="share"> -->
      <image v-if="signcount.invite.status==1" :class="'score-block-image ' + (signcount.invite.status!=0&&signcount.points_game.status!=0?'two':'')" :src="signcount.invite.img" @tap="goToShare"></image>
    <!-- </button> -->
    <image v-if="signcount.points_game.status==1" :class="'score-block-image ' + (guideShow?'zIndex1000':'') + ' ' + (signcount.invite.status!=0&&signcount.points_game.status!=0?'two':'')" :src="signcount.points_game.img" @tap="goToLotteryDraw">
    </image>
     <!-- 积分游戏引导 -->
      <view class="guide" :style="'display:' + (guideShow?'block':'none')">
        <image :src="iconURL + '/btn_wzdl@2x.png'" class="close_btn" @tap="closeGuide"></image>
        <image :src="iconURL + '/img_jfcjydwz@2x.png'" class="guide_img"></image>
      </view>
  </view>
  <view class="score-pop-md" :hidden="!guideShow"></view>
  <!-- 弹窗 -->
  <!-- 活动规则弹窗 -->
  <view :class="'rules-pop-hold ' + (showRules?'hide':'show')">
    <view class="rules-pop">
      <view class="rules-content">
        <view class="rules-title">活动规则</view>
        <view class="rules-line"></view>
        <!-- 活动规则内容 -->
        <scroll-view class="rules-text-box" scroll-y="true">
          <view class="rules-text" v-for="(item, index) in rule_text" :key="index">
            <text>{{item}}</text>
          </view>
        </scroll-view>
        <view :class="'iconfont icon-btn_guanbianniux icon-closs ' + (showRules?'hide':'show')" @tap="showButton"></view>
      </view>
    </view>

    <view class="rules-pop-md" @tap="showButton"></view>
  </view>

  <!-- 签到弹窗 -->
  <view :class="'signin-pop-hold ' + (showSignin?'hide':'show')">
    <view class="signin-pop">
      <view class="signin-content">
        <image :src="iconURL + '/popup_red_gift.png'" class="popup_red_gift"></image>
        <text class="signin-pop-title">恭喜获得</text>
        <!-- 签到领取内容 -->
        <view class="signin-pop-red-gift">
          <block v-for="(item, index) in signState.prize" :key="index">
            <!-- <view class='iconfont icon-add iconAdd' wx:if="{{index>0}}"></view> -->
            <view class="pop-red-gift-info" v-if="item.send_type==1">
              <text class="pop-red-gift-text">{{item.price}}</text>
            </view>
            <!-- <view class='pop-red-gift-info-2' wx:if="{{item.send_type==2}}">
              <text class='pop-red-gift-text'>{{item.name}}...</text>
              <text class='pop-red-gift-time'>{{item.time}}</text>
            </view> -->
            <view class="coupon-wrap" v-if="item.send_type==2" :style="'background-image:url(' + iconURL + '/img_qdhbyhqkp@2x.png)'">
              <view class="left">
                <text class="price1">￥</text><text class="price2">{{item.price}}</text>
              </view>
              <view class="right">
                <view>
                  <view class="text1 ellipsis">{{item.name}}</view>
                  <view class="text2 ellipsis">{{item.description}}</view>
                  <view class="text2 ellipsis">{{item.time}}</view>
                </view>
              </view>
            </view>
          </block>
        </view>


        <!-- 去购物按钮 -->
        <!-- <view class='pop-red-gift-button' bindtap='goIndex'>
          <image src='{{iconURL}}/signin_gift_btn.png'></image>
          <text class='pop-red-gift-btn-text'>去购物</text>
        </view> -->

        <!-- 关闭按钮 -->
        <view :class="'iconfont icon-btn_guanbianniux icon-closs ' + (showSignin?'hide':'show')" @tap="showButton2"></view>
      </view>
    </view>
    <view class="signin-pop-md" @tap="showButton2"></view>
  </view>

  <!-- 推荐商品列表 -->
  <view class="recommend">
    <view class="title"><image :src="iconURL + '/signin-list-header.png'"></image></view>
    <goodList :list="recommend_good_list" type="2" align="left"></goodList>
  </view>
  <button class="to_share" open-type="share">
    <image :src="iconURL + '/button-icon-share01.png'"></image>
  </button>
</view>

<view class="drawer_screen">

</view>
<view class="gohomeModal">
  <view class="modal-font">
    活动已结束
  </view>
  <button class="modal-btn" @click.stop="gotoHome">
    返回首页
  </button>
</view>
<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
// pages/sign/sign.js
var app = getApp().globalData;
var common = require("../../utils/common.js");
var event = require("../../utils/event.js");
import goodlist from "../../components/goodList/goodList";

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      showRules: true,
      showSignin: true,
      gift_list: [{
        is_signined: 0,
        text: "第一天",
        today: false
      }, {
        is_signined: 0,
        text: "第二天",
        today: false
      }, {
        is_signined: 0,
        text: "第三天",
        today: false
      }, {
        is_signined: 0,
        text: "第四天",
        today: false
      }, {
        is_signined: 0,
        text: "第五天",
        today: false
      }, {
        is_signined: 0,
        text: "第六天",
        today: false
      }, {
        is_signined: 0,
        text: "第七天",
        today: false
      }],
      rule_text: ["1、每天签到，每天可领取奖励，余额将自动充值至账户余额中，余额明细可点击我的——账户余额，即可查看；优惠券将自动加入我的优惠券中。", "2、签到漏签不可补签，签到需连续性进行签到，否则会错过后面的大额优惠券喔。", "3、当连续签到7天后，系统将重置，重新从第一天签到开始计数。", "4、签到已领取现金余额，表示您通过签到获取的余额总额。", "5、签到重置的时间为每日的24点钟整", "6、如果用户存在违规行为，主办方将取消用户的活动资格、并有权撤销相关违规交易、收回奖励等利益，同时依照相关规则进行处罚。", "7、如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），则主办方可依相关法律法规的规定主张免责。"],
      signState: {},
      signcount: {
        sign: 0,
        count: 0,
        money: '0.00',
        now_points: 0
      },
      goAc: false,
      guideShow: false,
      // 上拉加载部分
      refresh: true,
      page: 1,
      recommend_good_list: [],
      isShowGoHome: false,
      checkSessionKey: false,
      entryData: "",
      random: "",
      animationData: ""
    };
  },

  components: {
    goodlist
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; // 未登录跳转
    // 监听checkSessionKey

    if (app.checkSessionKey) {
      this.setData({
        checkSessionKey: true
      });
      that.usersigncount();
    } else {
      event.on('checkSessionKey', this, function (data) {
        this.setData({
          checkSessionKey: data
        });
        that.usersigncount();
      });
    } // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数


    if (options && options.entryType && options.entryType == 'external') {
      this.setData({
        isShowGoHome: false
      });
    } else {
      this.setData({
        isShowGoHome: true
      });
    } // 外部带商品店铺


    this.setData({
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
        const token = common.getStorageSync('token'); // if (token == undefined || token == '') {
        //   common.showRidoModal('登录小程序获取信息', '登录', function() {
        //     that.usersigncount();
        //   })
        // }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  // 上拉触底事件
  onReachBottom: function (e) {
    if (this.refresh) {
      this.setData({
        page: this.page + 1
      });
      this.getRecommendGoodList();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.usersigncount();
    this.getRecommendGoodList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var pickup = common.getStorageSync('getpickup');
    return {
      title: that.signcount.share_info.share_title,
      path: '/pages/sign/sign?pickup_id=' + pickup.pickup_id,
      imageUrl: that.signcount.share_info.share_img,
      success: function (res) {
        common.toast('分享成功');
      },
      fail: function (res) {
        common.toast('分享失败');
      }
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
              key: 'city',
              data: {
                'pickup_id': res.pickup_id,
                'warehouse_id': res.warehouse_id,
                'cityName': res.city_name,
                'is_pick_up': 1
              }
            });
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
          }
        });
      });
    },
    // 获取信息
    usersigncount: function () {
      var that = this;
      var uri = app.getPath.usersigncount;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res.data.success == 1) {
          var res = res.data.result;
          res.days = res.sign == 1 ? res.count : res.count + 1;
          that.setData({
            random: Math.random(),
            signcount: res
          });
          that.barAction();
        }
      });
    },
    // 返回首页
    gotoHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    isCheckLogin: function () {
      // 未登录跳转
      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }
    },
    // 签到
    sign: function (e) {
      var that = this;
      common.formIdUpdate(e); // 未登录跳转

      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      if (that.signcount.sign == 1) return;
      var uri = app.getPath.usersign;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res.data.success == 1) {
          var res = res.data.result;
          that.setData({
            signState: res
          });
          that.showButton2();
        }
      });
    },
    switchChange: function (e) {
      // status 1 开启 2关闭
      var that = this; // 未登录跳转

      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      var open_msg = e.currentTarget.dataset.open_msg;

      if (open_msg == 1) {
        open_msg = 2;
      } else {
        open_msg = 1;
      }

      if (open_msg == 1) {
        openmsg(that);
      } else {
        wx.showModal({
          title: '关闭提醒',
          content: '关闭提醒可能会让你错失大额现金哦~',
          confirmText: '继续提醒',
          confirmColor: '#555555',
          cancelText: '关闭提醒',
          cancelColor: '#BBBBBB',
          success: function (e) {
            // console.log(e)
            if (e.cancel) {
              openmsg(that);
            } else if (e.confirm) {
              return false;
            }
          }
        });
      } // 开启/关闭签到提醒


      function openmsg(that) {
        var uri = app.getPath.openmsg;
        var signcount = that.signcount;
        var data = {
          status: open_msg
        };
        common.ApiGateWayTest(uri, data, true, function (res) {
          var res = res.data;

          if (res.success == 1) {
            if (res.result.status == 1) {
              signcount.open_msg = open_msg;
              that.setData({
                signcount
              });
              var msg = open_msg == 1 ? '已开启签到提醒' : '取消提醒成功';
              common.toast(msg);
            }
          }
        });
      }
    },
    showButton: function () {
      var that = this;
      that.setData({
        showRules: !that.showRules
      });
    },
    showButton2: function () {
      var that = this;
      that.setData({
        showSignin: !that.showSignin
      }); // 关闭弹窗重新加载数据

      if (that.showSignin) {
        that.usersigncount();
        that.showGuide();
        that.setData({
          goAc: true
        });
      }
    },
    closeGuide: function () {
      this.setData({
        guideShow: false
      });
    },
    gameGuide: function () {
      var that = this;
      var uri = app.getPath.gameGuide;
      common.ApiGateWayTest(uri, '', true, function (res) {
        console.log(res);

        if (res.data.success == 1 && res.data.result.status == 0) {
          that.usersigncount();
        }
      });
    },
    // 显示引导
    showGuide: function () {
      var that = this;
      var game_guide = this.signcount.game_guide;

      if (game_guide == 1) {
        return false;
      }

      this.gameGuide();
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 100
      });
      var timer = setTimeout(function () {
        that.setData({
          guideShow: true
        });
      }, 1600);
    },
    // bar动画
    barAction: function () {
      let count = this.signcount.count;
      const animation = wx.createAnimation({
        duration: 1500,
        timingFunction: 'ease'
      });
      this.animation = animation;
      animation.width(count * 14.3 + '%').step();
      this.setData({
        animationData: animation.export()
      });
    },
    // 上拉加载部分
    getRecommendGoodList: function () {
      var that = this;
      common.showLoad(that);
      var url = app.getPath.newGoodsRecommend;
      var page_size = 10;
      var data = {
        page: this.page,
        page_size: page_size
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          if (that.page == 1) that.recommend_good_list = [];
          that.setData({
            recommend_good_list: [...that.recommend_good_list, ...res.result.products]
          });

          if (res.result.products.length < page_size) {
            that.refreshFun(false);
          } else {
            that.refreshFun(true);
          }
        }

        common.hideLoad(that);
      });
    },
    // 是否允许上拉加载
    refreshFun: function (data) {
      this.setData({
        refresh: data
      });
    },
    goIndex: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    goIntegralList: function () {
      // 未登录跳转
      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      wx.navigateTo({
        url: '../sign/integral/integral'
      });
    },
    goToLotteryDraw: function () {
      // 未登录跳转
      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      wx.navigateTo({
        url: '../../packageB/tools/turntable'
      });
    },
    goToShare: function () {
      // 未登录跳转
      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      wx.navigateTo({
        url: '../../pages/user/invitation/invitation'
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
@import "./sign.css";
</style>