<template>
  <div class="checkout">
    <!-- 头部区域 -->
    <nav-bar>
      <h2>确认订单</h2>
    </nav-bar>
    <!-- 主体内容区域 -->
    <div class="content">
      <div class="container">
        <!-- 收货地址 -->
        <div class="address">
          <div class="title">收货地址</div>
          <el-row :class="is_show ? 'active' : ''">
            <el-col 
              :class="['item', currentAddress === index ? 'active' : '']" 
              @click.native="currentAddress = index"
              :span="6" 
              v-for="(v, index) in address_list" 
              :key="v.id">
              <div class="name">{{v.name}}</div>
              <div class="tel">{{v.tel}}</div>
              <div class="address">{{v.address.join('')}}</div>
              <div class="full_address">{{v.full_address}}</div>
              <div class="btn">
                <div class="edit" @click="handleEdit(v)">修改</div>
                <div class="remove" @click="handleDeleteAddress(v.id)">删除</div>
              </div>
            </el-col>
            <el-col :span="6" class="add" @click.native="dialogVisible = true">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加新地址</span>
            </el-col>
          </el-row>
          <div class="more">
            <div class="down" v-if="!is_show" @click="is_show = true">显示更多地址<i class="el-icon-arrow-down"></i></div>
            <div class="up" v-else @click="is_show = false">收起更多地址<i class="el-icon-arrow-up"></i></div>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="goods-list">
          <div class="title">商品列表</div>
          <el-row>
            <el-col :span="24" v-for="item in payInfo.goods" :key="item.id">
              <div class="info">
                <div class="img"><img :src="item.goods_info.cover" width="100%" /></div>
                <div class="name">{{item.goods_info.name + ' ' +  item.version + ' ' + item.color}}</div>
              </div>
              <div class="unit_price">{{item.unit_price}}元 x {{item.count}}</div>
              <div class="price">{{item.unit_price * item.count}}元</div>
            </el-col>
          </el-row>
        </div>
        <!-- 配送方式 -->
        <div class="distribution">
          <div class="title">配送方式</div>
          <span>包邮</span>
        </div>
        <!-- 详情 -->
        <el-row class="detail">
          <el-col>
            <div class="name">商品件数：</div>
            <div class="money">{{payInfo.goods.length}}件</div>
          </el-col>
          <el-col>
            <div class="name">商品总价：</div>
            <div class="money">{{payInfo.total}}元</div>
          </el-col>
          <el-col>
            <div class="name">活动优惠：</div>
            <div class="money">-0元</div>
          </el-col>
          <el-col>
            <div class="name">优惠券抵扣：</div>
            <div class="money">-0元</div>
          </el-col>
          <el-col>
            <div class="name">运费：</div>
            <div class="money">-0元</div>
          </el-col>
          <el-col class="total">
            <div class="name">应付总额：</div>
            <div class="money">{{payInfo.total}}元</div>
          </el-col>
        </el-row>
        <!-- 底部按钮区域 -->
        <div class="btn">
          <div class="back-cart" @click="$router.go(-1)">返回购物车</div>
          <div class="settlement" @click="handleSettlement">去结算</div>
        </div>
      </div>
    </div>

    <!-- 添加新地址的dialog -->
    <el-dialog
      :title="is_edit ? '修改收货地址' : '添加收货地址'"
      :visible.sync="dialogVisible"
      @close="handleDialogClose"
      width="40%">
      <el-form ref="form" :model="addressInfo" label-position="right" :rules="rules">
        <el-form-item label="姓名" prop="name" label-width="80px">
          <el-input v-model="addressInfo.name"  placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="tel" label-width="80px">
          <el-input v-model="addressInfo.tel" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address" label-width="80px">
          <el-cascader
            v-model="addressInfo.address"
            :options="city"
            :props="props"
            placeholder="请选择选择省 / 市 / 区（县）"
            style="width: 100%"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="full_address" label-width="80px">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入详细地址"
            v-model="addressInfo.full_address">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddAddress">确 定</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script>
