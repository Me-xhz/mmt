<template>
<view>
<!--拼团详情页-->
<!--顶部商品信息-->
<view class="goods-msg">
  <view class="goods-box" @tap="payAgain">
    <image class="goods-img" :src="teamFound.sku_img"></image>
    <view class="goods-none" v-if="teamFound.is_enough==0">
      <image :src="iconURL + '/inequacy02.png'"></image>
    </view>
    <view class="goods-news">
      <view class="goods-name t10">{{teamFound.goods_name}}</view>
      <view class="goods-standrad">{{teamFound.spec_key_name}}</view>
      <view class="group-price">
        <view class="user-new-tips" v-if="teamMsg.is_new_activity_user==1">新人专享</view>
        <text class="price-sign">￥</text>
        <text class="price">{{teamFound.price}}</text>
        <text class="cost-price">￥{{teamFound.goods_price}}</text>
      </view>
    </view>
  </view>
</view>

<!--团员信息-->
<view class="group-msg">
  <view class="group-time">
    <view class="short" v-if="teamFound.status==2&& order_id == 0 &&teamList.length>0">此团已结束，可参加其他人的团</view>
    <view class="short" v-else-if="teamFound.status==2&& order_id == 0 &&teamList.length<=0">拼单已满</view>
    <view class="short" v-else>{{teamFound.status_desc}}</view>
    <view class="short-time" v-if="teamFound.status==1">距拼团结束
      <view class="time-box">
        <text>{{h}}</text>
      </view>
      <text class="dot">:</text>
      <view class="time-box">
        <text>{{m}}</text>
      </view>
      <text class="dot">:</text>
      <view class="time-box">
        <text>{{s}}</text>
      </view>
    </view>
    <view class="group-success" v-if="teamFound.status == 2 && order_id != 0">货品将尽快发出，请留意短信消息</view>
    <view class="group-success" v-if="teamFound.status == 2 && order_id == 0&& teamList.length<=0">来晚啦，该拼单已被人抢先一步</view>
    <view class="group-success" v-if="teamFound.status == 3 && order_id != 0">钱款将原路退回</view>
  </view>

  <!-- 拼团参加列表 -->
  <view class="join-team" v-if="(teamFound.status==3&& order_id == 0 && teamFoundStatus == 0&& teamList.length>0) || (teamFound.status==2 && order_id == 0 && teamFoundStatus == 0&& teamList.length>0)">
    <view class="team-list-box">
      <!--拼团列表组件-->
      <team-list :teamList="teamList" @getinfo="getNewTeamInfo"></team-list>
    </view>
  </view>
  <view class="group-team" v-if="teamFound.status==1 || order_id!= 0 ||teamList.length<=0">
    <view class="member">
      <view class="captain">团长</view>
      <image :style="'background-image:url(' + iconURL + '/default_pic.png)'" :src="teamFound.head_pic"></image>
    </view>
    <view class="member" v-for="(item, index) in teamFollow" :key="index">
      <image :style="'background-image:url(' + iconURL + '/default_pic.png)'" :src="item.follow_user_head_pic"></image>
    </view>
    <view class="member" v-for="(item, index) in teamFound.surplus" :key="index" v-if="teamFound.surplus > 0 && teamFound.status == 1">
      <view class="add-member">
        <view class="row">

        </view>
        <view class="col">

        </view>
      </view>
    </view>
  </view>

  <form report-submit="true" @submit="toShare" v-if="teamFound.status==1 && order_id != 0">
    <button form-type="submit" class="get-group" open-type="share">
      分享邀请工友参团
    </button>
  </form>
  <form report-submit="true" @submit="delegation" v-if="teamFound.status==1 && order_id==0">
    <button form-type="submit" class="get-group">
      一键参团
    </button>
  </form>
  <form report-submit="true" @submit="delegation" v-if="teamFound.status==2 && order_id != 0 && teamFoundStatus == 0">
    <button form-type="submit" class="get-group">
      继续开个团
    </button>
  </form>
  <form report-submit="true" @submit="delegation" v-if="teamFound.status==2 && order_id == 0 && teamFoundStatus == 0">
    <button form-type="submit" class="get-group">
      我来开个团
    </button>
  </form>
  <form report-submit="true" @submit="delegation" v-if="teamFound.status==3 && teamFoundStatus == 0">
    <button form-type="submit" class="get-group">
      重新下单
    </button>
  </form>
  <form v-if="teamFound.status != 1 && teamFoundStatus != 0">
    <button class="get-group go-home" style="margin-top: 0">
      拼团活动已结束
    </button>
  </form>
  <form report-submit="true" @submit="gotoHome">
    <button form-type="submit" class="get-group go-home">
      返回首页
    </button>
  </form>
</view>

<!--查看拼单详情-->
<view class="my-group" @tap="showOrder" v-if="teamFound.status==1 && order_id != 0">
  查看拼单详情
  <text class="t2 iconfont icon-btn_gerenzhongxinyoujiantoux"></text>
</view>
<!--拼团规则-->
<view class="my-group" @tap="showButton" v-if="teamFound.status==1 && order_id==0">
  {{rule.rule_desc}}
  <text class="t2 iconfont icon-btn_gerenzhongxinyoujiantoux"></text>
