getClientById = param => {
    sql = 'select id,name,alias,"" '+param.chain+' from '
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
    sql = 'select id,name,alias,"" pic from ';
    sql+= 'clients where name like "%'+param.name+'%" '
    sql+= 'or alias like "%'+param.alias+'%"'
    console.log(sql)
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
getServiceByClientId = obj => {
    sql = 'select category, ';
    sql+= ' fb_id,c.name,bandwidth,upstr,dnstr,space '
    sql+= 'from clients a '
    sql+= 'left outer join fbs b on b.client_id=a.id '
    sql+= 'left outer join fbservices c on c.fb_id=b.nofb '
    sql+= 'where a.id = ' + obj.id + ' '
    sql+= 'and b.status="1" '
    console.log(sql)
    return sql
}
getMasterServices = _ => {
    sql = 'select id,category_id,product_id,name from pricelists2.products    '
    console.log(sql)
    return sql
}
module.exports = {
    getClientById:getClientById,
    getClientByName:getClientByName,
    getUserId:getUserId,
    getPicByClientId:getPicByClientId,
    getServiceByClientId:getServiceByClientId,
    getMasterServices:getMasterServices
}
