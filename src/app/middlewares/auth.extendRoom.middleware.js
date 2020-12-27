const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query')

module.exports.authConfirmRoom = async function(req , res , next){
    if (!req.body.room_id){
        res.send({
            Err: 'Thiếu tham số' 
        })
        return;
    }
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT landlord_id , confirm_status FROM room WHERE room_id = ? "
    var resualts = await query(conn, sql , [req.body.room_id]);
    if (resualts.length == 0  )
    {
        conn.end();
        res.send({
            Err: 'Bài viết này không tồn tại' 
        })
        return;
    }
    if(resualts[0].confirm_status == 0){
        conn.end();
        res.send({
            Err: 'Bài viết này chưa được duyệt' 
        })
        return;
    }
    
    next();
    
}