var express = require('express'),
    app = express(),
    connection = require('./js/connection'),
    connectionchained = require('./js/connectionchained'),
    clientqueries = require('./js/clientqueries'),
    bodyParser = require('body-parser'),
    appconfig = require('./js/configs'),
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
    connection.doQuery(clientqueries.getClientByName(req.params),result=>{
        res.send(result)
    })
})
app.get('/getclientbyname/:name',(req,res,next)=>{
    connection.doQuery(clientqueries.getClientByName(req.params),result=>{
        res.send(result)
    })
})
app.get('/getclientpicbyclientid/:id',(req,res,next)=>{
    console.log('Qyert',clientqueries.getClientById(req.params))
    connectionchained.doQuery(clientqueries.getClientById({id:req.params.id,chain:'pic'}))
    .then(x=>{
        new Promise((resolve,reject)=>x.map(row=>{
            connectionchained.doQuery(clientqueries.getPicByClientId({id:row.id}))
            .then(pic=>{
                row.pic = pic
                resolve (row)
            },picerr=>{
                reject (picerr)
            })            
        }))
        .then(pic=>{
            console.log('PIC res',pic)
            res.send ({'result':pic})
        },errpic=>{
            console.log('PIC err',errpic)
            res.send ({'result':errpic})
        })
    },err=>{
        console.log('Err',err)
    })
})
app.get('/getclientservicebyclientid/:id',(req,res,next)=>{
    console.log('Qyert',clientqueries.getClientById(req.params))
    connectionchained.doQuery(clientqueries.getClientById({id:req.params.id,chain:'service'}))
    .then(x=>{
        new Promise((resolve,reject)=>x.map(row=>{
            connectionchained.doQuery(clientqueries.getServiceByClientId({id:row.id}))
            .then(pic=>{
                row.service = pic
                resolve (row)
            },picerr=>{
                reject (picerr)
            })            
        }))
        .then(pic=>{
            console.log('PIC res',pic)
            res.send ({'result':pic})
        },errpic=>{
            console.log('PIC err',errpic)
            res.send ({'result':errpic})
        })
    },err=>{
        console.log('Err',err)
    })
})
app.get('/getmasterservice',(req,res)=>{
    connection.doQuery(clientqueries.getMasterServices(),services=>{
        res.send({'result':services})
    })
})
app.get('/getmasterservicebyname/:name',(req,res)=>{
    console.log('PARAMS',req.params)
    connection.doQuery(clientqueries.getMasterServiceByName(req.params),services=>{
        res.send({'result':services})
    })
})
app.get('/getmasterservicebycategory/:category_id',(req,res)=>{
    console.log('PARAMS',req.params)
    connection.doQuery(clientqueries.getMasterServiceByCategory(req.params),services=>{
        res.send({'result':services})
    })
})
app.get('/getmastermaterial', (req,res) => {
    connection.doQuery(clientqueries.getMasterMaterial(),material=>{
        console.log('Material',material)
        res.send({'result':material})
    })
})
app.get('/getmasterdevice', (req,res) => {
    connection.doQuery(clientqueries.getMasterDevice(),device=>{
        console.log('Device',device)
        res.send({'result':device})
    })
})
app.all('*', function(req, res) {
    res.send({"result":"invalidURL"});
});
app.listen(process.env.PORT||appSetting.port)
