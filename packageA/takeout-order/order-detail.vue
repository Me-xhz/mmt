<template>
<view>
<!--pages/order/detail.wxml-->
<!-- 订单状态 -->
<view class="container detail-loader">
  <!-- 返回首页悬浮框/分享进入显示 -->
  <view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
    <image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
    <text>返回首页</text>
  </view>

  <view class="order-info status-header">
    <view class="info-price">
      <text class="header-status">{{order.status_desc}}</text>
    </view>
    <view class="info-online">
      <!--待支付-->
      <view class="iconfont icon-img_dengdaimaijiazhifux" v-if="order.status==1"></view>
      <!--已支付-->
      <view class="iconfont icon-img_dengdaijiedanx" v-if="order.status==2"></view>
      <!--商家已接单，配货中-->
      <view class="iconfont icon-img_peihuozhongx" v-if="order.status==3"></view>
      <!--配货完成 等待配送-->
      <view class="iconfont icon-img_dengdaishangpinpeisongx1" v-if="order.status==4"></view>
      <!--配送中-->
      <view class="iconfont icon-img_dengdaishangpinpeisongx" v-if="order.status==5"></view>
      <!--取货成功-->
      <view class="iconfont icon-img_img_quhuochenggongx" v-if="order.status==7"></view>
      <!--已退款-->
      <view class="iconfont icon-img_tuikuanchenggongx" v-if="order.status==8"></view>
      <!-- 订单已拒绝，已退款 -->
      <view class="iconfont icon-img_tuikuanchenggongx" v-if="order.status==9"></view>
      <image class="group-bag" v-if="order.status == 12" :src="iconURL + '/group-bagicon.png'"></image>
    </view>
  </view>
  <!-- 收货信息 -->
  <view class="order-address ">
    <view class="address-contact">
      <span class="info-leftshift">{{order.consignee.name}} {{order.consignee.mobile}}</span>
    </view>
    <view class="address-detail ellipsis">
      <span class="info-leftshift ">{{order.consignee.address}} {{order.consignee.address_extra}}</span>
    </view>
     <view class="summury-detail order_time" v-if="order.shop_shipping_time!=''">
      预约时间 {{order.shop_shipping_time}}
    </view>
    <view class="address-detail" v-if="(order.consignee.pickup_contact||order.consignee.pickup_phone)">
      <span class="info-leftshift t2">便利店店主：</span>
      <span class="info-leftshift t2">{{order.consignee.pickup_contact}} {{order.consignee.pickup_phone}}</span>
    </view>
    <view class="storeManager" v-if="(order.consignee.pickup_contact||order.consignee.pickup_phone)" @click.stop="callManager" :data-tel="order.consignee.pickup_phone">
      <image class="tel_icon" :src="iconURL + '/phone_blue.png'"></image>
      <text>联系店主</text>
    </view>
    <view class="address-tab iconfont icon-btn_dizhix ">
    </view>
  </view>
  <!-- 商品信息 -->
  <view class="order-list">
    <view class="list-item">
      <view class="order-main pt-24">
        <view class="pd-24">
          <view class="goods-title">
            <view class="flash-shop">
              闪送
            </view>
            <view class="shop-text" v-if="order.back_reason==''||order.status==9">
              请保持手机通畅
            </view>
            <view class="back-reason" v-else>
              {{order.back_reason}}
            </view>
          </view>
          <view class="goods-item" @tap="goprodcut" :data-product-id="goods.goods_id" v-for="(goods, index) in order.products" :key="index">
            <view class="item-photo">
              <image :src="goods.header_img"></image>
            </view>
            <view class="item-info">
              <view class="info-name">
                <text>{{goods.goods_name}}</text>
              </view>
              <view class="info-price">
                <i class="icon-rmb">¥</i>{{goods.shop_price}}
              </view>
              <view class="info-amount">x{{goods.amount}}</view>
              <view class="info-return" @click.stop="go_application_return" :data-goods="goods" v-if="goods.back_info.back_btn == 1">
                {{goods.back_info.show_back_status}}
              </view>
            </view>
            <view class="back-num" v-if="goods.back_num>0&&order.status!=9">
              已退款{{goods.back_num}}件
            </view>
          </view>
        </view>

      </view>
      <view class="item-footer">
        <view class="footer-sum">
          <view>
            <i class="sum-nums">共计{{order.goods_count}}件商品</i>
          </view>
        </view>
      </view>
      <view class="footer-fix" v-if="order.order_btn.back_btn==1 || order.order_btn.pay_btn == 1 || order.order_btn.cancel_btn == 1 || order.order_btn.comment_again_btn == 1 || order.order_btn.comment_btn == 1 || order.order_btn.receive_btn == 1">
        <button type="default" class="footer-button" v-if="order.order_btn.cancel_btn == 1" @click.stop="touchCancel" :data-order-id="order.order_id">取消订单</button>
        <button style="background-color:#ffe150;color:#555!important" class="footer-button" v-if="order.order_btn.pay_btn == 1" @click.stop="touchPay" :data-order-id="order.order_id">
          立即支付
        </button>
        <button class="footer-button y-button" v-if="order.order_btn.receive_btn == 1" @click.stop="touchConfirm" :data-order-id="order.order_id">确认收货</button>
        <button type="default" class="footer-button back-order-btn" v-if="order.order_btn.comment_btn == 1" data-status="1" :data-order-id="order.order_id" open-type="contact" session-from="goodBuy" @click.stop="unLoad">联系客服</button>
        <!-- <button  class="footer-button y-button" wx:if="{{order.order_btn. comment_btn == 1}}"  catchtap='touchComment' data-order-id='{{order.order_id}}'>立即评价</button>
                <button  class="footer-button y-button" wx:if="{{order.order_btn.comment_again_btn == 1}}" catchtap='touchSubComment' data-order-id='{{order.order_id}}'>追加评价</button> -->
        <button type="default" class="footer-button back-order-btn" v-if="order.order_btn.back_btn == 1" data-status="1" :data-order-id="order.order_id" @click.stop="phoneCall">联系商家</button>
        <!--<button type='default' class="footer-button" wx:if="{{order.order_btn.back_btn == 1}}" catchtap='phoneCall' data-order-id='{{order.order_id}}'>申请退款</button>-->
      </view>
    </view>
  </view>

  <view class="order-summury">
    
    <view class="summury-detail">
      商品合计
      <span class="total-price">
        <i class="icon_rmb">¥</i>{{order.total_goods_price}}
      </span>
    </view>
    <view class="summury-detail" v-for="(item, index) in order.prom_info" :key="index">
      {{item.prom_name}}
      <span class="total-price">{{item.value}}
      </span>
    </view>
    <view class="summury-detail">
      配送费
      <span class="total-price">￥{{order.shipping_info.fee}}</span>
    </view>

    <!-- <view class="summury-detail">
          运费
          <span class="total-price"><i class='icon_rmb' wx:if='{{order.shipping_info.show_type == 1}}'>¥</i>{{order.shipping_info.value}}</span>
        </view> -->
    <view class="summury-total">
      实付款
      <span class="total-price">
        <i class="icon_rmb">¥</i>{{order.order_amount}}
      </span>
    </view>
  </view>
  <view class="comment">
    备注：{{order.user_note}}
  </view>
  <view class="order-info">
    <view class="info-text">
      <text>下单时间：<text class="add-time">{{order.add_time}}</text> </text>
    </view>
    <view class="info-text">
      <text>订单编号：<text class="add-time">{{order.order_sn}}</text></text>
      <view class="info-Clip" @tap="setClipboard">
        <button type="default" hover-class="none">复制单号</button>
      </view>
    </view>

  </view>
