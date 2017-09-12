<template>
<div class="uploadimage">
  <div class="mu-appbar">
    <span @click="prev"><mu-icon value="keyboard_arrow_left" :size="38"/></span>
    <span>旧版</span>
  </div>
  <div class="">
    <mu-sub-header>企业印业执照</mu-sub-header>
    <mu-grid-list class="gridlist" v-if="urla">
      <mu-grid-tile>
        <img :src="urla" @click="show(urla)" />
      </mu-grid-tile>
      <vue-core-image-upload v-if="bia" class="edit" inputOfFile="img3" :crop="false" @imageuploaded="imageuploadea" text='' :max-file-size="5242880" url="/personal/tools/upload3">
        <mu-icon value="create" color="#888" :size="38" />
      </vue-core-image-upload>
    </mu-grid-list>
    <mu-content-block v-if="showa">
      <vue-core-image-upload class="btn btn-primary" inputOfFile="img3" :crop="false" @imageuploaded="imageuploadea" text='' :max-file-size="5242880" url="/personal/tools/upload3">
        <mu-icon value="photo" color="#ccc" />
      </vue-core-image-upload>
    </mu-content-block>
  </div>
  <div class="">
    <mu-sub-header>税务登记表</mu-sub-header>
    <mu-grid-list class="gridlist" v-if="urlb">
      <mu-grid-tile>
        <img :src="urlb" @click="show(urlb)" />
      </mu-grid-tile>
      <vue-core-image-upload v-if="bib" class="edit" inputOfFile="img4" :crop="false" @imageuploaded="imageuploadeb" text='' :max-file-size="5242880" url="/personal/tools/upload4">
        <mu-icon value="create" color="#888" :size="38" />
      </vue-core-image-upload>
    </mu-grid-list>
    <mu-content-block v-if="showb">
      <vue-core-image-upload class="btn btn-primary" inputOfFile="img4" :crop="false" @imageuploaded="imageuploadeb" text='' :max-file-size="5242880" url="/personal/tools/upload4">
        <mu-icon value="photo" color="#ccc" />
      </vue-core-image-upload>
    </mu-content-block>
  </div>
  <div class="">
    <mu-sub-header>组织代码结构</mu-sub-header>
    <mu-grid-list class="gridlist" v-if="urlc">
      <mu-grid-tile>
        <img :src="urlc" @click="show(urlc)" />
      </mu-grid-tile>
      <vue-core-image-upload v-if="bic" class="edit" inputOfFile="img5" :crop="false" @imageuploaded="imageuploadec" text='' :max-file-size="5242880" url="/personal/tools/upload5">
        <mu-icon value="create" color="#888" :size="38" />
      </vue-core-image-upload>
    </mu-grid-list>

    <mu-content-block v-if="showc">
      <vue-core-image-upload class="btn btn-primary" inputOfFile="img5" :crop="false" @imageuploaded="imageuploadec" text='' :max-file-size="5242880" url="/personal/tools/upload5">
        <mu-icon value="photo" color="#ccc" />
      </vue-core-image-upload>
    </mu-content-block>
  </div>
  <div class="">
    <mu-sub-header>法人代表身份证</mu-sub-header>
    <mu-grid-list class="gridlist" v-if="urld">
      <mu-grid-tile>
        <img :src="urld" @click="show(urld)" />
      </mu-grid-tile>
      <vue-core-image-upload v-if="bid" class="edit" inputOfFile="img6" :crop="false" @imageuploaded="imageuploaded" text='' :max-file-size="5242880" url="/personal/tools/upload6">
        <mu-icon value="create" color="#888" :size="38" />
      </vue-core-image-upload>
    </mu-grid-list>

    <mu-content-block v-if="showd">
      <vue-core-image-upload class="btn btn-primary" inputOfFile="img6" :crop="false" @imageuploaded="imageuploaded" text='' :max-file-size="5242880" url="/personal/tools/upload6">
        <mu-icon value="photo" color="#ccc" />
      </vue-core-image-upload>
    </mu-content-block>
  </div>
  <div class="btna">
    <mu-raised-button label="提交审核" :disabled="disabled" @click="submit" class="demo-raised-button" secondary fullWidth />
  </div>
  <mu-dialog :open="dialog" title="" @close="close">
    是否确认提交本次审核
    <mu-flat-button slot="actions" @click="close" primary label="取消" />
    <mu-flat-button slot="actions" primary @click="confire" label="确定" />
  </mu-dialog>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupa">
    注册成功
  </mu-popup>
  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupb">
    证件照不能为空
  </mu-popup>
  <div class="imgbox" v-if="a" @click="a=false">
    <img :src="img_url">
  </div>
