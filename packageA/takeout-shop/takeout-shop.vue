<template>
<view>
<view class="container">
  <!-- 返回首页悬浮框/分享进入显示 -->
  <view class="goHomeFixed" @click.stop="gotoHome" v-if="isShowGoHome">
    <image :src="iconURL + '/product-icon-leftReturn.svg'" class="icon-leftReturn"></image>
    <text>返回首页</text>
  </view>
  <view class="search-bar">
    <view class="flexs">
      <input class="searchbar" placeholder="搜索商品" confirm-type="search" :value="searchValue" @input="searchValueInput" @confirm="searchProductData"></input>
      <button class="search_icon">
        <view class="iconfont icon-img_sousuox"></view>
      </button>
    </view>
  </view>
  <view @tap="toShopCoupon" :class="'coupon-flex ' + (ordernum.can_use_shop_coupon && ordernum.can_use_shop_coupon > 0 && showCouponFlex ? 'show' : '')">
    温馨提示：您有<i>{{ordernum.can_use_shop_coupon}}</i>个红包可使用 >>
  </view>
  <view class="notice-wrap" v-if="showNotice" @tap="noticeToast">
    <view class="notice">
      <view class="marquee_text" :style="'left:' + noticeMarqueeDistance + 'px;'">
        {{notice}}
      </view>
      <view class="marquee_text" :style="'left:' + (noticeMarqueeDistance + sizeLength) + 'px;'">
        {{notice}}
      </view>
    </view>
    <view class="filter"></view>
    <view class="iconfont icon-btn_gerenzhongxinyoujiantoux"></view>
  </view>
  <view class="header-msg">
    <view class="header-box" :style="'background-image: url(' + shopInfo.backgroud_img + ')'">
      <view class="shop-logo">
        <image :src="shopInfo.logo" lazy-load="true"></image>
      </view>
      <view class="shop-msg">
        <view class="shop-name">{{shopInfo.name}}</view>
        <view class="foctory-name" v-if="shopInfo.pickup_name">
          <i class="iconfont icon-btn_shouyedingweix"></i>
          <i>{{shopInfo.pickup_name}}</i>
        </view>
        <view class="affiche">{{shopInfo.desc}}</view>
      </view>
      <button class="share" open-type="share">
        <i class="iconfont icon-fenxiang-"></i>
      </button>
    </view>
  </view>
  <view class="all-goods">
    <scroll-view scroll-y="true" :scroll-top="leftScrollTop" scroll-with-animation="true" class="left" :style="'height: ' + viewHeight + 'px;'">
      <view :class="'classify ' + (seletTag == item.id ? 'active' : '')" @tap="seletedCategory" :data-id="item.id" :data-index="index" v-for="(item, index) in categoryInfo" :key="index">
        <image class="icon-goods" lazy-load="true" :src="item.icon" v-if="item.type==2||item.type==1"></image>
        <view :class="(item.type==2||item.type==1?'right-font':'')">{{item.name}}</view>
        <view v-if="item.in_cart_num > 0" class="categoryMsg">{{item.in_cart_num}}</view>
      </view>
    </scroll-view>


    <scroll-view scroll-y="true" :scroll-top="rightScrollTop" class="right" @scrolltolower="onReachBottom" lower-threshold="150" :style="'height: ' + viewHeight + 'px;'">
      <view class="goods" @tap="showProduct" :data-id="item.id" v-for="(item, index) in categoryList" :key="index">
        <view class="goods-img">
          <image :src="item.original_img" lazy-load="true"></image>
        </view>
        <view class="goods-disble-img" v-if="item.is_enough == 0">
          <image lazy-load="true" :src="iconURL + '/inequacy02.png'"></image>
        </view>
        <view class="goods-msg">
          <view class="goods-name">
            {{item.name}}
          </view>
          <view class="goods_desc">
            {{item.goods_desc}}
          </view>
          <!-- <view class="goods-standrad">
                      {{item.sku_key_name}}
                  </view> -->
          <view class="goods-price">
            <i>¥</i>
            <text class="price-num">{{item.shop_price}}</text>
            <text class="market-price" v-if="item.shop_price!=item.market_price">¥{{item.market_price}}</text>
          </view>
          <view class="cart-number-box" @click.stop="item.in_cart_num == 0 ? 'addCart' : ''" :data-item="item" data-type="add">
            <view :class="'addcart_icon reduce ' + (item.in_cart_num > 0 ? 'reduceShow' : '')" @click.stop="addCart" :data-item="item" data-type="reduce">
              <i class="iconfont lh-44">-</i>
            </view>
            <text :class="(item.in_cart_num > 0 ? 'show' : '')">{{item.in_cart_num}}</text>
            <view class="addcart_icon add" @click.stop="addCart" :data-item="item" data-type="add">
              <i class="iconfont icon-add lh-44"></i>
            </view>
          </view>
        </view>
      </view>
      <loadingBottom v-if="showBottomLoading"></loadingBottom>
    </scroll-view>
  </view>
  <view class="bottom-box">
    <view :class="'shop-logo ' + (animationActive ? 'active' : '')" @tap="showShop">
      <i class="iconfont icon-btn_shangxianggouwuchex"></i>
      <view class="tag" v-if="cartNum > 0">{{cartNum}}</view>
    </view>
    <view class="all-price">
      <text class="p" v-if="shopInfo.is_close_shop == 0 && cartTotals.total_price">¥{{cartTotals.total_price}}</text>
      <text class="i" v-if="shopInfo.is_close_shop == 0 && cartTotals.shipping_price && cartTotals.shipping_text == ''">配送费：¥{{cartTotals.shipping_price}}</text>
      <text class="i" v-if="shopInfo.is_close_shop == 0 && cartTotals.shipping_price && cartTotals.shipping_text != ''">{{cartTotals.shipping_text}}</text>
      <text class="t" v-if="shopInfo.is_close_shop == 1">{{shopInfo.close_desc}}</text>
    </view>
    <view :class="'buy-btn ' + (btnDisplay ? 'no-buy-btn':'')" @tap="btnDisplay ? '' : 'goSettlement'">
      {{btnText}}
    </view>
  </view>
  <view v-if="animationActive" :class="'cart-animation ' + (animationActive ? 'active' : '')">
    <image :src="cartAnimationImg" lazy-load="true"></image>
  </view>
  <view class="conpun-postion-box" v-if="showCountIcon">
    <view class="conpun-postion-img" @tap="getAssistanceCoupon">
      <image class="imgbox" lazy-load="true" :src="iconURL + '/tackout-conpun-ad-imgbox.png'"></image>
      <!-- <image class="imgbtn" lazy-load="true" src="{{iconURL}}/bargain-conpun-ad-imgbtn.png"></image> -->
      <!-- <view class="text">点击领取</view> -->
    </view>
  </view>
