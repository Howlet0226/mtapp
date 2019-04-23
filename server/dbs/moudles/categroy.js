import mongoose from 'mongoose'
const schema = mongoose.Schema
const categroy = new schema({
  types :{
    type:Array,
    require:true
  },
  areas:{
    type:Array,
    require:true
  },
  city:{
    type:String
  }
})

export default mongoose.model('categroy',categroy,'categroy')