</view>


<!--申请原因-->
<view class="drawer_screen" catchtouchmove="true" @click.stop="setModalStatus" data-status="0" v-if="showfwModalStatus"></view>
<view class="action-modal" :animation="animationData" v-if="showfwModalStatus">
  <view class="title">选择申请原因</view>
  <picker-view class="modal-inner" indicator-class="pick_item" :value="value">
    <picker-view-column>
      <view v-for="(item, index) in reasons" :key="index" class="pick_item" @click.stop="setReasonBefore" data-status="1" :data-item="item">{{item}}</view>
    </picker-view-column>
  </picker-view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
var app = getApp().globalData;
var common = require("../../utils/common.js"); // pages/order/detail.js

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      ORDER_STATUS: app.ORDER_STATUS,
      reasons: ['多拍/拍错/不想要', '缺货'],
      iphoneXBottom: '0rpx',
      order_id: "",
      order: {},
      isShowGoHome: false,
      animationData: "",
      showfwModalStatus: false,
      textareaHidden: false
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    var that = this;

    if (options == undefined || options.order_id == undefined) {
      common.toast("请求参数错误");
      return;
    } // 从外部分享进入时，显示左上角回到首页  改动带external时为内部进入携带参数，外部进入不带参数


    if (options && options.entryType && options.entryType == 'external') {
      that.setData({
        isShowGoHome: false
      });
    } else {
      that.setData({
        isShowGoHome: true
      });
    }

    var orderid = options.order_id;
    this.setData({
      order_id: orderid
    });
  },
  onShow: function () {
    if (this.order_id == undefined) {
      common.toast("请求参数错误");
      return;
    }

    this.loadProductDetail(this.order_id);
  },
  methods: {
    //申请原因弹层
    setModalStatus: function (e) {
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.setData({
        animationData: animation.export()
      });
      this.setData({
        showfwModalStatus: true,
        textareaHidden: true
      });
      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation
        });

        if (e.currentTarget.dataset.status == 0) {
          this.setData({
            showfwModalStatus: false,
            textareaHidden: false
          });
        }
      }.bind(this), 200);
    },
    //选择申请原因
    setReasonBefore: function (e) {
      var that = this;

      if (e.currentTarget.dataset.item) {
        var item = e.currentTarget.dataset.item;
      } else {
        var item = this.reasons[e.detail.value["0"]];
      }

      var reason = item;

      if (e.currentTarget.dataset.status == 1) {
        common.showModal('是否确定退款？', '确定', function (e) {
          if (e.confirm) {
            that.refund(item);
            that.setData({
              showfwModalStatus: false
            });
          }
        });
      } else {
        this.setModalStatus(e);
        return false;
      }
    },
    // 申请退款
    refund: function (e) {
      var that = this;
      var orderId = e.target.dataset.orderId;
      wx.navigateTo({
        url: '/packageA/user/application-return?type=1&orderId=' + orderId
      });
    },
    //获取订单详情信息
    loadProductDetail: function (orderid) {
      var that = this;
      var url = app.getPath.shopOrderDetail;
      var data = {
        order_id: that.order_id
      };
      common.showLoad(that);
      common.ApiGateWayTest(url, data, true, function (res) {
        var order = res.data.result;
        that.setData({
          order: order
        });
        common.hideLoad(that);
      });
    },
    //前往商品详情页
    goprodcut: function (e) {
      var productId = e.currentTarget.dataset.productId; // wx.navigateTo({
      //   url:''
      // })
    },
    touchComment: function (e) {
      var order = e.currentTarget.dataset.orderId;
      wx.navigateTo({
        url: '../user/order-review?order=' + order
      });
    },
    go_application_return: function (e) {
      var goods = e.currentTarget.dataset.goods;

      if (goods.back_info && goods.back_info.back_id != 0) {
        wx.navigateTo({
          url: '../user/order-return-detail?entryType=external&id=' + goods.back_info.back_id
        });
      } else {
        wx.navigateTo({
          url: '../user/application-return?type=2&rec_id=' + goods.rec_id
        });
      }
    },
    //取消订单
    touchCancel: function (e) {
      var that = this;
      var orderId = e.currentTarget.dataset.orderId;
      var url = app.getPath.shopCancelOrder;
      var data = {
        order_id: orderId
      };
      var content = '是否取消该订单？';
      var confirmText = '确定';
      common.showModal(content, confirmText, function (res) {
        res.confirm && common.ApiGateWayTest(url, data, true, function (res) {
          if (res.data.success == 1) {
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 100
            });
            common.toast(res.data.msg);
            that.loadProductDetail();
          } else {
            common.toast(res.data.msg);
          }
        });
      });
    },
    //确认收货
    touchConfirm: function (e) {
      var that = this;
      var orderId = e.currentTarget.dataset.orderId;
      var uri = app.getPath.confirmReceive;
      var data = {
        order_id: orderId
      };
      var content = '你确定已收到宝贝吗？';
      var confirmText = '确定';
      common.showModal(content, confirmText, function (res) {
        res.confirm && common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.data.success == 1) {
            wx.pageScrollTo({
              scrollTop: 0,
              duration: 100
            });
            common.toast(res.data.msg);
            that.loadProductDetail();
          } else {
            common.toast(res.data.msg);
          }
        });
      });
    },
    // 立即支付
    touchPay: function (e) {
      var that = this;
      var orderId = e.currentTarget.dataset.orderId;
      var payUri = app.getPath.doPay;
      var payData = {
        order_type: '2',
        order_id: orderId,
        payment_code: 'wxpay'
      };
      common.ApiGateWayTest(payUri, payData, true, function (res) {
        if (res.data.success == 1) {
          var data = res.data.result;
          common.doWechatPay(data, function (res) {
            common.toast('支付成功'); // 支付成功后二次验证，修改后台状态

            that.checkPay(orderId);
          }, function (failres) {
            common.toast('支付失败'); // wx.pageScrollTo({
            //   scrollTop: 0,
            //   duration: 100
            // })

            that.loadProductDetail();
          });
        }
      });
    },
    checkPay: function (orderId) {
      var that = this;
      var uri = app.getPath.checkPay;
      var data = {
        order_id: orderId,
        order_type: 2
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        // wx.pageScrollTo({
        //   scrollTop: 0,
        //   duration: 100
        // })
        that.loadProductDetail();
      });
    },
    touchSubComment: function (e) {
      var order = e.currentTarget.dataset.orderId;
      wx.navigateTo({
        url: '../user/add-order-review?order=' + order
      });
    },
    //查看物流
    touchExpress: function (e) {
      var item = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../user/order-express?order=' + item.order.id + '&delivery_id=' + item.delivery_id
      });
    },
    // 复制到剪贴板
    setClipboard: function () {
      wx.setClipboardData({
        data: this.order.order_sn,
        success: function () {
          common.toast('复制成功');
        },
        fail: function () {
          common.toast('复制失败，请重试');
        }
      });
    },
    // 返回首页
    gotoHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
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
@import "./order-detail.css";
</style>