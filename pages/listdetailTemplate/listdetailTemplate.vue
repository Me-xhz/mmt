<template>
<view name="listDetail">
  <view v-for="(lists, index) in shopList" :key="index">
    <div :class="'goodsCard ' + 'goodsCard'+indexs" v-for="(item, index) in lists" :key="index">
      <navigator hover-class="none" :url="'../product/product?entryType=external&productId=' + item.goods_id">
        <view class="images" :style="'background-image: url(' + item.img + ')'"></view>
        <view class="goodsName text_content_little color_large_dark_gray">{{item.goods_name}}</view>
        <view class="price text_content_normal color_large_dark_gray">
          <div class="shop_price">
            <i class="icon_rmb">¥</i>{{item.shop_price}}</div>
          <div class="market_price color_gray text_content_small">¥{{item.market_price}}</div>
        </view>
        <view class="Videoimg" v-if="item.has_video == 1">
          <image src="http://img.mall.surex.cn/cilicili_icons/icon_listVideo.png"></image>
        </view>
      </navigator>
    </div>
  </view>
</view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {},
  onLoad: function (options) {},
  methods: {
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
@import "./listdetailTemplate.css";
</style>