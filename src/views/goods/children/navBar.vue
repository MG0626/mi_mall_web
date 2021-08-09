<template>
  <div class="nav-bar">
    <div class="container">
      <!-- 导航栏区域 -->
      <div class="header">
        <div class="title">小米11 Ultra</div>
        <div class="nav">
          <div class="detail">概述页</div>
          <div class="buy">立即购买</div>
        </div>
      </div>
      <!-- 动态组件区域 -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nav-bar {
  height: 60px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
  box-sizing: border-box;
  .container {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        font-size: 18px;
        font-weight: 400;
        line-height: 60px;
      }

      .nav {
        width: 180px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #616161;
        font-size: 14px;
        cursor: pointer;

        .detail {
          &:hover {
            color: #ff6700;
          }
        }

        .buy {
          padding: 7px 15px;
          font-size: 12px;
          color: #fff;
          background-color: #ff6700;
          &:hover {
            background-color: #ff5120;
          }
        }
      }
    }
  }
}
</style>
