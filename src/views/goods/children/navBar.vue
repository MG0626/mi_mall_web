<template>
  <div class="nav-bar">
    <div class="container">
      <!-- 导航栏区域 -->
      <div class="header">
        <div class="title">{{name}}</div>
        <div class="nav">
          <div class="detail" v-if="currentComponent === 'buy'" @click="handleChangeComponent('detail')">概述页</div>
          <div class="buy" v-else @click="handleChangeComponent('buy')">立即购买</div>
        </div>
      </div>
      <!-- 动态组件区域 -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 当前显示的组件
    currentComponent: {
      type: String,
      default: 'buy'
    },
    // 商品信息
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 切换组件
    handleChangeComponent(name){
      this.$emit('handleChangeComponent', name);
    }
  }
};
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
        height: 30px;
        color: #616161;
        font-size: 14px;
        cursor: pointer;

        .detail {
          line-height: 30px;
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
