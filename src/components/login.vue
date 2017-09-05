<template>
  <div class="login">
    <template>
      <mu-appbar title="登录"></mu-appbar>
      <img src="../assets/login.jpg" />
      <div class="form">
        <mu-text-field hintText="请输入手机号" type="number" icon="phone_iphone" fullWidth="true" /><br/>
        <mu-text-field hintText="请输入密码" type="number" icon="lock_outline" fullWidth="true"/><br/>
      </div>
      <div class="btn">
        <mu-raised-button label="登录" class="demo-raised-button" secondary fullWidth="true" />
      </div>
    </template>
  </div>
</template>

<script>

  export default {
    name: 'login'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mu-appbar{text-align: center}
  img{width: 100%}
  .mu-tabs{margin-top: 0;}
  .form{margin-top: 50px;padding-right: 45px;padding-left: 25px;}
  .demo-raised-button{background-color: #3399ff;height: 50px;border-radius: 50px;font-size: 20px;}
  .btn{padding: 50px;}
</style>
