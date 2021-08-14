<template>
  <div class="cart">
    <!-- 头部区域 -->
    <div class="header">
      <div class="container">
        <a class="logo" href="/"><img src="../../assets/logo.png" width="100%" /></a>
        <div class="title">
          <h2>我的购物车</h2>
          <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
        <div class="nav">
          <div class="info">
            <div class="name">
              <span>{{ $store.state.info.name }}</span>
              <i class="el-icon-arrow-down"></i>
            </div>

            <div class="menu">
              <div class="menu-list">
                <div class="item">个人中心</div>
                <div class="item">退出登录</div>
              </div>
            </div>
          </div>
          <a href="#">我的订单</a>
        </div>
      </div>
    </div>
    <!-- 购物车列表区域 -->
    <div class="cart-list" v-if="$store.state.carts.length !== 0">
      <div class="container">
        <div class="list">
          <div class="row-header">
            <div class="select">选择商品</div>
            <div class="name">商品名称</div>
            <div class="price">单价</div>
            <div class="count">数量</div>
            <div class="total">小计</div>
            <div class="operation">操作</div>
          </div>
          <div class="item-row">
            <div class="col" v-for="item in list" :key="item.id">
              <div class="select">
                <el-checkbox v-model="item.is_status" @change="handleSelectChange($event, item.id)"></el-checkbox>
              </div>
              <div @click="handleClick(item.goods_id)" class="name">
                <img :src="item.goods_info.cover"  height="70px" />
                <div>{{item.goods_info.name + ' ' +  item.version + ' ' + item.color}}</div>
              </div>
              <div class="price">{{item.unit_price}}元</div>
              <div class="count">
                <el-input-number :min="1" size="small" v-model="item.count" @change="handleInputChange($event, item.id)"></el-input-number>
              </div>
              <div class="total">{{subtotal(item)}}元</div>
              <div class="operation" @click="handleDelete(item.id)"><div class="close"><i class="el-icon-close"></i></div></div>
            </div>
          </div>
        </div>
        <div class="bar">
          <div class="select-all">
            <el-checkbox v-model="value" @change="handleSelectAllChange">全选</el-checkbox>
          </div>
          <div class="center">
            <div class="count">共 <span>{{$store.state.carts.length}}</span> 件商品，已选择 <span>{{selectCount}}</span> 件</div>
            <div class="total">合计：<span>{{total}}</span>元</div>
          </div>
          <div class="buy">立即结算</div>
        </div>
      </div>
    </div>

    <!-- 购物车为空 -->
    <div class="empty" v-else>
      <div class="container">
        <div class="left"></div>
        <div class="right">
          <h2 class="desc">您的购物车还是空的！</h2>
          <router-link to="/">马上去购物</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      // 全选的值
      value: false
    }
  },
  created(){
    // 获取购物车列表
    this.getCarts();
  },
  methods: {
    // 获取购物车列表
    async getCarts(){
      this.$store.dispatch('getCarts');
    },
    // 点击跳转到商品详情页
    handleClick(id){
      // 跳转，并且重新打开页面
      const { href } = this.$router.resolve(`/goods/${id}`);
      window.open(href, '_blank');
    },
    // 商品选中状态改变时回调
    async handleSelectChange(value, id){
      await this.$http.put(`/cart/status/${id}`, {is_status: value});
    },
    // 全选状态改变回调
    handleSelectAllChange(value){
      // 改变所有商品状态
      this.list.forEach(v => {
        v.is_status = value;
        this.handleSelectChange(value, v.id);
      });
    },
    // 数量值改变的回调
    async handleInputChange(value, id){
      await this.$http.put(`/cart/count/${id}`, {count: value}); 
    },
    // 删除商品
    handleDelete(id){
      this.$confirm('确定从购物车中移除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`/cart/delete/${id}`);
        // 重新获取数据
        this.getCarts();
      })
    }
  },
  watch: {
    is_selectAll: {
      handler: function(value){
        this.value = value;
      },
      immediate: true
    }
  },
  computed: {
    // 购物车列表
    list(){
      return this.$store.state.carts;
    },
    subtotal(){
      return (row) => {
        const total = row.unit_price * row.count;
        return total;
      }
    },
    selectCount(){
      const length = this.list.filter(v => v.is_status === true).length;
      return length;
    },
    // 合计
    total(){
      // 获取选中的数据
      const arr = this.list.filter(v => v.is_status === true);
      // 总价
      let total = 0;
      // 计算总价
      arr.forEach(v => total += v.unit_price * v.count);
      return total;
    },
    // 是否全选
    is_selectAll(){
      return this.list.every(v => v.is_status === true);
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  padding-bottom: 20px;
  .header {
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    .container {
      height: 100px;
      display: flex;
      align-items: center;
      .logo {
        width: 48px;
        height: 48px;
      }
      .title {
        flex: 1;
        display: flex;
        align-items: center;
        h2 {
          margin: 0 0 0 40px;
          font-size: 28px;
          font-weight: 400;
          color: #424242;
        }
        span {
          height: 20px;
          line-height: 20px;
          margin-top: 15px;
          margin-left: 15px;
          color: #757575;
          font-size: 12px;
        }
      }
      .nav {
        display: flex;
        font-size: 12px;
        .info {
          margin: 0 15px;
          position: relative;
          width: 80px;
          text-align: center;
          border-right: 1px solid #ccc;
          .name {
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              margin: 0 5px;
            }
            &:hover {
              color: #ff6700;
            }
          }
          .menu {
            width: 80px;
            position: absolute;
            top: 30px;
            z-index: 3;
            color: #000;
            height: 0;
            transition: height 0.5s;
            overflow: hidden;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05);
            .menu-list {
              width: 100%;
              background-color: #fff;
              .item {
                height: 30px;
                line-height: 30px;
                opacity: 0;
                cursor: pointer;
                transition: opacity 0.5s;
                &:hover {
                  color: #ff6700;
                  background-color: #f5f5f5;
                }
              }
            }
          }
          &:hover {
            color: #000;
            background-color: #fff;
            .menu {
              height: 60px;
              .menu-list {
                .item {
                  opacity: 1;
                }
              }
            }
          }
        }
        a {
          text-decoration: none;
          color: #000;
          margin: 0 5px;
          &:hover{
            color: #ff6700;
          }
        }
      }
    }
  }
  .cart-list{
    margin-top: 50px;
    .container{
      background-color: #fff;
      .list{
        background-color: #fff;
        .row-header{
          height: 70px;
          display: flex;
          align-items: center;
          div{
            flex: 1;
            color: #424242;
            text-align: center;
            font-size: 14px;
          }
          .select{
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .item-row{
          .col{
            height: 100px;
            border-top: 1px solid #eee;
            display: flex;
            align-items: center;
            div{
              flex: 1;
              color: #424242;
              text-align: center;
              font-size: 14px;
            }
            .name{
              font-size: 18px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }
            .total{
              color: #ff6700;
            }
            .operation{
              .close{
                width: 24px;
                height: 24px;
                line-height: 24px;
                border-radius: 50%;
                text-align: center;
                margin: 0 auto;
                i{
                  font-size: 14px;
                }
                &:hover{
                  color: #fff;
                  background-color: red;
                }
              }
            }
          }
        }
        .row-header, .item-row .col{
          color: #424242;
          .select{
            flex: none;
            width: 110px;
          }
          .name{
            flex: 2;
            padding: 0 10px;
          }
          .operation{
            flex: none;
            width: 96px;
            text-align: center;
            margin-right: 10px;
          }
        }
      }
      .bar{
        border-top: 20px solid #f5f5f5;
        height: 50px;
        color: #757575;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .select-all{
          width: 110px;
          text-align: center;
          position: relative;
          &::after{
            content: '';
            height: 10px;
            display: block;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            border-right: 1px solid #ccc;
          }
        }
        .center{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 35px;
          font-size: 14px;
          .count{
            span{
              color: #ff6700;
            }
          }
          .total{
            color: #ff6700;
            span{
              font-size: 24px;
            }
          }
        }
        .buy{
          width: 200px;
          line-height: 50px;
          background-color: #ff6700;
          color: #fff;
          text-align: center;
          font-size: 18px;
          cursor: pointer;
          &:hover{
            background-color: #ff5120;
          }
        }
      }
    }
  }
  .empty{
    .container{
      display: flex;
      padding: 65px 0 130px;
      .left{
        flex: 1;
        height: 273px;
        background: url(https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/cart/cart-empty.png) no-repeat 124px 0;
        color: #b0b0b0;
        overflow: hidden;
      }
      .right{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .desc{
          font-size: 36px;
          color: #b0b0b0;
        }
        a{
          text-decoration: none;
          display: block;
          width: 170px;
          height: 50px;
          line-height: 50px;
          background-color: #ff6700;
          color: #fff;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
}
</style>
