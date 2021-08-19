<template>
  <div class="footer">
    <div class="container">
      <div class="top">
        <div class="item"><i class="iconfont icon-weixiu"></i><span>预约维修服务</span></div>
        <div class="item"><i class="iconfont icon-7tiantuihuan"></i><span>7天无理由退货</span></div>
        <div class="item"><i class="iconfont icon-iconfont15tianwuliyoutuihuo1"></i><span>15天免费换货</span></div>
        <div class="item"><i class="iconfont icon-baoyou"></i><span>满69包邮</span></div>
        <div class="item"><i class="iconfont icon-pinzhibaozhang"></i><span>品质保证</span></div>
      </div>
      <div class="center">
        <dl class="row">
          <dt>帮助中心</dt>
          <dd>账户管理</dd>
          <dd>购物指南</dd>
          <dd>订单操作</dd>
        </dl>
        <dl class="row">
          <dt>服务支持</dt>
          <dd>售后政策</dd>
          <dd>自助服务</dd>
          <dd>相关下载</dd>
        </dl>
        <dl class="row">
          <dt>线下门店</dt>
          <dd>小米之家</dd>
          <dd>服务网点</dd>
          <dd>授权体验店</dd>
        </dl>
        <dl class="row">
          <dt>关于小米</dt>
          <dd>了解小米</dd>
          <dd>加入小米</dd>
          <dd>投资者关系</dd>
          <dd>企业社会责任</dd>
          <dd>廉洁举报</dd>
        </dl>
        <dl class="row">
          <dt>关注我们</dt>
          <dd>新浪微博</dd>
          <dd>官方微信</dd>
          <dd>联系我们</dd>
          <dd>公益基金会</dd>
        </dl>
        <dl class="row">
          <dt>特色服务</dt>
          <dd>F 码通道</dd>
          <dd>礼物码</dd>
          <dd>防伪查询</dd>
        </dl>
      </div>
      <div class="bottom">
        <div class="contact">
          <a href="mailto:1370636565@qq.com"><i class="iconfont icon-youxiang"></i></a>
          <a href="https://github.com/MG0626"><i class="iconfont icon-github"></i></a>
          <a href="http://wpa.qq.com/msgrd?v=3&uin=1370636565&site=qq&menu=yes"><i class="iconfont icon-QQ"></i></a>
        </div>
        <div class="copyright">版权所有 © 2012-2021</div>
        <div class="slogan">探索黑科技，小米为发烧而生</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="less" scoped>
.footer{
  background-color: #fff;
  .container{
    .top{
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 2px solid #f5f5f5;
      .item{
        display: flex;
        align-items: center;
        .iconfont{
          font-size: 24px;
          margin-right: 6px;
        }
        span{
          font-size: 16px;
        }
      }
    }
    .center{
      padding: 15px 0 0;
      display: flex;
      justify-content: space-between;
      .row{
        width: calc(100% / 6);
        text-align: center;
        dt{
          font-size: 14px;
          line-height: 1.25;
          color: #424242;
          margin-bottom: 20px;
        }
        dd{
          margin: 10px 0 0;
          font-size: 12px;
          color: #757575;
          cursor: pointer;

          &:hover{
            color: #ff6767;
          }
        }
      }
    }
    .bottom{
      .contact{
        height: 30px;
        line-height: 30px;
        width: 100px;
        margin: 10px auto;
        display: flex;
        justify-content: space-between;

        a{
          text-decoration: none;
          color: #333;
          .iconfont{
            font-size: 24px;
          }
        }
      }
      .copyright{
        text-align: center;
        color: #757575;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .slogan{
        clear: both;
        margin-bottom: 10px;
        width: 100%;
        height: 19px;
        text-align: center;
        text-indent: -9999em;
        background: url(https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/global/slogan2020.png) no-repeat center 0;
      }
    }
  }
}
</style>