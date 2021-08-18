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
app.get('/hehe/:s',(req,res)=>{
    console.log('Rq',req)
    res.send({'result':'ok hehe'})
})
app.get('/hoho/:s/:x',(req,res)=>{
    console.log('Rq',req)
    res.send({'result':'ok hoho'})
})
app.all('*', function(req, res) {
    res.send({"result":"invalidURL"});
  });
app.listen(process.env.PORT||appSetting.port)
