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
        <img :src="urlb" />
      </mu-grid-tile>
    </mu-grid-list>
    <mu-content-block>
      <vue-core-image-upload class="btn btn-primary" :crop="false" @imageuploaded="imageuploadea" text='' :max-file-size="5242880" url="">
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
      <vue-core-image-upload class="btn btn-primary" :crop="false" @imageuploaded="imageuploadeb" text='' :max-file-size="5242880" url="">
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
      dialog: false
    }
  },
  methods: {
    prev() {
      this.$router.push({
        path: '/uploadimage'
      })
    },
    imageuploadea(res) {
      if (res.errcode == 0) {
        this.urla = res.data.src;
      }
    },
    imageuploadeb(res) {
      if (res.errcode == 0) {
        this.urlb = res.data.src;
      }
    },
    close () {
      this.dialog = false
    },
    submit(){
      this.dialog = true
    },
    confire(){
      this.dialog = false;
    }
  }
}
</script>

<style>
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
.btn-primary  form {
  height: 148px !important;
}
.mu-grid-tile-titlebar {
  display: none;
}

.mu-grid-tile-titlebar {
  display: none;
}



.btna  .demo-raised-button {
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
</style>
