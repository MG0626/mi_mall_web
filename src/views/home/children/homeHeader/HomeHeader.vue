<template>
  <div class="header">
    <!-- 最顶部导航栏 -->
    <div class="site-topbar">
      <div class="container">
        <div class="topbar-nav">
          <a href="#">小米商城</a>
          <a href="#">MIUI</a>
          <a href="#">IoT</a>
          <a href="#">云服务</a>
          <a href="#">天星数科</a>
          <a href="#">有品</a>
          <a href="#">小爱开放平台</a>
          <a href="#">企业团购</a>
          <a href="#">资质证照</a>
          <a href="#">协议规则</a>
          <a href="#">下载app</a>
          <a href="#">智能生活</a>
          <a href="#">Select Location</a>
        </div>
        <div class="topbar-cart">
          <router-link to="/cart">
            <i class="el-icon-shopping-cart-1"></i>
            <span>购物车</span>
            <span>(0)</span>
          </router-link>

          <div class="cart-menu">
            <el-row>
              <el-col></el-col>
              <el-col v-if="true" class="content">购物车中还没有商品，赶紧选购吧</el-col>
            </el-row>
          </div>
        </div>
        <div class="topbar-info">
          <!-- 用户登录后显示 -->
          <div class="user" v-if="$store.state.token">
            <div class="info">
              <div class="name">
                <span>{{$store.state.info.name}}</span>
                <i class="el-icon-arrow-down"></i>
              </div>

              <div class="menu">
                <div class="container">
                  <div class="item">个人中心</div>
                  <div class="item" @click="handleLogOut">退出登录</div>
                </div>
              </div>
            </div>
            <a href="#">我的列表</a>
          </div>
          <!-- 未登录显示 -->
          <div class="user" v-else>
            <router-link to="/user/login" >登录</router-link>
            <router-link to="/user/register">注册</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部导航栏 -->
    <div class="site-header">
      <div class="container">
        <div class="logo">
          <img src="../../../../assets/logo.png" alt="">
        </div>
        <div class="nav">
          <div class="item" @mouseenter="handleElMouseEnter(nav.children)" v-for="(nav, index) in navs" :key="index">
            <div class="title">{{nav.name}}</div>
          </div>

          <el-card class="list"  shadow="never">
            <el-row>
              <el-col v-for="item in nav_list" :key="item.id" :span="4" @click.native="handleToGoods(item.id)">
                <div class="image">
                  <el-image
                    :src="item.cover"
                    fit="contain"></el-image>
                </div>
                <div class="goods-name">{{item.name}}</div>
                <div class="price">{{item.price}}元起</div>
              </el-col>
            </el-row>
          </el-card>
        </div>
        <div class="search">
          <el-input>
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      navs: [],
      // 当前显示的数据
      nav_list: []
    }
  },
  created(){
    // 获取导航栏列表
    this.getNavList();
  },
  methods: {
    // 获取导航栏列表数据
    async getNavList(){
      const { data } = await this.$http.get('home/nav');
      this.navs = data;
    },
    // 处理鼠标悬停在nav项时，替换数据
    handleElMouseEnter(data){
      // 清空上次数据
      this.nav_list = [];
      this.nav_list = data;
    },
    // 点击跳转到商品页面
    handleToGoods(id){
      // 跳转，并且重新打开页面
      const { href } = this.$router.resolve(`/goods/${id}`);
      window.open(href, '_blank');
      // 让滚动条归零
      window.scrollTo(0, 0);
    },
    // 处理退出登录
    handleLogOut(){
      // 清除缓存
      window.localStorage.removeItem('info');
      window.localStorage.removeItem('token');
      // 返回首页
      window.open('/', '_self');
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  .site-topbar {
    width: 100%;
    height: 40px;
    font-size: 12px;
    color: #b0b0b0;
    background: #333;
    .container {
      width: 1226px;
      height: 100%;
      line-height: 40px;
      margin-right: auto;
      margin-left: auto;
    }
    a {
      text-decoration: none;
      color: #b0b0b0;
      margin: 0 5px;
      &:hover{
        color: #fff;
      }
    }
    .topbar-nav {
      height: 40px;
      line-height: 40px;
      float: left;
    }
    .topbar-cart{
      float: right;    
      width: 120px;
      height: 40px;
      margin-left: 15px;
      font-size: 12px;
      position: relative;
      a{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #b0b0b0;
        background: #424242;
        transition: all .5s;
        margin: 0;
      }
      .cart-menu{
        position: absolute;
        right: 0;
        top: 40px;
        z-index: 2;
        height: 0px;
        width: 316px;
        background-color: #fff;
        transition: height .3s;
        overflow: hidden;
        box-shadow: 0 2px 2px rgba(0, 0, 0, .1);

        .content{
          text-align: center;
          line-height: 100px;
          color: #000;
        }
      }

      &:hover{
        a {
          color: #ff6700;
          background-color: #fff;
        }
        .cart-menu{
          height: 100px;
        }
      }
    }
    .topbar-info{
      float: right;
      display: flex;

      .user{
        display: flex;
        .info{
          margin: 0 5px;
          position: relative;
          width: 110px;
          text-align: center;
          .name{
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              margin: 0 5px;
            }
            &:hover{
              color: #ff6700;
            }
          }
          .menu{
            width: 110px;
            position: absolute;
            top: 40px;
            z-index: 3;
            color: #000;
            height: 0;
            transition: height .5s;
            overflow: hidden;
            box-shadow: 0 2px 2px rgba(0, 0, 0, .05);
            .container{
              width: 100%;
              background-color: #fff;
              .item{
                height: 30px;
                line-height: 30px;
                opacity: 0;
                cursor: pointer;
                transition: opacity .5s;
                &:hover{
                  color: #ff6700;
                  background-color: #F5F5F5;
                }
              }
            }
          }
          &:hover{
            color: #000;
            background-color: #fff;
            .menu{
              height: 60px;
              .container{
                .item{
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }

  .site-header{
    width: 100%;
    height: 100px;
    position: relative;

    .container {
      width: 1226px;
      height: 100%;
      margin-right: auto;
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .logo{
        img{
          width: 56px;
          height: 56px;
        }
      }

      .nav{
        display: flex;
        &:hover{
          .list{
            padding: 10px 0;
            height: 230px;
            border: 1px solid #EBEEF5;
          }
        }
        .item{
          padding: 0 10px;
          .title{
            cursor: pointer;
            height: 100px;
            line-height: 100px;
          }
          &:hover{
            color: #ff6700;
          }
        }
        .list{
            position: absolute;
            top: 100px;
            left: 0;
            z-index: 3;
            width: 100vw;
            height: 0;
            display: flex;
            align-items: center;
            transition: height .5s ease;
            border: 0;
            box-sizing: border-box;
            overflow: hidden;

            .el-row{
              width: 100vw;
              .el-col{
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                .image{
                  width: 160px;
                  height: 110px;
                  margin: 0 auto 16px;
                  text-align: center;
                  .el-image{
                    width: 160px;
                    height: 110px;
                  }
                }
                .goods-name{
                  color: #333;
                  padding: 5px 0;
                }
                .price{
                  color: #ff6700;
                }
              }
            }
          }
      }
    }
  }
}
</style>