</view>
<!--广告图-->
<view class="user-ad">
  <view class="swipers newSwipers indexAd white-bg-color" id="topHeight" v-if="adList[0].ad_link != ''">
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
<!-- 位置信息设置 -->
<view class="drawer_screen" v-if="showSettingModalStatus"></view>
<view class="tc_manu_box" v-if="showSettingModalStatus">
  <view class="tc_manu_items">
    <view class="manu_header">权限提示</view>
    <view class="manu-margin">
      <view class="tc-text">您未打开目前位置，部分功能将受到影响，请点击前往设置开启</view>
    </view>
    <view class="manu-buttons row">
      <button @tap="settingModalStatus">取消</button>
      <button class="button-primary" @tap="goSetting">前往设置</button>
    </view>
  </view>
</view>

<!-- 开团提示弹窗 -->
<view class="drawer_screen" v-if="showStartTeamModal"></view>
<view class="tc-start-team-box" v-if="showStartTeamModal">
  <view class="tc-start-team">
    <view class="tc-start-header-text">
      <i class="iconfont icon-img_tongyongchenggongx"></i>开团成功</view>
    <view class="tc-start-msg">还差一步，再邀请
      <i class="i">{{teamFound.surplus}}</i>位同厂工友参团</view>
    <view v-if="teamLabel.count_type!=2">
      <view v-if="teamLabel.time_type==0">
        <view class="tc-start-number" v-if="teamLabel.count_type==0">
          （您仅剩开团
          <i class="i"> {{teamLabel.found_limit}} </i>次，参团
          <i class="i"> {{teamLabel.follow_limit}} </i>次）
        </view>
        <view class="tc-start-number" v-if="teamLabel.count_type==1">
          （您仅剩拼团
          <i class="i"> {{teamLabel.total_team_limit}} </i>次)
        </view>
      </view>
      <view v-if="teamLabel.time_type==1">
        <view class="tc-start-number" v-if="teamLabel.count_type==0">
          （您今日仅剩开团
          <i class="i"> {{teamLabel.found_limit}} </i>次，参团
          <i class="i"> {{teamLabel.follow_limit}} </i>次）
        </view>
        <view class="tc-start-number" v-if="teamLabel.count_type==1">
          （您今日仅剩拼团
          <i class="i"> {{teamLabel.total_team_limit}} </i>次)
        </view>
      </view>
    </view>
    <form report-submit="true" @submit="toShare">
      <button form-type="submit" class="get-group" open-type="share">
        喊同厂工友来参团
      </button>
    </form>
    <view class="tc-start-ts">分享到微信群，成团更快喔</view>
  </view>
</view>

<!-- 参团提示弹窗 -->
<view class="drawer_screen" v-if="showInTeamModal"></view>
<view class="tc-start-team-box" v-if="showInTeamModal">
  <view class="tc-start-team">
    <view class="tc-start-header-text">
      <i class="iconfont icon-img_tongyongchenggongx"></i>参团次数已用完</view>
    <view class="tc-start-number">仅剩
      <i class="i"> {{teamLabel.found_limit}} </i>次开团，抓紧开团抢购</view>
    <form report-submit="true" @submit="payAgain">
      <button form-type="submit" class="get-group">
        我要开团
      </button>
    </form>
    <view class="tc-start-ts">分享到微信群，成团更快喔</view>
  </view>
</view>

<!-- 活动规则弹窗 -->
<view :class="'rules-pop-hold ' + (showRules?'hide':'show')">
  <view class="rules-pop">
    <view class="rules-content">
      <view class="rules-title">{{rule.title}}</view>
      <view class="rules-line"></view>
      <!-- 活动规则内容 -->
      <scroll-view class="rules-text-box" scroll-y="true">
        <view class="rules-text" v-for="(item, index) in rule.rule_content" :key="index">
          <text>{{item}}</text>
        </view>
        <text>注:</text>
        <view class="rules-text" v-for="(item, index) in rule.rule_tip" :key="index">
          <text>{{item}}</text>
        </view>
      </scroll-view>
      <form report-submit="true" @submit="showButton">
        <button :class="'iconfont icon-btn_guanbianniux icon-closs ' + (showRules?'hide':'show')" form-type="submit"></button>
      </form>
    </view>
  </view>
  <view class="rules-pop-md" @tap="showButton"></view>
</view>

