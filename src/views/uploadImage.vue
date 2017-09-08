<template>
<div class="uploadimage">
  <div class="mu-appbar">
    <span @click="prev"><mu-icon value="keyboard_arrow_left" :size="38"/></span>
    <span>上传证件照片</span>
  </div>
  <div class="yiji" @click="taba">
    <mu-list-item title="新版三证合一"   />
     <span class="jian"    ><mu-icon value="keyboard_arrow_right"  color="#999"  :size="20"/></span>
    <mu-divider/>
  </div>
  <div class="yiji" @click="tabb" >
    <mu-list-item title="旧版三证"    />
     <span class="jian"   ><mu-icon value="keyboard_arrow_right"  color="#999"  :size="20"/></span>
    <mu-divider/>
  </div>

</div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  methods: {
    prev(){
      this.$router.push({
        path: '/address'
      })
    },
    taba(){
      this.$router.push({
        path: '/newcertificate'
      })
    },
    tabb(){
      this.$router.push({
        path: '/oldcertificate'
      })
    },

  }
}
</script>

<style scoped>
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



</style>
