getClientById = param => {
    if(param.chain){
        sql = 'select id,name,alias,"" '+param.chain+' from '
        sql+= ' clients '
        sql+= 'where id='+param.id
    }else{
        sql = 'select id,name,alias from '
        sql+= ' clients '
        sql+= 'where id='+param.id
    }
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
getMasterServiceByName = obj => {
    console.log('OBJ',obj)
    let sql = 'select id,category_id,product_id,name from pricelists2.products '
    sql+= 'where name like "%'+obj.name+'%" '
    console.log('SQL',sql)
    return sql
}
getMasterServiceByCategory = obj => {
    console.log('OBJ',obj)
    let sql = 'select id,category_id,product_id,name from pricelists2.products '
    sql+= 'where category_id="'+obj.category_id+'" '
    console.log('SQL',sql)
    return sql
}
getMasterMaterial = _ => {
    sql = ' select a.id,b.name,a.name,a.satuan,a.description from materials a '
    sql+= 'left outer join materialtypes b on b.id=a.materialtype_id '
    console.log(sql)
    return sql
}
getMasterDevice = _ => {
    sql = ' select a.id,b.name category,a.name,a.unit,a.brand,a.description from pricelists2.devices a '
    sql+= 'left outer join pricelists2.devicecategories b on b.id=a.category_id '
    console.log(sql)
    return sql
}
getMasterClientsites = _ => {
    sql = 'select a.id,a.name,b.id siteid,b.address '
    sql+= 'from clients a left outer join client_sites b on b.client_id=a.id '
    sql+= 'where a.active ="1" '
    console.log(sql)
    return sql
}
module.exports = {
    getClientById:getClientById,
    getClientByName:getClientByName,
    getUserId:getUserId,
    getPicByClientId:getPicByClientId,
    getServiceByClientId:getServiceByClientId,
    getMasterServices:getMasterServices,
    getMasterServiceByName:getMasterServiceByName,
    getMasterServiceByCategory:getMasterServiceByCategory,
    getMasterMaterial:getMasterMaterial,
    getMasterDevice:getMasterDevice,
    getMasterClientsites:getMasterClientsites
}