<!-- SKU弹窗 -->
<view class="drawer_screen" @click.stop="setModalStatus" v-if="showModalStatus"></view>
<view :animation="animationData" style="opacity:1;z-index:2000;" class="drawer_attr_box" v-if="showModalStatus">
  <view class="close_icon" @click.stop="setModalStatus">
    <image :src="iconURL + '/icon_modal_closs.png'"></image>
  </view>
  <view class="drawer_attr_content">
    <view class="text_center">
      <view class="drawer_image">
        <image class mode="widthFix" :src="skuImages"></image>
      </view>
      <view class="product-SKU">
        <view class="product-price">
          <i class="font_24">¥</i>
          <text>{{skuSvipCurrent}}</text>
          <text v-if="skuSvipCurrent != skuCurrent" class="small">￥{{skuCurrent}}</text>
        </view>
        <view class="product-choose">{{choosed_sku}}</view>
      </view>
    </view>
    <scroll-view class="attr-margin" scroll-y="true">
      <view class="attr_main sku-height" v-for="(property, index) in teamFound.properties" :key="index">
        <view class="group-name">{{property.spec_name}}</view>
        <view class="commodity_attr_list">
          <view class="attr_box" v-for="(attr, index2) in property.attrs" :key="index2" @click.stop="attrValueselest" :data-property="property" :data-attr="attr">
            <view :class="'attr_name ' + attr.class">
              {{attr.item}}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="attr-amount attr_main">
      <!-- <view class="group-name attr_num_txt">购买数量</view> -->
      <view class="group-click">
        <!-- 减号 -->
        <form report-submit="true" @submit="changeNum" data-alpha-beta="0">
          <button class="amount-button" form-type="submit">
            <i :class="'amount-icon ' + (undel ? 'cant-del' : '')">-</i>
          </button>
        </form>

        <!-- 数值 -->
        <view class="amount-input">{{buynum}}</view>
        <!-- 加号 -->
        <form report-submit="true" @submit="changeNum" data-alpha-beta="1">
          <button class="amount-button" form-type="submit">
            <i :class="'amount-icon ' + (unadd ? 'cant-del' : '')">+</i>
          </button>
        </form>
      </view>
    </view>
    <button class="buy_now_btn" @click.stop="delegation">确定</button>
  </view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
