<template>
<view>
<!--pages/search/search.wxml-->

<!-- 搜索框 -->
<view class="search df">
  <view class="flexs">
    <!-- <div class="cancelSearch" bindtap="cancelSearch" wx:if="{{searchValue}}">
      <image src="{{iconUrl}}/icon_clear.png"></image>
    </div> -->
    <input :class="'searchbar ' + (searchValue?'w90':'')" placeholder="搜索商品" auto-focus :focus="focus" confirm-type="search" :value="searchValue" @input="searchValueInput" @confirm="doSearch"></input>
    <button class="cancelSearch" @tap="cancelSearch" v-if="searchValue">取消</button>
    <button class="search_icon" @tap="doSearch">
      <view class="iconfont icon-img_sousuox"></view>
    </button>
  </view>
</view>
<!-- 热门搜索及历史搜索 -->
<view class="cont" :hidden="shopList.length > 0 || (searchValue && hotAndHistoryHidden && shopList.length <= 0)">
  <view v-if="hotWord.length">
  <!-- wx:if="{{hotWord.length}}" -->
    <view class="hotTitle">
      <text class="font_14">热门搜索</text>
    </view>
    <view class="w100 history">
      <div class="historyList" v-for="(item, index) in hotWord" :key="index" @tap="doKeySearch" :data-key="item">{{item}}</div>
    </view>
  </view>
  <view v-if="historyKeyList.length > 0">
    <view class="histroyTitle">
      <text class="font_14 mt10">历史搜索</text>
      <!-- 清除历史 -->
      <view class="clearHistory iconfont icon-btn_guanbianniux" @tap="clearHistory"></view>
    </view>
    <view class="w100 history">
      <view class="historyList" v-for="(item, index) in historyKeyList" :key="index" @tap="doKeySearch" :data-key="item">{{item}}</view>
    </view>
  </view>
</view>
<!-- 筛选条 -->
<view :hidden="shopList.length <= 0 && hiddenTitle">
  <view class="filterTitle">
    <view class="seach-bar row">
      <view class="bar-item col tc font_14" @tap="filter" data-type="normal"><view :class="'bar-border  ' + (sort == 'normal' ? 'active' : '')">全部</view></view>
      <view class="bar-item col tc font_14" @tap="filter" data-type="new"><view :class="'bar-border ' + (sort == 'new' ? 'active' : '')">最新</view></view>
      <view class="bar-item col tc font_14" @tap="filter" data-type="price"><view :class="'bar-border  ' + (sort == 'price' ? 'active' : '')">价格</view></view>
    </view>
  </view>
  <!--<view style='padding: 85rpx;'></view>-->
  <view class="search_list">
    <goodList :list="shopList" type="2" align="left"></goodList>
  </view>
  
  <!-- <import src="../listdetailTemplate/listdetailTemplate.wxml" />
  <template is="listDetail" data="{{shopList}}" /> -->
</view>
<!-- 未找到 -->
<view class="search_no" v-if="searchValue && showEmpty">
   <view>
     <image class="scimg" :src="iconUrl + '/search_no02.png'"></image>
  </view> 
  <text class="font_14">找不到想要的？请告诉我们</text>
  <navigator hover-class="none" url="/pages/problem/feedBook/feedBook" class="search_no_btn search_no_btn1 mgt130 mb24">留言反馈</navigator>
  <navigator hover-class="none" @tap="goHome" class="search_no_btn search_no_btn2">回首页逛逛</navigator>
</view>
<view class="refreshEnd" v-if="!reachBottom && productData.length >= page_size">
  <text>没有更多啦~</text>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
var app = getApp().globalData;
const common = require("../../utils/common.js"); // pages/search/search.js
import goodlist from "../../components/goodList/goodList";

