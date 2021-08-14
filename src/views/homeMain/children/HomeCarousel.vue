<template>
  <div class="carousel">
    <div class="container">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in list" :key="item.id" @click.native="handleToGoods(item.goods_id)">
          <el-image
            :src="item.url"
            fit="contain">
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        // 轮播图数据
        list: []
      }
    },
    created(){
      // 获取轮播图数据
      this.getCarouselData();
    },
    methods: {
      // 获取轮播图数据
      async getCarouselData(){
        const { data } = await this.$http.get('home/carousel');
        this.list = data;
      },
      // 点击跳转到商品页面
      handleToGoods(id){
        // 跳转，并且重新打开页面
        const { href } = this.$router.resolve(`/goods/${id}`);
        window.open(href, '_blank');
        // 让滚动条归零
        window.scrollTo(0, 0);
      }
    }
  }
</script>

<style lang="less" scoped>
.carousel{
  margin-bottom: 30px;
  .container{
    .el-carousel{
      .el-carousel__item {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>