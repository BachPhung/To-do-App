const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        unique: true,
        minLength: 5,
    },
    name:String,
    passwordHash:String,
    notes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ],
})
// userSchema.plugin(uniqueValidator)
userSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject._v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User