</view>
<!--跳转订单页-->
<!-- <view class="load-order">

</view> -->
<!--购物车弹窗-->
<view class="drawer_screen" @click.stop="showShop" v-if="showModalStatus"></view>
<view :animation="animationData" class="shop-box" v-if="showModalStatus">
  <view class="box-title">
    <text class="sku-title">已选商品</text>
    <view class="sku-title" @tap="onShopCartClean" v-if="cartList.length > 0">
      <i class="iconfont icon-lajitong mr-10"></i>
      <i>清空</i>
    </view>
  </view>
  <view class="cart-list-box">
    <view class="cart-list" v-for="(item, index) in cartList" :key="index">
      <view class="cart-msg">
        <view class="cart-name">{{item.goods_name}}</view>
        <view class="cart-price"><i>¥</i>{{item.shop_price}}</view>
        <view class="cart-number-box">
          <view class="addcart_icon reduce" v-if="item.in_cart_num > 0" @click.stop="addCart" :data-item="item" data-type="reduce">
            <i class="iconfont lh-44">-</i>
          </view>
          <text v-if="item.in_cart_num > 0">{{item.in_cart_num}}</text>
          <view class="addcart_icon add" @click.stop="addCart" :data-item="item" data-type="add">
            <i class="iconfont icon-add lh-44"></i>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view class="cart-no-list" v-if="cartList.length == 0">
    <image lazy-load="true" :src="iconURL + '/icon_cart_empty02.png'"></image>
    <text>您还没有添加商品~</text>
  </view>
