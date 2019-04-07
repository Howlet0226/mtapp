// npm install mongoose
import mongoose from 'mongoose'
// Schema表示一个表的创建
const Schema = mongoose.Schema
const UserSchema=new Schema({
  username:{
    type:String,
    unique:true,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true
  }
})

export default mongoose.model('User',UserSchema)
