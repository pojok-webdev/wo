var express = require('express'),
    app = express(),
    connection = require('./js/connection'),
    connectionchained = require('./js/connectionchained'),
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
/*app.get('/getpicbyclientid/:id',(req,res,next)=>{
    console.log('Qyert',clientqueries.getClientById(req.params))
    connection.doQuery(clientqueries.getClientById(req.params))
    .then(x=>{
        new Promise((resolve,reject)=>x.map(row=>{
            connection.doQuery(clientqueries.getPicByClientId({id:row.id}))
            .then(pic=>{
                row.pic = pic
                resolve (row)
            },picerr=>{
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
    },err=>{
        console.log('Err',err)
    })
})*/
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
app.get('/getclientpicservicebyclientid/:id',(req,res,next)=>{
    console.log('Qyert',clientqueries.getClientById(req.params))
    connectionchained.doQuery(clientqueries.getClientById({id:req.params.id,chain:'service'}))
    .then(client=>{
        new Promise((resolve,reject)=>client.map(row=>{
            connectionchained.doQuery(clientqueries.getServiceByClientId({id:row.id}))
            .then(srv=>{
                row.service = srv
                resolve (row)
            },srverr=>{
                reject (srverr)
            })            
        }))
        .then(service=>{
            console.log('Service res',service)
            res.send ({'result':service})
        },errservice=>{
            console.log('Service err',errservice)
            res.send ({'result':errservice})
        })
    },err=>{
        console.log('Err Get Services',err)
    })
    .then(client=>{
        new Promise((resolve,reject)=>client.map(row=>{
            connectionchained.doQuery(clientqueries.getPicByClientId({id:row.id}))
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
        console.log('Err Get PICs',err)
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
app.get('/getclientsites',(req,res)=>{
    connectionchained.doQuery(clientqueries.getMasterClients({chain:'site'}))
    .then(client=>{
        console.log('Client',client)
        new Promise((resolve,reject)=>connectionchained.doQuery(clientqueries.getMasterSites({client_id:client.id})
        .then(site=>{
            resolve(site)
        },err=>{
            reject(err)
        })

        ))
     //   res.send({'result':client})
    })
})
app.all('*', function(req, res) {
    res.send({"result":"invalidURL"});
  });
app.listen(process.env.PORT||appSetting.port)
