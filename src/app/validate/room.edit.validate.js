const fs = require('fs')

function deletedImage(req){
    if(req.files){
    for(var i = 0 ; i < req.files.length ; i ++)
        {
            fs.unlink( req.files[i].path , function (err) {
                if (err) throw err;
                console.log('File deleted!');
              });
        }
    }
}

module.exports.putEdit = function (req , res , next){
    var rageHouse_number = /^([0-9]+)(([A-Z])*)*$/;
    //console.log(!req.body.house_number.match(rageHouse_number))
    if (req.body.house_number){
        if (!req.body.house_number.match(rageHouse_number)){
            console.log(req.body)
            deletedImage(req);
            res.status(404).end()
            return;
        }
    } 
    //console.log(req.body)

    if (!req.body.address || !req.body.street || !req.body.town || !req.body.district || !req.body.city
         ){
            deletedImage(req);
            res.status(404).end()
            return;
    }
    
    if (!(req.body.room_kind == "phòng trọ" || req.body.room_kind ==  "chung cư mini" || req.body.room_kind ==  "chung cư nguyên căn")){
        deletedImage(req);
        res.status(404).end()
        return;
    }
    
    if(!req.body.amount || !req.body.amount.match(/^([0-9]+)$/)){
        deletedImage(req);
        res.status(404).end()
        return;
    }
    
    if (!(req.body.cycile == 'week' || req.body.cycile == 'month' || req.body.cycile == 'year' || req.body.cycile == 'quarter'))
    {
        deletedImage(req);
        res.status(404).end()
        return;
    }
    
    if (!req.body.cost_room || !req.body.cost_room.match(/^([0-9]+)$/) || !req.body.acreage ||  !req.body.acreage.match(/^([0-9]+)$/)){
        deletedImage(req);
        res.status(404).end()
        return;
    }
    //console.log(1);
    if(!(req.body.WC_status == 'Chung' || req.body.WC_status == 'Riêng' )){
        deletedImage(req);
        res.status(404).end()
        return;
    }
    if(!(req.body.water_hot == 'Có' || req.body.water_hot == 'Không'))
    {
        deletedImage(req);
        res.status(404).end()
        return;
    }
   
    
    // if(!(req.body. == 'Có' || req.body.water_hot == 'Không'))
    // {
    //     res.status(404).end()
    //     return;
    // }
    if (!(req.body.kitchen == 'Không nấu ăn' || req.body.kitchen == 'Bếp riêng' || req.body.kitchen == 'Bếp chung' ))
    {
        deletedImage(req);
        res.status(404).end()
        return;
    }
    
    if (!(req.body.air_conditioner == 'Không' || req.body.air_conditioner == 'Có') || !(req.body.balcony == 'Có' || req.body.balcony == 'Không') )
    {
        deletedImage(req);
        res.status(404).end()
        return;
    }
    
    if (!(req.body.electricity_water_status == 'Giá dân' || req.body.electricity_water_status == 'Giá thuê' ) || !(req.body.status == 'Chung chủ' || req.body.status == 'Không chung chủ' ))
    {
        deletedImage(req);
        res.status(404).end()
        return;
    }
    //console.log(!req.body.electricity_cost.match(/^([0-9]+){1,5}$/))
    if (!req.body.electricity_cost || !req.body.electricity_cost.match(/^([0-9]+){1,5}$/) || !req.body.water_cost || !req.body.water_cost.match(/^([0-9]+){1,5}$/) )
    {
        deletedImage(req);
        res.status(404).end()
        return;
    }
    if(!req.body.time_life || !req.body.time_life.match(/^([0-9]+){1,11}$/)){
        deletedImage(req);
        res.status(404).end()
        return;
    }
    if(!req.body.imageDel){
        deletedImage(req);
        res.status(404).end()
        return;
    }
    //console.log(1)
    
    
    //console.log(1);
    
    next();



    //if (!)
    
}