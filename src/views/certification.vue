<template>
<!--  企业认证-->

<div class="certification">
  <div class="mu-appbar">
    <span  @click="linkHome" ><mu-icon value="home"   color="#fff"   :size="32"/></span>
    <span>企业认证</span>
  </div>
  <div class="form">
    <mu-text-field   :disabled="disabled"  label="单位全称"      hintText="请输入单位全称" fullWidth @focus="companyError=''" v-model="company" :errorText="companyError" /><br/>
    <mu-text-field  :disabled="disabled"  label="税务登记号(统一社会信用代码)"     hintText="请输入税务登记号(统一社会信用代码)" @focus="dutyError=''" v-model="duty" fullWidth :errorText="dutyError" /><br/>
    <mu-text-field  :disabled="disabled"  label="开户银行"       hintText="请输入开户银行" fullWidth v-model="bank" @focus="bankError=''" :errorText="bankError" /><br/>
    <mu-text-field   :disabled="disabled"   label="银行账号(收款账号)"       hintText="请输入银行账号(收款账号)" type="number" @blur="bankNumInput" @focus="bankNumError=''" v-model="bankNum" fullWidth :errorText="bankNumError" /><br/>
    <mu-text-field   :disabled="disabled"  label="法人代表"     hintText="请输入法人代表" fullWidth v-model="person" @focus="personError=''" :errorText="personError" /><br/>
    <mu-text-field   :disabled="disabled" label="联系电话"     hintText="请输入联系电话" type="number" @blur="phoneInput" @focus="phoneError=''" fullWidth v-model="phone" :errorText="phoneError" /><br/>
    <mu-text-field  :disabled="disabled"  label="QQ号"      hintText="请输入QQ号" type="number" fullWidth v-model="qq" @focus="qqError=''" :errorText="qqError" /><br/>
  </div>

  <div class="btn">
    <mu-raised-button label="下一步"  labelPosition="before" icon="arrow_forward"     @click="submit" class="demo-raised-button" secondary fullWidth />
  </div>

  <mu-dialog :open="bottomPopupb" title="正在审核" @close="close">
  您所提交的公司信息还未通过审核，暂时无法使用本平台部分功能，请耐心等候或联系客服0513-86809981。

  <mu-flat-button slot="actions" primary @click="close" label="确定"/>
</mu-dialog>
  <mu-dialog :open="bottomPopupa" title="未通过" @close="close">
  您所提交的公司信息有误，暂时无法使用本平台部分功能，请及时修改并重新提交，或联系本平台客服0513-86809981进行修改。

  <mu-flat-button slot="actions" primary @click="close" label="确定"/>
</mu-dialog>
<mu-dialog :open="bottomPopupc" title="注册成功" @close="close">
您注册的信息以通过,点击确定跳转到首页
<mu-flat-button slot="actions" primary @click="closec" label="确定"/>
</mu-dialog>

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
      disabled: false
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
    linkHome() {
      window.location.href='/'
    },
    close() {
      this.bottomPopupa = false;
      this.bottomPopupb = false;
      this.bottomPopupc = false;
    },
    closec() {
        this.bottomPopupc = false;
        window.location.href='/'
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
    },

  },
  created(){
    document.title = "进取酒店供应链平台"
  },
  mounted() {
    // 检测是否填写企业认证
    this.axios.get('/personal/publish/is_auth')
      .then(response => {
        if (response.data == "ok") {
          this.if_check = true;
          if (this.if_check) {
            this.axios.post('/personal/personal/ischecked?time=' + Date.parse(new Date()))
              .then(response => {
                var info = response.data.data;

                var message = response.data.msg;

                if (message == 'is_checked_no') {
                  this.bottomPopupa = true;
                  this.$store.commit('changeStatus', false);
                } else if (message == 'is_checked_ing') {
                  this.bottomPopupb = true;
                  this.$store.commit('changeStatus', true);

                } else if (message == "is_checked_ok") {
                  window.location.href='/';
                  return false;
                  // this.$store.commit('changeStatus', true);


                }
                this.disabled=this.$store.state.disabled;
                this.company = info.name;
                this.duty = info.tax_number;
                this.bank = info.bank_of_deposit;
                this.bankNum = info.bank_account;
                this.person = info.contact;
                this.phone = info.mobile;
                this.qq = info.qq;
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
.certification .mu-appbar {
  text-align: center;
}

.certification  .mu-appbar span:nth-child(1) {
  position: absolute;
  left: 10px;
  top: 12px;
}


.certification  .mu-appbar span:nth-child(2) {
  width: 100%;
  text-align: center;
}


.certification .form {
  padding-top: 10px;
  padding-right: 45px;
  padding-left: 25px;
}

.certification .demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}

.certification .btn {
  margin: 20px 50px 50px 50px;
}

.certification .mu-appbar {
  text-align: center;
  font-size: 20px;
}




.demo-popup-bottom {
  width: 100%;
  max-width: 375px;
}

.mu-appbar {
  text-align: center;
  font-size: 20px;
}

</style>
