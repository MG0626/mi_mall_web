<template>
  <div class="main">
    <!-- 轮播图区域 -->
    <home-carousel />
    <!-- 商品区域 -->
    <goods-list />
  </div>
</template>

<script>
import GoodsList from './children/GoodsList.vue';
import HomeCarousel from './children/HomeCarousel.vue';
export default {
  components: { GoodsList, HomeCarousel },
};
</script>

<style lang="less" scoped>
.main {
  background-color: #fff;
}
</style>
