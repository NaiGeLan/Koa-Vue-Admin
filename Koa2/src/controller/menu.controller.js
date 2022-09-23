const { addMenu, updateMenu } = require('../service/menu.service')
const utils = require('../utils/utils')
const util = require('../utils/utils')
class MenuController {
    async operate(ctx){
        // ctx.body = ctx.request.body
        const { _id, action, ...params} = ctx.request.body
        
        if(action === 'add'){
            const res = await addMenu({...params})
            const {_id,__v,...result} = res._doc
            ctx.body = util.success(util.CODE.SUCCESS,'新增成功',{...result})
        }
        else if(action === 'edit'){
            const res = await updateMenu(_id, {...params})
            console.log(res)
            ctx.body = util.success(util.CODE.SUCCESS,'编辑成功',true)
        }
    }
}

module.exports = new MenuController()