</view>
<!--商详弹窗-->
<view class="drawer_screen" @click.stop="showProduct" v-if="showProductModal"></view>
<view :animation="animationDatas" class="product-sku" v-if="showProductModal">
  <!--轮播商品图片-->
  <swiper class="goods-product-img" indicator-dots="true" indicator-active-color="#ffe150">
    <swiper-item v-for="(item, index) in gallery" :key="index">
      <image lazy-load="true" :data-current="item.image_url" :src="item.image_url" class="slide-image"></image>
    </swiper-item>
  </swiper>

  <view class="goods-product-title">
    <view class="goods-product-msg">
      <view class="goods-product-name">
        {{goodInfo.name}}
      </view>
      <view class="goods_desc">
        {{goodInfo.goods_desc}}
      </view>
      <view class="goods-product-price">
        <i>¥</i>
        <text class="price-num">{{goodInfo.shop_price}}</text>
        <text class="market-price" v-if="goodInfo.shop_price != goodInfo.market_price">¥{{goodInfo.market_price}}</text>
      </view>
    </view>
    <view class="cart-number-box">
      <view class="addcart_icon reduce" v-if="goodInfo.in_cart_num > 0" @click.stop="addCart" :data-item="goodInfo" data-type="reduce">
        <i class="iconfont lh-44">-</i>
      </view>
      <text v-if="goodInfo.in_cart_num > 0">{{goodInfo.in_cart_num}}</text>
      <view class="addcart_icon add" @click.stop="addCart" :data-item="goodInfo" data-type="add">
        <i class="iconfont icon-add lh-44"></i>
      </view>
    </view>
  </view>
  <view class="store-msg">
    <view class="address row">
      <image lazy-load="true" class="address-img" :src="shopInfo.logo"></image>
      <text class="address-name">{{shopInfo.name}}</text>
      <view class="contact">
        <view class="to-link" @tap="makePhoneCall">
          <image lazy-load="true" :src="iconURL + '/phone_blue.png'"></image>
          <text>联系商家</text>
        </view>
      </view>
    </view>
  </view>
  <view class="iconfont closs icon-btn_guanbianniux" @click.stop="showProduct"></view>
</view>
<!--搜索弹窗-->
<view class="drawer_screen" @click.stop="showSearch" v-if="showSearchModal"></view>
<view :animation="animationSearch" class="search-modal" v-if="showSearchModal">
  <view class="header-bar">搜索结果</view>
  <scroll-view scroll-y="true" @scrolltolower="searchReachBottom" lower-threshold="100" class="search-list-box">
    <view class="goods" @tap="showProduct" :data-id="item.id" v-for="(item, index) in searchList" :key="index">
      <view class="goods-img">
        <image lazy-load="true" :src="item.original_img"></image>
      </view>
      <view class="goods-disble-img">
        <image lazy-load="true" v-if="item.is_enough == 0" :src="iconURL + '/inequacy02.png'"></image>
      </view>
      <view class="goods-msg">
        <view class="goods-name">
          {{item.name}}
        </view>
        <!-- <view class="goods-standrad">
              {{item.sku_key_name}}
          </view> -->
        <view class="goods-price">
          <i>¥</i>
          <text class="price-num">{{item.shop_price}}</text>
          <text class="market-price" v-if="item.shop_price != item.market_price">¥{{item.market_price}}</text>
        </view>
        <view class="cart-number-box">
          <view class="addcart_icon reduce" v-if="item.in_cart_num > 0" @click.stop="addCart" :data-item="item" data-type="reduce">
            <i class="iconfont lh-44">-</i>
          </view>
          <text v-if="item.in_cart_num > 0">{{item.in_cart_num}}</text>
          <view class="addcart_icon add" @click.stop="addCart" :data-item="item" data-type="add">
            <i class="iconfont icon-add lh-44"></i>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
  <view class="iconfont closs icon-btn_guanbianniux" @click.stop="showSearch"></view>
