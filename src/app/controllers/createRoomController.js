const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query')
const fs = require('fs')


module.exports.costNotifi = async function(req , res){
    if(!req.body.time_life || !req.body.time_life.match(/^([0-9]+){1,11}$/)){
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
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT cost FROM cost_service WHERE cycile = ?"
    var resualts = await query(conn, sql , req.body.cycile);
    var cost_service = parseInt(req.body.time_life)*parseInt(resualts[0].cost);
    res.send({
        cost_service: cost_service
    })
}
module.exports.createRoom = async function(req , res )
{

    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT cost FROM cost_service WHERE cycile = ?"
    var resualts = await query(conn, sql , req.body.cycile);
    var cost_service = parseInt(req.body.time_life)*parseInt(resualts[0].cost);

    var image = {
        "url" : []
    };
    for (let i = 0 ; i < req.files.length; i ++)
    {
        image.url.push(req.files[i].path.split('\\').slice(2).join('/'))
    }
    image = JSON.stringify(image)
    var house_number ;
    if(!req.body.house_number ){ house_number = ''}
    else house_number = req.body.house_number;
    var public_places
    if (!req.body.public_places){public_places = ''}
    else public_places = req.body.public_places;
    sql = "INSERT INTO room (address, house_number , street , town , district, city, public_places, room_kind , amount , cycile , cost_room, acreage, WC_status, water_hot, kitchen, air_conditioner, balcony, electricity_water_status, electricity_cost, water_cost, status, image, landlord_id, time_life , cost_service ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    //console.log(req.body)
    await query(conn, sql , [req.body.address, house_number, req.body.street, req.body.town , req.body.district,  req.body.city, public_places , req.body.room_kind , req.body.amount, req.body.cycile, req.body.cost_room , req.body.acreage, req.body.WC_status, req.body.water_hot, req.body.kitchen, req.body.air_conditioner, req.body.balcony, req.body.electricity_water_status, req.body.electricity_cost, req.body.water_cost, req.body.status, image, res.locals.landlord_id, req.body.time_life , cost_service ]);
    //req.files[i].path.split('\\').slice(2).join('/')
    //var i = 0 ;
    //console.log(req.files.)
    // if(req.files.length < 3)
    // {

    //     for(var i = 0 ; i < req.files.length ; i ++)
    //     {
    //         fs.unlink( req.files[i].path , function (err) {
    //             if (err) throw err;
    //             console.log('File deleted!');
    //           });
    //     }

    // }
    // for (i ; i < req.files.length; i ++)
    // {
    // var img = fs.readFileSync(req.files[i].path);
    // var encode_image = img.toString('base64');
    // // Define a JSONobject for the image attributes for saving to database

    // var finalImg = {
    // contentType: req.files[i].mimetype,
    // image:  new Buffer.from(encode_image, 'base64')
    // };
    // console.log(finalImg)
    // }
    conn.end();
    res.send();

}

module.exports.editRoom = async function(req , res){
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT cost FROM cost_service WHERE cycile = ?"
    var resualts = await query(conn, sql , req.body.cycile);
    var cost_service = parseInt(req.body.time_life)*parseInt(resualts[0].cost);
    for (let i = 0 ; i < req.files.length; i ++)
    {
        res.locals.image.url.push(req.files[i].path.split('\\').slice(2).join('/'))
    }
    var image = JSON.stringify(res.locals.image);
    var house_number ;
    if(!req.body.house_number ){ house_number = ''}
    else house_number = req.body.house_number;
    var public_places
    if (!req.body.public_places){public_places = ''}
    else public_places = req.body.public_places;
    sql = "UPDATE room  SET address = ? , house_number = ? , street = ?  , town = ?  , district = ? , city = ? , public_places = ? , room_kind  = ? , amount = ? , cycile = ? , cost_room = ? , acreage = ? , WC_status = ? , water_hot = ? , kitchen = ? , air_conditioner = ? , balcony = ? , electricity_water_status = ? , electricity_cost = ? , water_cost = ? , status = ? , image = ? , landlord_id = ? , time_life = ?  , cost_service  = ? WHERE room_id = ? "
    await query(conn, sql , [req.body.address, house_number, req.body.street, req.body.town , req.body.district,  req.body.city, public_places , req.body.room_kind , req.body.amount, req.body.cycile, req.body.cost_room , req.body.acreage, req.body.WC_status, req.body.water_hot, req.body.kitchen, req.body.air_conditioner, req.body.balcony, req.body.electricity_water_status, req.body.electricity_cost, req.body.water_cost, req.body.status, image, res.locals.landlord_id, req.body.time_life , cost_service , req.body.room_id])
    sql = "UPDATE extend SET cycicle = ? , time_life = ? , cost_service = ? WHERE room_id = ?   "
    await query(conn, sql , [req.body.cycile , req.body.time_life , cost_service, req.body.room_id]);
    conn.end();
    res.send();

}

module.exports.getEditRoom = async function(req, res){
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT address, house_number , street , town , district, city, public_places, room_kind , amount , cycile , cost_room, acreage, WC_status, water_hot, kitchen, air_conditioner, balcony, electricity_water_status, electricity_cost, water_cost, status, image,  time_life  FROM room WHERE room_id = ? "
    var resualts = await query(conn, sql , [req.body.room_id]);
    conn.end();
    res.render('landlord/editRoom' , resualts)    
}



module.exports.getCreateRoom = function(req , res ){
    res.render('landlord/createRoom')
}