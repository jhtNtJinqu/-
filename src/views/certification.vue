<template>
<!--  企业认证-->

<div class="address">
  <div class="mu-appbar">
    <span @click="prev"><</span>
    <span>企业认证</span>
  </div>
  <div class="form">
    <mu-text-field hintText="单位全称" fullWidth @focus="companyError=''" v-model="company" :errorText="companyError" /><br/>
    <mu-text-field hintText="税务登记号(统一社会信用代码)" @focus="dutyError=''" v-model="duty" fullWidth :errorText="dutyError" /><br/>
    <mu-text-field hintText="开户银行" fullWidth v-model="bank" @focus="bankError=''" :errorText="bankError" /><br/>
    <mu-text-field hintText="银行账号(收款账号)" type="number" @blur="bankNumInput" @focus="bankNumError=''" v-model="bankNum" fullWidth :errorText="bankNumError" /><br/>
    <mu-text-field hintText="法人代表" fullWidth v-model="person" @focus="personError=''" :errorText="personError" /><br/>
    <mu-text-field hintText="联系电话" type="number" @blur="phoneInput" @focus="phoneError=''" fullWidth v-model="phone" :errorText="phoneError" /><br/>
    <mu-text-field hintText="QQ号" type="number" fullWidth v-model="qq" @focus="qqError=''" :errorText="qqError" /><br/>
  </div>
  <div class="btn">
    <mu-raised-button label="填写联系地址" @click="submit" class="demo-raised-button" secondary fullWidth />
  </div>
  <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopupa" @close="close()">
    <mu-appbar title="正在审核">
      <mu-flat-button slot="right" label="关闭" color="white" @click="close()" />
    </mu-appbar>
    <mu-content-block>
      <p>
        您所提交的公司信息还未通过审核，暂时无法使用本平台部分功能，请耐心等候或联系客服0513-86809981。
      </p>
    </mu-content-block>
  </mu-popup>
  <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopupb" @close="close()">
    <mu-appbar title="正在审核">
      <mu-flat-button slot="right" label="关闭" color="white" @click="close()" />
    </mu-appbar>
    <mu-content-block>
      <p>
        您所提交的公司信息还未通过审核，暂时无法使用本平台部分功能，请耐心等候或联系客服0513-86809981。
      </p>
    </mu-content-block>
  </mu-popup>
  <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopupa" @close="close()">
    <mu-appbar title="未通过">
      <mu-flat-button slot="right" label="关闭" color="white" @click="close()" />
    </mu-appbar>
    <mu-content-block>
      <p>
      您所提交的公司信息有误，暂时无法使用本平台部分功能，请及时修改并重新提交，或联系本平台客服0513-86809981进行修改。
      </p>
    </mu-content-block>
  </mu-popup>
  <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopupc" @close="close()">
    <mu-appbar title="注册成功">
      <mu-flat-button slot="right" label="关闭" color="white" @click="close()" />
    </mu-appbar>
    <mu-content-block>
      <p>
      您注册的信息已通过
      </p>
    </mu-content-block>
  </mu-popup>

</div>
</template>

<script>
export default {
  data() {
    return {
      companyError: '',
      dutyError: '',
      bankError: '',
      bankNumError: '',
      personError: '',
      phoneError: '',
      qqError: '',
      company: '',
      duty: '',
      bank: '',
      bankNum: '',
      person: '',
      qq: '',
      phone: '',
      bottomPopupa: false,
      bottomPopupb: false,
      bottomPopupc: false,
    }
  },
  methods: {
    phoneInput() {
      if (this.phone == '') {
        return false;
      }
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.phoneError = "请输入正确手机号";
      } else {
        this.phoneError = "";
      }
    },
    bankNumInput() {
      if (this.bankNum == '') {
        return false;
      }
      if (String(this.bankNum).length < 16 || String(this.bankNum).length > 19) {
        this.bankNumError = "您输入的银行卡号位数有错,请检查";
      } else {
        this.bankNumError = "";
      }
    },
    prev() {},
    close() {
      this.bottomPopupa = false;
      this.bottomPopupb = false;
      this.bottomPopupc = false;
    },
    submit() {

      if (this.company == '') {
        this.companyError = "请输入单位全称";
        return false;

      }
      if (this.duty == '') {
        this.dutyError = "请输入税务登记号";
        return false;

      }
      if (this.bank == '') {
        this.bankError = "请输入开户银行";
        return false;

      }
      if (this.bankNum == '') {
        this.bankNumError = "请输入银行账号";
        return false;

      }
      if (this.person == '') {
        this.personError = "请输入法人代表";
        return false;

      }
      if (this.phone == '') {
        this.phoneError = "请输入联系电话";
        return false;

      }
      if (this.qq == '') {
        this.qqError = "请输入联系电话";
        return false;
      }

      this.$store.commit('changeCer', this.items);

      this.$router.push({
        path: '/address'
      })


    }
  },
  computed: {
    items() {
      return {
        company: this.company,
        duty: this.duty,
        bank: this.bank,
        bankNum: this.bankNum,
        person: this.person,
        qq: this.qq,
        phone: this.phone,
        if_check: false,

      }
    }
  },
  mounted() {
    // 检测是否填写企业认证
    this.axios.get('/personal/publish/is_auth')
      .then(response => {
        if (response.data == "ok") {
          this.if_check = true;
          if (this.if_check) {
            this.axios.get('/personal/personal/ischecked?time=' + Date.parse(new Date()))
              .then(response => {
                var info = response.data.data;
                var message = response.data.msg;
                if (message == 'is_checked_no') {
                  this.bottomPopupa = true;

                } else if (message == 'is_checked_ing') {
                  this.bottomPopupb = true;
                } else if (message == "is_checked_ok") {
                  this.bottomPopupc = true;
                }

              })
              .catch(function(err) {

              });
          }
        }
      })
      .catch(function(err) {
        // console.log(err);
      });
  }
}
</script>
<style>
.address .mu-appbar {
  text-align: center;
}

.address .form {
  padding-top: 10px;
  padding-right: 45px;
  padding-left: 25px;
}

.address .demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}

.address .btn {
  padding: 20px 50px 50px 50px;
}

.address .mu-appbar {
  text-align: center;
  font-size: 20px;
}

.address .mu-appbar span:nth-child(1) {
  font-size: 26px;
}

.address .mu-appbar span:nth-child(2) {
  width: 100%;
  text-align: center;
}


.demo-popup-bottom {
  width: 100%;
  max-width: 375px;
}
</style>