</view>
<!-- 领券弹窗 -->
<view class="drawer_screen" v-if="showCountModel"></view>
<view class="conut-modal" v-if="showCountModel">
  <view :class="'conut-modal-box ' + (showCountModel ? 'show' : '')">
    <image lazy-load="true" mode="widthFix" @tap="getSpecialCoupon" :src="shopCouponImg"></image>
    <view class="iconfont closs icon-btn_guanbianniux" @click.stop="hideConut"></view>
  </view>
</view>

<!-- 优惠券领取成功后显示 -->
<view class="Advertisement" v-if="showCouponPopup">
  <view class="AdvertisementAbs">
    <view class="AdimageBox">
      <image mode="widthFix" class="AdvertisementImg" :src="couponPopupInfo.bk_img"></image>
      <form report-submit="true" class="AdvertisementOut-view" @submit="hideCouponPopup">
        <button class="AdvertisementOut" :style="'background-image:url(' + iconURL + '/btn-index-closs.png)'" formType="submit"></button>
      </form>
    </view>
    <view class="coupon-box">
      <scroll-view scroll-y="true" class="coupon-box-scroll">
        <view class="coupon-wrap" :style="'background-image:url(' + iconURL + '/img_qdhbyhqkp@2x.png)'" v-for="(item, index) in couponPopupInfo.lists" :key="index">
          <view class="left">
            <text class="price1">¥</text>
            <text class="price2">{{item.value}}</text>
          </view>
          <view class="right">
            <view class="text1 ellipsis">{{item.name}}</view>
            <view class="text2 ellipsis">{{item.description}}</view>
            <view class="text2" style="white-space:nowrap;">{{item.use_end_date}}</view>
          </view>
        </view>
      </scroll-view>
      <view class="shadow"></view>
    </view>
  </view>
</view>
</view>
</template>