</div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  data() {
    return {
      src: '',
      urla: "",
      urlb: "",
      urlc: "",
      urld: "",
      dialog: false,
      topPopupa: false,
      topPopupb: false,
      disabled: false,
      disableda: false,
      img_url: '',
      a: false,
      bi: false,
      bia: false,
      bib: false,
      bic: false,
      bid: false,
      showa: true,
      showb: true,
      showc: true,
      showd: true
    }
  },
  methods: {
    prev() {
      this.$router.push({
        path: '/uploadimage'
      })
    },
    imageuploadea(res) {
      this.urla = res.url;
      this.bia = true;
      this.showa = false;

    },
    imageuploadeb(res) {

      this.urlb = res.url;
      this.bib = true;
      this.showb = false;

    },
    imageuploadec(res) {

      this.urlc = res.url;
      this.bic = true;
      this.showc = false;

    },
    imageuploaded(res) {

      this.urld = res.url;
      this.showd = false;
      this.bid = true;
    },
    close() {
      this.dialog = false
    },
    show(url) {
      this.a = true
      this.img_url = url
    },
    submit() {
      this.dialog = true
    },
    confire() {
      this.$store.commit('changeImageb', this.items);
      this.dialog = false;
      this.axios.post('/personal/personal/addbase ', {
          name: this.$store.state.certification.company,
          tax_number: this.$store.state.certification.duty,
          bank_of_deposit: this.$store.state.certification.bank,
          bank_account: this.$store.state.certification.bankNum,
          contact: this.$store.state.certification.person,
          mobile: this.$store.state.certification.phone,
          district: this.$store.state.certification.areaid,
          qq: this.$store.state.certification.qq,
          contact_address: this.$store.state.certification.deatil,
          img1: '',
          img2: '',
          img3: this.$store.state.certification.img3,
          img4: this.$store.state.certification.img4,
          img5: this.$store.state.certification.img5,
          img6: this.$store.state.certification.img6,
          phone: '',
          fax: ''
        })
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            this.topPopupa = true;
            setTimeout(() => {
              this.$router.push({
                path: '/certification'
              })
            }, 1500)
          }

          // window.location.reload();
        })
        .catch(function(err) {
          // console.log(err);
        });


    }
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
                  this.bottomPopupc = true;
                  this.$store.commit('changeStatus', true);
                }
                this.disabled = this.$store.state.disabled;
                this.bia = true;
                this.bib = true;
                this.bic = true;
                this.bid = true;




                this.urla = info.img3;
                this.urlb = info.img4;
                this.urlc = info.img5;
                this.urld = info.img6;


                if (this.urla) {
                  this.showa = false;
                } else {
                  this.showa = true;
                }

                if (this.urlb) {
                  this.showb = false;
                } else {
                  this.showb = true;
                }

                if (this.urlc) {
                  this.showc = false;
                } else {
                  this.showc = true;
                }

                if (this.urld) {
                  this.showd = false;
                } else {
                  this.showd = true;
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
  },
  computed: {
    items() {
      return {
        img3: this.urla,
        img4: this.urlb,
        img5: this.urlc,
        img6: this.urld
      }
    }
  }
}
</script>

<style>
.mu-appbar {
  text-align: center;
  font-size: 20px;
}

.uploadimage .mu-appbar span:nth-child(1) {
  position: absolute;
  left: 0;
  top: 10px;
}

.mu-appbar span:nth-child(2) {
  width: 100%;
  text-align: center;
}

.yiji {
  position: relative;
}


.jian {
  position: absolute;
  right: 3%;
  top: 28%;
}

.btn-primary {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 148px;
  height: 148px;
  cursor: pointer;
  line-height: 186px;
  vertical-align: top;
  text-align: center;
}

.btn-primary form {
  height: 148px !important;
}

.mu-grid-tile-titlebar {
  display: none;
}



.btna .demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}

.btna {
  padding: 20px 50px 50px 50px;
}

.material-icons {
  font-size: 50px;
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

.edit {
  position: relative;
  width: 50px;
  height: 200px;
}

.edit i {
  position: absolute;
  bottom: 18px;
  right: 13px;
}

.edit form {
  position: absolute !important;
  top: 114px !important;
}
</style>
