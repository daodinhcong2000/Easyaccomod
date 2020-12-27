
const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query')

module.exports.updateFillRoom = async function(req , res){
    if (!req.body.fill || !req.body.fill.match(/^([0-9]+){1,11}$/)){
        res.send({
            err : "Dữ liệu khả nghi"
        })
        return;
    }
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT amount FROM room WHERE room_id = ? "
    var resualts = await query(conn , sql , [req.body.room_id]);
    if (parseInt(req.body.fill) > parseInt(resualts[0].amount)){
        console.log(1);
        res.status(404).end();
        return;
    }
    sql = "UPDATE room SET fill = ? WHERE room_id = ? "
    await query(conn, sql , [req.body.fill , req.body.room_id]);
    conn.end();
    res.send({
        data: "Cập nhật trạng thái phòng trọ thành công"
    })

    

}

module.exports.extendRoom = async function(req , res){
    if (!(req.body.cycile == 'week' || req.body.cycile == 'month' || req.body.cycile == 'year' || req.body.cycile == 'quarter'))
    {
        res.status(404).end()
        return;
    }
    if(!req.body.time_life || !req.body.time_life.match(/^([0-9]+){1,11}$/)){
        res.status(404).end()
        return;
    }
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT expiration_date FROM room WHERE room_id = ? "
    var resualts = await query(conn, sql, [req.body.room_id]);
    resualts[0].expiration_date = Intl.DateTimeFormat('en-US').format(resualts[0].expiration_date)
    var ex_day = parseInt(resualts[0].expiration_date.split('/')[1]);
    var ex_month = parseInt(resualts[0].expiration_date.split('/')[0])
    var ex_year = parseInt(resualts[0].expiration_date.split('/')[2])
    var date = new Date();
    var checkTime = false;
    if (date.getFullYear > ex_year ){
        checkTime = true;
    }
    if (date.getFullYear == ex_year){
        if (date.getMonth > ex_month){
            checkTime = true;
        }
        if (date.getMonth == ex_month){
            if (date.getDay > ex_day ){
                checkTime = true
            }
        }
    }
    if (!checkTime){
        res.send({
            err: "Hiện tại bài viết này không thể gia hạn"
        }).end();
        return;
    }
    sql = "SELECT extend_status FROM extend WHERE room_id = ?";
    resualts = await query(conn, sql , [req.body.room_id]).catch(console.log);
    for (let i = 0  ; i < resualts.lenght ; i ++){
        if (resualts[i].extend_status == 'pending' || resualts[i].extend_status == 'not browse'){
            res.send({
                err: "Bài viết này đang được xử lí hoặc không được duyệt"
            }).end();
            return;
        }
    }

    sql = "SELECT cost FROM cost_service WHERE cycile = ?"
    resualts = await query(conn, sql , req.body.cycile);
    var cost_service = parseInt(req.body.time_life)*parseInt(resualts[0].cost);
    sql = "INSERT INTO extend (landlord_id , room_id , cycile, time_life , cost_service ) VALUES (?,?,?,?,?)"
    await query(conn, sql , [res.locals.landlord_id , req.body.room_id, req.body.cycile , req.body.time_life , cost_service  ]);
    conn.end();
    res.send({
        data: "Yêu cầu gia hạn bài viết đang được xử lí"
    }).end();

}