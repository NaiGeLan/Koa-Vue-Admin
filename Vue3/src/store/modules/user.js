import { loginApi, getInfoApi } from '../../api/user.js'
import { getToken, setToken, removeToken } from '../../utils/auth'
// import storage from '../../utils/storage'
import { defineStore } from 'pinia'
import storage from "../../utils/storage.js";
const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      username: storage.getItem('username'),
      roles: [],
      deptId: [],
      roleList: []
    }),
    actions: {
      // 登录
      login(userInfo) {
        const { username, password } = userInfo
        // console.log(username,password,"@@@@@@@@")
        return new Promise((resolve, reject) => {
            loginApi(username, password).then(res => {
            console.log(res.data,"@@@@@@")
            setToken(res.data.token)
            this.token = res.data.token
              const {username} = res.data.userInfo
              storage.setItem('username',username)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          getInfoApi().then(res => {
            console.log(res)
            const user = res.data
            resolve(user)
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          logout(this.token).then(() => {
            this.token = ''
            this.roles = []
            this.permissions = []
            removeToken()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  })

export default useUserStore
