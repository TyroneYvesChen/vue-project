<template>
  <div class="box">
    <div class="aaa" @click="getData">{{msg}}</div>
    <div class="bbb" @click="setD">{{aaa}}</div>
    <div class="btn" @click="ceshiClick">测试按钮</div>
    <mt-progress :value="progress">
      <div slot="start">0%</div>
      <div slot="end">100%</div>
    </mt-progress>

    <div class="page-picker-wrapper">
      <mt-picker :slots="numberSlot" @change="onNumberChange" :visible-item-count="3"></mt-picker>
    </div>

    <loading></loading>
    <popup></popup>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import httpServer from '../assets/js/api'
  import loading from '../components/base/loading/loading.vue'
  import popup from '../components/base/popup/popup.vue'
export default {
  name: 'box',
  components: {
    loading,
    popup
  },
  data () {
    return {
      msg: '测试测试测试',
      aaa: "hoo~",
      progress: 5,
      numberSlot: [{
        flex: 1,
        defaultIndex: 0,
        values: [0, 1, 2, 3, 4, 5, 6],
        className: 'slot1'
      }]
    }
  },
  computed: {
    ...mapGetters(["wocao"]),
  },
  created (){
//    this.$store.dispatch('setWocao', "fuck")
    setInterval(() =>{
      if (this.progress > 100){
        this.progress = 0
      }
      this.progress += 1

    }, 20)

  },
  methods: {
    ceshiClick (){

    },
    onNumberChange(picker, values) {
//      console.log(picker)
//      console.log(values)
    },
    getData (){
      console.log(this.wocao)
    },
    setD (){
      this.$store.dispatch('setWocao', "fuck")
    }
  },
  mounted() {

    this.$nextTick(() => {
      let step = 0;
      setInterval(() => {
        this.numberSlot[0].defaultIndex = step++;
        if (step > this.numberSlot[0].values.length - 1) {
          step = 0;
        }
      }, 1000);
    });
    let params = {
      router:"homeService.login",
      account:"root",
      password:111111
    }

    httpServer.post("/platform-aos/http/do.jhtml",params)
      .then(function (data) {
        console.log(data)
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped rel="stylesheet/scss" type="text/css">

  $fontSize: 20px;

  .btn{
    background-color: #999;
    font-size: 30px;
    border-radius: 5px;
    margin: 0 auto;
    text-align: center;
    display: inline-block;
    padding: 5px;
  }

  .scroll{
    height: 200px;
    width: 200px;
    background-color: #ccc;
    z-index: 999;
    li{
      height: 200px;
      width: 300px;
    }
  }

  .box{
    background-color: #fff;
    .aaa{
      color: red;
    }
    .bbb{
      font-size: $fontSize;
      display: inline-block;
      padding: 15px;
      color: blue;
      background-color: aliceblue;
    }
  }
</style>
