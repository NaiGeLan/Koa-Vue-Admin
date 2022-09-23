const Menu = require('../model/menu.model')
class MenuService {
    async addMenu(params){
        const res = Menu.create(params)
        return res
    }
    async updateMenu(id,params){
        params.updateTime = Date.now()
        const res = Menu.findByIdAndUpdate(id,params)
        return res
    } 
}
module.exports = new MenuService();