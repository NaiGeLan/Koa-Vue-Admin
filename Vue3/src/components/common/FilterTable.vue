<!--表格上方筛选查询组件-->
<script setup>
import {reactive, ref} from "vue";
const props = defineProps({
  filterData:{
    required:true,
    default:() => ({
      input:[//输入框列表
        {
          placeholder:'', //提示语
          key:'',  //字段名
          label:':', //标签
          width:10, //宽度
        },
      ],
      selection:[//筛选框列表
        {
          placeholder:'',//提示语
          key:'',//字段名
          label:'',//标签
          option:[{ //选项列表
            value:0, //值
            label:'所有' //标签
          }]
        }
      ],
      isTime:false,//是否显示筛选时间控件
      timeLabel:'时间：'//时间控件label
    })
  }
})
const emit = defineEmits(['getList'])
let selectForm = reactive({}) //筛选表单数据
const getList = () => { //筛选数据
  emit('getList',selectForm)
}
const selectFormRef = ref() //表单实例对象
const handleReset = (selectFormRef) => { //重置
  selectFormRef.resetFields()
  emit('handleReset',selectForm)
}
</script>

<template>
  <div class="w-full h-8vh bg-white flex justify-center items-center rounded-2xl">
    <el-form :model="selectForm" ref="selectFormRef"  class="ml-5 flex justify-center items-center mt-3">
      <template v-if="props.filterData.isTime" >
        <el-form-item :label="props.filterData.timeLabel" class="mr-5" prop="time" >
          <el-date-picker
              v-model="selectForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="起始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD"
          />
        </el-form-item>
      </template>
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
