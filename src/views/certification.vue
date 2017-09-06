<template>
<!--  企业认证-->

<div class="address">
  <div class="mu-appbar">
    <span @click="prev"><</span>
    <span>填写联系地址</span>
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
      phone: ''
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

      this.$router.push({
        path: '/address'
      })

    }
  }
}
</script>

<style scoped>
.mu-appbar {
  text-align: center;
}

.form {
  padding-top: 10px;
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
  padding: 20px 50px 50px 50px;
}

.mu-appbar {
  text-align: center;
  font-size: 20px;
}

.mu-appbar span:nth-child(1) {
  font-size: 26px;
}

.mu-appbar span:nth-child(2) {
  width: 100%;
  text-align: center;
}





</style>
