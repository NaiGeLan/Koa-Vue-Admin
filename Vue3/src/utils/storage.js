import config from '../config/index'
import Cookies from 'js-cookie'
export default {
    setItem(key,val){
        // let storage = this.getStorage()
        // storage[key] = val
        // window.localStorage.setItem(config.namespace,JSON.stringify(storage))
        console.log(key,val)
        return Cookies.set(key,val)
    },
    getItem(key){
        // return this.getStorage()[key]
        return Cookies.get(key)
    },
    // getStorage(){
    //     return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
    // },
    clearItme(key){
        // let storage = this.getStorage()
        // delete storage[key]
        // window.localStorage.setItem(config.namespace,JSON.stringify(storage))
        return Cookies.remove(key)
    },
    clearAll(){
        window.localStorage.clear()
    }
}
