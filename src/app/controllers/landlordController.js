const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query')

module.exports.getNotifi = async function (req , res){
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT extend_id , extend_status, e.status,  r.* FROM extend e JOIN room r ON e.room_id = r.room_id WHERE extend_status != 'pending' AND e.landlord_id = ? ORDER BY confirm_date DESC"
    var resualts = await query(conn, sql , [res.locals.landlord_id]).catch(console.log);
    //console.log(resualts)
    //console.log(JSON.parse(resualts[0].image))
    res.send(resualts).end();
}

module.exports.getStatisticalView = async function (req , res){
    const conn = await connection(dbConfig).catch(e => {});
    var sql = "SELECT view_date FROM room_view WHERE room_id = ? AND view_number = (SELECT MAX(view_number) FROM room_view WHERE room_id = ? ) ;"
    var resualts = await query(conn, sql , [req.body.room_id, req.body.room_id]).catch(console.log);
    conn.end();
    resualts[0].view_date = Intl.DateTimeFormat('en-US').format(resualts[0].view_date)
    res.send(resualts).end;


}

 