var shouldhave = [
    'name','alias','address','city','email','phone_area','phone','fax_area','fax',
    'has_internet_connection',
    'sales_email','media','speed','ratio','duration',
    'usage_period','user_amount','fee',
    'operator','end_of_contract','problems',
    'internet_demand','known_us','known_from',
    'interested','reason2not_interested',
    'service_id','service_interested_to','budget',
    'implementation_target','follow_up','followed_up',
    'prospectdate']
    mandatory = ['name',
        'address',
        'phone_area',
        'phone',
        'end_of_contract',
        'prospectdate',
        'sales_email',
        'email',
        'business_field']
finditem = keys => {
    donthave = []
    mandatory.forEach(element => {
        if(keys.indexOf(element)<0){
            console.log('Element',element)
            donthave.push(element)
        }
    });
    console.log('Donthave',donthave)
    if(donthave.length>0){
        return {result:false,description:{'dontHave':donthave}}
    }else{
        return {result:true,description:'match'}
    }
}
check = params => {
    keys = Object.keys(params)
    found = finditem(keys)
    if(JSON.stringify(keys)===JSON.stringify(mandatory)){
        console.log('They are the same');
        return {result:true,description:'ok'}
    }else {
        console.log('They are not the same');
        return finditem(keys)
    }
}
module.exports = {
    check:check,
}