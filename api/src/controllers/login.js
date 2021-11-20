const  jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')

loginRouter.post('/',async(req,res)=>{
    const body= req.body
    const user = await User.findOne({username: body.username})
    const ID = user.id;
    const passwordCorrent = user === null ? false : await bcrypt.compare(body.password,user.passwordHash)

    if(!(user && passwordCorrent)){
        return res.status(401).json({
            error:'invalid username or password'
        })
    }
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken,"secret")
    res.status(200).send({token,username:user.username, name: user.name, ID})
})

module.exports = loginRouter