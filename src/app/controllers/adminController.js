const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');
const md5 = require('md5')


class adminController{
    getAdmin(req, res )
    {
        //console.log(req.cookies.customer_id)
        res.send(req.cookies.customer_id);
    }

    manageLandlord(req , res){
        res.render('admin/manage_acc',{layout : false});
    }

    manageRoom(req , res){
        res.render('admin/manage_post',{layout : false});
    }

    manageExtend(req , res){
        res.render('admin/updatetime_post',{layout : false});
    }

    async getLandlord(req , res){
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT landlord_id , fullName, citizen_id, address, phone, email, accuracy , edit_status , lastUpdate  FROM landlords WHERE 1 ";
        var resualts = await query(conn, sql).catch(console.log);
        for (let i = 0 ; i < resualts.length ; i ++){
            resualts[i].lastUpdate = Intl.DateTimeFormat('en-US').format(resualts[i].lastUpdate)
        }
        console.log(resualts);
        conn.end();
        res.send(resualts).end();
    }

    show(req , res){
        res.render('admin/index',{layout : false});
    }

    async confirmLanlord(req , res){
        console.log(req.landlord_id);
        if (!req.body.landlord_id ){
            res.send({
                err: "Lỗi"
            })
            return;
        }
        
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT landlord_id , fullName, citizen_id, address, phone, email, accuracy , edit_status , lastUpdate FROM landlords WHERE landlord_id  = ?";
        var resualts = await query(conn, sql, [req.body.landlord_id]).catch(console.log);
        if (!resualts[0] ){
            conn.end()
            res.send({
                err: "Tài khoản này không tồn tại"
            })
            return;
        }
        if (resualts[0].accuracy == 1){
            conn.end()
            res.send({
                err: "Tài khoản này đã được phê duyệt"
            })
            return;
        }
        sql = "UPDATE landlords SET accuracy  = 1 WHERE landlord_id = ?"
        await query(conn, sql , [req.body.landlord_id]).catch(console.log);
        res.send().end();
    }

    async getRooms(req , res ){
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT room_id ,CONCAT(r.room_kind ,' ', r.address ) AS roomName  , l.fullName  , r.creatDate AS create_date , r.confirm_status FROM room r JOIN landlords l ON r.landlord_id = l.landlord_id  ORDER BY r.creatDate DESC"
        var resualts = await query(conn , sql ).catch(console.log);
        for (let i = 0 ; i < resualts.length ; i ++){
            resualts[i].create_date = Intl.DateTimeFormat('en-US').format(resualts[i].create_date)
        }
        conn.end();
        res.send(resualts).end();

    
    }

    async confirmRoom (req , res){
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT cycile , time_life FROM extend WHERE (extend_status = 'pending' OR extend_status = 'not browse' ) AND room_id = ?"
        var resualts = await query(conn, sql , [req.body.room_id]).catch(console.log);
        var timeDayLife ;
        if (resualts[0].cycile == 'week'){
            timeDayLife = 7*(parseInt(resualts[0].time_life));
        }
        if (resualts[0].cycile == 'month'){
            timeDayLife = 30*(parseInt(resualts[0].time_life));
        }
        if (resualts[0].cycile == 'quarter'){
            timeDayLife = 90*(parseInt(resualts[0].time_life));
        }
        if (resualts[0].cycile == 'year'){
            timeDayLife = 365*(parseInt(resualts[0].time_life));
        }
        console.log(timeDayLife)
        sql = "UPDATE extend SET confirm_date = CURRENT_DATE() , extend_status = 'browse' WHERE room_id = ? "
        await query(conn, sql , [req.body.room_id]).catch(console.log);

        sql = "UPDATE room SET confirm_date = CURRENT_DATE() ,  confirm_status = 1 ,  expiration_date = ADDDATE(CURRENT_DATE() , ?)  WHERE room_id = ?"
        await query(conn, sql , [timeDayLife ,req.body.room_id]).catch(console.log);
        conn.end();
        res.send({
            data : "Phê duyệt bài viết thành công"
        }).end();

    }

    async notBrowseRoom(req , res){
        console.log('test');
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "UPDATE extend SET extend_status = 'not browse' , confirm_date = CURRENT_DATE() WHERE room_id = ? ";
        await query(conn , sql , [req.body.room_id]).catch(console.log);
        sql = "UPDATE room SET confirm_date = CURRENT_DATE()  WHERE room_id = ?"
        await query(conn, sql , [req.body.room_id]).catch(console.log);
        conn.end();
        
        res.send({
            data : "Từ chối phê duyệt bài viết thành công"
        }).end();
    }

