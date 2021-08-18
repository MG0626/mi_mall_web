<template>
  <div class="order">
    {{list}}
  </div>
</template>

<script>
  export default {
    data(){
      return {
        // 订单列表
        list: []
      }
    },
    created(){
      // 获取订单列表
      this.getOrderList();
    },
    methods: {
      // 获取订单列表
      async getOrderList(){
        const { data } = await this.$http(`/pay/list/${this.$store.state.info.id}`);
        this.list = data;
      }
    }
  }
</script>

<style lang="less" scoped>

</style>