const { mongoose } = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://zpy:123456@43.142.129.124:27017/koa-server');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to MongoDB');
});
var stuSchema = new Schema({
  name: String,
  age: Number,
  gender:{
      type: String,
      default:'male'
  },
  addr: String
})

//将stuSchema映射到一个MongoDB collection并定义这个文档的构成
var stuModle = mongoose.model('student',stuSchema)

//向student数据库中插入数据
stuModle.create({
  name:"小明",
  age:"20",
  addr:"天津"
},(err,docs)=>{
  if(!err){
      console.log('插入成功'+docs)
  }
})