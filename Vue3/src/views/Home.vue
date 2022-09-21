<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { CaretBottom } from '@element-plus/icons-vue'
import {onMounted, ref} from 'vue'
import useUserStore from '../store/modules/user';
// const router = useRouter();
const userStore = useUserStore()
const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const isCollapse = ref(false)
const expandOrCollapse = () => {
  console.log(isCollapse.value)
  isCollapse.value = !isCollapse.value
}
const username = ref()
onMounted(() => {
  console.log(userStore)
  username.value = userStore.username
})
</script>

<template>
  <div class="common-layout " >

    <el-container class="h-100vh bg-gray-100 overflow-hidden">
      <div  class="h-100vh border-r-1 border-r-blue-200 bg-white  z-10">
        <div class="h-6vh w-full flex justify-center items-center" v-if="!isCollapse">
          <div class="text-lg">
            NaiGeLan Admin
          </div>
        </div>
        <div class="h-6vh w-full flex justify-center items-center" v-if="isCollapse">
          <div class="text-xs">
            NaiGeLan
          </div>
        </div>
        <el-menu
            default-active="1"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
        >
          <el-menu-item index="1">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
        <el-icon :size="25" class="fixed bottom-10 left-5" @click="expandOrCollapse">
          <Switch />
        </el-icon>
      </div>
      <el-container>
        <el-header class="bg-white fixed top-0 right-0 block w-full border-b-1 border-b-blue-200 ">
          <el-dropdown trigger="click" class="fixed right-40 top-2">
            <span class="el-dropdown-link">
              <el-badge  is-dot class="item">
                  <el-icon :size="40" class="" >
                  <Message /><caret-bottom />
                </el-icon>
              </el-badge>

            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item class="clearfix">
                  comments
                  <el-badge class="mark" :value="12" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="fixed right-10 mt-3 " v-if="username">
<!--            欢迎您! {{ username}}-->
            <el-dropdown trigger="click">
              <span class="el-dropdown-link text-lg">
                欢迎您! {{ username}}
<!--                <el-icon class="el-icon&#45;&#45;right"><caret-bottom /></el-icon>-->
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item class="clearfix">
                    comments
                    <el-badge class="mark" :value="12" />
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    replies
                    <el-badge class="mark" :value="3" />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main class="border-1 m-5 mt-18 border-blue-200 bg-white block z-10 ">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>
