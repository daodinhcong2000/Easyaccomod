const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query')

module.exports.authStatisticalRoom = async function(req , res , next){
    if (!req.body.room_id){
        res.send({
            Err: 'Thiếu tham số' 
        })
        return;
    }
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT landlord_id , confirm_status FROM room WHERE room_id = ? "
    var resualts = await query(conn, sql , [req.body.room_id]);
    if (!resualts[0].landlord_id )
    {
        conn.end();
        res.send({
            Err: 'Bài viết này không tồn tại' 
        })
        return;
    }
    //console.log(1);
    if (resualts[0].landlord_id != res.locals.landlord_id)
    {
        conn.end();
        res.send({
            Err: 'Tài khoản này không có quyền chỉnh sửa bài viết này' 
        })
        return;
    }
    if (resualts[0].confirm_status != 1){
        conn.end();
        res.send({
            Err: 'Bài viết này chưa được đăng' 
        })
        return;
    }
    //console.log(1);
    next();
    
}