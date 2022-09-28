<script setup>
import { onMounted, reactive, ref} from "vue";
import {getUserListApi,addUserApi,updateUserApi,deleteUserApi,deleteManyApi} from '../api/user.js'
import {  ElMessage,ElLoading } from 'element-plus'
import HandleUser from '../components/User/handleUser.vue'
import FilterTable from '../components/common/FilterTable.vue'
import Table from '../components/common/Table.vue'
import Operation from '../components/common/Operation.vue'
//筛选框组件数据
const  filterData = reactive({
  input:[
    {
      placeholder:'请输入用户ID',    //提示语
      key:'userId',  //字段名
      label:'用户ID:',
      width:10,
    },
    {
      placeholder:'用户ID',    //提示语
      key:'username',  //字段名
      label:'姓名:'
    },
  ],
  selection:[
    {
      placeholder:'请选择',
      key:'state',
      label:'用户状态:',
      option:[{
        value:0,
        label:'所有'
      }]
    }
  ],
  isTime:true,
  timeLabel:'时间：'
})
const clickAdd = () => {
  handleUserTitle.value = '新增用户'
  handleUserData.value = {
    username:'',
    password:'',
    rpassword:'',
    userEmail:'',
    mobile:'',
    sex:'',
    role:'',
    state:''
  }
  handleUserMethod.value = 'add'
  DialogVisible.handleUserVisible = true
}
const clickEdit = (scope) => {
  console.log(scope)
  handleUserData.value = scope
  handleUserTitle.value = '编辑用户'
  handleUserMethod.value = 'edit'
  DialogVisible.handleUserVisible = true
}
const clickClose = () => {
  DialogVisible.handleUserVisible=false
}
const handleUserTitle = ref()
const handleUserMethod = ref()
const handleUserData = ref({})
//表格数据
const tableData = ref([])
//分页器数据
let pager = ref({
  total:0,
  pageNum: 1,
  pageSize:10
})
const DialogVisible = reactive({
  handleUserVisible:false
})
//批量选中数据
const mutiId = ref([])
const handleSelectionChange = (val) => {
  console.log(val)
  mutiId.value = val.map((item) => {
    return item._id
  })
  console.log(mutiId.value)
}
//编辑数据
const handleEdit = async (params) => {
  console.log(params)
  const {username,userEmail,mobile,state,role,id} = params
  console.log({username,userEmail,mobile,state,role,id})
  const res = await updateUserApi({username,userEmail,mobile,state,role,id})
  if(res.code === 200){
    ElMessage.success(res.msg)
    DialogVisible.handleUserVisible = false
    await getList()
  }
}
//新增数据
const handleAdd = async (params) => {
  console.log(params)
  const {username,password,userEmail,mobile,state,role} = params
  const res = await addUserApi({username,password,userEmail,mobile,state,role})
  if(res.code === 200){
    ElMessage.success(res.msg)
    DialogVisible.handleUserVisible = false
    await getList()
  }
  console.log(res)
}
//删除单条数据
const handleDelete = async (data) => {
  console.log(data._id)
  const res = await deleteUserApi(data._id)
  console.log(res)
  if(res.data){
    ElMessage.success(res.msg)
    await getList()
  }
}
//批量删除
const handleDeleteMany = async () => {
  console.log(mutiId)
  const res = await deleteMany(mutiId)
  console.log(res)
}
//获取表格数据
const getList = async (selectData) => {
  let getListInstance = ElLoading.service({ text: "正在获取用户信息，请稍候", background: "rgba(0, 0, 0, 0.7)", })
  const params = {...selectData,pageNum:pager.value.pageNum,pageSize:pager.value.pageSize}
  const list = await getUserListApi(params)
  if(list.code === 200) {
    getListInstance.close()
    pager.value.total = list.data.page.total
    tableData.value = list.data.list
    console.log(tableData.value)
  }
}
//单页数据量变化
const handleSizeChange = async (val) => {
  console.log(val)
  pager.value.pageSize = val
  await getList()
}
//页码变化
const handleCurrentChange = async (val) => {
  console.log(val)
  pager.value.pageNum = val
  await getList()
}
//重置页面
const handleReset = async (selectData) => {
  pager.value.pageSize = 10
  pager.value.pageNum = 1
  await getList(selectData)
}
onMounted(async () => {
  await getList()
})
const operationList = reactive({
  label: '操作', // 列名
  width: '280', // 根据实际情况给宽度
  isEdit:true, //是否有编辑
  isDelete:true,//是否有删除
  isDownload:true,//是否有下载
  isResetPassword:true,//是否重置密码
  deleteText:'您确定要删除么'
})
//表头数据
const columns = [
  {
    prop:'username',
    label:'用户名'
  },
  {
    prop:'userEmail',
    label:'用户邮箱',
    width: '180'
  },
  {
    prop:'mobile',
    label:'手机号'
  },
  {
    prop:'role',
    label:'用户角色'
  },
  {
    prop:'state',
    label:'用户状态'
  },
]
//表格插槽
const slotList = [
  {
    prop:'_id',
    label:'下载',
  },
]
</script>

<template>
  <!--    上方筛选框-->
  <FilterTable :filterData="filterData" @getList="getList" @handleReset="handleReset"></FilterTable>
  <Operation @handleDelete=""></Operation>
  <!--  下方表格-->
  <Table :listData="tableData"
         :columnsData="columns"
         :page="{currentPage:pager.pageNum,pageSize:pager.pageSize,total:pager.total}"
         :operation="operationList"
         @handleSelectionChange="handleSelectionChange"
         @handleSizeChange="handleSizeChange"
         @handleCurrentChange="handleCurrentChange"
         @handleEdit="clickEdit"
         @handleDelete="handleDelete"
         :slotList="slotList"
  >
  </Table>
    <HandleUser :handleUserVisible="DialogVisible.handleUserVisible" :method="handleUserMethod" :title="handleUserTitle" @handleCancel="clickClose" @handleAdd="handleAdd" @handleEdit="handleEdit" :data="handleUserData"></HandleUser>
</template>
