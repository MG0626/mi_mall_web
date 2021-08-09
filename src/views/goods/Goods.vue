<template>
  <div class="goods">
    <nav-bar ref="navBarHidden" class="nav-bar-hidden" />
    <nav-bar ref="navBar"/>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
    <div>13</div>
    <div>14</div>
    <div>15</div>
    <div>16</div>
    <div>17</div>
    <div>18</div>
    <div>19</div>
    <div>20</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
    <div>13</div>
    <div>14</div>
    <div>15</div>
    <div>16</div>
    <div>17</div>
    <div>18</div>
    <div>19</div>
    <div>20</div>
    <div>12</div>
    <div>13</div>
    <div>14</div>
    <div>15</div>
    <div>16</div>
    <div>17</div>
    <div>18</div>
    <div>19</div>
    <div>20</div>
  </div>
</template>

<script>
import NavBar from './children/navBar.vue';
export default {
  components: {
    NavBar
  },
  mounted(){
    // 监听nav-bar滚动
    this.handleNavBarScroll();
  },
  methods: {
    // 监听滚动
    handleNavBarScroll(){
      // 获取处理的元素
      const navBarEl = this.$refs.navBar;
      const navBarHiddenEl = this.$refs.navBarHidden;
      // 获取navBarEl当前所在的位置底部距离顶部的距离
      const currentY = navBarEl.$el.offsetTop + 60;
      // 监听滚动
      const a=  window.addEventListener('scroll', () => {
        // 查询navBarHiddenEl是否存在'nav-bar-active'类
        const is_active = navBarHiddenEl.$el.classList.value.indexOf('nav-bar-active') === -1;

        // 当滚动条离顶部的距离等于或大于时currentY时，显示另一个navBar(navBarHiddenEl)
        // 并且还没有存在nav-bar-active类，避免重复添加
        if(window.scrollY >= currentY && is_active){
          // 给navBarHiddenEl的class添加nav-bar-active类
          navBarHiddenEl.$el.classList.add('nav-bar-active');
        }else if(window.scrollY < currentY && !is_active){
          // 当滚动条离顶部的距离小于时currentY时，并且存在nav-bar-active时，删除它
          navBarHiddenEl.$el.classList.remove('nav-bar-active');
        }
        // navBarHiddenEl存在'nav-bar-active'类时，由于使用的定位是fixed，横向滚动条滚动，默认情况下是固定不动的，这里动态设置它跟随着滚动
        if(!is_active){
          navBarHiddenEl.$el.style.left = - window.scrollX + 'px';
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.goods{
  position: relative;
  .nav-bar{
    transition: top .5s;
  }

  .nav-bar-hidden{
    position: fixed;
    top: -60px;
    left: 0;
    right: 0;
  }
  .nav-bar-active{
    top: 0;
  }
}
</style>
