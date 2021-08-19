<template>
  <div class="nav-bar">
    <div class="container">
      <a class="logo" href="/"><img src="../../assets/logo.png" width="100%" /></a>
      <div class="title">
        <slot></slot>
      </div>
      <div class="nav">
        <div class="info">
          <div class="name">
            <span>{{ $store.state.info.name }}</span>
            <i class="el-icon-arrow-down"></i>
          </div>

          <div class="menu">
            <div class="menu-list">
              <div class="item" @click="handleLogOut">退出登录</div>
            </div>
          </div>
        </div>
        <router-link to="/order">我的订单</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      // 处理退出登录
      handleLogOut(){
        // 清除缓存
        window.localStorage.removeItem('info');
        window.localStorage.removeItem('token');
        // 返回首页
        window.open('/', '_self');
      }
    }
  }
</script>

<style lang="less" scoped>
.nav-bar {
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
            height: 30px;
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
</style>