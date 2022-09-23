
class MessageController {
    async getMessageList(ctx){
        console.log(ctx.request.query);
        ctx.body = {
            code:200,
            data:{
                total:2
            }
        }
    }
}
module.exports = new MessageController();