getClientById = param => {
    sql = 'select id,name,alias from '
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
    sql = 'select id,name,alias from ';
    sql+= 'clients where name like "%'+param.name+'%" '
    sql+= 'or alias like "%'+param.alias+'%"'
    return sql
}
getPicByClientId = obj => {
    sql = 'select c.email,c.role,c.name,c.position from clients a '
    sql+= 'left outer join fbs b on b.client_id=a.id '
    sql+= 'left outer join fbpics c on c.nofb=b.nofb '
    sql+= 'where a.id = ' + obj.id + ' '
    console.log(sql)
    return sql
}
module.exports = {
    getClientById:getClientById,
    getClientByName:getClientByName,
    getUserId:getUserId,
    getPicByClientId:getPicByClientId
}