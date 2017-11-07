import {mapGetters} from 'vuex'

export default {
  name: 'pagination',
  components: {},
  props: {
    currentPage: {        //当前页
      type: Number,
      default: 0
    },
    pages: {              //总页数
      type: Number,
      default: 0
    },
    pageSize: {           //单页显示条数
      type: Number,
      default: 20
    },
  },
  data () {
    return {
      pageIndex: 0,
      pageNum: null,
      showPage: [],
      ellipsisLeft: false,
      ellipsisRight: false
    }
  },
  computed: {
  },
  watch:{
    pageNum (data){
      if (data) this.pageNum =  data.replace(/[^\d]/g,'')
    },
    currentPage: {
      handler: function (newVal, oldVal) {
        this.showPage = []
        let data = this.pages,
          len = data > 5 ? 5 : data


        //页码逻辑
        if (data > 5 && newVal <= 2 || data <= 5){    //页码头部（左侧起始）
          this.showPage = Array.apply(null,Array(len)).map((item, i) => i +1)
        }
        else if (newVal + 2 > data){                //页码尾部（右侧结束）
          this.showPage = Array.apply(null,Array(len)).map((item, i) => data -len + i + 1)
        }
        else {
          for (let i = 0; i < len; i++){
            this.showPage.push(newVal - 2 + i)
          }
        }


        //省略号逻辑
        this.ellipsisLeft = (newVal - 2 > 1) && (data > 5)
        this.ellipsisRight = (newVal + 2 < data) && (data > 5)

        // const fill = (len, ary = [], step = 0) => step < len ? (ary.push(++step) && fill(len, ary, step)) : ary
        // fill(100)
      },
      immediate: true
    }
  },
  methods: {
    toPage (data){
      let index = parseInt(data)
      if (!index || index === this.currentPage || index < 1 || index > this.pages) return

      this.pageIndex = index
      this.pageNum = null
      this.$emit("paginationClick", this.getPaginationData())
    },
    getPaginationData (){
      return {
        toPage: this.pageIndex,
        pages: this.pages,
        pageSize: this.pageSize
      }
    }
  },
  mounted() {
  }
}
