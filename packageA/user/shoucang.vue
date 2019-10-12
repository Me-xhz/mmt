<template>
<view>
<!--pages/user/shoucang.wxml-->
<view class="page attend">
  <view class="empty" v-if="productData.length <= 0 && showIcon">
    <view class="empty-item">
      <image class="item-logo" :src="iconURL + '/icon_like_empty.png'" mode="widthFix"></image>
      <view class="item-text">暂时还没有收藏/(ㄒoㄒ)/~~</view>
    </view>
  </view>
  <view v-else class="container">
    <view class="top-subbar">
      <view class="w50 fl">共收藏{{attentionNum}}件商品</view>
      <view class="w50 fr tr" @tap="edit">{{editType ? '编辑' : '完成'}}</view>
    </view>
    <view :class="'list-item ' + (left ? 'marginLeft' : '')" v-for="(items, index) in productData" :key="index" @click.stop="choose" :data-id="items.goods_id">
      <icon :class="'user-item-checkbox ' + (items.checked ? 'radio-icon-active' : '')"></icon>
      <image class="item-image" :src="items.img"></image>
      <view class="item-info">
        <view class="info-price">{{items.goods_name}}</view>
        <view class="info-name"><i class="icon_rmb">¥</i>{{items.market_price}}</view>
      </view>
    </view>
  </view>
  <view v-if="loaded && productData.length > 0 && !showIcon" class="loaded">
    没有更多啦~
  </view>
</view>
<view class="bottomTab" v-if="left">
  <view class="selectIcon" @click.stop="chooseAll">
    <icon :class="'user-item-checkbox ' + (checkbox ? 'radio-icon-active' : '')"></icon>
  </view>
  <view class="selectAll">
    <span class="chooseAll" @click.stop="chooseAll">全选</span>
  </view>
  <button type="warn" class="cancelAtten" @click.stop="removeFavorites">取消收藏</button>
</view>
</view>
</template>

<script>
var app = getApp().globalData;
var id = '';
var page = 1;
var reachBottom = true;
const common = require("../../utils/common.js"); // pages/user/shoucang.js

export default {
  data() {
    return {
      iconURL: app.dataBase.iconURL,
      page: 1,
      page_size: 10,
      productData: [],
      editType: true,
      left: false,
      choose: '',
      loaded: false,
      showEmpty: false,
      attentionNum: "",
      showIcon: false,
      checkbox: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.setData({
      productData: [],
      page: 1
    });
    this.loadProductData(1);
    var goodsList = [];
  },
  onShow: function () {// 页面显示
    // this.loadProductData();
  },
  onPullDownRefresh: function () {
    this.setData({
      productData: [],
      loaded: false
    });
    page = 1;
    this.loadProductData(page, 'downRefresh');
  },
  onReachBottom: function () {
    if (reachBottom) {
      page++;
      this.loadProductData(page);
    }
  },
  methods: {
    loadProductData: function (page, type) {
      var that = this;
      var url = app.getPath.getGoodsLike;
      var data = {
        page: page,
        page_size: this.page_size
      };
      common.ApiGateWayTest(url, data, true, function (res) {
        if (res && res.data && res.data.success == 1) {
          var data = res.data.result.data;
          var attentionNum = res.data.result.total;

          if (type == 'downRefresh') {
            wx.stopPullDownRefresh();
          }

          if (data.length > 0) {
            if (data.length < 10) {
              reachBottom = false;
              that.setData({
                loaded: true
              });
            } else {
              reachBottom = true;
            }

            for (var i in data) {
              data[i].checked = false;
            }

            that.setData({
              productData: that.productData.concat(data),
              attentionNum: attentionNum
            });
          } else {
            that.setData({
              showIcon: true
            });
          }

          if (that.productData.length <= 0) {
            that.setData({
              left: false,
              showEmpty: true
            });
          }
        }
      });
    },
    initProductData: function (data) {
      for (var i in data) {
        var item = data[i];
        item.Price = item.Price / 100;
        item.ImgUrl = app.dataBase.hostImg + item.ImgUrl;
      }
    },
    //选择状态
    ChooseActive: function (that, list, id) {
      var num = 0;
      var type;

      if (this.editType == false) {
        for (var i in list) {
          if (id == list[i].goods_id) {
            list[i].checked = !list[i].checked;
          }

          if (list[i].checked == false) {
            num++;
          }
        }

        if (num <= 0) {
          type = true;
        } else {
          type = false;
        }

        that.setData({
          checkbox: type,
          productData: list
        });
      }
    },
    //编辑
    edit: function () {
      var num = 0;
      var type;
      this.editType = !this.editType;
      this.left = !this.left;
      var list = this.productData;
      this.ChooseActive(this, list);
      this.setData({
        left: this.left,
        editType: this.editType
      });
    },
    //选择
    choose: function (e) {
      var id = e.currentTarget.dataset.id;

      if (!this.editType) {
        var list = this.productData;
        this.ChooseActive(this, list, id);
      } else {
        wx.navigateTo({
          url: '../../pages/product/product?entryType=external&productId=' + id
        });
      }
    },
    //全选
    chooseAll: function () {
      var type;
      var num = 0;
      var list = this.productData;

      for (var i in list) {
        if (list[i].checked == false) {
          num++;
        }
      }

      if (num > 0) {
        for (var i in list) {
          list[i].checked = true;
        }

        type = true;
      } else {
        for (var i in list) {
          list[i].checked = false;
        }

        type = false;
      }

      this.setData({
        productData: list,
        checkbox: type
      });
    },
    //取消收藏
    removeFavorites: function () {
      var that = this;
      var cancelList = [];
      var list = this.productData;

      for (var i in list) {
        if (list[i].checked == true) {
          cancelList.push(list[i].goods_id);
        }
      }

      var content = '确定取消收藏吗？';
      var confirmText = '确定';
      common.showModal(content, confirmText, function (res) {
        var url = app.getPath.goodsUnlike;
        var data = {
          goods_id: cancelList
        };
        common.ApiGateWayTest(url, data, true, function (res) {
          if (res && res.data && res.data.success == 1) {
            that.onLoad();
            common.toast('取消收藏成功');
          }
        });
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
@import "./shoucang.css";
</style>