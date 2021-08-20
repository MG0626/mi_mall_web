<template>
  <div class="buy">
    <div class="container">
      <!-- 轮播图 -->
      <div class="carousel">
        <el-carousel height="560px" :interval="5000">
          <el-carousel-item v-for="img in detail.imgArr" :key="img">
            <el-image
              style="height: 100%;"
              :src="img"
              fit="">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 商品信息 -->
      <div class="info">
        <div class="name">{{detail.name}}</div>
        <div class="parmas">星幕锐影，多分区背光系统/高亮度原色屏/MEMC运动补偿/杜比视界/金属全面屏/远场语音</div>
        <div class="store">小米自营</div>
        <div class="price">{{currentPrice}}元</div>
        <div class="version">
          <div class="title">选择版本</div>
          <div class="list">
            <label :class="['item', currentVersion === item.name ? 'active' : '']" :for="item.name" v-for="item in detail.versions" :key="item.id">
              <input type="radio" name="version" :id="item.name" :value="item.name" v-model="currentVersion">
              <span>{{item.name}}</span>
            </label>
          </div>
        </div>
        <div class="color">
          <div class="title">选择颜色</div>
          <div class="list">
            <label :class="['item', currentColor === item ? 'active' : '']" :for="item" v-for="item in detail.colors" :key="item.id">
              <input type="radio" name="color" :id="item" :value="item" v-model="currentColor">
              <span>{{item}}</span>
            </label>
          </div>
        </div>
        <div class="summary">
          <div class="desc">
            <div>{{detail.name}} {{currentColor}} {{currentVersion}}</div>
            <div>{{currentPrice}}元</div>
          </div>
          <div class="total">总计： {{currentPrice}}元</div>
        </div>
        <div class="cart" @click="handleAddCart">加入购物车</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 商品信息
      detail: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        // 当前选择的版本
        currentVersion: '',
        // 当前选中的颜色
        currentColor: ''

      }
    },
    methods: {
      // 添加购物车
      async handleAddCart(){
        // 获取当前用户id
        const user_id = this.$store.state.info.id;
        // 商品单价
        const unit_price = this.currentPrice;
        // 商品id
        const goods_id = this.detail.id;
        // 当前版本和颜色
        const version = this.currentVersion;
        const color = this.currentColor;
        // 发起网络请求
        const { status } = await this.$http.post('/cart/add', {user_id, unit_price, goods_id, version, color});
        if(status !== 201){
          // 清除缓存
          window.localStorage.removeItem('info');
          window.localStorage.removeItem('token');
          // 清空
          this.$store.dispatch('updateUserInfo', {});
          this.$store.dispatch('updateToken', '');
          this.$message.error('身份信息已过期，请重新登录');
          // 跳转到登录页面
          this.$router.push('/user/login');
          return;
        };
        this.$message.success('添加成功');
        this.$store.dispatch('getCarts');
      }
    },
    mounted(){
      // 进入页面默认选中第一项
      if(this.detail.versions){
        this.currentVersion = this.detail.versions[0].name;
        this.currentColor = this.detail.colors[0];
      }
    },
    computed: {
      // 当前选中版本的价格
      currentPrice(){
        // 获取版本数据
        const versions = this.detail.versions || [];
        // 获取当前版本价格
        let price = 0;
        for (const item of versions) {
          if (item.name === this.currentVersion) {
            return price = item.price;
          }
        }
        return price;
      }
    },
    watch: {
      detail(value){
        // 进入页面默认选中第一项
        this.currentVersion = value.versions[0].name;
        this.currentColor = value.colors[0];
      }
    }
  }
</script>

<style lang="less" scoped>
.buy{
  padding-top: 32px;
  padding-bottom: 12px;
  font-size: 14px;
  background-color: #fff;
  .container{
    display: flex;
    justify-content: space-between;
  }
  .carousel{
    width: 48%;
  }
  .info{
    width: 48%;
    color: #333;
    .name{
      font-size: 24px;
      font-weight: 400;
      color: #212121;
      padding: 10px 0;
    }
    .parmas{
      color: #b0b0b0;
      line-height: 1.5;
    }
    .store{
      color: #ff6700;
      padding: 10px 0;
    }
    .price{
      font-size: 18px;
      line-height: 1;
      color: #ff6700;
      padding: 10px 0;
    }
    .version, .color{
      margin: 10px 0;
      .title{
        font-size: 18px;
      }
      .list{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item{
          width: 49%;
          height: 42px;
          line-height: 42px;
          color: #757575;
          border: 1px solid #e0e0e0;
          box-sizing: border-box;
          cursor: pointer;
          font-size: 16px;
          text-align: center;
          margin-top: 10px;
          input{
            display: none;
          }
        }

        // 选中后的样式
        .active{
          border-color: #ff6700;
          span{
            color: #ff6700;
          }
        }
      }
    }
    .summary{
      background: #f9f9fa;
      padding: 30px;
      margin: 30px 0;
      .desc{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        div{
          line-height: 30px;
          color: #616161;
        }
      }
      .total{
        color: #ff6700;
        font-size: 24px;
        padding-top: 20px;
      }
    }
    .cart{
      width: 298px;
      height: 52px;
      line-height: 52px;
      font-size: 16px;
      background-color: #ff6700;
      color: #fff;
      text-align: center;
      cursor: pointer;

      &:hover{
        background-color: #ff5120;
      }
    }
  }
}

</style>