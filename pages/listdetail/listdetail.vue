<template>
<view>
<!-- 引入通用模板 -->

<view class="list">
  <!-- 作品类头部样式 -->
  <view v-if="showTitleType == 1">
    <view class="titleImg">
      <image mode="widthFix" :src="titleList.brand_header_img"></image>
    </view>
    <view class="titleText">
      {{titleList.name}}
      <!-- <view class="brand_more" bindtap='gotoHome'>更多周边
        <image class="icon-right-arrow" src="{{iconURL}}/icon_right_arrow.png"></image>
      </view> -->
    </view>
    <view class="titleDescribe">
      <text :class="'describe ' + (titleList.wordsCut ? 'cut' : '')">{{titleList.desc}}</text>
      <view class="limit-words" v-if="titleList.words" @tap="limitWord" :data-iscut="titleList.wordsCut">{{limitWords}}
        <image class="show" v-if="titleList.wordsCut"></image>
        <image class="hidden" v-if="!titleList.wordsCut"></image>
      </view>
      <view :class="'attr-shadow ' + (titleList.wordsCut ? 'show' : '')"></view>
    </view>
  </view>
  <!--商品类头部样式 -->
  <view v-if="showTitleType != 1" class="mod-margin">
    <scroll-view scroll-x="true" class="mod-nav">
      <ur class="nav-ul">
        <li @tap="titleTap" data-titleid="0" :class="(catId == activeid ? 'actives' : '')">
          <span>全部</span>
        </li>
        <li v-for="(item, index) in titleList" :key="index" :class="(item.cat_id == activeid ? 'actives' : '')" @tap="titleTap" :data-titleid="item.cat_id">
          <span>{{item.name}}</span>
        </li>
      </ur>
    </scroll-view>
  </view>
  <!-- 商品列表 -->
  <component is="listDetail" :shopList="shopList"></component>
  <!-- wx:if="{{isLoaded && !isLastPage && !isEmpty}}" -->
  <view class="cate-list-more" v-if="!isLoaded">正在加载...</view>
  <!-- wx:if="{{isLoaded && isLastPage && !isEmpty && themeModel.isLoaded && themeModel.isLastPage && !themeModel.hasIpStation}}" -->
  <view class="cate-list-more" v-if="isLoaded">没有更多啦~</view>
  <view v-if="showTitleType == 1" class="back-button">
    <view @click.stop="gotoPagetop" class="backtop" v-if="showBackTop"></view>
    <view @click.stop="gotoHome" class="gohome"></view>
  </view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
