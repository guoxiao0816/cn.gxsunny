<template>
  <div class="pageStylePublic">
    <div class="pageMainBoxPublic">
      <!-- 头部 -->
      <PageTitle :list="pagetitle"></PageTitle>
      <div class="pageMainBoxPublicmain">
        <!-- 搜索条件 -->
        <div class="searchbox"></div>
        <!-- table -->
        <div class="tablebox"></div>

        <PagePaging
          :pageinfo="pageInfo"
          @pagesizechage="pagesizechage"
          @pagecurrentchage="pagecurrentchage"
        ></PagePaging>
      </div>
    </div>
  </div>
</template>
<script setup>
// 引入接口
import { getInstitutionList } from "@/api/activity.js"
// 引入store
import { useStore } from "@/store"
import { storeToRefs } from "pinia"
const router = useRouter() // router.push()
// const route = useRoute() //携带参数的当前事例  // route.query.id
const { useActivityStore } = useStore()
// 转换 store 里面的属性为响应式数据，script 里面使用要加 .value // baseInfo.value
const { baseInfo } = storeToRefs(useActivityStore)

const formRef = ref(null)
const loading = ref(false)
const tableData = ref([])
// 搜索条件内容
const formSearch = ref({
  keyword: ""
})
// pageinfo
const pageInfo = ref({
  total: 0,
  currentpage: 1,
  pageSize: 10
})

// 复杂数据
const pageData = reactive({
  pageInfo: {}
})

// 打开编辑/添加弹窗
const addLeaderOpen = (tit, row) => {
  addLeaderRef.value.openDialog(tit, row)
}

// 获取列表
const getList = async() => {
  loading.value = true
  let params = {
    page: pageInfo.value.currentpage,
    limit: pageInfo.value.pageSize,
    keyword: formSearch.value.keyword
  }
  let { data, code, msg } = await getInstitutionList(params)
  if (code == 1) {
    tableData.value = data?.data || []
    pageInfo.value.total = data?.total
  } else {
    ElMessage({
      message: msg,
      type: code == 1 ? "success":"error"
    })
  }
  loading.value = false
}

const searchBtn = () => {
  pageInfo.value.currentpage = 1
  getList()
}

const pagesizechage = (value) => {
  pageInfo.value.pageSize = value
  searchBtn()
}

const pagecurrentchage = (value) => {
  pageInfo.value.currentpage = value
  getList()
}

onMounted(() => {
  getList()
})

// 复杂数据建议使用 store
// 提供刷新条件给子组件， 比如添加后刷新列表 等 Provide/Inject 可以跨越多级组件层级传递数据 需要注意接收
provide("leaderIndexRefresh", searchBtn)
const leaderIndexRefresh = inject("leaderIndexRefresh", null)
// 也可以使用  props 和 emit 来实现。props 用于从父组件向子组件传递数据，emit 用于从子组件向父组件发送事件
/**
 * <ChildComponent message="Hello from Parent!" @update-message="handleUpdateMessage"></ChildComponent>
 * * props 传递的参数要用 props.name 来获取
 * 子组件
 * const props = defineProps({
    message: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['update-message'])
  const sendMessage = () => {
    emit('update-message', 'Hello from Child!')
  }
 *
 * 父组件
 * const handleUpdateMessage = (newMessage) => {
    console.log('Received message from child:', newMessage)
  }
 *
 */

</script>
<!-- 需要做 keepAlive 的页面需要添加 name -->
<script>
export default {
  name: "Default",
}
</script>
<style lang="scss" scoped></style>