    async adminCreateRoom(req , res){
    //console.log('test')
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
    await query(conn, sql , [req.body.address, house_number, req.body.street, req.body.town , req.body.district,  req.body.city, public_places , req.body.room_kind , req.body.amount, req.body.cycile, req.body.cost_room , req.body.acreage, req.body.WC_status, req.body.water_hot, req.body.kitchen, req.body.air_conditioner, req.body.balcony, req.body.electricity_water_status, req.body.electricity_cost, req.body.water_cost, req.body.status, image, 7, req.body.time_life , cost_service ]).catch(console.log);
    sql = "SELECT room_id FROM room WHERE landlord_id = 7 AND confirm_status = 0"
    resualts = await query(conn , sql);
    var room_id = resualts[0].room_id;
    sql = "SELECT cycile , time_life FROM extend WHERE (extend_status = 'pending' OR extend_status = 'not browse' ) AND room_id = ?"
    var resualts = await query(conn, sql , [room_id]).catch(console.log);
    var timeDayLife ;
    if (resualts[0].cycile == 'week'){
        timeDayLife = 7*(parseInt(resualts[0].time_life));
    }
    if (resualts[0].cycile == 'month'){
        timeDayLife = 30*(parseInt(resualts[0].time_life));
    }
    if (resualts[0].cycile == 'quarter'){
        timeDayLife = 90*(parseInt(resualts[0].time_life));
    }
    if (resualts[0].cycile == 'year'){
        timeDayLife = 365*(parseInt(resualts[0].time_life));
    }
    console.log(timeDayLife)
    sql = "UPDATE extend SET confirm_date = CURRENT_DATE() , extend_status = 'browse' WHERE room_id = ? "
    await query(conn, sql , [room_id]).catch(console.log);

    sql = "UPDATE room SET confirm_date = CURRENT_DATE() ,  confirm_status = 1 ,  expiration_date = ADDDATE(CURRENT_DATE() , ?)  WHERE room_id = ?"
    await query(conn, sql , [timeDayLife ,room_id]).catch(console.log);
    conn.end();
    res.send({
        data : 'Tạo bài đăng thành công'
    })


    }

    async confirmExtendStatus(req , res ){
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT COUNT(*) total FROM extend WHERE room_id = ? AND extend_status = 'pending' ";
        var resualts = await query(conn, sql , [req.body.room_id]).catch(console.log);
        if (resualts[0].total == 0 ){
            conn.end();
            res.send({
                err : "Yêu cầu xác nhận gia hạn không thể thực hiện"
            })
            return;
        }
        sql = "SELECT cycile , time_life  , cost_service ,FROM extend WHERE extend_status = 'pending' AND room_id = ?"
        var resualts = await query(conn, sql , [req.body.room_id]).catch(console.log);
        var timeDayLife ;
        if (resualts[0].cycile == 'week'){
            timeDayLife = 7*(parseInt(resualts[0].time_life));
        }
        if (resualts[0].cycile == 'month'){
            timeDayLife = 30*(parseInt(resualts[0].time_life));
        }
        if (resualts[0].cycile == 'quarter'){
            timeDayLife = 90*(parseInt(resualts[0].time_life));
        }
        if (resualts[0].cycile == 'year'){
            timeDayLife = 365*(parseInt(resualts[0].time_life));
        }
        console.log(timeDayLife)
        var cost_service = resualts[0].cost_service;
        sql = "UPDATE extend SET confirm_date = CURRENT_DATE() , extend_status = 'confirm' WHERE room_id = ? "
        await query(conn, sql , [req.body.room_id]).catch(console.log);
        sql = "UPDATE room SET confirm_date = CURRENT_DATE() ,  confirm_status = 1 ,  expiration_date = ADDDATE(CURRENT_DATE() , ?) , cost_service =  ? ,   WHERE room_id = ?"
        await query(conn, sql , [timeDayLife, cost_service,req.body.room_id]).catch(console.log);
        conn.end();
        res.send({
            data: 'Xác nhận gia hạn thành công'
        });
    }

    

}


module.exports = new adminController;