<script>
// packageA/take-out-shop/takeout-shop.js
var app = getApp().globalData;
var common = require("../../utils/common.js");
import loadingbottom from "../../components/loadingBottom/loadingBottom";

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      showGoodstatus: 0,
      showModalStatus: false,
      showSearchModal: false,
      showProductStatus: 0,
      showSearchstatus: 0,
      showCountModel: false,
      showCountIcon: false,
      showProductModal: false,
      shopInfo: {},
      categoryInfo: [],
      categoryList: [],
      cartList: [],
      gallery: [],
      goodInfo: {},
      seletTag: 0,
      cartNum: 0,
      viewHeight: 0,
      shop_id: 1,
      animationActive: false,
      page: 1,
      page_size: 20,
      search_page: 1,
      search_page_size: 20,
      searchValue: '',
      searchList: [],
      cartTotals: {},
      leftScrollTop: 0,
      startingprice: 0,
      rightScrollTop: 0,
      showNotice: false,
      notice: '',
      noticeMarqueePace: 1,
      noticeMarqueeDistance: 20,
      noticeSize: 15,
      noticeInterval: 20,
      btnDisplay: false,
      btnText: "去结算",
      isShowGoHome: false,
      shopCouponImg: '',
      packet_id: "",
      activity_red_packet_id: "",
      ordernum: {},
      showCouponFlex: false,
      showCouponPopup: false,
      couponPopupInfo: {},
      showBottomLoading: false,
      animationData: "",
      animationSearch: "",
      animationDatas: "",
      sizeLength: "",
      windowWidth: "",
      cartAnimationImg: ""
    };
  },

  components: {
    loadingbottom
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.shop_id = options.shop_id;

    if (options.give_platform && options.give_platform != undefined) {
      that.give_platform = options.give_platform;
    } else {
      that.give_platform = "";
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    clearInterval(this.noticeIntervalFun);
    this.getShopCartList();
    this.getShopInfo();
    this.getordernum();
    this.setData({
      leftScrollTop: 0,
      rightScrollTop: 0
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.page++;

    if (that.categoryList.length % that.page_size == 0) {
      that.setData({
        showBottomLoading: true
      });
      that.moreShopGoods();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var pickup = common.getStorageSync('getpickup');
    return {
      title: that.shopInfo.share_title,
      path: '/pages/index/index?pickup_id=' + pickup.pickup_id,
      imageUrl: that.shopInfo.share_img
    };
  },
  methods: {
    //购物车弹窗显示
    showShop() {
      if (this.showGoodstatus == 0) {
        this.showGoodstatus = 1;
      } else {
        this.showGoodstatus = 0;
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

      if (this.showGoodstatus == 1) {
        this.setData({
          showModalStatus: true,
          showSearchModal: false,
          showProductModal: false
        });
      }

      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export()
        });

        if (this.showGoodstatus == 0) {
          this.setData({
            showModalStatus: false
          });
        }
      }.bind(this), 200);
    },

    // 搜索弹窗显示
    showSearch() {
      if (this.showSearchstatus == 0) {
        this.showSearchstatus = 1;
      } else {
        this.showSearchstatus = 0;
      }

      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: "linear",
        delay: 0
      });
      animation.translateY(300).opacity(1).step();
      this.setData({
        animationSearch: animation.export()
      });

      if (this.showSearchstatus == 1) {
        this.setData({
          showSearchModal: true
        });
      }

      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationSearch: animation.export()
        });

        if (this.showSearchstatus == 0) {
          this.setData({
            showSearchModal: false
          });
        }
      }.bind(this), 200);
    },

    // 领券弹窗隐藏
    hideConut() {
      this.setData({
        showCountModel: false
      });
    },

    //商详弹窗
    showProduct(e) {
      if (this.showProductStatus == 0) {
        this.showProductStatus = 1;
      } else {
        this.showProductStatus = 0;
      }

      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: "linear",
        delay: 0
      });
      animation.translateY(600).opacity(1).step();
      this.setData({
        animationDatas: animation.export()
      });

      if (this.showProductStatus == 1) {
        this.getShopGoodsImages(e);
        this.setData({
          showProductModal: true
        });
      }

      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationDatas: animation.export()
        });

        if (this.showProductStatus == 0) {
          this.setData({
            showProductModal: false
          });
        }
      }.bind(this), 200);
    },

    // 店铺信息
    getShopInfo() {
      var that = this;
      var uri = app.getPath.shopInfo;
      var data = {
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            shopInfo: resData.result
          });
          wx.setNavigationBarTitle({
            title: resData.result.name
          });

          if (resData.result.is_close_shop == 1) {
            that.setData({
              btnDisplay: true,
              btnText: resData.result.close_button_desc
            });
          }

          that.getShopGoodsCategory();
          that.getShopCartList();
          that.getShopNotice();
          that.getIsShowShopCouponAd();
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 店铺公告
    getShopNotice() {
      var that = this;
      var uri = app.getPath.shopNotice;
      var data = {
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          if (resData.result != '' && resData.result.content) {
            var sizeLength = Number(resData.result.content.length) * that.noticeSize;
            var windowWidth = wx.getSystemInfoSync().windowWidth;
            that.setData({
              sizeLength,
              windowWidth,
              showNotice: true,
              notice: resData.result.content
            });
            that.noticeRun();
          }
        } else {
          common.toast(resData.msg);
        }

        wx.getSystemInfo({
          success: function (res) {
            var model = res.model;

            if (model.search('iPhone X') != -1) {
              that.setData({
                viewHeight: res.windowHeight - (!that.showNotice ? 240 : 276)
              });
            } else {
              that.setData({
                viewHeight: res.windowHeight - (!that.showNotice ? 196 : 232)
              });
            }
          }
        });
      });
    },

    // 滚动公告
    noticeRun() {
      var that = this;
      that.noticeIntervalFun = setInterval(function () {
        if (-that.noticeMarqueeDistance < that.sizeLength) {
          that.setData({
            noticeMarqueeDistance: that.noticeMarqueeDistance - that.noticeMarqueePace
          });
        } else {
          clearInterval(that.noticeIntervalFun);
          that.setData({
            noticeMarqueeDistance: 0
          });
          that.noticeRun();
        }
      }, that.noticeInterval);
    },

    // 公告弹窗
    noticeToast() {
      common.showRidoModal(this.notice, '知道了', function (res) {
        return;
      });
    },

    // 分类列表
    getShopGoodsCategory(seletTag) {
      var that = this;
      var uri = app.getPath.shopGoodsCategory;
      var data = {
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            categoryInfo: resData.result,
            seletTag: seletTag ? seletTag : resData.result[0].id
          });

          if (!seletTag) {
            that.getShopGoods();
          }
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 分类商品列表
    getShopGoods() {
      var that = this;
      var uri = app.getPath.shopGoods;
      var data = {
        shop_id: that.shop_id,
        shop_goods_category_id: that.seletTag,
        page: 1,
        page_size: 20
      };
      common.showLoad(this);
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            rightScrollTop: 0
          });
          that.setData({
            categoryList: resData.result
          });
          common.hideLoad(that);
        } else {
          common.toast(resData.msg);
          common.hideLoad(that);
        }
      });
    },

    // 下拉加载更多分类商品
    moreShopGoods() {
      var that = this;
      var uri = app.getPath.shopGoods;
      var data = {
        shop_id: that.shop_id,
        shop_goods_category_id: that.seletTag,
        page: that.page,
        page_size: that.page_size
      };
      common.showLoad(this);
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          if (resData.result.length > 0) {
            var list = that.categoryList.concat(resData.result);
            that.setData({
              showBottomLoading: false,
              categoryList: list
            });
          } else {
            common.toast('亲~已经全部加载了哦！');
          }

          common.hideLoad(that);
        } else {
          common.hideLoad(that);
          common.toast(resData.msg);
        }
      });
    },

    // 分类选择
    seletedCategory(e) {
      var id = e.currentTarget.dataset.id;
      var index = e.currentTarget.dataset.index;
      this.page = 1;
      this.setData({
        seletTag: id
      });

      if (index > 3) {
        this.setData({
          leftScrollTop: (index - 3) * 108 + 'rpx'
        });
      } else {
        this.setData({
          leftScrollTop: 0
        });
      }

      this.getShopGoods();
    },

    // 加入购物车
    addCart(e) {
      var item = e.currentTarget.dataset.item;
      var type = e.currentTarget.dataset.type;
      var that = this;
      var uri = app.getPath.shopCart;
      var data = {
        shop_id: that.shop_id,
        shop_goods_id: item.shop_goods_id,
        goods_num: type == 'reduce' && item.in_cart_num > 0 ? item.in_cart_num - 1 : item.in_cart_num + 1
      };

      if (that.shopInfo.is_close_shop == 1) {
        common.toast('店铺歇业中,无法加购哦~');
        return;
      }

      common.showLoad(this);
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          common.hideLoad(that);
          var newCategoryList = that.categoryList.map(items => {
            if (items.shop_goods_id == item.shop_goods_id) {
              if (type == 'reduce' && items.in_cart_num > 0) {
                items.in_cart_num--;
              } else {
                items.in_cart_num++;
              }
            }

            return items;
          });

          if (that.showSearchModal == true) {
            var newSearchList = that.searchList.map(items => {
              if (items.shop_goods_id == item.shop_goods_id) {
                if (type == 'reduce' && items.in_cart_num > 0) {
                  items.in_cart_num--;
                } else {
                  items.in_cart_num++;
                }
              }

              return items;
            });
            that.setData({
              searchList: newSearchList
            });
          }

          if (that.showProductStatus == true) {
            that.showProduct();
          }

          if (type == 'reduce') {
            that.setData({
              categoryList: newCategoryList
            });
          } else {
            that.setData({
              animationActive: true,
              cartAnimationImg: item.original_img,
              categoryList: newCategoryList
            });
            setTimeout(() => {
              that.setData({
                animationActive: false
              });
            }, 1000);
          }

          that.getShopCartList();
          that.getShopGoodsCategory(that.seletTag);
        } else {
          common.hideLoad(that);
          common.toast(resData.msg);
        }
      });
    },

    // 获取购物车列表
    getShopCartList() {
      var that = this;
      var uri = app.getPath.shopCartList;
      var data = {
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            cartList: resData.result
          });
          that.getShopGoodsNum();
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 清空购物车
    onShopCartClean() {
      var that = this;
      var uri = app.getPath.shopCartClean;
      var data = {
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          common.toast("清空成功");
          var newCategoryList = that.categoryList.map(items => {
            items.in_cart_num = 0;
            return items;
          });
          that.setData({
            categoryList: newCategoryList
          });
          that.getShopCartList();
          that.getShopGoodsCategory(that.seletTag);
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 获取商品轮播图
    getShopGoodsImages(e) {
      var that = this;
      var shop_goods_id = e.currentTarget.dataset.id;
      var uri = app.getPath.shopGoodsImages;
      var data = {
        shop_goods_id: shop_goods_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            gallery: resData.result
          });
          that.getShopGoodsInfo(e);
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 获取商品详情
    getShopGoodsInfo(e) {
      var that = this;
      var shop_goods_id = e.currentTarget.dataset.id;
      var uri = app.getPath.shopGoodsInfo;
      var data = {
        shop_goods_id: shop_goods_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            goodInfo: resData.result
          });
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 获取购物车数量
    getShopGoodsNum() {
      var that = this;
      var uri = app.getPath.shopGoodsNum;
      var data = {
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            cartNum: resData.result.total_num
          });
          that.getShopHotWard();
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 获取店铺商品计算金额
    getShopHotWard() {
      var that = this;
      var uri = app.getPath.shopCartCalculateFees;
      var data = {
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          that.setData({
            cartTotals: resData.result
          });

          if (that.shopInfo.is_close_shop != 1) {
            if (resData.result.diff_price != 0) {
              if (resData.result.diff_price == that.shopInfo.start_shipping_price) {
                that.setData({
                  btnDisplay: true,
                  btnText: '¥' + that.shopInfo.start_shipping_price + '起送'
                });
              } else {
                that.setData({
                  btnDisplay: true,
                  btnText: '差¥' + resData.result.diff_price + '起送'
                });
              }
            } else if (resData.result.total_price == 0 && that.cartNum == 0) {
              that.setData({
                btnDisplay: true,
                btnText: '¥' + that.shopInfo.start_shipping_price + '起送'
              });
            } else {
              that.setData({
                btnDisplay: false,
                btnText: '去结算'
              });
            }
          }
        } else {
          common.toast(resData.msg);
        }
      });
    },

    // 获取搜索内容
    searchValueInput: function (e) {
      this.searchValue = e.detail.value;
    },
    // 店铺搜索商品列表
    searchProductData: function (type) {
      var that = this;
      var searchKey = that.searchValue.replace(/(^\s*)|(\s*$)/g, "");

      if (searchKey == '') {
        common.toast('请输入您需要搜索的商品');
        return;
      }

      var uri = app.getPath.shopSearch;
      var data = {
        page: 1,
        page_size: 20,
        keywords: that.searchValue,
        shop_id: that.shop_id
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (resData.success == 1) {
          if (resData.result.length > 0) {
            that.setData({
              searchList: resData.result
            });
            that.showSearch();
          } else {
            common.toast('亲~本店铺没有您要搜索的商品!');
          }
        } else {
          common.toast('网络加载错误，请稍后重试');
        }
      });
    },

    // 店铺搜索商品列表-下拉加载更多
    moreSearchProductData() {
      var that = this;
      var uri = app.getPath.shopSearch;
      var data = {
        page: that.search_page,
        page_size: that.search_page_size,
        keywords: that.searchValue,
        shop_id: that.shop_id
      };
      common.showLoad(this);
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (res.data.success == 1) {
          if (resData.result.length > 0) {
            var list = that.searchList.concat(resData.result);
            that.setData({
              searchList: list
            });
          } else {
            common.toast('亲~已经全部加载了哦！');
          }

          common.hideLoad(that);
        } else {
          common.hideLoad(that);
          common.toast(resData.msg);
        }
      });
    },

    // 搜索结果加载更多
    searchReachBottom: function () {
      var that = this;
      that.search_page++;

      if (that.searchList.length % that.search_page_size == 0) {
        that.moreSearchProductData();
      }
    },

    // 去结算
    goSettlement() {
      var that = this;
      var uri = app.getPath.shopPreCheckOrder;
      var data = {
        shop_id: that.shop_id,
        time_atitude: app.dataBase.userAtitude
      };
      common.showLoad(this);
      common.ApiGateWayTest(uri, data, true, function (res) {
        var resData = res.data;

        if (resData.success == 1) {
          wx.navigateTo({
            url: '../takeout-order/check-takeout-order?shop_id=' + that.shop_id
          });
        } else {
          common.showRidoModal(resData.msg, '确定');
        }

        common.hideLoad(that);
      });
    },

    // 是否有可领取优惠券
    getIsShowShopCouponAd() {
      var that = this;
      var uri = app.getPath.isShowShopCouponAd;
      var data = {
        shop_id: that.shop_id,
        give_platform: that.give_platform
      };
      common.ApiGateWayTest(uri, data, true, res => {
        var resData = res.data;

        if (resData.success == 1) {
          that.shopCouponAd = resData.result;

          if (resData.result.status != 0) {
            if (resData.result.status == 1) {
              that.setData({
                showCountModel: true,
                showCouponPopup: false,
                shopCouponImg: resData.result.coupon_img
              });
            } else if (resData.result.status == 2) {
              common.showRidoModal(resData.result.status_desc, '确定');
            }
          }

          if (resData.result.activityRedPacketInfo.status != 0) {
            that.activity_red_packet_id = resData.result.activityRedPacketInfo.activity_red_packet_id;
            that.packet_id = resData.result.activityRedPacketInfo.activity_red_packet_bargaining_id;
            that.setData({
              showCountIcon: true
            });
          }
        } else {
          common.toast(resData.msg);
          return;
        }
      });
    },

    // 领取店铺优惠券
    getSpecialCoupon() {
      var that = this;
      var uri = app.getPath.getSpecialCoupon;
      var data = {
        shop_id: that.shop_id,
        give_platform: that.give_platform,
        time_atitude: app.dataBase.userAtitude
      };
      common.showLoad(this);
      common.ApiGateWayTest(uri, data, true, res => {
        var resData = res.data;
        common.hideLoad(that);
        that.setData({
          showCountModel: false
        });

        if (resData.success == 1) {
          if (resData.result.data.state == 0) {
            if (resData.result.data.lists) {
              if (resData.result.data.lists.length > 1) {
                that.setData({
                  showCouponPopup: true,
                  couponPopupInfo: resData.result.data
                });
              } else {
                common.showRidoModal(resData.result.data.state_desc, '确定');
              }
            } else {
              common.showRidoModal(resData.result.data.state_desc, '确定');
            }

            that.getordernum();
          } else {
            common.showRidoModal(resData.result.data.state_desc, '确定');
            return;
          }
        } else {
          common.toast(resData.msg);
          return;
        }
      });
    },

    // 前往助力红包详情
    getAssistanceCoupon() {
      let that = this;

      if (that.packet_id != '') {
        wx.navigateTo({
          url: '../packet/packet?packet_id=' + that.packet_id + '&shop_id=' + that.shop_id
        });
      } else {
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
                that.setData({
                  showCountModel: false
                });
                wx.navigateTo({
                  url: '../packet/packet?packet_id=' + res.data.result.activity_red_packet_bargaining_id + '&shop_id=' + that.shop_id + '&packet_bargaining=true'
                });
              }
            });
          } else {
            common.toast(pRes.data.msg);
            return;
          }
        });
      }
    },

    // 拨打商家电话
    makePhoneCall() {
      wx.makePhoneCall({
        phoneNumber: this.shopInfo.mobile
      });
    },

    // 返回首页
    gotoHome: function () {
      wx.switchTab({
        url: '/pages/index/index'
      });
    },
    // 获取优惠券数量
    getordernum: function () {
      var that = this;
      var uri = app.getPath.getordernum;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res.data.success == 1) {
          clearTimeout();
          that.setData({
            ordernum: res.data.result,
            showCouponFlex: true
          });
          setTimeout(() => {
            that.setData({
              showCouponFlex: false
            });
          }, 15000);
        }
      });
    },

    // 前往我的优惠券
    toShopCoupon() {
      this.setData({
        showCouponFlex: false
      });
      wx.navigateTo({
        url: '/packageA/takeout-coupon/takeout-coupon?entryType=external'
      });
    },

    // 隐藏领取优惠券展示
    hideCouponPopup() {
      this.setData({
        showCouponPopup: false
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
@import "./takeout-shop.css";
</style>