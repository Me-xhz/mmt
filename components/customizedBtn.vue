<template>
<view>

  <form @submit="pushFormSubmit" report-submit="true">
    <view class="btn-area">
      <button plain="true" formType="submit" :style="btn_style.style">{{btn_style.name}}</button>
    </view>
  </form>
  <component is="hideBtn"></component>

</view>
</template>

<script>
    export default {
    		name: "customizedBtn",
    		props: ["item"]
    	}
</script>
