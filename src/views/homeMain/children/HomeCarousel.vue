<template>
  <div class="carousel">
    <div class="container">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in list" :key="item.id">
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
      }
    }
  }
}
</style>