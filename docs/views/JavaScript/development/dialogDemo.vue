<template>
  <div class="add-leader">
    <el-dialog v-model="dialogShow" width="550" draggable>
      <template #header>
        <h5 class="title">{{ title }}</h5>
      </template>

      <!-- 表单 -->
      <div v-if="dialogShow" class="con-box">
        <el-form
          ref="formRef"
          label-width="120px"
          label-position="right"
          :model="formVal"
          :rules="fromRules"
        >
          <el-form-item label="团长名称：" prop="institution_name">
            <el-input v-model="formVal.institution_name" placeholder="请填写" maxlength="20" />
          </el-form-item>
          <el-form-item label="百应ID：" prop="buyin_id">
            <el-input v-model="formVal.buyin_id" placeholder="请填写" maxlength="20" />
          </el-form-item>
          <el-form-item label="团长主页链接：" prop="institution_page">
            <el-input v-model="formVal.institution_page" placeholder="请输入团长主页链接" />
          </el-form-item>
          <el-form-item label="跟进人：" prop="account_id">
            <el-select v-model="formVal.account_id" placeholder="请选择跟进人">
              <el-option
                v-for="item in accountOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="主推类目：" prop="category_id">
            <el-select v-model="formVal.category_id" placeholder="请选择主推类目">
              <el-option
                v-for="item in businessOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="出单商品数：" prop="order_product_num">
            <el-input v-model="formVal.order_product_num" placeholder="请填写" />
          </el-form-item>
          <el-form-item label="出单达人数：" prop="order_talent_num">
            <el-input v-model="formVal.order_talent_num" placeholder="请填写" />
          </el-form-item>
          <el-form-item label="总销售额：" prop="total_gmv">
            <el-input v-model="formVal.total_gmv" placeholder="请填写">
              <template #append>¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="msg">
            <el-input
              v-model="formVal.msg"
              type="textarea"
              rows="4"
              resize="none"
              maxlength="150"
              show-word-limit
              placeholder="最多150个字"
            />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button class="cancel-btn" @click="closeDrawer">取消</el-button>
          <el-button type="primary" :loading="btnLoading" @click="submitForm"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { setInstitution, getAccountList, businessCategory } from "@/api/activity"
const leaderIndexRefresh = inject("leaderIndexRefresh", null)
import { useStore } from "@/store"
const { useActivityStore } = useStore()

let btnLoading = ref(false)
let pageData = reactive({})
const dialogShow = ref(false)

// 表单
const formVal = ref({
  institution_name: "",
  buyin_id: "",
  institution_page: "",
  account_id: "",
  category_id: "",
  order_product_num: "",
  order_talent_num: "",
  total_gmv: ""
})

// 表单校验
const fromRules = {
  institution_name: [{ required: true, message: " ", trigger: "blur" }],
  buyin_id: [{ required: true, message: " ", trigger: "blur" }],
  account_id: [{ required: true, message: " ", trigger: "blur" }]
}
// 下拉选项
const accountOptions = ref([])
const businessOptions = ref([])
// 提交
const formRef = ref(null)
const submitForm = () => {
  formRef.value.validate(async(valid) => {
    if (valid) {
      btnLoading.value = true
      let params = JSON.parse(JSON.stringify(formVal.value))
      if (pageData && pageData.id ){
        params.id = pageData.id
      }
      delete params.create_time
      delete params.delete_time
      delete params.category_name
      delete params.ins_id
      delete params.update_time
      delete params.site_id
      const { code, msg } = await setInstitution(params)
      ElMessage({
        message: msg,
        type: code == 1 ? "success" : "error"
      })

      btnLoading.value = false
      if (code == 1) {
        useActivityStore.$patch((state) => {
          state.baseInfo = JSON.parse(JSON.stringify(Object.assign(state.baseInfo, params)))
        })
        dialogShow.value = false
      }
      leaderIndexRefresh && leaderIndexRefresh()
    } else {
      return false
    }
  })
}

let title = ref("添加团长信息")
// 打开
const openDialog = (tit, data) => {
  title.value = tit ? tit : "添加团长信息"
  console.log(tit, data)
  if (data) {
    pageData = JSON.parse(JSON.stringify(data))
    formVal.value = Object.assign(formVal.value, pageData)
  } else {
    pageData = {}
    formVal.value = {
      institution_name: "",
      buyin_id: "",
      institution_page: "",
      account_id: "",
      category_id: "",
      order_product_num: "",
      order_talent_num: "",
      total_gmv: ""
    }
  }
  // eslint-disable-next-line no-use-before-define
  getCategory()
  dialogShow.value = true
  formRef.value && formRef.value.resetFields()
}

// 关闭
const closeDrawer = () => {
  dialogShow.value = false
}

// 获取招商类目
const getCategory = () => {
  businessCategory().then( res => {
    if ( res.code==1 ) {
      let arr = []
      let key = Object.keys(res.data)
      let value = Object.values(res.data)
      key.map((ele, index) => {
        arr.push({
          name: value[index],
          id: key[index]
        })
      })
      businessOptions.value = arr
    }
  })
  getAccountList({
    page: 1,
    limit: 9999
  }).then( res => {
    if (res.code==1) {
      accountOptions.value = res?.data?.data
    }
  })
}

defineExpose({ openDialog })
</script>

<style lang="scss" scoped>
.add-leader {
  .title {
    font-size: 16px;
    color: var(--heTxtColor-6);
  }

  .cancel-btn {
    color: var(--maincolor);
    border-color: var(--maincolor);
  }

  .con-box {
    padding-right: 20px;
    border-top: 1px solid var(--heBorderColor-3);
    border-bottom: 1px solid var(--heBorderColor-3);
    padding-top: 20px;
    padding-bottom: 29px;
  }
}
</style>
