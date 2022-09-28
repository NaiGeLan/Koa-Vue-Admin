<script setup>
import {reactive, ref} from "vue";
const props = defineProps({
  filterData:{
    required:true
  }
})
const emit = defineEmits(['getList'])
let selectForm = reactive({})
const getList = () => {
  emit('getList',selectForm)
}
const selectFormRef = ref()
const handleReset = (selectFormRef) => {
  selectFormRef.resetFields()
  emit('handleReset',selectForm)
}
</script>

<template>
  <div class="w-full h-8vh bg-white flex justify-center items-center rounded-2xl">
    <el-form :model="selectForm" ref="selectFormRef"  class="ml-5 flex justify-center items-center mt-3">

      <template v-if="props.filterData.input" v-for="(item,index) in props.filterData.input" :key="index">
        <el-form-item :label="item.label" class="mr-5" :prop="item.key">
          <el-input
              v-model="selectForm[item.key]"
              :placeholder="item.placeholder"
              :style="{'width':item.width?item.width+'em':'10em'}"
          />
        </el-form-item>
      </template>
      <template v-if="props.filterData.selection" v-for="(item,index) in props.filterData.selection" :key="index">
        <el-form-item :label="item.label" class="mr-5" :prop="item.key">
          <el-select
              v-model="selectForm[item.key]"
              :placeholder="item.placeholder"
              clearable
              :style="{'width':item.width?item.width+'em':'8em'}"
          >
            <el-option
                v-for="i in item.option"
                :key="i.key"
                :label="i.label"
                :value="i.value"
            />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="handleReset(selectFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
