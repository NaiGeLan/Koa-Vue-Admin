<script setup>
import {ElMessageBox} from "element-plus";
import {toRaw} from "vue";
import {computed, onMounted, reactive, watch, watchEffect} from "vue";
const props = defineProps({
  handleUserVisible:{
    default:false,
    required:false
  },
  method:{
    required:false,
    default:'add'
  },
  title:{
    default:'新增用户',
    required:true
  },
  data:{
    required:false,
    default:{}
  }
})
const emit = defineEmits(['handleCancel','handleOk'])
const handleCancel = () => {
  ElMessageBox.confirm('您确定要关闭么?',{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
        emit('handleCancel')
  })
}
const handleOk = () => {
  if (props.method === 'add')  emit('handleAdd',UserForm)
  if (props.method === 'edit') emit('handleEdit', {id:props.data._id,...UserForm})
}
let UserForm = reactive({
  username:'',
  password:'',
  rpassword:'',
  userEmail:'',
  mobile:'',
  sex:'',
  role:'',
  state:''
})
watch(() => props.data,(newVal,oldVal) => {
  const data = toRaw(newVal)
  for (const key in data){
    UserForm[key] = data[key]
  }
})
const checkPassword = (rule,value,callback) => {
  if(!value){
    return callback(new Error('请重复输入密码'))
  }else if(value !== UserForm.password){
    callback(new Error("两次密码不匹配"))
  }else {
    callback()
  }
}
const rules = reactive({
  username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 8, message: '用户名长度在3-8位', trigger: 'blur' },
  ],
  password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6,  message: '密码长度在六位以上', trigger: 'blur' },
  ],
  rpassword:[{ validator: checkPassword,required:true, trigger: 'blur' }]
})
onMounted(() => {
  console.log(props.data)
})
</script>
<template>
  <el-dialog
      v-model="props.handleUserVisible"
      width="40%"
      align-center
      draggable
      :before-close="handleCancel"
      :title="title"
  >
    <el-form :model="UserForm" label-width="100px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="UserForm.username" />
      </el-form-item>
      <el-form-item label="密码" type="password" autocomplete="off" prop="password" v-if="props.method == 'add'">
        <el-input v-model="UserForm.password" />
      </el-form-item>
      <el-form-item label="重复密码" prop="rpassword" v-if="props.method == 'add'">
        <el-input v-model="UserForm.rpassword" />
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="UserForm.userEmail" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="UserForm.mobile" />
      </el-form-item>
      <el-form-item label="用户状态" prop="state">
        <el-input v-model="UserForm.state" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-input v-model="UserForm.role" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">关闭</el-button>
        <el-button type="primary" @click="handleOk">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>

</style>
