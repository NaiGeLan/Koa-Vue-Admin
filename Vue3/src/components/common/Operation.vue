<!--表格上方操作按钮组件-->
<script setup>
import {
  Check,
  Delete,
  Message,
} from '@element-plus/icons-vue'
const props = defineProps({
  delete:{
    type:Object,
    default: () => ({ isShow: true, text: '删除',confirmText:'您确定要删除么？'})
  },
  add:{
    type:Object,
    default: () => ({ isShow: true, text: '添加项目'})
  },
  export:{
    type:Object,
    default: () => ({ isShow: true, text: '导出数据'})
  }
})
const emit = defineEmits(['handleDelete','handleAdd','handleExport'])
const handleDelete = () => {
  emit('handleDelete')
}
const handleAdd = () => {
  emit('handleAdd')
}
const handleExport = () => {
  emit('handleExport')
}
</script>

<template>
  <el-popconfirm
      confirm-button-text="确定"
      cancel-button-text="取消"
      @confirm="handleDelete"
      icon-color="#626AEF"
      :title="props.delete.confirmText"
      v-if="props.delete.isShow"
  >
    <template #reference>
      <el-button size="small" type="danger">删除</el-button>
    </template>
  </el-popconfirm>
  <el-button type="info" :icon="Check"  v-if="props.add.isShow" size="small" @click="handleAdd">{{props.add.text}}</el-button>
  <el-button type="success" :icon="Message" v-if="props.export.isShow" size="small" @click="handleExport"> {{props.export.text}}</el-button>
</template>

<style scoped>

</style>
