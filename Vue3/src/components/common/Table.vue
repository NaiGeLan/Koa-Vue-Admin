<script setup>
import Pagination from './Pagination.vue'
const props = defineProps(
    {
      columnsData:{//表头数据
        type:Array,
        required:true
      },
      listData: {//表格内容数据
        type: Array,
        required: true
      },
      showIndexColumn: {//是否展示序列号列
        type: Boolean,
        default: false
      },
      showSelectColumn: {//是否有多选列
        type: Boolean,
        default: true
      },
      slotList:{ //插槽列
        type:Array
      },
      page: { //分页器数据
        type: Object,
        default: () => ({ currentPage: 0, pageSize: 10,total:0 })
      },
      showFooter: { //是否展示底部分页
        type: Boolean,
        default: true
      },
      isOperation:{ //是否展示操作列
        default:true
      },
      operation:{ //操作列数据
        default:() => ({
          width: '100',//宽度
          label:'操作',//标签
          isDownload:false,//是否展示下载
          isResetPassword:false,//是否展示重置密码
          isEdit:true,//是否展示编辑
          isDelete:true,//是否展示删除
          deleteText:'您确定要删除么'
        })
      }
    }
)
const emit = defineEmits(['selectionChange', 'handleSizeChange','handleCurrentChange','handleEdit','handleDelete','handleSelectionChange'])
const handleSelectionChange = (value) => {//多选监听
  emit('handleSelectionChange', value)
}
const handleCurrentChange = (val) => { //页码变化
  console.log(val)
  emit('handleCurrentChange', val)
}
const handleSizeChange = (val) => { //页面数据量变化
  emit('handleSizeChange',  val )
}
const handleEdit = (val) => { //点击编辑
  console.log(val)
  emit('handleEdit',val)
}
const handleDelete = (val) => {//点击删除
  emit('handleDelete',val)
}
const handleDownload = (val) => {//点击下载
  emit('handleDownload',val)
}
const handleResetPassword = (val) => {//点击重置密码
  emit('handleResetPassword',val)
}
const handleSlot = (val) => { //插槽操作
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
            :title="props.operation.deleteText"
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

