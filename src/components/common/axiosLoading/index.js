import {mapGetters} from 'vuex'
import loading from '../../base/loading/loading.vue'
import popup from '../../base/popup/index.js'


export default {
  name: 'axiosLoading',
  components: {loading},
  data () {
    return {
      show: false,
      closeOnClickOverlay: false,
      lockOnScroll: true
    }
  },
  computed: {
    ...mapGetters(["httpCounts"]),
  },
  watch:{
    httpCounts (val){
      this.show = val > 0
    }
  },
  methods: {
  },
  mounted() {
  }
}
