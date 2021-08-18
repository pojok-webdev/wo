var express = require('express'),
    app = express(),
    connection = require('./js/connection'),
    clientqueries = require('./js/clientqueries'),
    bodyParser = require('body-parser'),
    appconfig = require('./js/configs'),
    checkparams = require('./js/checks'),
    bodyParser = require('body-parser'),
    appSetting = appconfig.appSetting();
    app.engine('html',require('ejs').renderFile)
    app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json({limit:'10mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}))
app.post('/insertprospectnomandatory',(req,res,next)=>{
    connection.doQuery(clientqueries.getUserId({sales_email:'puji@padi.net.id'}),user=>{
        console.log("User got",user)
        if(user.length===0){
            res.send({'Error':'User doesnot exists'})
        }else{
            connection.doQuery(clientqueries.insertProspect(req.body,user[0]),result=>{
                res.send(result)
            })
        }
    })
})
app.use(function (req, res, next) {
    console.log('Req:', app.mountpath)
    next()
  })

app.get('/getclientbyid/:id',(req,res,next)=>{
    connection.doQuery(clientqueries.getClientById(req.params),result=>{
        res.send(result)
    })
})

app.get('/getpicbyclientid/:id',(req,res,next)=>{
    connection.doQuery(clientqueries.getClientById(req.params),client=>{
        
        connection.doQuery(clientqueries.getPicByClientId(req.params),pic=>{
            res.send({'result':{'client':client,'pic':pic}})
        })
    })
})

app.get('/getclientbyname/:name',(req,res,next)=>{
    connection.doQuery(clientqueries.getClientByName(req.params),result=>{
        res.send(result)
    })
})
app.all('*', function(req, res) {
    res.send({"result":"invalidURL"});
});
app.listen(process.env.PORT||appSetting.port)
