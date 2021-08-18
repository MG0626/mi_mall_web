<template>
  <div class="goods" ref="goods">
    <!-- navBar区域 -->
    <nav-bar
      ref="navBarHidden"
      class="nav-bar-hidden"
      :name="detail.name"
      :currentComponent="currentComponent"
      @handleChangeComponent="handleChangeComponent"
    />
    <nav-bar
      ref="navBar"
      :name="detail.name"
      :currentComponent="currentComponent"
      @handleChangeComponent="handleChangeComponent"
    />
    <!-- 提示登录 -->
    <el-alert
      v-if="!$store.state.token"
      center
      type="info">
      <template #title>
        <div class="title">
          <span>为方便您购买，请提前登录，</span>
          <router-link to="/user/login">立即登录</router-link>
        </div>
      </template>
    </el-alert>
    <!-- 动态组件区域 -->
    <component :is="currentComponent" :detail="detail"></component>
  </div>
</template>

<script>
import Buy from './children/Buy.vue';
import Detail from './children/Detail.vue';
import NavBar from './children/navBar.vue';
export default {
  components: {
    NavBar,
    Buy,
    Detail,
  },
  data() {
    return {
      // 当前显示的组件
      currentComponent: 'buy',
      // 当前商品id
      id: 0,
      // 商品数据
      detail: {}
    };
  },
  created(){
    // 获取商品id
    this.id = this.$route.params.id;
    // 获取商品详情信息
    this.getGoodsDetail();
  },
  mounted() {
    // 监听nav-bar滚动
    this.handleNavBarScroll();
  },
  methods: {
    // 监听滚动
    handleNavBarScroll() {
      // 获取处理的元素
      const navBarEl = this.$refs.navBar;
      const navBarHiddenEl = this.$refs.navBarHidden;
      // 获取navBarEl当前所在的位置底部距离顶部的距离
      const currentY = this.$refs.goods.offsetTop + navBarEl.$el.offsetHeight;
      // 监听滚动
      const a = window.addEventListener('scroll', () => {
        // 查询navBarHiddenEl是否存在'nav-bar-active'类
        const is_active =
          navBarHiddenEl.$el.classList.value.indexOf('nav-bar-active') === -1;
        // 当滚动条离顶部的距离等于或大于时currentY时，显示另一个navBar(navBarHiddenEl)
        // 并且还没有存在nav-bar-active类，避免重复添加
        if (window.scrollY >= currentY && is_active) {
          // 给navBarHiddenEl的class添加nav-bar-active类
          navBarHiddenEl.$el.classList.add('nav-bar-active');
          navBarHiddenEl.$el.style.left = -window.scrollX + 'px';
        } else if (window.scrollY < currentY && !is_active) {
          // 当滚动条离顶部的距离小于时currentY时，并且存在nav-bar-active时，删除它
          navBarHiddenEl.$el.classList.remove('nav-bar-active');
        }
        // navBarHiddenEl存在'nav-bar-active'类时，由于使用的定位是fixed，横向滚动条滚动，默认情况下是固定不动的，这里动态设置它跟随着滚动
        if (!is_active) {
          navBarHiddenEl.$el.style.left = -window.scrollX + 'px';
        }
      });
    },
    // 接收navBar发射的事件，用于改变当前显示的组件
    handleChangeComponent(name) {
      this.currentComponent = name;
    },
    // 获取商品详情信息
    async getGoodsDetail(){
      const { data } = await this.$http.get(`/goods/${this.id}/detail`);
      this.detail = data;
      // 修改title
      // document.title = this.detail.name;
    }
  },
};
</script>

<style lang="less" >
.goods {
  position: relative;
  .nav-bar {
    transition: top 0.5s;
  }

  .nav-bar-hidden {
    position: fixed;
    top: -100px;
    left: 0;
    right: 0;
    z-index: 3;
  }
  .nav-bar-active {
    top: 0;
  }

  .el-alert{
    .el-alert__content{
      .el-alert__closebtn{
        position: static;
      }
    }
    .title{
      display: inline-block;
      margin: 5px;
      a{
        text-decoration: none;
        color: #ff6700;
      }
    }
  }
}
</style>
