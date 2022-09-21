import config from '../config/index'
import Cookies from 'js-cookie'
export default {
    setItem(key,val){
        console.log(key,val)
        return Cookies.set(key,val)
    },
    getItem(key){
        return Cookies.get(key)
    },
    // getStorage(){
    //     return JSON.parse(window.localStorage.getItem(config.namespace) || "{}")
    // },
    clearItme(key){
        return Cookies.remove(key)
    },
    clearAll(){
        window.localStorage.clear()
    }
}
