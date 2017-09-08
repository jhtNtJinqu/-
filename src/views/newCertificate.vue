<template>
<div class="uploadimage">
  <div class="mu-appbar">
    <span @click="prev"><mu-icon value="keyboard_arrow_left" :size="38"/></span>
    <span>新版三证合一</span>
  </div>
  <div class="">
    <mu-sub-header>企业印业执照</mu-sub-header>
    <mu-grid-list class="gridlist" v-if="urla">
      <mu-grid-tile>
        <img :src="urla" @click="show(urla)" />
      </mu-grid-tile>
      <vue-core-image-upload v-if="bia" class="edit" inputOfFile="img1" :crop="false" @imageuploaded="imageuploadea" text='' :max-file-size="5242880" url="/personal/tools/upload1">
        <mu-icon value="create" color="#888" :size="38" />
      </vue-core-image-upload>

    </mu-grid-list>
    <mu-content-block v-if="showa">
      <vue-core-image-upload class="btn btn-primary" inputOfFile="img1" :crop="false" @imageuploaded="imageuploadea" text='' :max-file-size="5242880" url="/personal/tools/upload1">
        <mu-icon value="photo" color="#ccc" />
      </vue-core-image-upload>
    </mu-content-block>
  </div>
  <div class="">
    <mu-sub-header>法人代表身份证</mu-sub-header>
    <mu-grid-list class="gridlist" v-if="urlb">
      <mu-grid-tile>
        <img :src="urlb" @click="show(urlb)" />
      </mu-grid-tile>
      <vue-core-image-upload v-if="bib" class="edit" inputOfFile="img2" :crop="false" @imageuploaded="imageuploadeb" text='' :max-file-size="5242880" url="/personal/tools/upload2">
        <mu-icon value="create" color="#888" :size="38" />
      </vue-core-image-upload>
    </mu-grid-list>
    <mu-content-block v-if="showb">
      <vue-core-image-upload class="btn btn-primary" inputOfFile="img2" :crop="false" @imageuploaded="imageuploadeb" text='' :max-file-size="5242880" url="/personal/tools/upload2">
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
  <!-- 过渡动画 -->

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
      urlb: "",
      urla: "",
      dialog: false,
      topPopupa: false,
      topPopupb: false,
      disabled: false,
      img_url: '',
      a: false,
      bia: false,
      bib: false,
      showa: true,
      showb: true
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
    close() {
      this.dialog = false
    },
    show(url) {
      this.a = true
      this.img_url = url
    },
    submit() {

      this.dialog = true;
    },
    confire() {
      this.$store.commit('changeImagea', this.items);
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
          img1: this.$store.state.certification.img1,
          img2: this.$store.state.certification.img2,
          img3: '',
          img4: '',
          img5: '',
          img6: '',
          phone: '',
          fax: '',

        })
        .then(res => {

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
                this.urla = info.img1;
                this.urlb = info.img2;

                this.bia = true;
                this.bib = true;

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
        img1: this.urla,
        img2: this.urlb
      }
    }
  }
}
</script>

<style>
.uploadimage .mu-appbar {
  text-align: center;
  font-size: 20px;
}

.uploadimage .mu-appbar span:nth-child(1) {
  position: absolute;
  left: 0;
  top: 10px;
}


.uploadimage .mu-appbar {
  position: relative;
}

.uploadimage .mu-appbar span:nth-child(2) {
  width: 100%;
  text-align: center;
}

.uploadimage .yiji {
  position: relative;
}


.uploadimage .jian {
  position: absolute;
  right: 3%;
  top: 28%;
}

.uploadimage .btn-primary {
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

.uploadimage .btn-primary form {
  height: 148px !important;
}


.mu-grid-tile-titlebar {
  display: none !important;
}

.mu-grid-tile {
  width: 148px;
  height: 148px;
  margin: 8px 16px
}


.uploadimage .btna .demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}

.uploadimage .btna {
  padding: 20px 50px 50px 50px;
}

.uploadimage .material-icons {
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

.gridlist {
  position: relative;
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

.mu-dialog {
  width: 90%;
}


.imgbox {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .4);
  position: fixed;
  z-index: 20141229;
}

.imgbox img {
  width: 100%;
  transition: width 2s;
  -webkit-transition: width 2s;
  /* Safari */
}
</style>
