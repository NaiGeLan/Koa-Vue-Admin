
<script lang="ts" setup>
  import { reactive } from 'vue'
  // import {login} from "../api/login.js";
  import useUserStore from '../store/modules/user';
  const userStore = useUserStore()
  const form = reactive({
    username:'',
    password:'',
  })
  
  const onSubmit = async () => {
      userStore.login(form)
    // const res = await login(form)
    // console.log(res)
  }
  const rules = reactive({
    username: [
      {required: true, message: '请输入账号', trigger: 'blur'},
    ],
    password: [
      {required: true, message: '请输入密码', trigger: 'blur'},
    ]
  })
  </script>
<template>
  <div class="bg-gray-100 h-100vh flex">
    <div class="w150 h-120  m-auto  bg-white flex justify-center items-center rounded-2xl ">
          <el-form :model="form" label-width="120px" :rules="rules">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="form.username" clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full"  @click="onSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
   
  </div>
  
</template>