//获取应用实例
var app = getApp().globalData;
var common = require("../../utils/common.js");
var event = require("../../utils/event.js");
import teamList from "../../components/teamList/teamList";

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      showRules: true,
      showSettingModalStatus: false,
      showStartTeamModal: false,
      showInTeamModal: false,
      found_id: '',
      pickup_id: '',
      teamFoundStatus: 0,
      teamFound: {},
      teamFollow: {},
      teamMsg: {},
      h: '00',
      m: '00',
      s: '00',
      order_id: "",
      team_id: 0,
      rule: {},
      teamLabel: {},
      teamList: [],
      duration: 500,
      interval: 5000,
      indexAdcurrent: 0,
      indicatorColor: "#fff",
      indicatorActiveColor: "#eb3c39",
      circular: true,
      autoplay: false,
      adList: [],
      indicatorDots: false,
      showModalStatus: false,
      canPurchase: false,
      showSKUstatus: 0,
      currentAttrs: [],
      choosed_sku: '',
      skuImages: '',
      itemData: {
        shop_type: 0
      },
      skuSvipCurrent: '',
      buynum: 1,
      team_sku_type: 0,
      isShowGoHome: false,
      entryData: "",
      skuCurrent: "",
      team_num: "",
      sku_price: "",
      min_sku_price: "",
      sku_svip_price: "",
      min_sku_svip_price: "",
      currentStock: "",
      hasDefaultSKU: "",
      showfwModalStatus: false,
      showShareModalStatus: false,
      showBonusModal: false,
      animationData: "",
      showzjModalStatus: false,
      undel: false,
      optionalAttrs: ""
    };
  },

  components: {
    teamList
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    if (options.teamType && options.teamType == 1) {
      that.setData({
        showStartTeamModal: true
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
      entryData: options,
      found_id: options.found_id
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

    this.getAd();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTeamRule();
    this.getGroupInfo();
  },

  /**
   * 用户分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title: that.teamFound.share_title,
      path: '/packageA/groupbuy/groupbuy?pickup_id=' + that.teamFound.pickup_id + '&found_id=' + that.teamFound.found_id,
      imageUrl: that.teamFound.share_img
    };
  },
  methods: {
    //规则的显示隐藏
    showButton(e) {
      var that = this;
      common.formIdUpdate(e);
      this.setData({
        showRules: !that.showRules
      });
    },

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

    //获取拼团详情
    getGroupInfo() {
      var that = this;
      var uri = app.getPath.teamFound;
      var data = {
        found_id: that.found_id
      };
      common.showLoad(this);
      common.ApiGateWayTest(uri, data, true, function (res) {
        var res = res.data;
        that.setData({
          teamMsg: res.result,
          teamFound: res.result.teamFound,
          teamFollow: res.result.teamFollow,
          teamLabel: res.result.teamBuyLimit,
          order_id: res.result.order_id,
          teamFoundStatus: res.result.status,
          team_id: res.result.team_id,
          skuSvipCurrent: res.result.teamFound.price,
          skuCurrent: res.result.teamFound.goods_price,
          buynum: res.result.teamFound.min_buy_amount
        });
        that.getTeamList();
        that.setDefaultSKU(res.result.teamFound);

        if (res.result.teamFound.status == 1 && res.result.order_id == 0 && res.result.teamBuyLimit.follow_limit == 0 && res.result.teamBuyLimit.found_limit > 0) {
          that.setData({
            showInTeamModal: true
          });
        }

        var now = new Date().getTime() / 1000;

        if (res.result.teamFound.found_end_time >= now) {
          that.countTime(now, res.result.teamFound.found_end_time);
        }

        common.hideLoad(that);
      });
    },

    //获取广告图
    getAd: function () {
      var that = this;
      var uri = app.getPath.adlist;
      var data = {
        pid: 8
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

    //获取拼团规则
    getTeamRule() {
      var that = this;
      var uri = app.getPath.teamRule;
      common.ApiGateWayTest(uri, '', true, function (res) {
        that.setData({
          rule: res.data.result.rule
        });
      });
    },

    //倒计时函数
    countTime: function (now, end) {
      var that = this;
      var leftTime = end - now;
      var d, h, m, s;
      var teamTime = setInterval(() => {
        leftTime = leftTime - 1;

        if (leftTime >= 0) {
          d = Math.floor(leftTime / 60 / 60 / 24, 10); //计算剩余的天数

          h = Math.floor(leftTime / 60 / 60 % 24) + d * 24;
          m = Math.floor(leftTime / 60 % 60);
          s = Math.floor(leftTime % 60);
        } else {
          clearInterval(teamTime);
          that.getTeamRule();
          that.getGroupInfo();
          return false;
        }

        h = h > 9 ? h : '0' + h;
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;
        this.setData({
          h,
          m,
          s
        });
      }, 1000);
    },

    //获取拼团列表
    getTeamList() {
      var that = this;
      var url = app.getPath.teamList;
      var data = {
        goods_id: that.teamFound.goods_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          if (res.result.data.length > 2) {
            that.setData({
              teamList: res.result.data.concat(res.result.data),
              team_num: res.result.data.length
            });
          } else {
            that.setData({
              teamList: res.result.data,
              team_num: res.result.data.length
            });
          }
        }
      });
    },

    //查看订单跳转
    showOrder(e) {
      common.formIdUpdate(e);
      var that = this;

      if (app.checkSessionKey) {
        wx.navigateTo({
          url: '../../packageA/user/detail?orderId=' + that.order_id + '&entryType=external'
        });
      } else {
        common.toast('未登录');
      }
    },

    // 返回首页
    gotoHome: function (e) {
      common.formIdUpdate(e);
      wx.switchTab({
        url: '/pages/index/index'
      });
    },

    //重新下单跳转
    payAgain(e) {
      common.formIdUpdate(e);
      var that = this;
      that.setData({
        showInTeamModal: false
      });

      if (that.teamFoundStatus == 1 || that.teamFoundStatus == 2) {
        common.toast('拼团活动已结束');
      } else {
        wx.navigateTo({
          url: '/pages/product/product?entryType=external&productId=' + that.teamFound.goods_id
        });
      }
    },

    //分享工友埋点
    toShare(e) {
      common.formIdUpdate(e);
      setTimeout(() => {
        this.setData({
          showStartTeamModal: false
        });
      }, 2000);
    },

    //一键参团
    toAddTeam(e) {
      var that = this;
      var teamFound = that.teamFound; // 未登录跳转

      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      common.formIdUpdate(e);
      var checkOrderUri = app.getPath.preCheckOrder;
      var orderProduct = [{
        goods_id: teamFound.goods_id,
        sku_key: teamFound.sku_key,
        num: 1
      }];
      orderProduct = JSON.stringify(orderProduct);
      var checkOrderData = {
        order_product: orderProduct,
        team_order: 2,
        team_id: that.team_id,
        found_id: teamFound.found_id,
        time_atitude: app.dataBase.userAtitude
      };
      common.ApiGateWayTest(checkOrderUri, checkOrderData, true, function (resData) {
        if (resData.data.success == 1) {
          // 缓存跳转确认订单页面
          var datas = [{
            goods_name: teamFound.goods_name,
            goods_id: teamFound.goods_id,
            sku_key: teamFound.sku_key,
            amount: 1,
            shop_price: teamFound.price,
            market_price: teamFound.goods_price,
            sku_key_name: teamFound.sku_key_name,
            sku_img: teamFound.sku_img,
            team_order: 2,
            team_id: that.team_id,
            found_id: teamFound.found_id
          }];
          common.setStorage({
            key: "nowPay",
            data: datas
          });
          wx.navigateTo({
            url: '/pages/confirm/confirm'
          });
        } else {
          common.toast(resData.data.msg);
          return;
        }
      });
    },

    // 取消设置弹窗
    settingModalStatus: function () {
      this.setData({
        showSettingModalStatus: false
      });
    },
    // 前往设置
    goSetting: function () {
      var that = this;
      wx.openSetting({
        success(res) {
          if (res.authSetting["scope.userLocation"] == true) {
            that.setData({
              showSettingModalStatus: false
            });
          }
        }

      });
    },
    //设置默认SKU
    setDefaultSKU: function (product) {
      // product 请求到的数据
      var defaultAttrIds = [];
      var defaultAttrStock = null;
      var maybeStock = [];
      var effectiveStock = []; // 得到SKU组合的原始数组

      for (var i = 0; i < product.properties.length; ++i) {
        var property = product.properties[i];

        if (!property.is_multiselect) {
          maybeStock[i] = [];

          for (var j = 0; j < property.attrs.length; j++) {
            maybeStock[i].push(property.attrs[j].id);
          }
        }
      } // 得到多个笛卡尔积组合


      maybeStock = common.multiCartesian(maybeStock);

      if (maybeStock.length && maybeStock[0] instanceof Array) {
        for (var i = 0; i < maybeStock.length; i++) {
          maybeStock[i].sort(function (a, b) {
            return a - b;
          });
        }
      } //验证是否可以购买
      // this.setData({
      //   canPurchase: this.checkCanPurchase()
      // })


      var min_sku_price = 9999999999;
      var min_sku_svip_price = 9999999999;

      for (var i = 0; i < product.stock.length; ++i) {
        var _goods_attr = product.stock[i].key.split('_');

        var _min_sku_price = product.stock[i].market_price,
            _min_sku_svip_price = product.stock[i].price;
        var hasDefaultFlag = false;

        if (min_sku_svip_price > _min_sku_svip_price) {
          var ids = [];

          if (product.is_goods_number > 0 && that.teamFoundStatus == 0 && product.stock[i].is_enough) {
            //商品能购买，并且该sku有库存 则更新最低价
            for (var ind = 0, len = _goods_attr.length; ind < len; ind++) {
              ids.push(parseInt(_goods_attr[ind]));
            }

            defaultAttrIds = ids;
            defaultAttrStock = [{
              attrs: defaultAttrIds,
              stock: product.stock[i]
            }];
            hasDefaultFlag = true;
            min_sku_svip_price = _min_sku_svip_price;
            min_sku_price = _min_sku_price;
          } else if (!product.is_goods_number > 0 || that.teamFoundStatus == 1) {
            //商品不能购买，则一定更新最低价，否则就是9999999999
            for (var ind = 0, len = _goods_attr.length; ind < len; ind++) {
              ids.push(parseInt(_goods_attr[ind]));
            }

            defaultAttrIds = ids;
            defaultAttrStock = [{
              attrs: defaultAttrIds,
              stock: product.stock[i]
            }];
            hasDefaultFlag = true;
            min_sku_svip_price = _min_sku_svip_price;
            min_sku_price = _min_sku_price;
          }
        }

        _goods_attr.sort(function (a, b) {
          return a - b;
        });

        _goods_attr = _goods_attr.join('_');

        for (var j = 0; j < maybeStock.length; j++) {
          var _thisStock = '';

          if (maybeStock[j] instanceof Array) {
            _thisStock = maybeStock[j].join('_');
          } else if (maybeStock[j] instanceof Object) {
            _thisStock = '';
          } else {
            _thisStock = maybeStock[j];
          }

          if (_goods_attr == _thisStock) {
            if (product.stock[i].is_enough == true) {
              effectiveStock.push({
                attrs: maybeStock[j],
                stock: product.stock[i]
              });
            }
          }
        }
      }

      var skuSvipCurrent = this.teamFound.price;
      var skuCurrent = this.teamFound.goods_price;
      this.setData({
        sku_price: min_sku_price,
        min_sku_price: min_sku_price,
        sku_svip_price: min_sku_svip_price,
        min_sku_svip_price: min_sku_svip_price,
        skuSvipCurrent: parseFloat(skuSvipCurrent).toFixed(2),
        skuCurrent: skuCurrent,
        currentStock: defaultAttrStock
      }); //先通过设置默认sku，来设置默认显示价格，设置完之后，把默认sku去掉，不影响原来逻辑

      this.currentAttrs = defaultAttrIds;
      this.setData({
        hasDefaultSKU: this.currentStock ? true : false
      });
      this.set_choosed_sku();
      defaultAttrIds = [];
      defaultAttrStock = null;
      this.setData({
        currentStock: null,
        hasDefaultSKU: false
      });
      this.currentAttrs = [];

      if (effectiveStock.length == 1) {
        defaultAttrIds = effectiveStock[0].attrs instanceof Array ? effectiveStock[0].attrs : [effectiveStock[0].attrs];
        defaultAttrStock = effectiveStock[0].stock;
      }

      if (effectiveStock.length > 1) {
        for (var i in product.properties) {
          var attrs = product.properties[i].attrs;

          for (var j in attrs) {
            var isin_count = 0;

            for (var k in effectiveStock) {
              var isin = new RegExp(attrs[j].id).test(effectiveStock[k].attrs);

              if (isin) {
                isin_count++;
              }
            }

            if (isin_count == effectiveStock.length) {
              defaultAttrIds.push(attrs[j].id);
            }
          }
        }
      }

      this.setData({
        currentStock: defaultAttrStock
      });
      this.currentAttrs = defaultAttrIds;
      this.setData({
        hasDefaultSKU: this.currentStock ? true : false
      });
      this.set_choosed_sku();
    },
    //获取商详信息
    // loadProductDetail: function() {
    //   var that = this;
    //   var uri = app.getPath.goodsInfo;
    //   var data = {
    //     goods_id: that.data.teamFound.goods_id,
    //   }
    //   common.ApiGateWayTest(uri, data, true, function(res) {
    //     if (res.statusCode == 200){
    //       var productlist = res.data.result;
    //       productlist.current_price = productlist.shop_price;
    //       productlist.price = productlist.market_price;
    //       that.setData({
    //         itemData:productlist,
    //         skuSvipCurrent: productlist.shop_price,
    //         buynum: productlist.min_buy_amount,
    //         skuCurrent: productlist.market_price,
    //       })
    //       that.setDefaultSKU(productlist);
    //     }
    //   })
    // },
    // 开团SKU
    delegation: function (e) {
      // 未登录跳转
      var isOldUser = common.getStorageSync('isOldUser');

      if (!app.checkSessionKey || isOldUser == 2) {
        common.goRegister();
        return false;
      }

      if (!this.checkCanPurchase()) return;
      var that = this;

      if (that.itemData.shop_type == 1) {
        that.setzjModalStatus(e);
        return;
      }

      var product = that.teamFound;

      if (that.currentAttrs.length == product.properties.length && product.max_buy_amount < 2 || that.team_sku_type == 1 && that.currentAttrs.length == product.properties.length) {
        // 验证库存
        if (product.stock.length == 0) {
          common.toast('库存不足');
          return false;
        }

        var product_id = '';

        for (var i in product.stock) {
          var stock = product.stock[i].key;
          stock = stock.split('_');
          stock.sort(function (a, b) {
            return a - b;
          });
          stock = stock.join('_');
          var attrs = that.currentAttrs.join('_');

          if (attrs == stock) {
            product_id = product.stock[i].key;
            break;
          }
        }

        var invurl = app.getPath.skuEnough;

        if (product.pre_info && product.pre_info.is_pre == 1) {
          invurl = app.getPath.skuEnough;
        }

        var invdata = {
          goods_id: product.goods_id,
          sku_key: product_id,
          amount: that.buynum
        };
        common.formIdUpdate(e);
        common.showLoad(this);
        common.ApiGateWayTest(invurl, invdata, true, function (ret) {
          if (!ret) return;

          if (ret.data.result.is_enough != 1) {
            common.hideLoad(that);
            common.toast(ret.data.result.msg);
            return;
          } else {
            // showSKUstatus 0关闭  1展开  重置为关闭
            that.setData({
              showModalStatus: false,
              showSKUstatus: 0
            });
            next(e);
          }
        });
      } else {
        if (that.showSKUstatus == 0) {
          that.setModalStatus();
          that.team_sku_type = 1;
          that.setData({
            showfwModalStatus: false,
            showShareModalStatus: false,
            showBonusModal: false
          });
        } else {
          common.toast('请选择商品款式');
        }
      }

      function next() {
        var checkOrderUri = app.getPath.preCheckOrder;
        var orderProduct = [{
          goods_id: that.confirmData[0].goods_id,
          sku_key: that.confirmData[0].sku_key,
          num: that.confirmData[0].amount
        }];
        orderProduct = JSON.stringify(orderProduct);
        var checkOrderData = {
          order_product: orderProduct,
          team_order: that.teamFound.status == 1 && that.order_id == 0 ? 2 : 1,
          team_id: that.team_id,
          time_atitude: app.dataBase.userAtitude
        };
        common.ApiGateWayTest(checkOrderUri, checkOrderData, true, function (resData) {
          common.hideLoad(that);

          if (resData.data.success == 1) {
            that.confirmData[0]['team_order'] = that.teamFound.status == 1 && that.order_id == 0 ? 2 : 1;
            that.confirmData[0]['team_id'] = that.team_id;

            if (that.teamFound.status == 1 && that.order_id == 0) {
              that.confirmData[0]['found_id'] = that.teamFound.found_id;
            } // 立即购买的缓存


            common.setStorage({
              key: "nowPay",
              data: that.confirmData
            });
            wx.navigateTo({
              url: '/pages/confirm/confirm'
            });
          } else {
            common.toast(resData.data.msg);
            return;
          }
        });
      }
    },
    //验证是否可以购买
    checkCanPurchase: function () {
      var product = this.teamFound;
      var required = false;

      if (!product.stock || product.stock.is_enough == 0) {
        common.toast("抱歉，商品已售罄");
        return false;
      }

      if (this.teamFoundStatus == 1) {
        common.toast("抱歉，活动已结束");
        return false;
      }

      if (this.currentAttrs.length >= product.properties.length) {
        for (var i in product.properties) {
          if (!product.properties[i].is_multiselect) {
            required = true;
            break;
          }
        }

        if (required) {
          if (!this.currentAttrs || !this.currentAttrs.length) {
            return false;
          }

          if (!this.currentStock) {
            return false;
          }
        }
      }

      return true;
    },
    // SKU弹窗
    setzjModalStatus: function (e) {
      console.log(e);
      var animation = wx.createAnimation({
        duration: 250,
        timingFunction: "linear",
        delay: 0
      });
      animation.translateY(368).opacity(1).step();
      this.setData({
        animationData: animation.export()
      });
      this.setData({
        showzjModalStatus: true
      });
      setTimeout(function () {
        animation.translateY('-150px').translateX('-50%').step();
        this.setData({
          animationData: animation
        });

        if (e.currentTarget.dataset.status == 0) {
          this.setData({
            showzjModalStatus: false
          });
        }
      }.bind(this), 200);
    },
    setModalStatus: function (type) {
      var that = this;

      if (this.showSKUstatus == 0) {
        this.showSKUstatus = 1;
      } else {
        this.showSKUstatus = 0;
      }

      var animation = wx.createAnimation({
        duration: 250,
        timingFunction: "linear",
        delay: 0
      });
      animation.translateY(368).opacity(1).step();
      this.setData({
        animationData: animation.export()
      });

      if (this.showSKUstatus == 1) {
        this.setData({
          showModalStatus: true
        });
      }

      setTimeout(function () {
        if (that.iphoneXBottom == "68rpx") {
          animation.translateY(-34).step();
        } else {
          animation.translateY(0).step();
        }

        this.setData({
          animationData: animation
        });

        if (this.showSKUstatus == 0) {
          this.setData({
            showModalStatus: false
          });
        }
      }.bind(this), 200);
    },
    // 加减
    changeNum: function (e) {
      var that = this;
      common.formIdUpdate(e);
      var product = that.teamFound;
      var invurl = app.getPath.skuEnough;

      if (product.pre_info && product.pre_info.is_pre == 1) {
        invurl = app.getPath.skuEnough;
      }

      var product_id = '';

      for (var i in product.stock) {
        var stock = product.stock[i].key;
        stock = stock.split('_');
        stock.sort(function (a, b) {
          return a - b;
        });
        stock = stock.join('_');
        var attrs = that.currentAttrs.join('_');

        if (attrs == stock) {
          product_id = product.stock[i].key;
          break;
        }
      }

      if (that.currentAttrs.length == product.properties.length) {
        // alpha-beta 0  减
        if (e.currentTarget.dataset.alphaBeta == 0) {
          if (!that.checkCanPurchase()) return; // Lin start

          if (that.buynum <= that.teamFound.min_buy_amount) {
            common.toast('不能小于最小购买数量');
            return;
          } // Lin end


          if (that.buynum <= 1) {// buynum: 1
          } else if (that.buynum === 2) {
            that.setData({
              buynum: that.buynum - 1,
              undel: true
            });
          } else {
            that.setData({
              buynum: that.buynum - 1
            });
          } // 验证库存


          if (that.buynum != 1) {
            var invdata = {
              goods_id: product.goods_id,
              sku_key: product_id,
              amount: that.buynum
            };
            common.ApiGateWayTest(invurl, invdata, true, function (ret) {
              if (!ret) return;

              if (ret.data.result.is_enough != 1) {
                common.toast(ret.data.result.msg);
                return;
              }
            });
          }
        } else {
          // alpha-beta 1  加      max_buy_amount==0不限制数量
          // Lin start
          if (that.teamFound.max_buy_amount != 0 && that.buynum >= that.teamFound.max_buy_amount) {
            common.toast('不能在多啦~');
            return;
          } // Lin end


          that.setData({
            buynum: that.buynum + 1,
            undel: false
          });

          if (that.buynum > 1) {
            var invdata = {
              goods_id: product.goods_id,
              sku_key: product_id,
              amount: that.buynum
            };
            common.ApiGateWayTest(invurl, invdata, true, function (ret) {
              if (!ret) return;

              if (ret.data.result.is_enough != 1) {
                common.toast(ret.data.result.msg);
                that.setData({
                  buynum: that.buynum - 1
                });
                that.set_choosed_sku();
                return;
              }
            });
          }
        }

        that.confirmData.num = that.buynum;
      } else {
        if (that.showSKUstatus == 0) {
          that.setModalStatus();
        } else {
          common.toast('请选择商品款式');
        }
      }

      that.set_choosed_sku();
    },
    //设置choosed_sku
    set_choosed_sku: function () {
      var that = this;
      var product = that.teamFound;

      if (that.currentAttrs.length < product.properties.length) {
        that.sku_price = that.min_sku_price;
        that.sku_svip_price = that.min_sku_svip_price;
        that.setData({
          choosed_sku: '选择：商品规格',
          skuImages: product.sku_img,
          skuSvipCurrent: that.teamFound.price,
          skuCurrent: that.teamFound.price
        });
        that.setAttrsClass();
        return;
      }

      var choosed_sku = '';
      var sku_price = 0;
      var sku_svip_price = 0;
      var skuSvipCurrent = that.teamFound.price;
      var skuCurrent = that.teamFound.price;
      that.setData({
        choosed_sku: choosed_sku,
        sku_price: sku_price,
        sku_svip_price: sku_svip_price,
        skuSvipCurrent: skuSvipCurrent,
        skuCurrent: skuCurrent
      });

      for (var i in product.properties) {
        var attrs = product.properties[i].attrs;

        for (var j in attrs) {
          for (var k in that.currentAttrs) {
            if (that.currentAttrs[k] == attrs[j].id) {
              choosed_sku += attrs[j].item + ' '; //					sku_price += attrs[j].attr_price;
              //					sku_svip_price += attrs[j].attr_svip_price;
            }
          }
        }
      }

      if (choosed_sku != '') {
        for (var i in product.stock) {
          var stock = product.stock[i].key;
          stock = stock.split('_');
          stock.sort(function (a, b) {
            return a - b;
          });
          stock = stock.join('_');
          var attrs = that.currentAttrs.join('_');

          if (attrs == stock) {
            that.skuImages = product.stock[i].header_img;
            sku_price = product.stock[i].market_price;
            sku_svip_price = product.stock[i].shop_price;
          }
        }

        that.confirmData = [{
          goods_name: product.goods_name,
          goods_id: product.goods_id,
          sku_key: attrs,
          amount: that.buynum,
          shop_price: sku_svip_price,
          market_price: sku_price,
          sku_key_name: "规格:" + choosed_sku,
          sku_img: that.skuImages
        }];
        choosed_sku = '已选：' + choosed_sku;
        var skuSvipCurrent = sku_svip_price;
        var skuCurrent = sku_price;
        that.setData({
          choosed_sku: choosed_sku,
          sku_price: sku_price,
          sku_svip_price: sku_svip_price,
          skuSvipCurrent: skuSvipCurrent,
          skuCurrent: skuCurrent,
          skuImages: that.skuImages
        });
      }

      that.setAttrsClass();
    },
    //SKU选择
    attrValueselest: function (e) {
      var that = this;
      var product = this.teamFound;
      if (!product) return;
      var property = e.currentTarget.dataset.property;
      var attr = e.currentTarget.dataset.attr;

      if (attr.is_multiselect) {
        var attrs = [].concat(this.optionalAttrs);
        var index = attrs.indexOf(attr.id);

        if (-1 == index) {
          attrs.push(attr.id);
        } else {
          attrs.splice(index, 1);
        }

        this.setData({
          optionalAttrs: attrs
        });
      } else {
        var inStock = false;

        for (var i in product.stock) {
          if (product.stock[i].is_enough != true) {
            continue;
          }

          if (product.stock[i].key.indexOf(String(attr.id)) >= 0) {
            inStock = true;
            break;
          }
        }

        if (!inStock) {
          common.toast('库存不足');
          return;
        }

        var stock = null;
        var attrs = [].concat(this.currentAttrs);
        var index = attrs.indexOf(attr.id);

        if (-1 == index) {
          attrs.push(attr.id);
        } else {
          attrs.splice(index, 1);
        }

        for (var i in property.attrs) {
          if (property.attrs[i].id != attr.id) {
            var index = attrs.indexOf(property.attrs[i].id);

            if (-1 != index) {
              attrs.splice(index, 1);
            }
          }
        }

        attrs = attrs.filter(function (attr, index, self) {
          return self.indexOf(attr) === index;
        });
        attrs.sort(function (a, b) {
          return a - b;
        });

        if (attrs.length) {
          var key = attrs.join('_');

          for (var i = 0; i < product.stock.length; ++i) {
            var _goods_attr = product.stock[i].key.split('_');

            _goods_attr.sort(function (a, b) {
              return a - b;
            });

            _goods_attr = _goods_attr.join('_');

            if (_goods_attr == key) {
              stock = product.stock[i];
              break;
            }
          }
        }

        if (stock && stock.is_enough) {
          this.currentStock = stock, this.currentAttrs = attrs, this.setData({
            buynum: product.min_buy_amount
          });
        } else {
          if (attrs.length < product.properties.length) {
            this.currentStock = null, this.currentAttrs = attrs, this.setData({
              buynum: product.min_buy_amount
            });
          } else {
            common.toast('库存不足');
          }
        }

        this.setData({
          canPurchase: this.checkCanPurchase()
        });
      }

      this.set_choosed_sku();
    },
    //设置每一个attr的class
    setAttrsClass: function () {
      var product = this.teamFound;
      var property = product.properties;

      for (var i in property) {
        var attrs = property[i].attrs;

        for (var j in attrs) {
          var attr = attrs[j];

          if (!product) {
            attr.class = 'disable';
            continue;
          }

          if (product.is_goods_number == 0) {
            attr.class = 'disable';
            continue;
          }

          var attrArr = [];

          if (attr.is_multiselect) {
            attr.class = this.optionalAttrs.indexOf(attr.id) == -1 ? '' : 'active';
          } else {
            attr.class = this.currentAttrs.indexOf(attr.id) == -1 ? '' : 'active';
            var inStock = false;

            for (var i in product.stock) {
              if (product.stock[i].is_enough != true) {
                var currentAyyrsJn = this.currentAttrs.join("_");

                if (product.stock[i].key.indexOf(String(currentAyyrsJn)) >= 0 && this.currentAttrs.length > 0) {
                  var stockDisplyKey = product.stock[i].key.split("_");

                  for (var j in stockDisplyKey) {
                    if (stockDisplyKey[j] != this.currentAttrs) {
                      for (var k in product.properties) {
                        for (var s in product.properties[k].attrs) {
                          if (product.properties[k].attrs[s].id == stockDisplyKey[j]) {
                            product.properties[k].attrs[s].class = 'disable';
                          }
                        }
                      }
                    }
                  }
                } else {
                  continue;
                }
              }

              if (product.stock[i].key.indexOf(String(attr.id)) >= 0) {
                inStock = true;
                break;
              }
            }

            if (!inStock) {
              attr.class += 'disable';
            }
          }
        }
      }

      this.setData({
        teamFound: product
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
@import "./groupbuy.css";
</style>