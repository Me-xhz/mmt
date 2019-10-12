<template>
<!--components/vcode/vcode.wxml-->
<view>
  <button @tap="getYzm" :class="'yzm ' + (disabled ? 'activited' : 'inactivity')" hover-class="none" :disabled="disabled">{{yzm_text}}</button>
</view>
</template>

<script>

export default {
  data() {
    return {
      yzm_text: '发送验证码',
      disabled: false
    };
  },

  components: {},
  props: {
    time: {
      type: Number,
      value: 60
    }
  },
  methods: {
    getYzm: function () {
      var that = this;
      var time = this.properties.time;
      var yzmTimer = setInterval(function () {
        time--;

        if (time == 0) {
          clearInterval(yzmTimer);
          that.setData({
            yzm_text: '重新获取',
            disabled: false
          });
        } else {
          that.setData({
            yzm_text: '已发送(' + time + ')',
            disabled: true
          });
        }
      }, 1000);
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
@import "./vcode.css";
</style>