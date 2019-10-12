<template>
<view>
<!--返回首页-->
<!-- <view class='goHomeFixed' catchtap='gotoHome' wx:if="{{isShowGoHome}}">
  <image src='{{iconURL}}/product-icon-leftReturn.svg' class='icon-leftReturn'></image>
  <text>返回首页</text>
</view> -->
<view class="page-bg">
  <!-- <view class="show-bg" style="background-image:url({{iconURL}}/packet-new-bg.png)">

  </view> -->
  <view class="goHomeFixed" @click.stop="gotoHome">
    <text class="iconfont icon-btn_shangxiangshouyex icon-leftReturn"></text>
    <text>去首页</text>
  </view>
  <view class="packet-rule" @click.stop="showRule">
    活动规则
  </view>
  <!-- <view class="packet-money">
    {{packet_msg.format_max_price}}
  </view> -->

  <view class="packet-card" :style="'background-image:url(' + (packet_msg.status==0&&packet_msg.is_self==1||packet_msg.is_self==0?iconURL+'/help-card-packet.png':iconURL+'/packet-new-use-card.png') + ');height:' + (packet_msg.status==0&&packet_msg.is_self==1||packet_msg.is_self==0?'806rpx':'596rpx') + ';padding-top: ' + (packet_msg.status == 0 || (packet_msg.status == 1 && packet_msg.is_self == 0) || showTimeEnd ? '90rpx' : '0')">
    <image class="head-pic" v-if="packet_msg.status == 0 || (packet_msg.status == 1 && packet_msg.is_self == 0) || showTimeEnd" :src="packet_msg.head_pic"></image>
    <!-- 助力红包分享获取 -->
    <view v-if="packet_msg.status==0||packet_msg.is_self==0">
      <view class="get-money">
        <view :class="'get-money-font ' + (packet_msg.status==1&&packet_msg.is_self==0?'margain-t':'')">
          <text class="i">已获得</text>
          <text class="packet-get-money">{{packet_msg.current_price}}</text>
          <text class="i">元</text>
        </view>
      </view>
      <view class="count-time" v-if="packet_msg.status==0">
        活动倒计时
        <countDown @countTimeOver="countTimeEnd" time-text="time-text" doc-text="doc-text" :timestamp="packet_msg.end_time*1000"></countDown>
      </view>
      <view class="packet-progress">
        <view class="packet-progress-font-box">
          <view class="packet-progress-font" :style="'left:' + (packet_msg.exchange_precent>75?75:packet_msg.exchange_precent) + '%;'">
            ￥{{packet_msg.exchange_price}}可兑换
          </view>
        </view>
        <view class="packet-progress-box">
          <view class="packet-progress-size" :style="'width:' + packet_msg.percent + '%'"></view>
          <view class="packet-hr" :style="'left:' + packet_msg.exchange_precent + '%'"></view>
        </view>
        <view class="packet-progress-font-box">
          <view v-if="packet_msg.current_price!=packet_msg.max_price||(packet_msg.is_self==0&&packet_msg.is_exchange==0)" class="packet-progress-font" :style="(packet_msg.percent<10?'left:10':'left:'+packet_msg.percent) + '%;' + (packet_msg.percent>75?'left:75':'left:'+packet_msg.percent) + '%;'">
            当前￥{{packet_msg.current_price}}
          </view>
        </view>
        <view :class="(packet_msg.current_price==packet_msg.max_price?'packet-all-money-end':'packet-all-money')">
          最高￥{{packet_msg.format_max_price}}
        </view>
      </view>
    </view>

    <!-- 助力倒计时结束 -->
    <view v-if="packet_msg.status==2&&packet_msg.is_self==1">
      <view class="fail-get-packet">
        助力倒计时结束
      </view>
      <view class="fail-get-text">
        <view>
          很遗憾
        </view>
        <view>
          您未能达到领取红包条件
        </view>
      </view>
    </view>
    <!-- 助力红包领取成功 -->
    <view v-if="packet_msg.status==1&&packet_msg.is_self==1">
      <view class="fail-get-packet">
        恭喜成功领取!
      </view>
      <view class="packet-coupon">
        <view class="packet-coupon-box" :style="'background-image:url(' + iconURL + '/packet-coupon.png);'">
          <view class="packet-coupon-price">
            <i v-if="packet_msg.coupon.coupon_type==0||packet_msg.coupon.coupon_type==2">￥</i>

            <text>{{packet_msg.coupon.value}}</text>
            <i v-if="packet_msg.coupon.coupon_type==1">折</i>
          </view>
          <view class="packet-coupon-msg">
            <view class="packet-coupon-name">
              {{packet_msg.coupon.name}}
            </view>
            <view class="packet-coupon-desc">
              {{packet_msg.coupon.description}}
            </view>
            <view class="packet-coupon-time">
              {{packet_msg.coupon.use_end_date}}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="packet-all-btn">
      <view>

        <!-- 发起方 -->
        <!-- 进行中未达到领取条件 -->
        <form report-submit="true" @submit="onShare">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status==0&&packet_msg.is_self==1&&packet_msg.is_exchange==0" open-type="share">
            <text>快喊人~ 让红包变大</text>
            <image class="share-btn-font" :src="iconURL + '/packet-btn-icon.png'"></image>
          </button>
        </form>

        <!-- 进行中已达到领取条件 -->
        <form report-submit="true" @submit="onShare">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status==0&&packet_msg.is_self==1&&packet_msg.is_exchange==1" open-type="share">
            <text>继续让红包变大</text>
          </button>
        </form>
        <form report-submit="true" @submit="showModal">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status==0&&packet_msg.is_self==1&&packet_msg.is_exchange==1">
            <text>马上兑换</text>
          </button>
        </form>

        <!-- 活动失败 -->
        <form report-submit="true" @submit="toCreatePacket">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status==2&&packet_msg.is_self==1&&packet_msg.is_exchange==0&&packet_msg.is_can_sponsor == 1&&packet_msg.is_in_activity==0">
            <text>点击领取大红包</text>
          </button>
        </form>
        <form report-submit="true" @submit="goShop">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status==2&&packet_msg.is_self==1&&packet_msg.is_exchange==0&&(packet_msg.is_can_sponsor == 0 || packet_msg.is_in_activity==1)">
            <text>去逛逛</text>
          </button>
        </form>

        <!-- 领取成功 -->
        <form report-submit="true" @submit="goShop">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status==1&&packet_msg.is_self==1&&packet_msg.is_exchange==1">
            <text>去使用</text>
          </button>
        </form>

        <!-- 领取成功并且还有红包发起次数 -->
        <!-- <form report-submit='true' bindsubmit='toCreatePacket'>
          <button class="share-btn" form-type='submit' wx:if="{{packet_msg.status==1&&packet_msg.is_self==1&&packet_msg.is_exchange==1&&packet_msg.is_can_sponsor==1&&}}">
            <text>再领一个</text>
          </button>
        </form> -->



        <!-- 助力方 -->
        <!-- 助力活动未完成 未助力 -->
        <form report-submit="true" @submit="helpGetPcket">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status==0&&packet_msg.is_self==0&&packet_msg.is_bargain==0&&packet_msg.is_max==0&&packet_msg.is_can_help == 1">
            <text>点击帮TA助力</text>
          </button>
        </form>

        <!--  助力活动未完成 有红包发起次数 -->
        <form report-submit="true" @submit="toCreatePacket">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status == 0 && packet_msg.is_self==0 && packet_msg.is_bargain == 1 && packet_msg.is_can_sponsor==1 && packet_msg.is_in_activity==0">
            <text>点击领取大红包</text>
          </button>
        </form>

        <!--  助力活动未完成 无红包发起次数 -->
        <form report-submit="true" @submit="goShop">
          <button class="share-btn" form-type="submit" v-if="packet_msg.status == 0 && packet_msg.is_self==0 && packet_msg.is_bargain == 1 &&  (packet_msg.is_can_sponsor==0 || packet_msg.is_in_activity==1)">
            <text>去逛逛</text>
          </button>
        </form>

        <!--  助力活动已完成 有红包发起次数 -->
        <form report-submit="true" @submit="toCreatePacket">
          <button class="share-btn" form-type="submit" v-if="packet_msg.is_self==0 && packet_msg.is_bargain == 1 && packet_msg.is_can_sponsor==1 && packet_msg.is_in_activity==0 && (packet_msg.status == 1 || packet_msg.status == 2)">
            <text>点击领取大红包</text>
          </button>
        </form>

        <!--  助力活动已完成 无红包发起次数 -->
        <form report-submit="true" @submit="goShop">
          <button class="share-btn" form-type="submit" v-if="packet_msg.is_self==0 && (packet_msg.is_can_sponsor==0 || packet_msg.is_in_activity==1) && (packet_msg.status == 1 || packet_msg.status == 2)">
            <text>去逛逛</text>
          </button>
        </form>

        <view class="to-share-font">
          <text v-if="packet_msg.status==0&&packet_msg.is_self==1&&packet_msg.is_exchange==0">分享到群里，红包金额会更大哦~</text>
          <text v-if="packet_msg.status==1&&packet_msg.is_self==1">红包已发放账户！尽情使用吧~</text>
          <text v-if="packet_msg.status==2&&packet_msg.is_self==1">别气馁，再发起冲刺大红包</text>
          <text v-if="packet_msg.status==0&&packet_msg.is_self==0&&packet_msg.is_in_activity==1">助力好友，自己的红包也会变大哦</text>
          <!-- <text wx:if="{{packet_msg.is_self==0&&packet_msg.is_can_sponsor==0}}">更多商城活动等你来探索</text> -->
        </view>
      </view>
      <view class="get-success-icon" :style="'background-image:url(' + iconURL + '/packet-is-get01.png)'" v-if="packet_msg.status==1&&packet_msg.is_self==0">

      </view>
    </view>
    

  </view>
  <view class="list-help-red-box" :style="'top:' + (packet_msg.status==0&&packet_msg.is_self==1||packet_msg.is_self==0?'810rpx':'602rpx') + ';'">
      <view class="help-list">
        <view class="help-list-title">
          <view>好友助力排行榜</view>
          <view class="help-list-title-hr">

          </view>
        </view>

        <view class="help-list-box" scroll-y="true">
          <view :class="'rank-list ' + (index==packet_list.length-1?'border-none':'')" v-for="(item, index) in packet_list" :key="index" v-if="packet_list&&packet_list.length>0">
            <image class="rank-img" :src="item.head_pic"></image>
            <view class="rank-name">
              <view>
                {{item.nickname}}
              </view>
              <view>
                {{item.add_time}}
              </view>
            </view>
            <view class="rank-price">
              <view>
                {{item.bargain_price}}元
              </view>
              <view class="help-tips" v-if="item.type==2&&index!=0">
                助力增值
              </view>
              <view class="help-tips" v-if="index==0">
                手气最佳
              </view>
            </view>
          </view>
          <view class="packet-list-none" v-if="packet_list.length==0">
            <view>暂无好友相助</view>
            <view>赶快邀请好友得{{packet_msg.format_max_price}}元大红包!</view>
          </view>
        </view>
      </view>
    </view>
    <view class="show-all-bg">
    
    </view>
    <view class="show-bg-bottom" :style="'background-image:url(' + iconURL + '/packet-new-bottom.png)'">
    
    </view>
