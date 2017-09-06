<template>
<!--  填写联系地址-->

<div class="address">
  <div class="mu-appbar">
    <span @click="prev"><</span>
    <span>填写联系地址</span>
  </div>
  <div class="form">
    <div class="address-select" v-if="inputBox">
      <mu-text-field hintText="所在地区"  :errorText="addError"   @focus="addError=''"  fullWidth disabled v-model="address" />
      <mu-flat-button label="请选择" @click="showDialog" class="address-btn demo-flat-button" /><br/>
      <mu-text-field hintText="详细地址"  :errorText="detaError"  @focus="detaError=''" v-model="detailAddress"  multiLine :rows="4" fullWidth :rowsMax="7" /><br/>
    </div>
    <div class="choose" v-if="dialog">
      <mu-list>
        <template v-if="dialoga" v-for="item in yiji">
            <div class="yiji">
              <mu-list-item :title="item.name" :data="item.id" @click="yijiClick(item.id,item.name)" />
               <span class="jian" >></span>
              <mu-divider/>
            </div>
        </template>
        <template v-if="dialogb" v-for="item in erji">
            <div class="yiji">
              <mu-list-item :title="item.name" :data="item.id" @click="erjiClick(item.id,item.name)"   />
               <span class="jian" >></span>
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
      <mu-raised-button label="上传证件照片" @click="submit" class="demo-raised-button" secondary fullWidth />
    </div>
  </div>

</div>
</template>

<script scoped>

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
      detaError: ''

    }
  },
  methods: {
    showDialog() {
      this.inputBox = false;
      this.dialog = true;
      this.dialoga = true;
      this.dialogc = false;
      this.dialogb = false;
    },

    yijiClick(value, name) {
      this.areaa = name;
      this.dialogb = true;
      this.dialoga = false;
      this.inputBox = false;
      this.axios.post('http://192.168.1.107:8002/api/Params/Region?regionid=' + value).
      then((res) => {

          this.erji = res.data;
        })
        .catch(function(err) {
          console.log("error");
        });

    },
    erjiClick(value, name) {
      this.inputBox = false;
      this.areab = name;
      this.dialogb = false;
      this.dialogc = true;
      this.axios.post('http://192.168.1.107:8002/api/Params/Region?regionid=' + value).
      then((res) => {
          this.sanji = res.data;
        })
        .catch(function(err) {
          console.log("error");
        });
    },
    sanjiClick(value, name) {
      this.areaid = value;
      this.areac = name;
      this.dialog = false;
      this.inputBox = true;
      this.address = this.areaa + "/" + this.areab + "/" + this.areac;
    },
    submit() {


      if(this.address=='') {
        this.addError="请输入所在地区";
        return false;
      }
      if(this.detailAddress=='') {
        this.detaError="请输入详细地址";
        return false;

      }
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
    this.axios.post('http://192.168.1.107:8002/api/Params/Region ').
    then((res) => {
        this.yiji = res.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

}
</script>
<style scoped>
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

.form {
  padding-top: 10px;
  padding-right: 45px;
  padding-left: 25px;
}

.address-select {
  position: relative;
}

.address-btn {
  position: absolute;
  right: 0;
  top: 0;
}

.yiji {
  position: relative;
}

.jian {
  position: absolute;
  right: 0;
  top: 36%;
}

.demo-raised-button {
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

.btn {
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
</style>
