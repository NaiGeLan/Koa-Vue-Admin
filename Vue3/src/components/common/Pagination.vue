<template>
  <div>
    <el-pagination
        v-model:currentPage="props.currentPage"
        v-model:page-size="props.pageSize"
        class="mt-5 flex justify-end"
        :page-sizes="[1,3, 5, 10, 20]"
        small
        background
        layout="total, pager,sizes,"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  total: {
    default:0,
    required:false
  },
  pageSize: {
    default:10,
    required:false
  },
  currentPage:{
    default:1,
    required:true
  }
})
const emit = defineEmits(['handleSizeChange','handleCurrentChange'])
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  emit('handleSizeChange',val)
}
const handleCurrentChange = (val) => {
  emit('handleCurrentChange',val)
  console.log(`current page: ${val}`)
}

</script>

<style scoped>

</style>
