<template>
<view>
<!--pages/confirm/confirm.wxml-->
<view class="container with-tabbar">
  <view class="tip">
    <text class="tip-text">店铺专享送货上门，记得保持电话通畅喔～</text>
  </view>
  <!-- Address -->
  <view class="confirm-address" v-if="consignee && consignee.address_id||storageAddr" @tap="touchAddress">
    <!-- 预留信息 -->
    <view class="confirm-address-wrap">
      <view class="t4 address-detail address-get">

        <image class="icon-img" :src="iconURL + '/btn_smallAddr@2x01.png'"></image>
        提货地址:
        <view class="arrow">
          <text class="pick-address ellipsis" v-if="consignee.address">{{consignee.address}}</text>
          <text class="pick-address ellipsis" v-else>{{consignee.cityName}}</text>
          <view>
            <view class="right-arrow iconfont icon-btn_xiangyoudajiantoux"></view>
          </view>
        </view>

      </view>
      <view class="t4 address-detail pickuper">
        <image class="icon-img" :src="iconURL + '/btn_lxr@2x01.png'"></image>提货人信息</view>
      <view class="address-detail">
        <text class="leftName">姓名：</text>
        <view class="addr_input_box">
          <input type="text" placeholder-class="placeholder-color" class="addr_input" placeholder="请填写姓名" data-keyName="consignee" @input="editInput" @click.stop="unLoad" :value="consignee.consignee"></input>
        </view>
      </view>
      <view class="address-detail mt-32">
        <text class="leftName">手机：</text>
        <view class="addr_input_box">
          <input type="number" placeholder-class="placeholder-color" class="addr_input" placeholder="请填写手机号" data-keyName="mobile" @input="editInput" @click.stop="unLoad" :value="consignee.mobile"></input>
        </view>
      </view>
      <view v-if="has_shop==1">
        <view :class="'flash-input  ' + (address_tag.length==0?'mt-24':'')" @click.stop="showChooseTag?'changeChooseTag':''">
          <view class="address-detail padding-none address_tag">
            <view :class="'iconfont icon-shansongdizhix flash-icon ' + (address_tag.length==0?'top':'') + ' ' + (showChooseTag?'':'icon-top')"></view>
              <text class="flash-font">闪送地址：</text>
            <view v-if="address_tag.length==0" class="addr_input_box">
              <input type="text" placeholder-class="placeholder-color" class="addr_input" placeholder="请填写详细宿舍地址" data-keyName="address_extra" @input="editInput" @click.stop="unLoad" :value="consignee.address_extra"></input>
            </view>
            <view v-if="address_tag&&address_tag.length>0&&!showChooseTag" v-for="(item, index) in address_tag" :key="index" :class="'ad_tag ' + (index==tag_num?'tag_active':'') + ' ' + (index==0?'ml-16':'') + ' ' + ((index+1)%5==0?'ml-20':'')" @click.stop="change_tag" :data-tagnum="index" :data-label_id="item.pick_up_label_id" :data-label_name="item.name">
              {{item.name}}
            </view>
          </view>
          <view v-if="showChooseTag">
            <view class="address-tag-text">
              已选{{label_name}}
            </view>
            <view class="right-arrow-time-address iconfont icon-btn_xiangyoudajiantoux"></view>
          </view>

        </view>
        <view :class="'flash-input pt-24 ' + (showChooseTag?'pt-32':'')" v-if="address_tag&&address_tag.length>0">
          <view class="address-detail padding-none address_tag">
            <text class="flash-font">详细地址：</text>
            <view class="addr_input_box">
              <input type="text" placeholder-class="placeholder-color" class="addr_input" placeholder="请填写详细宿舍地址" data-keyName="address_extra" @input="editInput" @click.stop="unLoad" :value="consignee.address_extra"></input>
            </view>
          </view>
        </view>
      </view>


      <view class="flash-tips">
        请填写准确宿舍地址信息[如:3楼2层201]方便配送人员进行配送
      </view>
    </view>

  </view>
  <view class="confirm-address" v-else @tap="newAddress">
    <view class="address-create danger">请点击填写地址</view>
    <view class="iconfont icon-btn_xiangyoudajiantoux address-arrow"></view>
    <!-- <view class='iconfont icon-img_dizhix '></view> -->
    <!-- <image class="address-arrow" src="{{iconURL}}/icon_right_arrow.png"></image> -->
  </view>
  <!--预约时间-->
  <view class="confirm-form no-margin mb-20" @tap="selectedGoods.is_in_shipping_time==0?'showWindow':''">
    <view class="form-item_nums row">
      <view class="item-title col-25 t4">送达时间:</view>
      <view class="item-price col-75  font-face-ios_Avenir t6" v-if="selectedGoods.is_in_shipping_time==1">
        尽快送达
      </view>
      <view class="order-time-little" v-if="selectedGoods.is_in_shipping_time==0">
        {{orderTimeText.shopping_time_text}}
      </view>
      <view class="right-arrow-time iconfont icon-btn_xiangyoudajiantoux" v-if="selectedGoods.is_in_shipping_time==0"></view>
    </view>
  </view>
  <!-- 订单明细 -->
  <!-- <view class="confirm-form no-margin mb-20" wx:if="{{selectedGoods}}">
    <view class="form-item_nums row">
      <view class="item-title col-25 t4">订单明细</view>
      <view class="item-price col-75  font-face-ios_Avenir t6">
        该订单将由工作人员配送至闪送地址
      </view>
    </view>
  </view> -->

  <!-- Goods -->
  <view class="good_list" style="background:#fff">
    <view class="goods-title">
      <view class="flash-shop">
        闪送
      </view>
      <view class="shop-text">
        仅限厂内送货上门
      </view>
    </view>
    <view class="order-main" v-if="order_info">

      <view class="goods-item" v-for="(productInfo, index) in order_info" :key="index">
        <view class="item-photo">
          <image :src="productInfo.list_img"></image>
          <view class="inequacy" v-if="productInfo.is_enough==0">
            <image :src="iconURL + '/inequacy02.png'"></image>
          </view>

        </view>
        <view class="item-info">
          <view class="info-name">{{productInfo.goods_name}}</view>
          <view class="info-attr">{{productInfo.sku_key_name}}</view>
          <view class="info-price font-face-ios_Avenir">
            <i class="icon_rmb">¥</i>{{productInfo.shop_price}}
          </view>
          <view class="info-amount">x{{productInfo.amount}}</view>
        </view>
      </view>
    </view>
  </view>

  <!-- Total -->
  <view class="confirm-form no-margin" v-if="selectedGoods">
    <view class="form-item_nums row">
      <view class="item-title col-25 font-55">商品合计</view>
      <view class="item-price col-75 red-font-color font-face-ios_Avenir">
        <i class="icon_rmb">¥</i>{{selectedGoods.product_price || '0.00'}}
      </view>
    </view>
    <view class="form-item_nums row" :hidden="selectedGoods.dis_price=='0.00'">
      <view class="item-title col-25">活动优惠金额</view>
      <view class="item-price col-75 red-font-color font-face-ios_Avenir">
        <i class="icon_rmb">-¥</i>{{selectedGoods.dis_price}}
      </view>
    </view>
    <view class="form-item_nums row" :hidden="selectedGoods.coupon_fee=='0.00'">
      <view class="item-title col-25">红包金额</view>
      <view class="item-price col-75 red-font-color font-face-ios_Avenir">
        <i class="icon_rmb">-¥</i>{{selectedGoods.coupon_fee}}
      </view>
    </view>
  </view>

  <!--unred-->
  <view class="confirm-form">
    <view class="form-item" v-if="cashgift" @tap="setModalBonus">
      <view class="row border-b">
        <view class="item-title gift-border col">选择红包
          <span v-if="selectedGoods.coupons_can_use && selectedGoods.coupons_can_use > 0" class="item-cashgift-count">
            （{{selectedGoods.coupons_can_use}}个可用）
          </span>
        </view>
        <view class="item-value col" v-if="cashgift">{{cashgift ? cashgift.name : '暂无可用红包'}}</view>
        <view class="item-arrow iconfont icon-btn_xiangyoudajiantoux"></view>
      </view>
    </view>
    <view class="coupos-msg">
      <view class="activity-coupon mb-30" v-if="selectedGoods.dis_price != 0">
        <text>活动优惠金额</text>

        <span>¥{{selectedGoods.dis_price}}</span>
      </view>
      <view class="activity-coupon">
        <text>配送费</text>
        <span>¥{{selectedGoods.shipping_info.fee}}</span>
      </view>
    </view>
  </view>
  <view class="remark">
    <view class="remark-font">
      备注
    </view>
    <textarea v-if="!order_confirm_show&&!showBonusModal&&!timeOrderCheck" class="to-remark" placeholder="请输入其他需要顺带的商品，或者其他建议" placeholder-class="pfont" @input="getMessage" :value="message">

    </textarea>
    <view v-if="order_confirm_show||showBonusModal||timeOrderCheck" :class="'to-remark ' + (message==''?'pfont':'')">
      {{message==""?"请输入其他需要顺带的商品，或者其他建议":message}}
    </view>
  </view>

  <cover-view class="confirm-submit confirm-submit-active" :style="'padding-bottom:' + iphoneXBottom" v-if="!showOrderWindow">
    <cover-view class="submit-total">
      <cover-view class="total-price font-face-ios_Avenir row">
        <cover-view class="des">实付：</cover-view>
        <cover-view class="price font-face-ios_Arial topay-money">
          <cover-view class="i">¥</cover-view>{{selectedGoods.total_price || '0.00'}}</cover-view>
      </cover-view>
      <cover-view class="total-yunfei font-face-ios_Avenir" v-if="selectedGoods.shipping_info.value != ''">
        {{selectedGoods.shipping_info.value}}
      </cover-view>
      <!-- <view class="total-yunfei font-face-ios_Avenir" wx:if='{{selectedGoods.shipping_info.value != "包含特殊商品免运费"}}'>
        含运费：
        <i class="font-face-ios_Arial">¥</i>{{selectedGoods.shipping_info.value}}
      </view> -->
    </cover-view>

    <button class="toPay" @tap="showConfirm">立即支付</button>
  </cover-view>
  <!-- 订单确认弹窗 -->
  <view class="drawer_screen" v-if="order_confirm_show"></view>
  <view class="order_confirm_wrap" v-if="order_confirm_show">
    <view class="t4 address-detail row">
      <image class="icon-img" :src="iconURL + '/btn_smallAddr@2x01.png'"></image>
      <text>闪送地址（此商品将配送至闪送地址）</text>
    </view>
    <view class="confirm-address-wrap bb">
      <view class="address-detail padding-left">
        <text>{{consignee.cityName}} {{consignee.address}}</text>
        <text v-if="address_tag.length>0">{{label_name}}</text>
        <text class="address-detail-item">  {{consignee.address_extra}}</text>
      </view>
      <view class="padding-left order-time-text" v-if="selectedGoods.is_in_shipping_time==0">
        预约时间：{{orderTimeText.shopping_time_text}}
      </view>
    </view>

    <view class="address-detail row mt-12">
      <image class="icon-img" :src="iconURL + '/btn_smallPrice@2x01.png'"></image>
      <text class="leftName t4">商品金额：</text>
      <text>¥{{selectedGoods.total_price || '0.00'}}</text>
      <text class="feel">含配送费:¥{{selectedGoods.shipping_info.fee}}</text>
    </view>
    <view class="msg mt-24">（仅限厂内送货上门）</view>
    <view class="btn-wrap">
      <form class="btn " @submit="hideConfirm" report-submit="true">
        <button class="base-font-color" formType="submit">取消支付</button>
      </form>
      <form class="btn " @submit="touchSubmit" report-submit="true">
        <button class="base-font-color" style="color:#e71f19!important" formType="submit" :disabled="!canPurchase">确认支付</button>
      </form>
      <!-- <view class='btn base-font-color'>确认支付</view> -->
    </view>
  </view>

  <!-- 弹窗 -->
  <view class="drawer_screen" @tap="setModalBonus" v-if="showBonusModal"></view>
  <view :animation="animationData" style="opacity:0" class="modal-inner" v-if="showBonusModal">
    <view class="modal-inner-header modal-coupon-title">选择红包</view>

    <scroll-view class="modal-inner-main" scroll-y="true">
      <view class="modal-inner-block modal-coupon-box">
        <view class="box_list row" :style="'background-image:url(' + iconURL + '/coupon_orange01.png)'" v-for="(bonus, index) in cashgifts" :key="index" v-if="cashgifts.length>0">
          <!-- 左侧面额 -->
          <view class="coupon_val color-coupon" v-if="bonus.coupon_type==1">
            <text class="text">{{bonus.value}}</text>
            <text class="icon">折</text>
          </view>
          <view class="coupon_val  color-coupon" v-else>
            <text class="icon">¥</text>
            <text class="text">{{bonus.value}}</text>
          </view>
          <!-- 红包信息 -->
          <view class="coupon_info color_gray_dark col-50">
            <view class="list_title">{{bonus.name}}</view>
            <view class="dom-attr">{{bonus.description}}</view>
            <view class="list_time">{{bonus.use_end_date}}</view>
          </view>
          <!-- 右侧领取部位 -->
          <form class="get_coupon_btn col-30">
            <button class="getCoupon" style="background-color:#ffe150" @tap="touchCashgift" :data-id="bonus.id">
              <span class="get_coupon">去使用</span>
            </button>
          </form>
        </view>
        <view class="no_coupon" v-if="cashgifts.length==0">
          <image :src="iconURL + '/img_coupon_empty02.png'"></image>
          <text class="none_font">暂无红包</text>
        </view>
      </view>
    </scroll-view>
    <view class="noUserBtn">
      <button style class="noUsecoupon" data-id="-1" @tap="touchCashgift">不使用红包</button>
    </view>
  </view>

  <!-- 预约下单弹窗 -->
  <view class="drawer_screen" v-if="showOrderWindow" catchtouchmove="stopMove"></view>
  <view class="order_window" v-if="showOrderWindow" catchtouchmove="stopMove">
    <view class="window-header">
      <view class="window-header-box">
        <view class="i">
          选择预约配送时间
        </view>
        <view class="s" v-for="(item, index) in title_text" :key="index">
          {{item}}
        </view>
      </view>
    </view>
    <scroll-view class="time-list" scroll-y="true">
      <view :class="'order_time ' + (orderTimeId==item.shop_shipping_time_id?'order_active':'')" v-for="(item, index) in selectedGoods.shipping_time" :key="index" :data-item="item" @tap="changeOrderTime">
        {{item.shopping_time_text}}
      </view>
    </scroll-view>
    <view class="window-bottom" @tap="hideWindow">
      确定
    </view>
  </view>
