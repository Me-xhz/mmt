<template>
<!--components/goodList/goodList.wxml-->
<!-- 列表组件 -->
<view class="goodList clearfix">
  <view :class="'row ' + (type==2?'between':'')" v-for="(good_list, index) in recommend_goods" :key="index">
    <view hover-class="none" :class="'good_card' + type + ' ' + (type==3?'mr4':'')" @click.stop="goToProduct" :data-goodsId="item.goods_id" v-for="(item, index) in good_list" :key="index">
      <view :class="'good_pic' + type + ' mb12 good_pic inequacy_wrap'" :style="'background-image:url(' + iconURL + '/cstp.png)'">
          <image class="goods_lable" v-if="item.goods_lable.length>0" :src="item.goods_lable"></image>
          <view class="discount_label" v-if="item.img_content&&item.img_content.length>0 && type != 3">{{item.img_content}}</view>
        <image lazy-load="true" mode="scaleToFill" :src="item.goods_img"></image>
        <view class="inequacy" v-if="item.is_enough==0">
          <image :src="iconURL + '/inequacy02.png'"></image>
        </view>

        <!-- <view class='prom_info' wx:if="{{item.prom_info.prom_label}}">{{item.prom_info.prom_label}}</view> -->
      </view>

      <view :class="'good_info' + type">
      <!--<view class='special_goods'>限时特价</view>-->
        <view class="title mb12">{{item.goods_name}}</view>
        <view class="price red-font-color mb24" :style="'text-align:' + align">
          <text :class="symbolSize">¥</text>
          <text :class="(symbolSize=='small'?'font_16w':'')">{{item.shop_type==0?item.shop_price:item.month_price+'/月'}}</text>
          <!-- <view class='tab' wx:if="{{item.is_special_price}}">特价</view> -->
          <!-- <view class='tab' wx:if="{{item.is_new}}">上新</view> -->
          <text v-if="item.shop_type == 0 && item.shop_price != item.market_price && !(type == 3 && item.is_special_price)" class="small sPrice">¥{{item.market_price}}</text>
        </view>
      </view>
    </view>
  </view>
</view>

<!-- class="good_card{{type}} {{(index+1)%type==0 ? '' : space}}" wx:for="{{list}}" wx:key="{{item.goods_id}}" -->
</template>

<script>
// components/goodList3/goodList3.js

/**
 * type为2为两列列表
 * type为3为三列列表
 */
// var app = getApp().globalData;

export default {
  data() {
    return {
      iconURL: getApp().globalData.dataBase.iconURL,
      recommend_goods: []
    };
  },

  components: {},
  props: {
    list: {
      type: Array,
      value: [],
      observer: function (newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        if (newVal.length > 0) {
          var recommend_goods = this.rowFormat(this.properties.type, newVal);
          this.setData({
            recommend_goods
          });
        }
      }
    },
    align: {
      type: String,
      value: "left"
    },
    type: {
      type: Number,
      value: 3
    },
    symbolSize: {
      type: String,
      value: ""
    }
  },
  beforeMount: function () {
    var type = this.properties.type;
    var symbolSize = this.properties.symbolSize;
  },
  methods: {
    /**
     * 格式化一维数组为二维数组
     * colNum: 列数
     * arr：传入的总数组数
     * **/
    rowFormat(colNum, arr) {
      let FormatArr = [];
      let rowNum = arr.length / colNum;

      for (var i = 0; i < rowNum; i++) {
        FormatArr.push(new Array());

        for (var j = i * colNum; j < colNum * (i + 1); j++) {
          if (arr[j] != undefined) {
            FormatArr[i].push(arr[j]);
          }
        }
      }

      return FormatArr;
    },

    // 跳转商品页
    goToProduct(e) {
      var goodsid = e.currentTarget.dataset.goodsid;
      wx.navigateTo({
        url: '/pages/product/product?entryType=external&productId=' + goodsid
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
@import "./activeGoodsList.css";
</style>