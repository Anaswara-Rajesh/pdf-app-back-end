const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fileStorage',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const User = mongoose.model('User',{
    userid:Number,
    username:String,
    password:String,
    filename:String,
    file:String,
    pdf:[]
})

const Admin = mongoose.model('Admin',{
    adminid:Number,
    adminname:String,
    password:String,
    filename:String,
    file:String,
    pdf:[]
})

module.exports={
    User,
    Admin
}