<template>
<view>

  <component is="hideBtn"></component>

  <form @submit="pushFormSubmit" report-submit="true">
    <view class="btn-area">
      <button data-name="miniSubscribeBtn" :data-id="miniSubscribeBtn.id" plain="true" formType="submit" :style="miniSubscribeBtn.style">{{miniSubscribeBtn.name}}</button>
    </view>
  </form>

</view>
</template>

<script>
    export default {
    		name: "miniSubscribeBtn",
    		props: ["item"]
    	}
</script>
