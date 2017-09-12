<template>
<!--  填写联系地址-->

<div class="address">
  <div class="mu-appbar">
    <span @click="prev" v-show="!back" ><mu-icon value="keyboard_arrow_left" :size="38"/></span>
    <span>填写联系地址</span>
  </div>
  <div class="form">
    <div class="address-select" v-if="inputBox">

      <div class="area">
        <mu-text-field hintText="请选择所在地区"   label="所在地区" :errorText="addError"   @focus="addError=''"  fullWidth disabled v-model="address" />
        <mu-flat-button label="请选择" @click="showDialog"   :disabled="disabled"   class="address-btn demo-flat-button" /><br/>
      </div>

      <mu-text-field hintText="请输入详细地址"  label="详细地址"    :disabled="disabled"   fullWidth :errorText="detaError"  @focus="detaError=''" v-model="detailAddress"  /><br/>
    </div>
    <div class="choose" v-if="dialog">
      <mu-list>
        <template v-if="dialoga" v-for="item in yiji">
            <div class="yiji">
              <mu-list-item :title="item.name" :data="item.id" @click="yijiClick(item.id,item.name)" />
               <span class="jian" ><mu-icon value="keyboard_arrow_right"  color="#999"  :size="20"/></span>
              <mu-divider/>
            </div>
        </template>
        <template v-if="dialogb" v-for="item in erji">
            <div class="yiji">
              <mu-list-item :title="item.name" :data="item.id" @click="erjiClick(item.id,item.name)"   />
              <span class="jian" ><mu-icon value="keyboard_arrow_right"  color="#999"  :size="20"/></span>
              <mu-divider/>
            </div>
        </template>
        <template v-if="dialogc" v-for="item in sanji">
            <div class="yiji">
              <mu-list-item :title="item.name" :data="item.id" @click="sanjiClick(item.id,item.name)"   />
              <span class="jian" ></span>
              <mu-divider/>
            </div>
        </template>
      </mu-list>
    </div>
  </div>
  <div class="btn-box" v-if="inputBox">
    <div class="btn">
      <mu-raised-button label="下一步"  labelPosition="before" icon="arrow_forward"    @click="submit" class="demo-raised-button" secondary fullWidth />
    </div>
  </div>

</div>
</template>

<script >
export default {
  data() {
    return {
      yiji: '',
      erji: '',
      sanji: '',
      dialoga: true,
      dialogb: false,
      dialogb: false,
      dialog: false,
      inputBox: true,
      areaa: '',
      areab: '',
      areac: '',
      address: '',
      detailAddress: '',
      areaid: '',
      addError: '',
      detaError: '',
      disabled: false,
      back: false

    }
  },
  methods: {
    showDialog() {
      this.inputBox = false;
      this.dialog = true;
      this.dialoga = true;
      this.dialogc = false;
      this.dialogb = false;
      this.back=true;
    },
    yijiClick(value, name) {
      this.back=true;
      this.areaa = name;
      this.dialogb = true;
      this.dialoga = false;
      this.inputBox = false;
      this.axios.post('/api/Params/Region?regionid=' + value).
      then((res) => {
          this.erji = res.data;
        })
        .catch(function(err) {
          console.log("error");
        });

    },
    erjiClick(value, name) {
      this.back=true;
      this.inputBox = false;
      this.areab = name;
      this.dialogb = false;
      this.dialogc = true;
      this.axios.post('/api/Params/Region?regionid=' + value).
      then((res) => {
          this.sanji = res.data;
        })
        .catch(function(err) {
          console.log("error");
        });
    },
    sanjiClick(value, name) {
      this.back=false;
      this.areaid = value;
      this.areac = name;
      this.dialog = false;
      this.inputBox = true;
      this.address = this.areaa + "/" + this.areab + "/" + this.areac;
    },
    submit() {
      if(this.address=='' && this.disabled==false ) {
        this.addError="请输入所在地区";
        return false;
      }
      if(this.detailAddress=='') {
        this.detaError="请输入详细地址";
        return false;
      }


      this.$store.commit('changeAdd',this.items);

      this.$router.push({
        path: '/uploadimage'
      })
    },
    prev() {
      this.$router.push({
        path: '/certification'
      })
    }

  },
  created() {
    document.title = "进取酒店供应链平台"
    this.axios.post('/api/Params/Region ').
    then((res) => {
        this.yiji = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  computed: {
    items(){
      return {
        areaid: this.areaid,
        detailAddress: this.detailAddress
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
                  this.bottomPopupc = true;
                  this.$store.commit('changeStatus', true);
                }
                this.disabled=this.$store.state.disabled;
                this.detailAddress = info.contact_address;
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
.mu-appbar {
  text-align: center;
  font-size: 20px;
}

.address  .mu-appbar {
  position: relative;
}
.address  .mu-appbar span:nth-child(1) {
  position: absolute;
  left: 0;
  top: 10px;
}


.address  .mu-appbar span:nth-child(2) {
  width: 100%;
  text-align: center;
}

.form {
  padding-top: 10px;
  padding-right: 45px;
  padding-left: 25px;
}

.address-select {
  position: relative;
}

.address-btn {
  position: absolute !important;
  right: 0 !important;
  top: 20px !important;
}

.yiji {
  position: relative;
}

.jian {
  position: absolute;
  right: 0;
  top: 32%;
}

.address .demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}
.btn-box {
  padding: 20px 50px 50px 50px;
}

.btn .file-button {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.btn .demo-flat-button {
  margin: 12px;
  color: #fff;
  font-size: 20px;
}

.btn .mu-flat-button-label {
  font-size: 20px !important;
}

.address  .btn {
  background-color: #3399ff;
  text-align: center;
  color: #fff;
  border-radius: 30px;
}


.g-core-image-upload-btn {
  height: 50px;
  font-size: 20px;
  line-height: 50px;
}
.zhengjianlist .mu-grid-tile-titlebar {
  display: none;
}



.area  .mu-text-field-hint  {
  color: #333;
}

.area  .mu-flat-button {
  color: #ccc;
}
.area   .mu-text-field-input {
    color: #333;
}
</style>
