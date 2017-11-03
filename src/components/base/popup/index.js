import Vue from 'vue'
import { Popup } from 'vant';

Vue.component(Popup.name, Popup);

// export default {
//   name: 'popup',
//   components: {},
//   data () {
//     return {
//       show: true
//     }
//   },
//   props: {
//     isShow: {                 //	当前组件是否显示
//       type: Boolean,
//       default: false
//     },
//     overlay: {                //是否显示背景遮罩层
//       type: Boolean,
//       default: true
//     },
//     lockOnScroll: {           //背景是否跟随滚动
//       type: Boolean,
//       default: false
//     },
//     position: {               //	弹出层位置(top bottom right left)
//       type: String,
//       default: ""
//     },
//     closeOnClickOverlay: {    //点击遮罩层是否关闭弹出层
//       type: Boolean,
//       default: true
//     },
//     preventScroll: {    //是否防止滚动穿透
//       type: Boolean,
//       default: false
//     }
//   },
//   computed: {
//   },
//   created (){
//   },
//   methods: {
//   },
//   mounted() {
//   }
// }
