<template>
<web-view :src="pageUrl" @load="pageSuccess"></web-view>
</template>

<script>
// pages/pageUrl/pageUrl.js
var app = getApp().globalData;
var common = require("../../utils/common.js");

export default {
  data() {
    return {
      pageUrl: ""
    };
  },

  components: {},
  props: {},
  onLoad: function (options) {
    // if (options == undefined || options.type == undefined) {
    //   common.toast("请求参数错误");
    //   return;
    // }
    this.type = options.type;

    if (options.share_title && options.share_title != 'undefined') {
      this.share_title = options.share_title;
    } else {
      this.share_title = '天天买买提';
    }

    if (options.pageUrl && options.pageUrl != 'undefined') {
      app.dataBase.pageUrl = options.pageUrl;
    }

    this.setData({
      pageUrl: app.dataBase.pageUrl
    });
  },
  onShareAppMessage: function (options) {
    if (this.type == 'activity') {
      return {
        title: this.share_title,
        path: '/pages/pageUrl/pageUrl?pageUrl=' + app.dataBase.pageUrl,
        success: function (res) {
          console.log('转发成功');
        }
      };
    } else if (this.type == 'video') {
      return {
        title: this.share_title,
        path: '/pages/index/index',
        success: function (res) {
          console.log('转发成功');
        }
      };
    }
  },
  methods: {
    pageSuccess: function () {
      // 领取纸巾推广跳回首页
      console.log(app.dataBase.pageUrl);

      if (app.dataBase.pageUrl == 'https://share.lltjs.com/app/index.php?i=2&c=entry&from=account&account=a450f613484aea3458ac7a7eba952d720d671557&xid=&do=entry&m=llt_afan') {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 5000);
      }
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
@import "./pageUrl.css";
</style>