</view>



<!-- 助力弹窗 -->
<view class="drawer_screen" v-if="isShowHelpModal" @click.stop="!activityEnd || !showSelfShare?'closeModal':''"></view>
<view :class="'share-moudle-box ' + (isShowHelpModal ? 'show' : '')" v-if="isShowHelpModal">
  <view class="packet-top" :style="'background-image:url(' + iconURL + '/packet-bottom.png)'">
    <view v-if="showBargain">
      <view class="header-img">
        <image class="img" :src="help_packet.head_pic"></image>
      </view>
      <view class="text">
        谢谢你为我助力
      </view>
      <view class="price">
        <i>￥</i>
        <text>{{help_packet.bargain_price}}</text>
      </view>
    </view>
    <view v-if="showSelfShare">
      <view class="header-img">
        <image class="img" :src="packet_msg.head_pic"></image>
      </view>
      <view class="text">
        捡到一个可变大的红包哟~
      </view>
      <!-- <view class="price">
        <i>￥</i>
        <text>{{packet_msg.current_price}}</text>
      </view> -->
    </view>
    <view v-if="showHelp">
      <view class="share-header">
        助力次数已用完
      </view>
      <view class="share-help-coupon" :style="'background-image:url(' + iconURL + '/packet-help-coupon.png)'">
        <view class="coupon-price">
          <i>￥</i>
          <text>{{packet_msg.red_packet.max_price}}</text>
        </view>
        <view class="help-packet-text">
          {{packet_msg.red_packet.text}}
        </view>
      </view>
    </view>
    <view v-if="showNotHelp">
      <view class="share-header">
        助力次数已用完
      </view>
      <view class="help-end-text">
        <view>
          更多商城活动
        </view>
        <view>等你来探索</view>
      </view>
    </view>
    <view class="activtity-end-text" v-if="showTimeEnd">
      <view>该红包倒计时已结束</view>
    </view>
    <view class="activtity-end-text" v-if="activityEnd">
      <view>
        活动已经过期咯，
      </view>
      <view>
        更多商城活动
      </view>
      <view>等你来探索</view>
    </view>
  </view>
  <view class="share-msg" :style="'background-image:url(' + iconURL + '/packet-top.png)'">
    <view class="help-text" v-if="showBargain && help_packet.is_in_activity == 1">恭喜！你的大红包同时获得
      <i>￥{{help_packet.help_price}}</i>增值</view>
    <form report-submit="true" @submit="toCreatePacket">
      <button class="get-coupon-btn" form-type="submit" v-if="showHelp">
        点击领取
      </button>
    </form>
    <form report-submit="true" @submit="goShop">
      <button class="get-coupon-btn" form-type="submit" v-if="showNotHelp||showTimeEnd||activityEnd">
        去逛逛
      </button>
    </form>
    <form report-submit="true" @submit="onShare">
      <button class="get-coupon-btn" form-type="submit" v-if="showSelfShare" open-type="share">
        <text>让红包变大</text>
      </button>
    </form>
  </view>
