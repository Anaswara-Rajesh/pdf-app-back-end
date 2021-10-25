const express = require('express')
const session = require('express-session')
const cors = require('cors')
const dataService = require('./services/data.service')

const app = express()
app.use(cors({
    origin:'http://localhost:4200',
    credentials:true
}))

app.use(session({
    secret: 'randomsecurestring',
    resave: false,
    saveUninitialized: false
}))

const logMiddleware = (req, res, next) => {
    console.log("Application specific Middleware");
    next()
}

const authMiddleware = (req, res, next) => {
    if (!req.session.currentAcc) {
        res.json({
            statusCode: 422,
            status: false,
            message: "Please Log In"
        })
    }
    else {
        next()
    }
}

app.use(express.json())

app.get('/', (req, res) => {
    res.send("GET METHOD")
})

app.post('/', (req, res) => {
    res.send("POST METHOD")
})

app.put('/', (req, res) => {
    res.send("PUT METHOD")
})

app.patch('/', (req, res) => {
    res.send("PATCH METHOD")
})

app.delete('/', (req, res) => {
    res.send("DELETE METHOD")
})

app.post('/uregister', (req, res) => {
    dataService.uregister(req.body.userid, req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/ulogin', (req, res) => {
    console.log(req.body);
    dataService.ulogin(req, req.body.userid, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/alogin', (req, res) => {
    console.log(req.body);
    dataService.alogin(req, req.body.adminid, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/aregister', (req, res) => {
    console.log(req.body);
    dataService.aregister(req.body.adminid,req.body.adminname,req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/upload', authMiddleware, (req, res) => {
    console.log(req.body);
    console.log(req.session.currentAcc);
    dataService.upload(req.body.userid, req.body.pswd, req.body.filename,req.body.file)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/getPdf', authMiddleware, (req, res) => {
    dataService.getPdf(req.body.userid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })    
})

app.listen(3000, () => {
    console.log("Server Started at Port Number:3000");
})

