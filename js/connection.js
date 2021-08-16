var mysql = require('promise-mysql'),
    config = require('./configs')
doQuery = (sql,callback)=>{
    con = mysql.createConnection(
        config.sql()
    )
    .then(cn => {
        var result = cn.query(sql)
        cn.end()
        return result
    },err=>{
        console.log("Padi Error query",err)
        callback(err)
    })
    .then(rows => {
        callback(rows)
    },err=>{
        console.log("Padi Error show rows",err)
        callback(err)
    })
}
module.exports = {
    doQuery:doQuery
}