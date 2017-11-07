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
      pageNum: null
    }
  },
  computed: {
  },
  watch:{
    pageNum (data){
      if (data) this.pageNum =  data.replace(/[^\d]/g,'')
    }
  },
  methods: {
    toPage (toPageIndex){
      let index = parseInt(toPageIndex)
      console.log(index)
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
    // this.pageIndex = this.currentPage
  }
}
