<template>
  <div class="home">
    <!-- 导航栏区域 -->
    <home-header />
    <!-- 内容区域 -->
    <router-view />
    <!-- 尾部区域 -->
    <home-footer />
    <!-- 回到顶部 -->
    <!-- <el-backtop target=".home">
      <div class="el-icon-top"></div>
    </el-backtop> -->
    <back-top>
      <div class="el-icon-top"></div>
    </back-top>
  </div>
</template>

<script>
import BackTop from '../../components/backTop/BackTop.vue';
import HomeFooter from './children/homeFooter/homeFooter.vue';
import HomeHeader from './children/homeHeader/HomeHeader.vue';
export default {
  components: { HomeHeader, HomeFooter, BackTop }
};
</script>

<style lang="less" scoped>
.home{
  // position: relative;
  .back-top{
    position: fixed;
    bottom: 44px;
    right: 24px;
    &:hover{
      color: #ff6700;
    }
  }
}
</style>
