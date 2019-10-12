<template>
<view>

  <form v-for="(item, index) in hideBtnData.length" :key="index" @submit="hidepushFormSubmit" report-submit="true">
    <view class="btn-area">
      <button plain="true" formType="submit" :style="hideBtnData.length[index]"></button>
    </view>
  </form>

</view>
</template>

<script>
    export default {
    		name: "hideBtn",
    		props: ["item"]
    	}
</script>
