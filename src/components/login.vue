<template>
  <div class="login">
    <template>
      <mu-appbar title="登录"></mu-appbar>
      <img src="../assets/login.jpg" />
      <div class="form">
        <mu-text-field hintText="请输入手机号" @input="inputErrorText=''"   @blur="phoneInput" type="number" icon="phone_iphone" :errorText="inputErrorText"  v-model="phone" fullWidth /><br/>
        <mu-text-field hintText="请输入密码"  @input="passErrorText=''"  @blur="passInput" type="text" icon="lock_outline"  :errorText="passErrorText"  v-model="pass"  fullWidth/><br/>
      </div>
      <div class="btn">
        <mu-raised-button label="登录" @click="submit" class="demo-raised-button"  secondary fullWidth />
      </div>
    </template>
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupa">
      登陆成功
    </mu-popup>
    <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupb">
      登陆失败,请检查手机号密码
    </mu-popup>
  </div>
</template>

<script>

  export default {
    data(){
      return {
        inputErrorText: '',
        passErrorText: '',
        phone: '',
        pass: '',
        topPopupb: false,
        topPopupa: false
      }
    },
    methods: {
      phoneInput() {
        if (!(/^1[34578]\d{9}$/.test(this.phone))) {
          this.inputErrorText = "请输入正确手机号";
        } else {
          this.inputErrorText = "";

        }
      },
      passInput() {
        if (this.pass.length < 6) {
          this.passErrorText = "密码必须6位数以上";
        } else {
          this.passErrorText = "";
        }
      },
      submit() {
        if(this.phone=='') {
          this.inputErrorText="请输入手机号";
          return false;
        }
        if(this.pass=='') {
          this.passErrorText="请输入密码";
          return false;
        }

        this.axios.post('/personal/register/loginMobile', {
            phone: this.phone,
            password: this.pass,

          })
          .then(res => {



          
            if (res.data=="ok") {
              this.topPopupa = true;
              setTimeout(() => {
                this.$router.push({
                  path: '/certification'
                })
              }, 1500)

            } else {
              this.topPopupb = true;
              setTimeout(() => {
                this.topPopupb = false;
              }, 1500)
            }
          })
          .catch(err => {
            // console.log(err);
          });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .mu-appbar{text-align: center}
  img{width: 100%}
  .mu-tabs{margin-top: 0;}
  .form{margin-top: 50px;padding-right: 45px;padding-left: 25px;}
  .login  .demo-raised-button{background-color: #3399ff;height: 50px;border-radius: 50px;font-size: 20px;}
  .login .btn{margin: 50px;}

  .login .demo-popup-top {
    width: 100%;
    opacity: .8;
    height: 48px;
    line-height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 375px;
  }
</style>
