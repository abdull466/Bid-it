const mongoose = require('mongoose')

const CatagorySchema = new mongoose.Schema({
    title:{
        type:String
    },
    active:{
        type:Boolean,
        default:false
    }
})

module.exports = Catagory = mongoose.model('catagory',CatagorySchema);