<template>
<div class="uploadimage">
  <div class="mu-appbar">
    <span @click="prev"><</span>
    <span>新版三证合一</span>
  </div>
  <div class="">
    <mu-sub-header>企业印业执照</mu-sub-header>
    <mu-grid-list class="gridlist"  v-if="urla">
      <mu-grid-tile>
        <img :src="urla" />
      </mu-grid-tile>
    </mu-grid-list>
    <mu-content-block>
      <vue-core-image-upload class="btn btn-primary"   inputOfFile="img1"   :crop="false" @imageuploaded="imageuploadea" text='' :max-file-size="5242880" url="/personal/tools/upload1">
         <mu-icon value="photo"  color="#ccc" />
      </vue-core-image-upload>
    </mu-content-block>
  </div>
  <div class="">
    <mu-sub-header>法人代表身份证</mu-sub-header>
    <mu-grid-list class="gridlist" v-if="urlb">
      <mu-grid-tile>
        <img :src="urlb" />
      </mu-grid-tile>
    </mu-grid-list>
    <mu-content-block>
      <vue-core-image-upload class="btn btn-primary"   inputOfFile="img2"  :crop="false" @imageuploaded="imageuploadeb" text='' :max-file-size="5242880" url="/personal/tools/upload2">
         <mu-icon value="photo"  color="#ccc" />
      </vue-core-image-upload>
    </mu-content-block>
  </div>
  <div class="btna">
    <mu-raised-button label="提交审核" @click="submit" class="demo-raised-button" secondary fullWidth />
  </div>
  <mu-dialog :open="dialog" title="" @close="close">
    是否确认提交本次审核
    <mu-flat-button slot="actions" @click="close" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="confire" label="确定"/>
  </mu-dialog>

  <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupa">
   注册成功
 </mu-popup>
 <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopupb">
  证件照不能为空
</mu-popup>
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
      topPopupb: false
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
    },
    imageuploadeb(res) {

      this.urlb = res.url;

    },
    close () {
      this.dialog = false
    },
    submit(){
      this.dialog = true;
    },
    confire(){

      this.$store.commit('changeImagea',this.items);

      console.log(this.$store.state.certification)

      this.dialog = false;

      this.axios.post('/personal/personal/addbase ', {
          name: this.$store.state.certification.company,
          tax_number: this.$store.state.certification.duty,
          bank_of_deposit: this.$store.state.certification.bank ,
          bank_account: this.$store.state.certification.bankNum ,
          contact: this.$store.state.certification.person,
          mobile: this.$store.state.certification.phone ,
          district: this.$store.state.certification.areaid,
          qq: this.$store.state.certification.qq,
          contact_address: this.$store.state.certification.deatil ,
          img1:  this.$store.state.certification.img1,
          img2: this.$store.state.certification.img2
        })
        .then(res => {
          console.log(res);
          if(res.status==200) {
            this.topPopupa=true;
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
  computed: {
    items(){
      return {
        img1: this.urla,
        img2: this.urlb
      }
    }
  }
}
</script>

<style>
.uploadimage  .mu-appbar {
  text-align: center;
  font-size: 20px;
}

.uploadimage  .mu-appbar span:nth-child(1) {
  font-size: 26px;
}

.uploadimage  .mu-appbar span:nth-child(2) {
  width: 100%;
  text-align: center;
}

.uploadimage  .yiji {
  position: relative;
}


.uploadimage  .jian {
  position: absolute;
  right: 3%;
  top: 28%;
}

.uploadimage  .btn-primary {
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
.uploadimage  .btn-primary  form {
  height: 148px !important;
}


.mu-grid-tile-titlebar {
  display: none !important;
}




.uploadimage  .btna  .demo-raised-button {
  background-color: #3399ff;
  height: 50px;
  border-radius: 50px;
  font-size: 20px;
}

.uploadimage  .btna {
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

</style>