</view>
<view class="iconfont icon-btn_guanbianniux icon-close" v-if="isShowHelpModal&&!activityEnd&&!showSelfShare" @click.stop="closeModal">

</view>
<!-- 规则弹窗 -->
<view :class="'rules-pop-hold ' + (showRules?'hide':'show')">
  <view class="rules-pop">
    <view class="rules-content">
      <view class="rules-title">{{packet_rule.title}}</view>
      <view class="rules-line"></view>
      <!-- 活动规则内容 -->
      <scroll-view class="rules-text-box" scroll-y="true">
        <view class="rules-text" v-for="(item, index) in packet_rule.rule_content" :key="index">
          <text>{{item}}</text>
        </view>
      </scroll-view>
      <form report-submit="true" @submit="showRule">
        <button :class="'iconfont icon-btn_guanbianniux icon-closs ' + (showRules?'hide':'show')" form-type="submit"></button>
      </form>
    </view>
  </view>
  <view class="rules-pop-md" @tap="showRule"></view>
</view>
</view>
</template>

<script>
// packageA/packet/packet.js
//获取应用实例
var app = getApp().globalData;
var common = require("../../utils/common.js");
var event = require("../../utils/event.js");
import countdown from "../../components/countDown/countDown";

export default {
  data() {
    return {
      isShowGoHome: false,
      iconURL: app.dataBase.iconURL,
      helpPriceMoudle: false,
      packet_id: "",
      shop_id: 0,
      packet_msg: {},
      help_packet: {},
      packet_list: [],
      packet_rule: {},
      showRules: true,
      activity_red_packet_id: "",
      coupon_msg: {},
      isShowHelpModal: false,
      pickup_id: '',
      showBargain: false,
      showHelp: false,
      showNotHelp: false,
      showTimeEnd: false,
      activityEnd: false,
      showSelfShare: false,
      entryData: ""
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
    var that = this;
    that.packet_id = options.packet_id;
    that.shop_id = options.shop_id;

    if (options.packet_bargaining) {
      that.setData({
        showSelfShare: true,
        isShowHelpModal: true
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


    that.setData({
      entryData: options
    });
    var options = that.entryData;
    var pickupId = common.getStorageSync('getpickup');
    that.pickup_id = pickupId.pickup_id; // 判断是否第一次进入 且是从外部进入，如二维码扫码 && app.firstlaunchApp

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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPacketMsg();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var pickup = common.getStorageSync('getpickup');

    if (that.showSelfShare) {
      setTimeout(() => {
        that.setData({
          showSelfShare: false,
          isShowHelpModal: false
        });
      }, 2000);
    }

    return {
      title: that.packet_msg.share_title,
      path: '/packageA/packet/packet?packet_id=' + that.packet_id + '&shop_id=' + that.shop_id + '&pickup_id=' + that.pickup_id,
      imageUrl: that.packet_msg.share_img
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
    // 返回首页
    gotoHome: function (e) {
      common.formIdUpdate(e);
      wx.switchTab({
        url: '/pages/index/index'
      });
    },

    //达到领取条件领取
    showModal(e) {
      let that = this;
      common.formIdUpdate(e);

      if (that.packet_msg.is_max == 1) {
        that.getCoupon();
      } else {
        wx.showModal({
          content: '您可以继续分享达到最高红包金额，是否确认立即兑换!',
          success: function (res) {
            if (res.confirm) {
              that.getCoupon();
            }
          }
        });
      }
    },

    // 分享获取上报
    onShare(e) {
      var that = this;
      common.formIdUpdate(e);
    },

    //  获取信息
    getPacketMsg() {
      let that = this;
      let url = app.getPath.packetMsg;
      let data = {
        activity_red_packet_bargaining_id: that.packet_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          // if (res.result.is_self == 0 && res.result.activity_status == 1 && (res.result.is_can_help == 0 || res.result.is_self == 0 && res.result.status == 2)) {
          //   that.setData({
          //     isShowHelpModal: true
          //   })
          // }
          if (res.result.activity_status == 0) {
            if (res.result.status == 1 || res.result.status == 2) {
              that.setData({
                activityEnd: true,
                isShowHelpModal: true
              });
              return;
            }
          } else {
            if (res.result.status == 2 && res.result.is_self == 0) {
              that.setData({
                showTimeEnd: true,
                isShowHelpModal: true
              });
            } else if (res.result.is_can_help == 0 && res.result.is_can_sponsor == 1 && res.result.is_in_activity == 0) {
              that.setData({
                showHelp: true,
                isShowHelpModal: true
              });
            } else if (res.result.is_can_help == 0 && (res.result.is_can_sponsor == 0 || res.result.is_in_activity == 1)) {
              that.setData({
                showNotHelp: true,
                isShowHelpModal: true
              });
            }
          }

          that.activity_red_packet_id = res.result.activity_red_packet_id;
          that.setData({
            packet_msg: res.result
          });
          that.getPacketRule();
          that.getPacketList();
        } else {
          common.toast(res.msg);
          return;
        }
      });
    },

    // 好友助力
    helpGetPcket(e) {
      let that = this;
      common.formIdUpdate(e);
      var pUri = app.getPath.packetCheckDistance;
      var pData = {
        time_atitude: app.dataBase.userAtitude,
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(pUri, pData, true, function (pRes) {
        if (pRes.data.success == 1) {
          let url = app.getPath.packetHelp;
          let data = {
            activity_red_packet_bargaining_id: that.packet_id
          };
          common.ApiGateWayTest(url, data, true, function (res) {
            var res = res.data;

            if (res.success == 1) {
              if (that.packet_msg.status == 0) {
                if (res.result.is_can_help == 1) {
                  that.setData({
                    help_packet: res.result,
                    isShowHelpModal: true,
                    showBargain: true
                  });
                }
              }
            } else {
              common.toast(res.msg);
              return;
            }
          });
        } else {
          common.toast(pRes.data.msg);
          return;
        }
      });
    },

    // 好友助力排行榜
    getPacketList() {
      let that = this;
      let url = app.getPath.packetList;
      let data = {
        activity_red_packet_bargaining_id: that.packet_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          that.setData({
            packet_list: res.result
          });
        }
      });
    },

    // 获取规则
    getPacketRule() {
      let that = this;
      let url = app.getPath.packetRule;
      let data = {
        activity_red_packet_id: that.activity_red_packet_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          that.setData({
            packet_rule: res.result.rule
          });
        }
      });
    },

    //规则的显示隐藏
    showRule() {
      let that = this;
      this.setData({
        showRules: !that.showRules
      });
    },

    // 点击领取大红包 重新发起助力红包
    toCreatePacket(e) {
      let that = this;
      common.formIdUpdate(e);
      var pUri = app.getPath.packetCheckDistance;
      var pData = {
        time_atitude: app.dataBase.userAtitude,
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(pUri, pData, true, function (pRes) {
        if (pRes.data.success == 1) {
          let url = app.getPath.createPacket;
          let data = {
            activity_red_packet_id: that.activity_red_packet_id,
            shop_id: that.shop_id
          };
          common.ApiGateWayTest(url, data, true, function (res) {
            if (res.data.success == 1) {
              wx.navigateTo({
                url: '../packet/packet?packet_id=' + res.data.result.activity_red_packet_bargaining_id + '&shop_id=' + that.shop_id + '&packet_bargaining=true'
              });
            } else {
              common.toast(res.data.msg);
            }
          });
        } else {
          common.toast(pRes.data.msg);
          return;
        }
      });
    },

    // 跳转店铺首页
    goShop(e) {
      let that = this;
      common.formIdUpdate(e);
      wx.navigateTo({
        url: '/packageA/takeout-shop/takeout-shop?shop_id=' + that.shop_id
      });
    },

    // 领取优惠券
    getCoupon() {
      let that = this;
      let url = app.getPath.getPcketCoupon;
      let data = {
        activity_red_packet_bargaining_id: that.packet_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        if (res.data.success == 1) {
          if (res.data.result.data.state == 0) {
            that.setData({
              coupon_msg: res.data.result.data.userCouponInfo
            });
            that.getPacketMsg();
          } else {
            common.toast(res.data.result.data.state_desc);
          }
        } else {
          common.toast(res.msg);
          return;
        }
      });
    },

    // 关闭弹窗
    closeModal() {
      this.setData({
        isShowHelpModal: false
      });
      this.getPacketMsg();
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
@import "./packet.css";
</style>