var app = getApp().globalData;
var common = require("../../utils/common.js");
var show_type;
var allId;

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      current: 0,
      ptype: '',
      page_size: 10,
      page: 1,
      catId: 0,
      brandId: 0,
      scrollTop: 0,
      showBackTop: false,
      isEmpty: false,
      isLoaded: false,
      limitWords: "展开",
      shopList: [],
      is_top: "0",
      activeid: "",
      objectId: "",
      showTitleType: "",
      titleList: "",
      animationData: "",
      showModalStatus: false
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    if (options.brand_id == undefined) {
      common.toast("请求参数错误");
      return;
    }

    var that = this; //页面初始化 options为页面跳转所带来的参数

    var cat_id = options.cat_id ? options.cat_id : '';
    var data_id = options.data_id ? options.data_id : '';
    var ptype = options.ptype ? options.ptype : '';
    var brandId = options.brand_id ? options.brand_id : '';
    that.setData({
      ptype: ptype,
      catId: cat_id,
      brandId: brandId,
      activeid: data_id,
      objectId: options.title
    });

    if (options.brand_id && options.brand_id != '') {
      show_type = 1;
    } else {
      show_type = 0;
    }

    that.setData({
      showTitleType: show_type
    });
    that.getBrandHeader();
    that.getBrandList();
  },
  //加载更多
  onReachBottom: function () {
    var that = this;

    if (that.shopLists && that.shopLists.length % that.page_size == 0) {
      that.page = that.shopLists.length / that.page_size + 1;
      that.getBrandList();
    }
  },
  methods: {
    getBrandHeader: function () {
      var that = this;
      common.showLoad(that);

      if (that.showTitleType == 1) {
        //作品类
        var uri = app.getPath.brandHeader;
        var data = {
          brand_id: that.brandId
        };
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.statusCode == 200 && res.data.success != 0) {
            var titleList = res.data.result;

            if (titleList.desc.length > 50) {
              titleList.words = true;
              titleList.wordsCut = true;
            } else {
              titleList.words = false;
              titleList.wordsCut = false;
            }

            that.setData({
              titleList: titleList
            }); //更改头部标题

            wx.setNavigationBarTitle({
              title: that.titleList.name
            });
          } else {
            common.toast(res.data.msg);
          }
        });
      } else {
        //商品类
        var uri = app.getPath.goodsCategory;
        var data = {
          page: 1,
          page_size: 100,
          cat_id: that.catId
        };
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.statusCode == 200) {
            var res = res.data.result;
            that.setData({
              titleList: res.data
            });
          }
        });
      }
    },
    getBrandList: function () {
      var that = this;
      common.showLoad(that);

      if (that.showTitleType == 1) {
        var uri = app.getPath.brandProducts;
        var data = {
          brand_id: that.brandId,
          page: that.page,
          page_size: that.page_size
        };
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.data.result && res.data.result.brands.length > 0) {
            var list = [];
            var lists = [];
            var shoplist = res.data.result.brands;
            that.shopLists = that.shopLists ? that.shopLists.concat(shoplist) : shoplist;

            for (var i in that.shopLists) {
              list.push(that.shopLists[i]);

              if (i % 2 == 1) {
                lists.push(list);
                list = [];
              }
            }

            if (list.length > 0) {
              lists.push(list);
            }

            common.hideLoad(that);
            that.setData({
              shopList: lists,
              isLoaded: true
            });
          } else {
            common.toast('已经是最后一页了！');
            common.hideLoad(that);
          }
        });
      } else {
        var uri = app.getPath.cateGoodsList;
        var data = {
          page: that.page,
          page_size: that.page_size,
          cat_id: that.activeid,
          is_top: that.is_top
        };
        common.ApiGateWayTest(uri, data, true, function (res) {
          if (res.data.result && res.data.result.data.length > 0) {
            var list = [];
            var lists = [];
            var shoplist = res.data.result.data;
            that.shopLists = that.shopLists ? that.shopLists.concat(shoplist) : shoplist;

            for (var i in that.shopLists) {
              list.push(that.shopLists[i]);

              if (i % 2 == 1) {
                lists.push(list);
                list = [];
              }
            }

            if (list.length > 0) {
              lists.push(list);
            }

            that.setData({
              shopList: lists,
              isLoaded: true
            });
            common.hideLoad(that);
          } else {
            common.toast('已经是最后一页了！');
            common.hideLoad(that);
          }
        });
      }
    },
    showModal: function () {
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.setData({
        animationData: animation.export(),
        showModalStatus: true
      });
      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export()
        });
      }.bind(this), 200);
    },
    hideModal: function () {
      // 隐藏遮罩层
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
      setTimeout(function () {
        animation.translateY(0).step();
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        });
      }.bind(this), 200);
    },
    switchSlider: function (e) {
      this.setData({
        current: e.currentTarget.dataset.index
      });
    },
    changeSlider: function (e) {
      this.setData({
        current: e.detail.current
      });
    },
    titleTap: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.titleid;
      that.shopLists = [];

      if (id == 0) {
        that.is_top = 1;
        that.setData({
          activeid: that.catId,
          shopList: []
        });
      } else {
        that.is_top = "0";
        that.setData({
          activeid: id,
          shopList: []
        });
      }

      that.getBrandList();
    },
    limitWord: function (e) {
      var iscut = e.currentTarget.dataset.iscut;
      this.titleList.wordsCut = !iscut;

      if (iscut) {
        this.setData({
          titleList: this.titleList,
          limitWords: "收起"
        });
      } else {
        this.setData({
          titleList: this.titleList,
          limitWords: "展开"
        });
      }
    },
    //移动超出显示返回顶部按钮
    onPageScroll: function (e) {
      var that = this;

      if (e.scrollTop > 500) {
        that.setData({
          showBackTop: true
        });
      } else {
        that.setData({
          showBackTop: false
        });
      }
    },
    gotoPagetop: function (e) {
      wx.pageScrollTo({
        scrollTop: 0
      });
    },
    gotoHome: function () {
      wx.switchTab({
        url: '../index/index'
      });
    } // onShareAppMessage: function (options) {
    //   var that = this;
    //   return {
    //     title: that.data.titleList.share_title,
    //     imageUrl: that.data.titleList.brand_header_img,
    //     path: '/pages/listdetail/listdetail?brand_id=' + that.data.brandId + '&title=' + that.data.objectId,
    //     success: function (res) {
    //       console.log('转发成功')
    //     },
    //   }
    // }
    ,
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
@import "./listdetail.css";
</style>