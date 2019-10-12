<template>
<view>
<view class="row arrival-header">
  <input :value="inputValue" maxlength="12" class="arrival-input" @input="arrivalInput" type="text" placeholder="请输入提货箱一维码"></input>
  <view @tap="scanCode" class="sys-btn">扫码</view>
</view>
<view class="arrival-list" v-for="(item, index) in itemList" :key="index">
    <text class="arrival-time">{{item.box_finish_time}}</text>
    <view class="row-wrap arrival-box">
        <view class="positionR" v-for="(list, index2) in item.box_list" :key="index2" @tap="list.status == 2?'':'goArrivalOrder'" :data-box_sn="list.box_sn" v-if="list.count>0">
            <view v-if="list.status == 2" class="iconfont icon-xiangbox60 arrival-icon"></view>
            <view v-else class="iconfont icon-xiangbox59 arrival-icon icon-color"></view>
            <view :class="'arrival-name ' + (list.status == 2 ? 'active' : '')">
             <view class="box-name">{{list.pickup_logogram}}</view>
             <view class="box-number">{{list.box_name}}</view>
            </view>
            <view class="arrival-orderNum">{{list.count}}</view>
        </view>
    </view>
</view>

<loading v-if="loadingShow"></loading>
</view>
</template>

<script>
const app = getApp().globalData;
const common = require("../../utils/common.js");

export default {
  data() {
    return {
      itemList: [],
      inputValue: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    this.getboxlist();
  },
  onShow: function () {},
  methods: {
    arrivalInput(e) {
      var that = this;
      var value = e.detail.value;
      const reg = /^[a-zA-Z]{2}\d{7}[a-zA-Z]{1}\d{2}$/;
      var content = "中转箱码为：" + value;
      var confirmText = "确认";

      if (value.length == 12 && reg.test(value) == false) {
        common.toast("请输入正确的提货箱码");
        return;
      } else if (value.length == 12 && reg.test(value) == true) {
        common.showModal(content, confirmText, function (res) {
          if (res.confirm) {
            that.confirmbox(value);
          } else {
            return;
          }
        });
        return;
      }
    },

    getboxlist() {
      common.showLoad(this);
      var that = this;
      var url = app.getPath.getboxlist;
      common.ApiLogistics(url, '', true, function (res) {
        if (res.success == 1) {
          that.setData({
            itemList: res.result.box_group_list
          });
        } else {
          common.toast(res.msg);
        }

        common.hideLoad(that);
      });
    },

    confirmbox(value) {
      common.showLoad(this);
      var that = this;
      var url = app.getPath.confirmbox;
      var data = {
        box_sn: value
      };
      common.ApiLogistics(url, data, true, function (res) {
        common.toast(res.msg);
        that.setData({
          inputValue: ""
        });

        if (res.success == 1) {
          that.getboxlist();
        }

        common.hideLoad(that);
      });
    },

    scanCode() {
      var that = this;
      wx.scanCode({
        success(res) {
          that.confirmbox(res.result);
        }

      });
    },

    goArrivalOrder(e) {
      var that = this;
      var box_sn = e.currentTarget.dataset.box_sn;
      wx.showModal({
        content: '箱子是否已经到达自提点？',
        cancelText: '确定',
        cancelColor: '#EB3C39',
        confirmText: '取消',
        confirmColor: '#000',
        success: function (res) {
          if (res.cancel) {
            that.confirmbox(box_sn);
            that.getboxlist();
          }
        }
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
@import "./arrival.css";
</style>