var express = require('express'),
    app = express(),
    connection = require('./js/connectionchained'),
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
app.get('/getpicbyclientid/:id',(req,res,next)=>{
    console.log('Qyert',clientqueries.getClientById(req.params))
    connection.doQuery(clientqueries.getClientById(req.params))
    .then(x=>{
        console.log('XXX',x)
        /*x.forEach(row=>{
            console.log('ID',row.id)
            connection.doQuery(clientqueries.getPicByClientId({id:row.id}))
            .then(pic=>{
                console.log('PIC',pic)
            })
        })*/
        new Promise((resolve,reject)=>x.map(row=>{
            connection.doQuery(clientqueries.getPicByClientId({id:row.id}))
            .then(pic=>{
                //console.log('PIC',pic)
                x.pic = pic
                resolve (x)
            },picerr=>{
                //console.log('Picerr',picerr)
                reject (picerr)
            })            
        }))
        .then(pic=>{
            console.log('PIC res',pic)
            res.send (pic)
        },errpic=>{
            console.log('PIC err',errpic)
            res.send (errpic)
        })
        //res.send(x)
    },err=>{
        console.log('Err',err)
    })
})
app.all('*', function(req, res) {
    res.send({"result":"invalidURL"});
  });
app.listen(process.env.PORT||appSetting.port)
