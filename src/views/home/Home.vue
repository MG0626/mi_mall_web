<template>
  <div class="home">
    <!-- 导航栏区域 -->
    <home-header />
    <!-- 内容区域 -->
    <router-view />
    <!-- 尾部区域 -->
    <home-footer />
  </div>
</template>

<script>
import HomeFooter from './children/homeFooter/homeFooter.vue';
import HomeHeader from './children/homeHeader/HomeHeader.vue';
export default {
  components: { HomeHeader, HomeFooter }
};
</script>

<style lang="less" scoped>
.home{
  
}
</style>
