const bcrypt = require('bcrypt')
const usersRoute = require('express').Router()
const User = require('../models/user')

usersRoute.post('/',async(req,res)=>{
    const body = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.passwordHash,saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    const savedUser = await user.save()
    res.status(200).json(savedUser)
})

usersRoute.get('/', async(req,res)=>{
    const users = await User.find({}).populate('notes',{content:1,date:1})
    res.json(users)
})

usersRoute.get('/:id', async(req,res,next)=>{
    const user = await User.findById(req.params.id).populate('notes',{content:1,date:1})
    res.json(user.toJSON())
})

usersRoute.put('/:id',async(request,response,next)=>{
    const body=request.body
    const saltRounds = 10
    console.log(body.pass);
    const newPassword = await bcrypt.hash(body.pass,saltRounds)
    const user = await User.findById(request.params.id)
    user.passwordHash = newPassword;
    console.log('Old user: ',user);
    await User.findByIdAndUpdate(request.params.id,user,{new:true})
    response.json().status(200)
})
module.exports = usersRoute
