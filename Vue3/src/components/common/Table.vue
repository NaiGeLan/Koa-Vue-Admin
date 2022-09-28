<script setup>
import Pagination from './Pagination.vue'
const props = defineProps(
    {
      columnsData:{
        type:Array,
        required:true
      },
      listData: {
        type: Array,
        required: true
      },
      showIndexColumn: {
        type: Boolean,
        default: false
      },
      showSelectColumn: {
        type: Boolean,
        default: true
      },
      slotList:{
        type:Array
      },
      page: {
        type: Object,
        default: () => ({ currentPage: 0, pageSize: 10,total:0 })
      },

      showFooter: {
        type: Boolean,
        default: true
      },
      isOperation:{
        default:true
      },
      operation:{
        data:{
          label:''
        },
        width:{
          default:'100',
          required:false
        },
        label:{
          default:'操作'
        }
      }
    }
)
const emit = defineEmits(['selectionChange', 'handleSizeChange','handleCurrentChange','handleEdit','handleDelete','handleSelectionChange'])
const handleSelectionChange = (value) => {
  // console.log(value)
  emit('handleSelectionChange', value)
}
const handleCurrentChange = (val) => {
  console.log(val)
  emit('handleCurrentChange', val)
}
const handleSizeChange = (val) => {
  emit('handleSizeChange',  val )
}
const handleEdit = (val) => {
  console.log(val)
  emit('handleEdit',val)
}
const handleDelete = (val) => {
  emit('handleDelete',val)
}
const handleDownload = (val) => {
  emit('handleDownload',val)
}
const handleResetPassword = (val) => {
  emit('handleResetPassword',val)
}
const handleSlot = (val) => {
  console.log(val)
}
</script>
<template>
  <el-table
      :data="listData"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60"></el-table-column>
    <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80"></el-table-column>
    <el-table-column v-for="item in props.columnsData" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width"/>
    <el-table-column v-for="item in props.slotList" :key="item.prop" :label="item.label" :prop="props.slotList.prop" :width="item.width">
      <template #default="scope" >
          <a @click="handleSlot(scope.row)">{{scope.row[item.prop]}}</a>
      </template>
    </el-table-column>
    <el-table-column
        v-if="props.isOperation"
        v-bind="props.listData ? { fixed: 'right' } : null"
        :key="props.operation.label"
        align="center"
        :width="props.operation.width"
        :label="props.operation.label"
        class-name="small-padding fixed-width"
    >
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)" type="primary" v-if="props.operation.isEdit">编辑</el-button>
        <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="handleDelete(scope.row)"
            icon-color="#626AEF"
            title="确定要删除该用户么"
            v-if="props.operation.isDelete"
        >
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
        <el-button size="small" @click="handleDownload(scope.row)" type="warning" v-if="props.operation.isDownload">下载</el-button>
        <el-button size="small" @click="handleResetPassword(scope.row)" type="warning" v-if="props.operation.isResetPassword">重置密码</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="footer" v-if="showFooter">
    <slot name="footer">
      <Pagination :currentPage="props.page.currentPage" :total="props.page.total" :page-size="props.page.pageSize"
      @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
      </Pagination>
    </slot>
  </div>
</template>

