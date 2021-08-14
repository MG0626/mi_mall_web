<template>
  <div class="detail">
    <div class="container">
      <div class="content" v-html="detail.detail"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detail: {
        type: Object,
        default: '<p style="text-align: center">无</p>'
      }
    }
  }
</script>

<style lang="less" scoped>
.detail{
  .container{
    .content{
    }
  }
  
}
</style>