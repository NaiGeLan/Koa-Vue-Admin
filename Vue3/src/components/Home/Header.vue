
  <script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import {getMessageListApi} from '../../api/message'
//   import { localRemove, pathMap } from '@/utils'
// import {getInfoApi} from '../api/user.js'
import { getInfoApi } from '../../api/user.js'
  const router = useRouter()
  const state = reactive({
    name: 'dashboard',
    username: null, // 用户信息变量
    hasBack: true, // 是否展示返回icon
    messageTotal: null
  })
  // 初始化执行方法
  onMounted(() => {
    const pathname = window.location.hash.split('/')[1] || ''
    if (!['login'].includes(pathname)) {
      getUserInfo()
      getMessageList()
    }
  })
  // 获取用户信息
  const getUserInfo = async () => {
    const userInfo = await getInfoApi()
    // console.log(userInfo)
    state.username = userInfo.data.username
    console.log(state.username)
  }
  //获取消息
  const getMessageList = async () => {
    const messageList = await getMessageListApi()

    state.messageTotal = messageList.data.total
    // console.log(state.messageTotal)
  }
  // 退出登录
  const logout = () => {
    axios.delete('/logout').then(() => {
      // 退出之后，将本地保存的 token  清理掉
      localRemove('token')
      // 回到登录页
      router.push({ path: '/login' })
    })
  }

//   router.afterEach((to) => {
//     const { id } = to.query
//     state.name = pathMap[to.name]
//     // level2 和 level3 需要展示返回icon
//     console.log('to.name', to.name)
//     state.hasBack = ['level2', 'level3'].includes(to.name)
//   })

//   // 返回方法

  </script>
  <template>

    <div class="header">
        <el-dropdown trigger="click" class="fixed right-40 top-2">
            <span class="el-dropdown-link">
              <el-badge  :is-dot="state.messageTotal>0?true:false" class="item">
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
      <div class="right fixed right-5 top-4">
        <el-popover
          placement="bottom"
          :width="320"
          trigger="click"
          popper-class="popper-user-box"
        >
          <template #reference >
            <div class="author " >
              <i class="icon el-icon-s-custom" />
              欢迎您！{{ state.username  }}
              <i class="el-icon-caret-bottom" />
            </div>
          </template>
          <div class="nickname">
            <p>登录名：{{ state.username }}</p>
<!--            <p>昵称：{{state.username }}</p>-->
            <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
          </div>
        </el-popover>
      </div>
    </div>
  </template>

  <style scoped>
    .header {
      height: 50px;
      /*border-bottom: 1px solid #e9e9e9;*/
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
  </style>

