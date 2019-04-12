import mongoose from 'mongoose'
const Schema = mongoose.Schema
const regions=new Schema({
  id:{
    type:String,
    require:true
  },
  name:{
    type:String,
    require:true
  },
  code:{
      type:String,
      require:true
  },
  city:{
      type:String
  },
  description:{
      type:String,
      require:true
  }
})

export default mongoose.model('regions',regions)
