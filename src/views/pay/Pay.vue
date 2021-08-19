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
          <h2 class="title">订单提交成功！去付款咯～</h2>
          <div class="desc">
            <div class="order">
              <div class="name">订单号：</div>
              <div class="order-number">{{info.order_number}}</div>
            </div>
            <div class="info">
              <div class="name">收货信息：</div>
              <div class="msg">{{info.address.name}} {{info.address.tel}} {{info.address.address.join('')}} {{info.address.full_address}}</div>
            </div>
            <div class="goods-name">
              <div class="name">商品名称：</div>
              <div class="list">
                <div class="goods-item" v-for="item in info.goods_list" :key="item.goods_id">{{item.goods_info.name}} {{item.version}} {{item.color}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">应付总额：<span>{{info.total}}</span>元</div>
      </div>

      <!-- 支付方式 -->
      <div class="confirm-pay">
        <div class="cash-title">选择以下支付方式付款</div>
        <div class="cash-list">
          <div class="cash-item" @click="handlePay(item.name)" v-for="(item, index) in pay_list" :key="index">
            <img :src="item.imgUrl" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- 尾部 -->
    <custom-footer />
  </div>
</template>

<script>
import CustomFooter from '../../components/customFooter/CustomFooter.vue';
import NavBar from '../../components/navBar/NavBar.vue'
  export default {
    components: { NavBar, CustomFooter },
    data(){
      return {
        // 订单信息
        info: {},
        // 支付方式列表
        pay_list: [
          {
            name: '支付宝',
            imgUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png',
          },
          {
            name: '小米钱包',
            imgUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9a4f743d0bdb5c048ad9803914a4ea83.jpg'
          },
          {
            name: '微信', 
            imgUrl: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg'
          }
        ]
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
        const { data, status } = await this.$http.get(`/pay/order/${orderNumber}`);
        // 判断
        if(status !== 200){
          this.$message.success('已经付款过了~');
          return this.$router.go(-1);
        }
        console.log(data);
        this.info = data;
      },
      // 付款
      async handlePay(type){
        // 获取订单号
        const orderNumber = this.$route.params.order;
        // 修改
        const { data, status } = await this.$http.put(`/pay/type/${orderNumber}?type=${type}`);
        if(status !== 200) return this.$message.error('付款失败，稍后重试');
        this.$message.success('付款成功');
        // 跳转到订单列表
        this.$router.push('/order');
      }
    }
  }
</script>

<style lang="less" scoped>
.pay{
  .container{
    .order-info{
      margin: 40px 0;
      height: 200px;
      background-color: #fff;
      display: flex;
      align-items: center;
      .left{
        width: 180px;
        text-align: center;
        font-size: 80px;
        color: #83c44e;
      }
      .center{
        flex: 1;
        color: #424242;
        .title{
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 400;
          line-height: 36px;
        }
        .desc{
          font-size: 13px;
          color: #616161;
          & > div{
            display: flex;
            margin: 10px 0;
            .name{
              margin-right: 10px;
            }
          }
          .order{
            .order-number{
              color: #ff6700;
            }
          }
          .goods-name{
            .list{
              div{
                margin-bottom: 5px;
              }
            }
          }
        }
      }
      .right{
        width: 150px;
        font-size: 14px;
        color: #757575;
        margin-right: 50px;
        span{
          color: #ff6700;
          font-size: 24px;
        }
      }
    }
    .confirm-pay{
      margin: 0 0 40px;
      padding: 0 40px;
      background-color: #fff;
      .cash-title{
        font-size: 18px;
        color: #424242;
        padding: 30px 0;
        border-bottom: 1px solid #e0e0e0;
      }
      .cash-list{
        padding: 40px 0;
        display: flex;
        .cash-item{
          width: 174px;
          height: 60px;
          line-height: 60px;
          margin-right: 14px;
          border: 1px solid #e0e0e0;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          &:hover{
            border-color: #ff6700;
          }
          img{
            width: 100%;
          }
        }
      }
    }
  }
}
</style>