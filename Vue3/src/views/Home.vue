<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import {ref} from 'vue'
// import useUserStore from '../store/modules/user';
// const router = useRouter();
import Header from '../components/Home/Header.vue'
// const userStore = useUserStore()
const activeIndex = ref('1')
// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleOpen = (key, keyPath) => {
//   console.log(key, keyPath)
// }
// const handleClose = (key, keyPath) => {
//   console.log(key, keyPath)
// }
const isCollapse = ref(false)
const expandOrCollapse = () => {
  console.log(isCollapse.value)
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="common-layout " >

    <el-container class="h-95vh bg-gray-100 overflow-hidden">
      <div  class="h-100vh border-r-1 border-r-blue-200 bg-white  z-10">
        <div class="h-6vh w-full flex justify-center items-center" v-if="!isCollapse">
          <div class="text-l">
            NaiGeLan Admin
          </div>
        </div>
        <div class="h-6vh w-full flex justify-center items-center" v-if="isCollapse">
          <div class="text-xs">
            NaiGeLan
          </div>
        </div>
        <el-menu
            :default-active="activeIndex"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            router=true
        >
          <el-menu-item index="/user" >
            <el-icon><icon-menu /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-menu>
        <el-icon :size="25" class="fixed bottom-10 left-5" @click="expandOrCollapse">
          <Switch />
        </el-icon>
      </div>
      <el-container>
        <!-- 头部 -->
        <el-header class="bg-white fixed top-0 right-0 block w-full">
          <Header></Header>
        </el-header>
        <!-- main部分 -->
        <el-main class=" m-5 mt-18  block z-10 ">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
