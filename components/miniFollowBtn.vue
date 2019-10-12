<template>
<view>

  <component is="hideBtn"></component>
  <form @submit="pushFormSubmit" report-submit="true">
    <view class="btn-area">
      <button plain="true" formType="submit" :style="miniFollowBtn.style">{{miniFollowBtn.name}}</button>
    </view>
  </form>

</view>
</template>

<script>
    export default {
    		name: "miniFollowBtn",
    		props: ["item"]
    	}
</script>
