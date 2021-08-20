
var    checkparams = require('./js/checks')
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
