<template>
<div class="register">
  <mu-appbar title="注册"></mu-appbar>
  <img src="../assets/login.jpg" />
  <div class="form">
    <mu-text-field hintText="请输入手机号" type="number" @blur="phoneInput" :errorText="inputErrorText" icon="phone_iphone" fullWidth /><br/>
    <div class="verify">
      <mu-text-field hintText="请输入验证码" type="number" icon="chat" fullWidth  :errorText="verErrorText"  />

      <mu-flat-button   @click="getMess"  :label="mess" class="demo-flat-button" :disabled='btnStatus'  />
    </div>
    <br/>
    <mu-text-field hintText="请输入6位数以上的密码"   @blur="passInput" :errorText="passErrorText" type="password" icon="lock_outline" fullWidth/><br/>
  </div>
  <div class="btn">
    <mu-raised-button label="注册"  @click="submit"   class="demo-raised-button" secondary fullWidth />
  </div>
</div>
</template>

<script>
export default {

  data() {
    return {
      inputErrorText: '',
      passErrorText: '',
      verErrorText: '',
      btnStatus: false,
      mess: '获取验证码',
      num: 60
    }
  },
  methods: {

    phoneInput(value) {

      if (!(/^1[34578]\d{9}$/.test( value.target.value))) {
        this.inputErrorText = "请输入正确手机号";
      } else {
        this.inputErrorText = "";
      }
    },
    passInput(value) {
      if (  value.target.value.length<6) {
        this.passErrorText = "密码必须6位数以上";
      } else {
        this.passErrorText = "";
      }

    },
    getMess(){
        this.btnStatus=true;
        var clear=setInterval(()=>{
          this.mess="获取验证码("+this.num+")";
          this.num--;
          this.mess="获取验证码("+this.num+")";
          if(this.num==1) {
            clearInterval(clear)
              this.mess="重新获取";
              this.num=60;
              this.btnStatus=false;
          }

        },1000)
    },
    submit(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mu-appbar {
  text-align: center
}

img {
  width: 100%
}

.mu-tabs {
  margin-top: 0;
}

.form {
  margin-top: 50px;
  padding-right: 45px;
  padding-left: 25px;
}

.demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}

.btn {
  padding: 50px;
}

.verify {
  position: relative;

}
.verify .demo-flat-button {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