</view>
<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
var app = getApp().globalData;
var common = require("../../utils/common.js");

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      showDialog: false,
      order_confirm_show: false,
      selectedGoods: {},
      // 闪送地址
      consignee: {
        consignee: ""
      },
      isTopaydis: false,
      //商品信息
      productInfo: {},
      // 后台筛选返回后商品信息
      order_info: {},
      orderSn: "",
      //发票信息
      invoiceData: {},
      //地址
      cashgift: {},
      address_extra: '',
      //去支付默认
      canPurchase: false,
      // 优惠券展示
      showBonusModal: false,
      tip_show: {
        tip1: true,
        tip2: true
      },
      // 是否从缓存里读取地址
      storageAddr: false,
      // 是否需要修改地址
      isEditAddr: false,
      message: '',
      iphoneXBottom: '0rpx',
      shop_id: 0,
      address_tag: [],
      tag_num: -1,
      label_id: 0,
      label_name: "",
      has_shop: '',
      showOrderWindow: false,
      orderTimeId: 0,
      orderTimeText: {},
      title_text: [],
      timeOrderCheck: true,
      checkShowOrder: false,
      showChooseTag: false,
      checkChoose: false,
      coupon_id: "",
      cashgifts: "",
      animationData: "",
      user_note: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;
    that.shop_id = options.shop_id;
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
    this.checkUser();
    // app.aldstat.sendEvent("进入闪购确认订单");
  },
  onShow: function () {
    var that = this;
    this.tag_num = -1;
    this.label_id = 0;
    Promise.all([that.getaddresslist(), that.getOrderCouponList()]).then(function (val) {
      that.getcheckOrderinfo();
    });
  },
  methods: {
    // 判断用户是否为黑名单
    checkUser: function () {
      var that = this;
      var uri = app.getPath.checkUser;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res.data.success == 1) {
          return;
        } else {
          wx.showModal({
            title: '用户禁用下单提示',
            content: res.data.msg,
            confirmText: '确定',
            confirmColor: '#eb3c39',
            showCancel: false,
            cancelColor: '#030303',

            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              }
            }

          });
        }
      });
    },
    // 提示显示隐藏
    isShow: function (e) {
      var name = e.currentTarget.dataset.name;
      var tip_show = this.tip_show;
      tip_show[name] = false;
      this.setData({
        tip_show
      });
    },
    // 获取地理位置
    getaddresslist: function () {
      var that = this;
      var addressUri = app.getPath.getaddresslist;
      var addressData = {
        is_default: '1' // 地理位置请求

      };
      return new Promise(function (resolve, reject) {
        common.ApiGateWayTest(addressUri, addressData, true, function (res) {
          if (res.statusCode == 200) {
            var res = res.data.result.consignees;

            if (that.consignee && that.consignee.address_id) {
              that.setData({
                consignee: that.consignee,
                storageAddr: false
              });
              that.getAddressTag();
            } else {
              if (res.length > 0) {
                that.setData({
                  consignee: res[0],
                  storageAddr: false
                });
                that.getAddressTag();
              } else {
                // 无地址时，取缓存自提点地址
                common.getStorage({
                  key: 'getpickup'
                }, function (res) {
                  if (res.data.pickup_id && res.data.pickup_id > 0) {
                    that.setData({
                      consignee: res.data,
                      storageAddr: true
                    });
                    that.getAddressTag();
                  }
                });
                resolve('无地址');
                return;
              }
            }

            resolve('getAddress success');
          }
        });
      });
    },
    // 新增收货地址
    addAddress: function (callback) {
      var that = this;
      var reg = /^[0-9]{11}$/;

      if (that.consignee.consignee == undefined || that.consignee.consignee == '') {
        common.toast('请输入提货人姓名');
        return;
      }

      if (!reg.test(this.consignee.mobile)) {
        common.toast('请输入正确的手机号');
        return;
      }

      ;

      if (this.consignee.address_extra == "" && that.has_shop == 1) {
        common.toast('请输入闪送地址');
        return;
      }

      ;

      if (that.address_tag.length > 0 && that.has_shop == 1) {
        if (that.label_id == 0) {
          common.toast('请选择闪送地址');
          return;
        }

        ;
      }

      var uri = app.getPath.addaddress;
      var data = {
        consignee: that.consignee.consignee,
        mobile: that.consignee.mobile,
        pickup_id: that.consignee.pickup_id,
        address_extra: that.consignee.address_extra,
        is_default: 1,
        pick_up_label_id: that.label_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res && res.data.success == 1) {
          var res = res.data.result;
          that.setData({
            consignee: res.consignees
          });
          callback && typeof callback === "function" && callback();
        }
      });
    },
    // 修改收货地址
    editAddress: function (callback) {
      var that = this;
      var reg = /^[0-9]{11}$/;

      if (that.consignee.consignee == undefined || that.consignee.consignee == '') {
        common.toast('请输入提货人姓名');
        return;
      }

      if (!reg.test(this.consignee.mobile)) {
        common.toast('请输入正确的手机号');
        return;
      }

      ;

      if (this.consignee.address_extra == "" && that.has_shop == 1) {
        common.toast('请输入闪送地址');
        return;
      }

      ;

      if (that.address_tag.length > 0 && that.has_shop == 1) {
        if (that.label_id == 0) {
          common.toast('请选择闪送地址');
          return;
        }

        ;
      }

      that.isEditAddr = false;
      var uri = app.getPath.alteraddress;
      var data = {
        consignee: that.consignee.consignee,
        mobile: that.consignee.mobile,
        address_id: that.consignee.address_id,
        pickup_id: that.consignee.pickup_id,
        address_extra: that.consignee.address_extra,
        is_default: that.consignee.is_default,
        pick_up_label_id: that.label_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res && res.data.success == 1) {
          var res = res.data.result;
          that.getAddressTag();
          callback && typeof callback === "function" && callback();
        }
      });
    },
    // 输入框双向绑定
    editInput: function (e) {
      var keyName = e.target.dataset.keyname;
      var val = e.detail.value;
      var consignee = this.consignee;
      consignee[keyName] = val;
      this.isEditAddr = true;
      this.setData({
        consignee
      });
    },
    // 获取信息接口
    getcheckOrderinfo: function () {
      var that = this; // 当前仓库

      var city = common.getStorageSync('city');
      var uri = app.getPath.shopCheckOrderInfo;

      if (that.coupon_id == undefined) {
        that.coupon_id = 0; // that.data.coupon_id = that.data.cashgift.id;
      }

      if (that.selectedGoods.use_balance == undefined) {
        that.selectedGoods.use_balance = 0;
      }

      if (that.consignee.address_id == undefined) {
        that.consignee.address_id = 0;
      } // 确认订单接口提交数据


      var data = {
        coupon_id: that.coupon_id,
        address_id: that.consignee.address_id,
        use_balance: that.selectedGoods.use_balance,
        shop_id: that.shop_id
      }; // 获取确认订单信息

      return new Promise(function (resolve, reject) {
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.statusCode == 200) {
            var res = res.data.result;
            that.setData({
              selectedGoods: res,
              cashgift: res.coupon_info,
              coupon_id: res.coupon_info.id,
              order_info: res.order_info
            });

            if (res.is_in_shipping_time === 0) {
              if (!that.checkShowOrder) {
                var time = common.getStorageSync('tackoutOrderTime');
                var timeFilter = res.shipping_time.filter(item => {
                  return item.shopping_time_text == time.shopping_time_text;
                });

                if (timeFilter.length > 0) {
                  that.setData({
                    showOrderWindow: true,
                    orderTimeId: timeFilter[0].shop_shipping_time_id,
                    orderTimeText: timeFilter[0],
                    title_text: res.is_in_shipping_time_text.split('，')
                  });
                } else {
                  common.setStorageSync('tackoutOrderTime', res.shipping_time[0]);
                  that.setData({
                    showOrderWindow: true,
                    orderTimeId: res.shipping_time[0].shop_shipping_time_id,
                    orderTimeText: res.shipping_time[0],
                    title_text: res.is_in_shipping_time_text.split('，')
                  });
                }

                that.checkShowOrder = true;
              }
            } // if (res.is_in_shipping_time == 0){
            //   common.showRidoModal(res.is_in_shipping_time_text,'确定',function(res){
            //     return;
            //   })
            // }

          }

          var btn = true;
          var order_info = that.order_info; // that.data.consignee && that.data.consignee.address_id

          if (btn) {
            that.setData({
              canPurchase: true
            });
          } else {
            that.setData({
              canPurchase: false
            });
            wx.showModal({
              content: '商品被抢光咯，小提正在补货中喔~',
              showCancel: false,
              confirmText: '取消',
              confirmColor: '#575757'
            });
          }

          resolve('getcheckOrderinfo success');
        });
      });
    },
    // 地址选择
    touchAddress: function () {
      var that = this;
      wx.navigateTo({
        url: '/pages/address/addressList/addressList?from=flashConfirm'
      });
    },
    // 新增地址
    newAddress: function () {
      var that = this;
      wx.navigateTo({
        url: '/pages/address/address'
      });
    },
    // 优惠券选择
    touchCashgift: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;

      if (that.coupon_id == id) {
        that.setModalBonus();
        return false;
      } else {
        that.coupon_id = id;
        that.getcheckOrderinfo();
      }

      that.setModalBonus();
    },
    // 优惠券列表信息
    getOrderCouponList: function () {
      var that = this;
      var uri = app.getPath.shopOrderCouponList;
      var data = {
        shop_id: that.shop_id
      };
      return new Promise(function (resolve, reject) {
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.data.errorCode != 1) {
            var res = res.data.result;
            that.setData({
              cashgifts: res.lists
            });
            resolve('getOrderCouponList');
          } else {
            common.toast(res.data.msg);
          }
        });
      });
    },
    //发票
    // touchInvoice: function () {
    //   var newData;
    //   if (this.data.invoiceData) {
    //     newData = JSON.stringify(this.data.invoiceData)
    //   } else {
    //     newData = undefined;
    //   }
    //   wx.navigateTo({
    //     url: './invoice/invoice?invoiceData=' + newData
    //   })
    // },
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
    // 领券弹窗
    setModalBonus: function () {
      if (this.showBonusModal == 0) {
        this.showBonusModal = 1;
      } else {
        this.showBonusModal = 0;
      }

      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: "linear",
        delay: 0
      });
      animation.translateY(300).opacity(1).step();
      this.setData({
        animationData: animation.export()
      });

      if (this.showBonusModal == 1) {
        this.setData({
          showBonusModal: true
        });
      }

      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation
        });

        if (this.showBonusModal == 0) {
          this.setData({
            showBonusModal: false
          });
        }
      }.bind(this), 200);
    },
    refreshOrderPrice: function () {},
    // 留言
    refreshComment: function (event) {
      var value = event.detail.value;
      this.setData({
        user_note: value
      });
    },
    // 显示支付弹窗
    showConfirm: function (e) {
      var that = this;
      common.getStorage({
        key: 'getpickup'
      }, function (res) {
        if (res.data.pickup_id && res.data.pickup_id > 0) {
          var reg = /^[0-9]{11}$/;

          if (that.consignee.consignee == undefined || that.consignee.consignee == '') {
            common.toast('请输入提货人姓名');
            return;
          }

          if (!reg.test(that.consignee.mobile)) {
            common.toast('请输入正确的手机号');
            return;
          }

          ;

          if (that.consignee.address_extra == '' && that.has_shop == 1) {
            common.toast('请输入闪送地址');
            return;
          }

          ;

          if (that.address_tag.length > 0 && that.has_shop == 1) {
            if (that.label_id == 0) {
              common.toast('请选择闪送地址');
              return;
            }

            ;
          }

          that.beforeSubmit();
        } else {
          that.touchSubmit(e);
        }
      });
    },
    // 隐藏支付弹窗
    hideConfirm: function (e) {
      common.formIdUpdate(e);
      this.setData({
        order_confirm_show: false
      });
    },

    //阻止冒泡事件
    unLoad() {},

    // 支付前地址分析
    beforeSubmit: function (e) {
      // 没收货地址，从缓存取到地址
      var that = this;

      if (this.storageAddr) {
        that.setData({
          order_confirm_show: true
        });
        that.addAddress(function () {
          that.getaddresslist();
        });
      } else {
        if (this.isEditAddr == true) {
          that.editAddress(function () {
            that.setData({
              order_confirm_show: true
            });
          });
        } else {
          that.setData({
            order_confirm_show: true
          });
        }
      }
    },

    //获取留言信息
    getMessage(e) {
      this.message = e.detail.value;
      this.setData({
        message: e.detail.value
      });
    },

    // 去支付
    touchSubmit: function (e) {
      var that = this;
      var productInfo = that.productInfo;
      var uri = app.getPath.shopConfirmOrder;

      if (that.consignee && !that.consignee.address_id) {
        var content = '您还未设置收货地址';
        var confimText = '去设置';
        common.showModal(content, confimText, function (res) {
          if (res.confirm) {
            that.newAddress();
          } else {
            return;
          }
        });
      } else {
        common.showLoad(that);

        if (that.selectedGoods.coupons_can_use == 0) {
          that.coupon_id = -1;
        }

        var shop_shipping_time_id = 0;

        if (that.selectedGoods.is_in_shipping_time === 0) {
          shop_shipping_time_id = that.orderTimeText.shop_shipping_time_id;
        }

        var data = {
          coupon_id: that.coupon_id,
          address_id: that.consignee.address_id,
          shop_id: that.shop_id,
          payment_code: that.selectedGoods.payment_code[0],
          user_note: that.message,
          use_balance: that.selectedGoods.use_balance,
          time_atitude: app.dataBase.userAtitude,
          shop_shipping_time_id: shop_shipping_time_id
        };
        common.formIdUpdate(e);
        common.ApiGateWayTest(uri, data, true, function (res) {
          var res = res.data;

          if (data.shop_id && data.shop_id.length > 0 && res.success == 1) {
            var payUri = app.getPath.doPay;
            var payData = {
              order_type: 2,
              order_id: res.result.order_id,
              payment_code: that.selectedGoods.payment_code[0]
            };
            common.hideLoad(that);

            if (res.result.status == 1) {
              // 实付为0，不走支付接口
              wx.redirectTo({
                url: './order-detail?order_id=' + payData.order_id + '&entryType=external'
              });
            } else {
              // 调用支付
              common.ApiGateWayTest(payUri, payData, true, function (res) {
                if (res.data.success == 1) {
                  var data = res.data.result;
                  common.doWechatPay(data, function (res) {
                    common.hideLoad(that);
                    that.checkPay(payData.order_id).then(res => {
                      wx.showToast({
                        title: '支付成功',
                        duration: 2000
                      });
                      wx.redirectTo({
                        url: './order-detail?order_id=' + payData.order_id + '&entryType=external'
                      });
                    });
                  }, function (failres) {
                    common.hideLoad(that);
                    that.checkPay(payData.order_id).then(res => {
                      wx.showToast({
                        title: '支付失败',
                        icon: 'cancel',
                        duration: 2000
                      });
                      wx.redirectTo({
                        url: './order-detail?order_id=' + payData.order_id + '&entryType=external'
                      });
                    });
                  }, function (completeres) {
                    common.hideLoad(that);
                  });
                } else {
                  common.hideLoad(that);
                  common.toast(res.data.msg);
                  return;
                }
              });
            }
          } else {
            common.hideLoad(that);
            common.toast(res.msg);
            return;
          }
        });
      }
    },
    // 支付确认是否回调
    checkPay: function (orderId) {
      var that = this;
      var uri = app.getPath.checkPay;
      var data = {
        order_id: orderId,
        order_type: 2
      };
      return new Promise((resolve, reject) => {
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.data.success == 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },

    // 获取提货点楼号标签
    getAddressTag() {
      var that = this;
      var url = app.getPath.pickupLabel;
      var data = {
        pickup_id: this.consignee.pickup_id,
        address_id: this.consignee.address_id
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        var res = res.data;

        if (res.success == 1) {
          res.result.list.forEach((val, index) => {
            if (val.is_selected == 1) {
              that.tag_num = index;
              that.label_id = val.pick_up_label_id;
              that.label_name = val.name;

              if (!that.checkChoose) {
                that.showChooseTag = true;
                that.checkChoose = true;
              }
            }
          });
          that.setData({
            address_tag: res.result.list,
            tag_num: that.tag_num,
            label_name: that.label_name,
            has_shop: res.result.has_shop,
            showChooseTag: that.showChooseTag
          });
        }
      });
    },

    // 选择标签
    changeChooseTag() {
      this.setData({
        showChooseTag: false
      });
    },

    // 切换标签
    change_tag(e) {
      this.label_id = e.currentTarget.dataset.label_id;
      this.label_name = e.currentTarget.dataset.label_name;
      this.isEditAddr = true;
      this.setData({
        tag_num: e.currentTarget.dataset.tagnum
      });
    },

    //  隐藏弹窗
    hideWindow() {
      var that = this;
      that.setData({
        showOrderWindow: false,
        timeOrderCheck: false
      });
    },

    showWindow() {
      var that = this;
      that.setData({
        showOrderWindow: true,
        timeOrderCheck: true
      });
    },

    //  选择时间
    changeOrderTime(e) {
      let num = e.currentTarget.dataset.num;
      let item = e.currentTarget.dataset.item;
      common.setStorageSync('tackoutOrderTime', item);
      this.setData({
        orderTimeId: item.shop_shipping_time_id,
        orderTimeText: item
      });
    },

    // 阻止父级冒泡
    stopMove() {
      return true;
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
@import "./check-takeout-order.css";
</style>