export default {
  data() {
    return {
      focus: true,
      hotKeyShow: true,
      historyKeyShow: true,
      searchValue: '',
      page: 1,
      shopList: [],
      historyKeyList: [],
      hotKeyList: [],
      page_size: 10,
      reachBottom: false,
      hotWord: [],
      keyword: '',
      showEmpty: false,
      sort: 'normal',
      hotAndHistoryHidden: false,
      iconUrl: app.dataBase.iconURL,
      hiddenTitle: true,
      ac_load_btn: true,
      priceSort: 'asc',
      placeholder: ""
    };
  },

  components: {
    goodlist
  },
  props: {},
  onLoad: function (options) {
    // if (options == undefined || options.keyWord == undefined) {
    //   common.toast("请求参数错误");
    //   return;
    // }
    if (options.keyWord != '') {
      this.setData({
        keyword: options.keyWord,
        placeholder: options.keyWord
      });
    }

    this.getHotWord();
    this.getHistroyList();
  },
  onPullDownRefresh: function () {
    this.setData({
      page: 1,
      shopList: []
    });
    this.searchProductData('downRefresh');
  },
  onReachBottom: function () {
    //下拉加载更多多...
    var key = this.searchValue;
    this.setData({
      page: this.page + 1,
      keyword: key
    });

    if (this.reachBottom) {
      this.searchProductData();
    }
  },
  methods: {
    goHome: function (e) {
      wx.switchTab({
        url: '../index/index'
      });
    },
    getHistroyList: function () {
      var data = common.getStorageSync('historyKeyList') || null;
      this.setData({
        historyKeyList: data
      });
    },
    doKeySearch: function (e) {
      var key = e.currentTarget.dataset.key;
      this.setData({
        searchValue: key,
        hotKeyShow: false,
        historyKeyShow: false,
        shopList: [],
        page: 1,
        hotAndHistoryHidden: true,
        keyword: key
      });
      this.shopList.length = 0;
      this.getOrSetSearchHistory(key);
      this.searchProductData();
    },
    //筛选切换
    filter: function (e) {
      var that = this;

      if (!that.ac_load_btn) {
        return false;
      }

      var type = e.currentTarget.dataset.type;
      that.setData({
        sort: type
      });

      if (type == 'price') {
        this.priceSort = this.priceSort == 'asc' ? 'desc' : 'asc';
      }

      that.doSearch();
    },
    // 执行搜索事件
    doSearch: function () {
      var searchKey = this.searchValue.replace(/(^\s*)|(\s*$)/g, "");

      if (searchKey == '') {
        common.toast('请输入您需要搜索的商品');
        return;
      }

      if (!searchKey && !this.keyword) {
        this.setData({
          focus: true,
          hotAndHistoryHidden: false
        });
        return;
      } else if (!searchKey && this.keyword) {
        searchKey = this.keyword;
        this.setData({
          searchValue: this.keyword
        });
      }

      this.setData({
        keyword: searchKey,
        hotAndHistoryHidden: true,
        shopList: [],
        page: 1
      });
      this.searchProductData();
      this.getOrSetSearchHistory(searchKey);
    },
    // 获取历史搜索记录
    getOrSetSearchHistory: function (key) {
      var that = this;
      common.getStorage({
        key: 'historyKeyList'
      }, function (res) {
        var data = res.data;
        var historyKeyList = [];
        var num = 1; //只取9个不包括key的最新数据

        for (var i in data) {
          if (data[i] != key && num < 10) {
            num++;
            historyKeyList.push(data[i]);
          }
        }

        historyKeyList.unshift(key);
        common.setStorage({
          key: "historyKeyList",
          data: historyKeyList
        }, function (res) {
          that.setData({
            historyKeyList: historyKeyList
          });
        });
      }, //第一次storage中没有key时返回失败。
      function (res) {
        var historyList = [];
        historyList.unshift(key);
        common.setStorage({
          key: 'historyKeyList',
          data: historyList
        });
      });
    },
    // 获取搜索内容
    searchValueInput: function (e) {
      var value = e.detail.value;
      this.setData({
        searchValue: value,
        placeholder: '请输入您的搜索内容'
      });

      if (!value && this.shopList.length == 0) {
        this.setData({
          hotKeyShow: true,
          historyKeyShow: true,
          keyword: ''
        });
      }
    },
    // 清除搜索内容
    cancelSearch: function () {
      this.setData({
        searchValue: '',
        shopList: [],
        showEmpty: false,
        hotAndHistoryHidden: false,
        hiddenTitle: true,
        keyword: '',
        placeholder: '请输入您的搜索内容'
      });
      this.getHistroyList();
    },
    // 清除搜索历史记录
    clearHistory: function () {
      var data = [];
      var that = this;
      common.showModal('是否清空历史记录？', '清空', function (res) {
        if (res.confirm) {
          // 清空
          common.setStorage({
            key: 'historyKeyList',
            data: data
          }, function (res) {
            that.setData({
              historyKeyList: data
            });
          });
        }
      });
    },
    // 获取热门搜索词条
    getHotWord: function () {
      var that = this;
      var uri = app.getPath.gethotword;
      var data = {
        is_default: 0
      };
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res && res.data) {
          if (res.data.success == 1) {
            that.setData({
              hotWord: res.data.result.data
            });
          }
        }
      });
    },
    // 搜索api，获取接口数据列表
    searchProductData: function (type) {
      var that = this;
      common.showLoad(that); // 关闭开关

      that.ac_load_btn = false;
      var uri = app.getPath.searchlist;
      var data = {
        page: this.page,
        page_size: this.page_size,
        keyword: this.keyword,
        sort: this.sort
      };
      data.sort_asc = this.sort == 'price' ? this.priceSort : '';
      common.ApiGateWayTest(uri, data, true, function (res) {
        if (res && res.data) {
          if (res.data.success == 1) {
            var data = res.data.result.data;

            if (type == 'downRefresh') {
              wx.stopPullDownRefresh();
            }

            if (data.length < that.page_size) {
              that.setData({
                reachBottom: false
              });
            } else {
              that.setData({
                reachBottom: true
              });
            }

            if (data.length > 0) {
              // var list = [];
              // var dataList = [];
              // for(var i in data){
              //   list.push(data[i]);
              //   if((Number(i)+1)%2 == 0){
              //     dataList.push(list);
              //     list = [];
              //   }
              //   if(i == data.length-1){
              //     if(list.length > 0){
              //       dataList.push(list);
              //     }
              //   }
              // }
              that.setData({
                shopList: that.shopList.concat(data),
                showEmpty: false,
                hiddenTitle: false
              });
            } else if (that.shopList.length <= 0) {
              that.setData({
                showEmpty: true,
                hiddenTitle: true
              });
            }
          } else if (res.data.success == 0) {
            that.setData({
              reachBottom: false
            });
          }
        } else {
          common.toast('网络加载错误，请稍后重试');
        }

        common.hideLoad(that); // 打开开关

        that.ac_load_btn = true;
        common.hideLoad(that);
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
@import "./search.css";
</style>