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

    <el-container class="h-100vh bg-gray-100">
      <div  class="h-100vh border-r-1 border-r-blue-200 bg-white">
        <div class="h-6vh w-full flex justify-center items-center" v-if="!isCollapse">
          <div class="text-lg">
            NaiGeLan Admin
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
          <el-sub-menu index="2">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group title="Group One">
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="3" disabled>
            <el-icon><document /></el-icon>
            <span>Navigator Three</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
        <el-icon :size="25" class="fixed bottom-10 left-5" @click="expandOrCollapse">
          <Switch />
        </el-icon>
<!--        <el-icon ><Switch class="w-" /></el-icon>-->
      </div>
      <el-container>
        <el-header class="bg-white">
          <el-dropdown trigger="click" class="fixed right-40">
            <span class="el-dropdown-link">
              <el-icon :size="50" class="" >
                  <Message /><caret-bottom />
                </el-icon>
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
          <div class="fixed right-10 leading-4">欢迎您! {{ username}}</div>
        </el-header>
        <el-main class="h-full border-1 m-5 border-blue-200 bg-white">

          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <!--  1111-->
  <!--  <router-view></router-view>-->
</template>

<style scoped>

</style>
