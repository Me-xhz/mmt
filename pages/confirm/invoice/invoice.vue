<template>
<view class="invoice">
  <view class="topBorder"></view>
  <view class="invoiceType">
    <view class="Title">发票类型</view>
      <div @tap="invoiceType" data-type="none" :class="(typeTap == 'none' ? 'active' : '')">不开发票</div>
      <div @tap="invoiceType" data-type="paper" v-for="(item, index) in Invoicedata.type" :key="index" :class="(typeTap == 'paper' ? 'active' : '')">{{item.name}}</div>
  </view>
  <view class="invoiceUp" :hidden="typeTap != 'paper'">
    <view class="Title">发票抬头</view>
    <div @tap="invoiceUp" data-type="personal" :class="(upTap == 'personal' ? 'active' : '')">{{Invoicedata.title[0].name}}</div>
    <div @tap="invoiceUp" data-type="unit" :class="(upTap == 'unit' ? 'active' : '')">{{Invoicedata.title[1].name}}</div>
    <view :hidden="upTap != 'unit'">
      <input type="text" @blur="nuitName" placeholder="请填写你的单位名称" placeholder-style="color:#C8C8C8;" :value="companyName"></input>
      <view class="codeTitle Title">纳税人识别号</view>
      <input type="number" @blur="taxesCode" placeholder="请填写15-20位纳税人识别号" placeholder-style="color:#C8C8C8;" :value="taxesCode"></input>
    </view>
  </view>
  <view class="needKnow">
    <view>发票需知</view>
    <view>1.开发票金额为用户实际支付金额</view>
    <view>2.纸质发票会在确认收货后30个工作日内发出</view>
    <view>3.开单位抬头发票请填写纳税人识别号，以免影响报销</view>
  </view>
  <view class="save" @tap="saveInvoice">
    <button class="submit" type="warn">保存</button>
  </view>
</view>
</template>

<script>
var app = getApp().globalData;
var common = require("../../../utils/common.js");

export default {
  data() {
    return {
      paperInvoice: false,
      typeTap: 'none',
      upTap: 'personal',
      companyName: '',
      taxesCode: '',
      Invoicedata: "",
      invoiceData: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (option) {
    if (option == undefined || option.invoiceData == undefined) {
      common.toast("请求参数错误");
      return;
    }

    var that = this;

    if (option && option.invoiceData) {
      var data = JSON.parse(option.invoiceData);

      if (Object.keys(data).length > 0) {
        that.setData({
          typeTap: data.type,
          upTap: data.up,
          companyName: data.companyName,
          taxesCode: data.taxesCode
        });
      }
    }

    that.getInvoiceConfig();
  },
  methods: {
    // 获取发票信息
    getInvoiceConfig: function () {
      var that = this;
      var uri = app.getPath.getInvoiceConfig;
      common.ApiGateWayTest(uri, '', true, function (res) {
        if (res.statusCode == 200) {
          var res = res.data.result;
          that.setData({
            Invoicedata: res
          });
        }
      });
    },
    invoiceType: function (e) {
      var tap = e.currentTarget.dataset.type;
      this.setData({
        typeTap: tap
      });

      if (tap == 'none') {
        this.emptyContent(this);
      }
    },
    invoiceUp: function (e) {
      var tap = e.currentTarget.dataset.type;
      this.setData({
        upTap: tap
      });

      if (tap == 'personal') {
        this.emptyContent(this);
      }
    },
    //选择不开票或者个人时，清空单位名称与纳税识别号
    emptyContent: function (that) {
      that.setData({
        companyName: '',
        taxesCode: ''
      });
    },
    nuitName: function (e) {
      var name = e.detail.value;
      this.setData({
        companyName: name
      });
    },
    taxesCode: function (e) {
      var code = e.detail.value;
      this.setData({
        taxesCode: code
      });
    },
    saveInvoice: function () {
      if (this.upTap == 'unit' && this.companyName == '') {
        common.toast('单位名称不能为空');
        return;
      }

      if (this.upTap == 'unit' && this.taxesCode == '') {
        common.toast('纳税识别号不能为空');
        return;
      }

      var invoiceData = {
        type: this.typeTap == 'paper' ? '1' : '0',
        up: this.upTap,
        upName: this.upTap == 'unit' ? '单位' : '个人',
        upId: this.upTap == 'unit' ? '2' : '1',
        companyName: this.companyName,
        taxesCode: this.taxesCode
      };
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面

      var prevPage = pages[pages.length - 2]; //上一个页面

      prevPage.setData({
        invoiceData: invoiceData
      });
      wx.navigateBack();
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
@import "./invoice.css";
</style>