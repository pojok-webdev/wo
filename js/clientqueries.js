getClientById = param => {
    sql = 'select * from '
    sql+= ' clients '
    sql+= 'where id='+param.id
    return sql
}
getUserId = obj => {
    sql = 'select id from users where email="'+obj.sales_email+'" ';
    console.log("getUser",sql)
    return sql
}
getClientByName = param => {
    sql = 'select * from ';
    sql+= 'clients where name like "%'+param.name+'%" '
    sql+= 'or alias like "%'+param.alias+'%"'
    return sql
}

module.exports = {
    getClientById:getClientById,
    getClientByName:getClientByName,
    getUserId:getUserId
}