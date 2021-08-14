<template>
  <div class="goods">
    <div class="container">
      <div class="item" v-for="item in goods" :key="item.id">
        <div class="category">{{ item.name }}</div>
        <el-row class="list" type="flex">
          <el-col :span="24 / 5" v-for="item2 in item.children" :key="item2.id">
            <el-card shadow="hover" :body-style="{ padding: 0 }" @click.native="handleToGoods(item2.id)">
              <el-image :src="item2.cover" fit="contain"></el-image>
              <div class="title">{{ item2.name }}</div>
              <div class="desc">{{ item2.goods_desc }}</div>
              <div class="price">{{ item2.price }}元</div>
            </el-card>
          </el-col>
          <el-col :span="24 / 5" v-if="item.children.length === 9">
            <el-card shadow="hover" :body-style="{ padding: 0 }" class="more"
              >浏览更多 <i class="el-icon-d-arrow-right"></i
            ></el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [],
    }
  },
  created() {
    // 获取商品列表
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      const { data } = await this.$http.get('home/goods');
      this.goods = data;
    },
    // 点击跳转到商品页面
    handleToGoods(id){
      // 跳转，并且重新打开页面
      const { href } = this.$router.resolve(`/goods/${id}`);
      window.open(href, '_blank');
      // 让滚动条归零
      window.scrollTo(0, 0);
    }
  },
};
</script>

<style lang="less" scoped>
.goods {
  color: #333;
  background-color: #f5f5f5f5;
  padding-bottom: 30px;
  .container {
    .item {
      .category {
        font-size: 22px;
        font-weight: 200;
        line-height: 58px;
      }

      .list {
        flex-wrap: wrap;
        .el-col {
          margin-right: 14px;
          &:nth-child(5n) {
            margin-right: 0;
          }
          .el-card {
            width: 234px;
            height: 300px;
            background: #fff;
            padding: 20px 0;
            margin-bottom: 14px;
            border: 0;
            box-sizing: border-box;
            color: #333;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            cursor: pointer;

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            .el-image {
              width: 160px;
              height: 160px;
            }
            div {
              margin: 0 10px 10px;
            }
            .desc {
              height: 18px;
              font-size: 12px;
              color: #b0b0b0;
            }
            .price {
              color: #ff6700;
            }
          }
          .more {
            font-size: 18px;
            line-height: 300px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