// 顶部导航
import NavBar from '../../components/navBar/NavBar.vue';
// 省市区/县数据
import city from '../../utils/citydata';
  export default {
    data(){
      // 验证手机号
      var validateTel = (rule, value, callback) => {
        // 判断是否为空
        if(value === '' || !value) callback(new Error('请输入电话号码'));
        // 验证手机号的正则表达式
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        // 判断是否合法
        if (!reg.test(value)) {
          return callback(new Error('电话号码格式有误'));
        }
        callback();
      };
      return {
        // 是否显示更多地址
        is_show: false,
        // 结算的信息
        payInfo: {},
        // 地址列表
        address_list: [],
        // 选中的地址
        currentAddress: 0,
        // 添加或修改地址的dialog开关
        dialogVisible: false,
        // 编辑开关
        is_edit: false,
        // 当前编辑的地址id
        currentAddressId: 0,
        // 地址信息
        addressInfo: {
          name: '',
          tel: null,
          address: '',
          full_address: ''
        },
        // 级联选择器数据
        city: city,
        // 级联选择器配置
        props: { 

          expandTrigger: 'hover'
        },
        // 验证规则
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          tel: [
            { required: true, validator: validateTel, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请选择选择省 / 市 / 区（县）', trigger: 'blur' }
          ],
          full_address: [
            { required: true, message: '请输入详细地址', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      // 修改title
      document.title = '填写订单信息';
      // 获取结算信息
      this.getCurrentPayInfo();
      // 获取用户地址列表
      this.getUserAddress();
    },
    methods: {
      // 获取结算信息
      getCurrentPayInfo(){
        this.payInfo = this.$store.state.currentPayInfo;
      },
      // 获取地址列表
      async getUserAddress(){
        const {data} = await this.$http.get(`/address/list/${this.$store.state.info.id}`);
        this.address_list = data;
      },
      // 点击修改按钮
      handleEdit(row){
        // 填充数据
        const { id, name, tel, address, full_address } = row;
        this.addressInfo = {
          name,
          tel,
          address,
          full_address
        }
        // 保存当前修改的地址id
        this.currentAddressId = id;
        // 打开dialog
        this.is_edit = true;
        this.dialogVisible = true;
      },
      // 添加或修改地址
      handleAddAddress(){
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            // 判断当前是添加还是修改
            if (this.is_edit) {
              // 修改
              const { status } = await this.$http.put(`/address/update/${this.currentAddressId}`, this.addressInfo);
              // 判断是否成功
              if(status !== 200) return this.$message.error('修改失败');
              // 关闭dialog
              this.dialogVisible = false;
              this.$message.success('修改地址成功');
              // 关闭编辑
              this.is_edit = false;
            }else{
              // 添加
              const { status } = await this.$http.post(`/address/add/${this.$store.state.info.id}`, this.addressInfo);
              // 判断是否成功
              if(status !== 201) return this.$message.error('添加失败');
              // 关闭dialog
              this.dialogVisible = false;
              this.$message.success('添加新地址成功');
            }
            // 刷新地址列表
            this.getUserAddress();
          } else {
            return false;
          }
        });
      },
      // 关闭dialog回调
      handleDialogClose(){
        // 重置form
        this.$refs.form.resetFields();
        // 清空数据
        this.addressInfo = {
          name: '',
          tel: null,
          address: '',
          full_address: ''
        }
        this.currentAddressId = 0;
        // 关闭编辑
        this.is_edit = false;
      },
      // 删除地址
      handleDeleteAddress(id){
        this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const { status } = await this.$http.delete(`/address/delete/${id}`);
          // 判断是否成功
          if(status !== 200) return this.$message.error('删除失败');
          this.$message.success('删除成功');
          // 刷新地址
          this.getUserAddress();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 结算
      async handleSettlement(){
        // 整合数据
        const obj = {
          goods: this.payInfo.goods,
          total: this.payInfo.total,
          address: this.address_list[this.currentAddress]
        }
        const { data, status } = await this.$http.post(`/pay/order/${this.$store.state.info.id}`, obj);
        // 判断是否成功
        if(status !== 201) return this.$message.error(data);
        // 跳转到订单页
        this.$router.push(`/pay/${data.orderNumber}`);
      }
    },
    components:{
      NavBar
    }
  }
</script>

<style lang="less" scoped>
.checkout{
  .content{
    padding: 40px 0 60px;
    .container{
      background-color: #fff;
      padding: 30px;
      .title{
        color: #333;
        font-size: 18px;
      }
      .address{
        .el-row{
          height: 228px;
          overflow: hidden;
          padding: 30px 0 0;
          .el-col{
            width: 268px;
            height: 168px;
            padding: 20px;
            margin-left: 30px;
            margin-bottom: 30px;
            box-sizing: border-box;
            border: 1px solid #e0e0e0;
            cursor: pointer;
          }
          .active{
            border: 1px solid #ff6700;
          }
          .item{
            color: #757575;
            font-size: 14px;
            position: relative;
            div{
              margin: 10px 0;
            }
            .name{
              margin-top: 0;
              font-size: 18px;
              color: #333;
              line-height: 30px;
              margin-bottom: 10px;
            }
            .btn{
              position: absolute;
              bottom: 0;
              left: 0;
              right: 10px;
              z-index: 33;
              height: 20px;
              display: none;
              div{
                width: 40px;
                font-size: 12px;
                color: #ff6700;
              }
            }
            &:hover{
              .btn{
                display: flex;
              }
            }
          }
          .add{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #b0b0b0;
            font-size: 14px;
            cursor: pointer;
            i{
              font-size: 30px;
              margin-bottom: 5px;
            }
          }
        }
        .active{
          height: auto;
          overflow: auto;
        }
        .more{
          height: 50px;
          line-height: 50px;
          background-color: #eee;
          color: #424242;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
        }
      }
      .goods-list{
        margin-top: 30px;
        border-bottom: 1px solid #e0e0e0;
        .el-row{
          padding: 20px 0;
          color: #424242;
          font-size: 14px;
          .el-col{
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            & > div{ 
              flex: 1; 
              text-align: center;
            }
            
            .info{
              display: flex;
              align-items: center;
              .img{
                width: 60px;
              }
            }
            .price{
              color: #ff6700;
            }
          }
        }
      }
      .distribution{
        height: 100px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        .title{
          width: 120px;
        }
        span{
          color: #ff6700;
        }
      }
      .detail{
        height: 240px;
        margin: 0 20px;
        padding: 20px 0 0;
        border-bottom: 1px solid #e0e0e0;
        .el-col{
          height: 28px;
          display: flex;
          align-items: center;
          .name{
            width: 92%;
            text-align: right;
            color: #757575;
          }
          .money{
            flex: 1;
            text-align: right;
            color: #ff6700;
          }
        }
        .total{
          height: 80px;
          .money{
            font-size: 24px;
          }
        }
      }
      .btn{
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        div{
          width: 150px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          margin-left: 30px;font-size: 14px;
          cursor: pointer;
        }
        .back-cart{
          border: 1px solid #b0b0b0;
          color: #b0b0b0;
        }
        .settlement{
          background-color: #ff6700;
          color: #fff;
          &:hover{
            background-color: #ff5120;
          }
        }
      }
    }
  }
}
</style>