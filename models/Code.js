var mongoose = require('mongoose')

const CodeSchema = new mongoose.Schema({
    email:{
        type:'String'
    },
    code:{
        type:String
    }
})

module.exports=Code = mongoose.model('codes',CodeSchema);