<template>
<!-- 注册 -->
<div class="register">
  <mu-appbar title="注册"></mu-appbar>
  <img src="http://ouggi6vk1.bkt.clouddn.com/mobile/image/login.jpg" />
  <div class="form">
    <mu-text-field hintText="请输入手机号"  label="手机号"   labelFloat   v-model="phone" @input="input" type="number" @blur="phoneInput" :errorText="inputErrorText" icon="phone_iphone" fullWidth /><br/>
    <div class="verify">
      <mu-text-field hintText="请输入验证码"   label="验证码"   labelFloat    v-model="verify" @input="verErrorText=''" type="number" icon="chat" fullWidth :errorText="verErrorText" />

      <mu-flat-button @click="getMess" :label="mess" class="demo-flat-button" :disabled='btnStatus' />
    </div>

    <mu-text-field hintText="请输入6位数以上的密码"   label="密码"   labelFloat    @input="passErrorText=''" v-model="pass" @blur="passInput" :errorText="passErrorText" type="password" icon="lock_outline" fullWidth/><br/>
  </div>
  <div class="btn">
    <mu-raised-button label="注册" @click="submit" class="demo-raised-button" secondary fullWidth />
  </div>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    注册成功
  </mu-popup>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupb">
    注册失败
  </mu-popup>
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
      num: 60,
      phone: '',
      verify: '',
      pass: '',
      topPopup: false,
      topPopupb: false,
    }
  },
  methods: {
    input() {
      if ((/^1[34578]\d{9}$/.test(this.phone))) {
        this.btnStatus = false;
      }
    },
    phoneInput() {
      if(this.phone=="") {
        this.inputErrorText = "手机号不能为空";
        return false;
      }
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.inputErrorText = "请输入正确手机号";
      } else {
        this.inputErrorText = "";

      }
    },
    passInput() {
      if(this.pass=='') {
          this.passErrorText = "密码不能为空";
        return false;
      }
      if (this.pass.length < 6) {
        this.passErrorText = "密码必须6位数以上";
      } else {
        this.passErrorText = "";
      }
    },
    getMess() {
      if (!/^1[34578]\d{9}$/.test(this.phone)) {
        this.btnStatus = true;
        this.inputErrorText = "请先输入正确的手机号";
        return false;
      } else {
        this.btnStatus = false;
        this.mess = "获取验证码(" + this.num + ")";
        var clear = setInterval(() => {
          this.mess = "获取验证码(" + this.num + ")";
          this.num--;
          this.mess = "获取验证码(" + this.num + ")";
          if (this.num == 1) {
            clearInterval(clear)
            this.mess = "重新获取";
            this.num = 60;
            this.btnStatus = false;
          }
        }, 1000)
      }
      this.axios.post('/personal/register/getMsg', {
          phone: this.phone
        })
        .then(res => {

        })
        .catch(err => {
          // console.log(err);
        });

    },
    submit() {

      if (this.phone == '') {
        this.inputErrorText = "手机号不能为空";
        return false;
      }
      if (this.verify == "") {
        this.verErrorText = "验证码不能为空";
        return false;
      }
      if (this.pass == "") {
        this.passErrorText = "密码不能为空";
        return false;
      }
      this.axios.post('/personal/register/register', {
          phone: this.phone,
          password: this.pass,
          messageCode: this.verify
        })
        .then(res => {
          if (res.data) {
            this.topPopup = true;
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
  },
  created() {

      document.title = "进取酒店供应链平台-注册"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.register .mu-appbar {
  text-align: center
}

.register img {
  width: 100%
}

.register .mu-tabs {
  margin-top: 0;
}

.register .form {
  margin-top: 50px;
  padding-right: 45px;
  padding-left: 25px;
}

.register  .demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}

.register .btn {
  margin: 30px 50px 50px 50px;
}

.register .verify {
  position: relative;
}

.register .verify .demo-flat-button {
  position: absolute;
  right: 0;
  top: 21px;
}

.demo-popup-top {
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
