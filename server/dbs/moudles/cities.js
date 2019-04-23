import mongoose from 'mongoose'
const Schema = mongoose.Schema
const cities = new Schema({
  id: {
    type: Array,
    require: true
  },
  value:{
      type:Array,
      require:true
  }
})

export default mongoose.model('cities', cities)
