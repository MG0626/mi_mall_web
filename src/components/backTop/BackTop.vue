<template>
  <div
    class="back-top"
    :style="{ 'background-color': backgroundColor }"
    :class="{ radius: radius, shadow: shadow, hidden: !is_show }"
    @click="handleBackTop(time)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 圆角
    radius: {
      type: Boolean,
      default: true,
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    // 阴影
    shadow: {
      type: Boolean,
      default: true,
    },
    // 滚动到的距离显示backTop
    scrollY: {
      type: Number,
      default: 200
    },
    // 滚动时长
    time: {
      type: Number,
      default: 200
    }
  },
  data(){
    return {
      // 显示开关
      is_show: false
    }
  },
  mounted(){
    // 监听scroll滚动
    this.handleScrollEvent();
  },
  methods: {
    handleBackTop(time){
      const y = window.scrollY;
      
      const timer = setInterval(() => {
        window.scrollTo(0, window.scrollY - (y / 100));
        if (window.scrollY === 0) {
          clearInterval(timer);
        }
      }, time / 100);
      
    },
    // 监听scroll滚动
    handleScrollEvent(){
      window.addEventListener('scroll', () => {
        // 获取滚动条的纵轴位置
        const y = window.scrollY;
        // 判断当前的距离是否大于设定的距离，并且开关是false，这个时候打开开关
        if (y >= this.scrollY && !this.is_show) {
          // 打开开关
          this.is_show = true;
        }
        // 判断当前的距离是否小于设定的距离，并且开关是开的， 这个时候关闭开关
        if(y < this.scrollY && this.is_show){
          this.is_show = false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.back-top {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.radius {
  border-radius: 50%;
}

.shadow {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.hidden{
  display: none;
}


</style>
