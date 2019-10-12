<template>

  <view class="WxEmojiView wxParse-inline" :style="item.styleStr">
    <block v-for="(item, index) in item.textArray" :key="index">
      <block :class="(item.text == '\\n' ? 'wxParse-hide':'')" v-if="item.node == 'text'">{{item.text}}</block>
      <block v-else-if="item.node == 'element'">
        <image lazy-load="true" class="wxEmoji" :src="item.baseSrc + '' + item.text"></image>
      </block>
    </block>
  </view>

</template>

<script>
    export default {
    		name: "WxEmojiView",
    		props: ["item"]
    	}
</script>
