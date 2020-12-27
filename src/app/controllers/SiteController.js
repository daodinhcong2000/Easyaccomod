const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');
class SiteController {
    // GET /news
    

    async search(req, res) {
        const conn = await connection(dbConfig).catch(e => {});
        if (req.query.searchValue)
        {
            var sql = "SELECT * FROM room WHERE confirm_status = 1 AND expiration_date >= CURDATE() AND "
            var searchValue = '%' + req.query.searchValue + '%';
            console.log(req.query.searchValue)
            var public_places = '%%';
            if (req.body.public_places){
                public_places = '%' + req.query.public_places + '%';
            }
            if (req.query.location == '' || !req.query.location ){
                 sql = sql + " address LIKE ? "
            }
            if (req.query.location == 'city')
            {
                console.log(req.query.location)
                sql = sql + "city LIKE ? "
            }
            if (req.query.location == 'district')
            {
                sql = sql + "district LIKE ? "
            }
            if (req.query.location == 'town')
            {
                sql = sql + "town LIKE ? "
            }
            sql = sql + "AND public_places LIKE ? "
            if (req.query.room_kind == 'Phòng trọ')
            {
                sql = sql + "AND room_kind = 'Phòng trọ' "
            }
            if (req.query.room_kind == 'Chung cư mini')
            {
                sql = slq + "AND room_kind = 'Chung cư mini' " 
            }
            if (req.query.room_kind == 'Chung cư nguyên căn')
            {
                sql = sql + "AND room_kind = 'Căn hộ nguyên căn' "
            }
            if (req.query.wc_status == 'Chung')
            {
                sql = sql + "AND WC_status = 'Chung' "
            }
            if (req.query.wc_status == 'Khép kín')
            {
                sql = sql + "AND WC_status = 'Riêng' "
            }
            if (req.query.air_conditioner == 'Có')
            {
                sql = sql + "AND Air_conditioner = 'Có' "
            }
            if (req.query.air_conditioner == 'Không')
            {
                sql = sql + "AND Air_conditioner = 'Không' "
            }
            if (req.query.water_hot == 'Có')
            {
                sql = sql + "AND water_hot = 'Có' "
            }
            if (req.query.water_hot == 'Không')
            {
                sql = sql + "AND water_hot = 'Không' "
            }
            if (req.query.balcony == 'Có' )
            {
                sql = sql + "AND balcony = 'Có' "
            }
            if (req.query.balcony == 'Không' )
            {
                sql = sql + "AND balcony = 'Không' "
            }
            if(req.query.kitchen == 'Bếp riêng')
            {
                sql = sql + "AND kitchen = 'Bếp riêng' "
            }
            if(req.query.kitchen == 'Bếp chung')
            {
                sql = sql + "AND kitchen = 'Bếp chung' "
            }
            if(req.query.kitchen == 'Không nấu ăn')
            {
                sql = sql + "AND kitchen = 'Không nấu ăn' "
            }
            if(req.query.landlord_status == 'Chung chủ')
            {
                sql = sql + "AND status = 'Chung chủ' "
            }
            if(req.query.landlord_status == 'Không chung chủ')
            {
                sql = sql + "AND status = 'Không chung chủ' "
            }
            if(req.query.cost_room_max != '' && req.query.cost_room_max)
            {
                var cost_room_max = parseInt(req.query.cost_room_max)
                sql = sql + "AND cost_room <= " + cost_room_max + ' ';
            }
            if(req.query.cost_room_min != '' && req.query.cost_room_min)
            {
                var cost_room_min = parseInt(req.query.cost_room_min)
                sql = sql + "AND cost_room >= " + cost_room_min + " ";
            }
            if(req.query.acreage_max != '' && req.query.acreage_max)
            {
                var acreage_max = parseInt(req.query.acreage_max)
                sql = sql + "AND acreage <= " + acreage_max + " ";
            }
            if(req.query.acreage_min != '' && req.query.acreage_min)
            {
                var acreage_min = parseInt(req.query.acreage_min)
                sql = sql + "AND acreage >= " + acreage_min + " ";
            }
            console.log(sql);
            console.log(searchValue);
            console.log(public_places)
            var resualts = await query(conn, sql, [searchValue,public_places]).catch(console.log);
            //console.log(1);
            //console.log(resualts)
            //console.log(Intl.DateTimeFormat('en-US').format(resualts[0].expiration_date))
            for (let i = 0 ; i < resualts.length ; i ++){
                resualts[i].creatDate = Intl.DateTimeFormat('en-US').format(resualts[i].creatDate);
                resualts[i].confirm_date = Intl.DateTimeFormat('en-US').format(resualts[i].confirm_date);
                resualts[i].expiration_date = Intl.DateTimeFormat('en-US').format(resualts[i].expiration_date);
                resualts[i].image = JSON.parse(resualts[i].image)
            }
            console.log(resualts[0]);
            res.send(resualts);
        }
        else{
            res.send()
        }
        conn.end();
    }

    async getCity(req , res)
    {
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT * FROM room WHERE city = ? "
        var resualts = await query(conn, sql , [req.params.city_name])
        res.send(resualts);
        conn.end();
    }

    show(req, res){
        res.render('home')
    }

    async getRoom(req , res){
        
        if (!req.body.room_id){
            res.status(404).end();
            return;
        }
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT * FROM room WHERE room_id = ? AND confirm_status = 1 AND expiration_date >= CURRENT_DATE() ;"
        var resualts = await query(conn, sql , [req.body.room_id]);
        if (!resualts[0].room_id )
        {
            res.send({
                err: "Bài viết này không tồn tại"
            }).end();
            return;
        }
        await query(conn, "CALL insert_view(?);" , [req.body.room_id]);
        sql = "UPDATE room SET view_num = view_num + 1";
        await query(conn , sql , [req.body.room_id]);
                resualts[0].creatDate = Intl.DateTimeFormat('en-US').format(resualts[0].creatDate)
                resualts[0].confirm_date = Intl.DateTimeFormat('en-US').format(resualts[0].confirm_date)
                resualts[0].expiration_date = Intl.DateTimeFormat('en-US').format(resualts[0].expiration_date)
        res.send(resualts).end();

    }

    async getRoomLike(req , res){
        if (!req.body.room_id){
            res.status(404).end();
            return;
        }
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT * FROM room WHERE room_id = ? AND confirm_status = 1 AND expiration_date >= CURRENT_DATE() ;"
        var resualts = await query(conn, sql , [req.body.room_id]).catch(console.log);
        if (!resualts[0].room_id )
        {
            res.send({
                err: "Bài viết này không tồn tại"
            }).end();
            return;
        }
        sql = "SELECT COUNT(*) total_like FROM customer_like WHERE room_id = ?  "
        resualts = await query(conn , sql , [req.body.room_id]).catch(console.log);
        console.log(resualts)
        res.send({
            total_like: resualts[0].total_like
        }).end();
    }
}
module.exports = new SiteController();
