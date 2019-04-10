import mongooes from 'mongooes'
const Schema = mongooes.Schema
const Province = new Schema({
    id:{
        type:String,
        require:true
    },
    value:{
        type:Array,
        require:true
    }
})

export default mongooes.model('province'.province)