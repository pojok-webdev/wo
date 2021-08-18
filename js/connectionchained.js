var mysql = require('promise-mysql'),
    config = require('./configs')




    
doQuery = sql =>{
    return new Promise((resolve,reject)=>{
        con = mysql.createConnection(
            config.sql()
        )
        .then(cn => {
            var result = cn.query(sql)
            cn.end()
            return result
        },err=>{
            console.log("Padi Error query",err)
            return err
        })
        .then(
            rows => {
                resolve (rows)
            },
            err=>{
                console.log("Padi Error show rows",err)
                reject (err)
            }
        )
    })
}
module.exports = {
    doQuery:doQuery
}