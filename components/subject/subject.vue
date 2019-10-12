<template>
<!--components/subject/subject.wxml-->
<!-- 聚合专题，type=2 -->
  <view class="subject">
    <!-- 一个 -->
    <view v-if="subList.length==1">
      <navigator hover-class="none" class="pic3" :url="subURL + '?type=' + subList[0].subType + '&id=' + subList[0].id">
        <image :src="subList[0].img"></image>
      </navigator>
    </view>
    <!-- 两个 -->
    <view v-if="subList.length==2">
      <view class="row">
        <navigator hover-class="none" class="pic1" :url="subURL + '?type=' + subList[0].subType + '&id=' + subList[0].id">
          <image :src="subList[0].img"></image>
        </navigator>
        <navigator hover-class="none" class="pic1" :url="subURL + '?type=' + subList[1].subType + '&id=' + subList[1].id">
          <image :src="subList[1].img"></image>
        </navigator>
      </view>
    </view>
    <!-- 三个 -->
    <view v-if="subList.length==3">
      <view class="row">
        <navigator hover-class="none" class="pic1" :url="subURL + '?type=' + subList[0].subType + '&id=' + subList[0].id">
          <image :src="subList[0].img"></image>
        </navigator>
        <view>
          <navigator hover-class="none" class="pic2" :url="subURL + '?type=' + subList[1].subType + '&id=' + subList[1].id">
            <image :src="subList[1].img"></image>
          </navigator>
          <navigator hover-class="none" class="pic2" :url="subURL + '?type=' + subList[2].subType + '&id=' + subList[2].id">
            <image :src="subList[2].img"></image>
          </navigator>
        </view>
      </view>
    </view>
    <!-- 四个 -->
    <view v-if="subList.length==4">
      <view class="row mb6">
        <navigator hover-class="none" class="pic2" :url="subURL + '?type=' + subList[0].subType + '&id=' + subList[0].id">
          <image :src="subList[0].img"></image>
        </navigator>
        <navigator hover-class="none" class="pic2" :url="subURL + '?type=' + subList[1].subType + '&id=' + subList[1].id">
          <image :src="subList[1].img"></image>
        </navigator>
      </view>
      <view class="row">
        <navigator hover-class="none" class="pic2" :url="subURL + '?type=' + subList[2].subType + '&id=' + subList[2].id">
          <image :src="subList[2].img"></image>
        </navigator>
        <navigator hover-class="none" class="pic2" :url="subURL + '?type=' + subList[3].subType + '&id=' + subList[3].id">
          <image :src="subList[3].img"></image>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import goodlist from "../goodList/goodList";

export default {
  data() {
    return {
      subList: [],
      subURL: '/pages/projectPage/projectPage',
      subType: 3
    };
  },

  components: {
    goodlist
  },
  props: {
    list: {
      type: Array
    },
    type: Number
  },
  beforeMount: function () {
    var list = this.properties.list;
    list.forEach(function (item) {
      if (item.type == 1) {
        item.subType = 3;
      } else if (item.type == 2) {
        item.subType = 4;
      }
    });
    this.setData({
      subList: list
    });
  },
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
@import "./subject.css";
</style>