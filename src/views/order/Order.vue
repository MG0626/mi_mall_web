<template>
  <div class="order">
    <div class="container">
      <h2 class="title">我的订单</h2>
      <div class="tabs">
        <div 
          :class="['tab', currentTab === index ? 'tab-active' : '']" 
          @click="handleTabClick(index)"
          v-for="(tab, index) in tabs" 
          :key="index">
          {{tab.name}}
        </div>
      </div>
      <div class="tab-content">
        <div class="order-item" v-for="item in list" :key="item.id">
          <div class="header">
            <div class="left">
              <div class="order-number">
                <div class="title">订单编号：</div>
                <div class="value">{{item.order_number}}</div>
              </div>
              <div class="time">
                <div class="title">下单时间：</div>
                <div class="value">{{item.createAt | time}}</div>
              </div>
              <div class="info">
                <div class="title">收货信息：</div>
                <div class="value">{{item.address.name}} {{item.address.tel}} {{item.address.address.join('')}} {{item.address.full_address}}</div>
              </div>
              <div class="type" v-if="item.type">
                <div class="title">支付方式：</div>
                <div class="value">{{item.type}}</div>
              </div>
            </div>
            <div class="right">
              <div class="remove" @click="handleRemove(item.id)"><i class="el-icon-close"></i></div>
              <div class="status">
                <div class="value">{{item.is_status === 0 ? '待支付' : item.is_status === 1 ? '已付款' : '已完成'}}</div>
              </div>
              <div class="total">
                <div class="value">{{item.total}} 元</div>
              </div>
              <div class="pay" v-if="item.is_status === 0"><router-link :to="'/pay/' + item.order_number">去付款</router-link></div>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="list">
            <div class="goods-item" v-for="goods in item.goods_list" :key="goods.goods_id">
              <div class="img">
                <img :src="goods.goods_info.cover"/>
              </div>
              <div class="name">{{goods.goods_info.name}} {{goods.version}} {{goods.color}}</div>
              <div class="price">{{goods.unit_price}}元 x {{goods.count}}</div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="list.length === 0">没有相关订单</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        // 订单列表
        list: [],
        // tab列表
        tabs: [
          {
            name: '全部订单',
            status: null
          },
          {
            name: '待支付',
            status: 0
          },
          {
            name: '已付款',
            status: 1
          },
          {
            name: '已完成',
            status: 2
          }
        ],
        // 当前选择的tab
        currentTab: 0
      }
    },
    created(){
      // 获取订单列表
      this.getOrderList();
    },
    methods: {
      // 获取订单列表
      async getOrderList(status){
        const { data } = await this.$http(`/pay/list/${this.$store.state.info.id}${status || status === 0 ? `?status=${status}` : ''}`);
        this.list = data;
      },
      // tab的点击事件
      handleTabClick(index){
        this.currentTab = index;
        // 获取对应数据
        const { status } = this.tabs[index];
        this.getOrderList(status);
      },
      // 删除订单
      handleRemove(id){
        this.$confirm('确定该订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { status } = await this.$http.delete(`/pay/order/delete/${id}`);
          if(status !== 200) return this.$message.error('删除失败');
          this.$message.success('删除成功');
          // 重新获取数据
          this.getOrderList();
        })
      }
    },
    filters: {
      time(value){
        const time = new Date(value);
        // 年
        const y = time.getFullYear();
        // 月
        const m = time.getMonth() + 1;
        // 日
        const d = time.getDate();
        // 时
        const hh = time.getHours();
        // 分
        const mm = time.getMinutes();
        // 秒
        const ss = time.getSeconds();
        // 格式化为两位
        const format = (v) => v.toString().length === 1 ? `0${v}` : v;

        return `${y}/${m}/${d} ${format(hh)}:${format(mm)}:${format(ss)}`;
      }
    }
  }
</script>

<style lang="less" scoped>
.order{
  margin: 30px 0;
  .container{
    background-color: #fff;
    & > .title{
      margin: 0;
      padding: 20px 30px 0;
      color: #424242;
    }
    .tabs{
      height: 40px;
      padding: 15px 30px 0;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #757575;
      .tab-active{
        color: #ff6700;
      }
      .tab{
        padding: 0 20px;
        position: relative;
        cursor: pointer;
        &::after{
          content: '';
          display: block;
          width: 1px;
          height: 10px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          border-right: 1px solid #757575;
        }
        &:nth-child(1){
          padding-left: 0;
        }
        &:nth-child(4){
          &::after{
            display: none;
          }
        }
        &:hover{
          color: #ff6700;
        }
      }
    }
    .tab-content{
      padding: 15px 30px 20px;
      .order-item{
        padding: 15px 0;
        margin-bottom: 20px;
        border: 1px solid #e5e5e5;
        .header{
          padding: 0 30px 15px;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          position: relative;
          & > div{
            flex: 1;
            & > div{
              height: 25px;
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #626262;
            }
          }
          .left{
            flex: 2;
            .order-number{
              .value{
                color: #ff6700;
              }
            }
            .title{
              width: 80px;
            }
          }
          .right{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            .status{
              font-size: 20px;
            }
            .total{
              margin-top: 10px;
              .value{
                font-size: 16px;
                color: #ff6700;
              }
            }
            .remove{
              position: absolute;
              top: -15px;
              right: 5px;
              i{
                font-size: 12px;
                cursor: pointer;
                &:hover{
                  color: #ff6700;
                }
              }
            }
            .pay{
              margin-top: 10px;
              width: 60px;
              background-color: #ff6700;
              font-size: 12px;
              cursor: pointer;
              justify-self: center;
              justify-content: center;
              a{
                text-decoration: none;
                color: #fff;
              }
              &:hover{
                background-color: #ff5120;
              }
            }
          }
        }
        .list{
          margin: 15px 0 0;
          padding: 0 30px;
          .goods-item{
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #626262;
            &:last-child{
              margin-bottom: 0;
            }
            .img{
              width: 80px;
              img{
                width: 100%;
              }
            }
            .name{
              margin: 0 15px;
            }
          }
        }
      }
      .empty{
        color: #b0b0b0;
        font-size: 12px;
      }
    }
  }
}
</style>