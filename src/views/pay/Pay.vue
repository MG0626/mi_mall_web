<template>
  <div class="pay">
    <!-- 顶部导航栏 -->
    <nav-bar>
      <h2>支付订单</h2>
    </nav-bar>
    <!-- 订单信息 -->
    <div class="container">
      <div class="order-info">
      <div class="left"><i class="el-icon-circle-check"></i></div>
      <div class="center" v-if="info.address">
        <div class="title">订单提交成功！去付款咯～</div>
        <div class="desc">
          <div class="order">
            <div class="name">订单号</div>
            <div class="order-number">{{info.order_number}}</div>
          </div>
          <div class="info">
            <div class="name">收货信息</div>
            <div class="msg">{{info.address.name}} {{info.address.tel}} {{info.address.address.join('')}} {{info.address.full_address}}</div>
          </div>
          <div class="goods-name">
            <div class="name">商品名称</div>
            <div class="list">
              <div class="goods-item" v-for="item in info.goods_list" :key="item.goods_id">{{item.goods_info.name}} {{item.version}} {{item.color}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/navBar/NavBar.vue'
  export default {
    components: { NavBar },
    data(){
      return {
        // 订单信息
        info: {}
      }
    },
    created(){
      // 获取当前订单信息
      this.getCurrentOrderInfo();
    },
    methods: {
      // 获取当前订单信息
      async getCurrentOrderInfo(){
        // 获取订单号
        const orderNumber = this.$route.params.order;
        // 获取数据
        const { data } = await this.$http.get(`/pay/order/${orderNumber}`);
        console.log(data);
        this.info = data;
      }
    }
  }
</script>

<style lang="less" scoped>

</style>