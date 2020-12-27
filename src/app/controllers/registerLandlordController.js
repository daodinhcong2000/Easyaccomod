const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');
const md5 = require('md5')

class registerLandlordController{
    create(req, res)
    {
        res.send();
    }

    async store (req , res)
    {
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT COUNT(*) AS total FROM landlords WHERE phone = ?";
        var resualts = await query(conn, sql, [req.body.phone]).catch(console.log);
        var duplicateErr = {};
        if(resualts[0].total != 0 ) duplicateErr.phoneErr = true;
        sql = "SELECT COUNT(*) AS total FROM landlords WHERE email = ?";
        resualts = await query(conn, sql, [req.body.email]).catch(console.log);
        if (resualts[0].total != 0 ) duplicateErr.emailErr = true;
        sql = "SELECT COUNT(*) AS total FROM landlords WHERE citizen_id = ?";
        resualts = await query(conn, sql, [req.body.citizen_id]).catch(console.log);
        if (resualts[0].total != 0 ) duplicateErr.citizen_idErr = true;
        if (!duplicateErr.phoneErr && !duplicateErr.emailErr && !duplicateErr.citizen_idErr) {
            //console.log(1);
            var password = md5(req.body.password);
            sql = "INSERT INTO landlords (fullName , citizen_id , address , phone , email , password) VALUES (?,?,?,?,?,?);"
            resualts = await query(conn, sql, [req.body.fullname,req.body.citizen_id, req.body.address, req.body.phone,req.body.email,password]).catch(console.log);
            //console.log(resualts);
            res.send();
            conn.end()
            return;
        }
        else{
            res.send(duplicateErr);
        }

    }

    async getEditAccount(req, res){
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT edit_status FROM landlords WHERE landlord_id = ? "
        var resualts = await query(conn, sql , [res.locals.landlord_id]);
        if (resualts[0].edit_status == 0)
        {
            conn.end();
            res.send({
                Err: 'Tài khoản này không có quyền chỉnh sửa' 
            })
            return;
        }
        else{
            sql = "SELECT fullName , citizen_id , address , phone , email FROM landlord WHERE landlord_id = ?";
            resualts = await query(conn, sql , [res.locals.landlord_id]);
            res.send('landlord/editAccount', resualts)
            conn.end();
            return;
        } 
    }

    async editAccount(req, res)
    {
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT edit_status FROM landlords WHERE landlord_id = ? "
        var resualts = await query(conn, sql , [res.locals.landlord_id]);
        if (resualts[0].edit_status == 0)
        {
            conn.end();
            res.send({
                Err: 'Tài khoản này không có quyền chỉnh sửa' 
            })
            return;
        }
        else{
            sql = "SELECT fullName , citizen_id , address , phone , email FROM landlords WHERE landlord_id = ?";
            var info = await query(conn, sql , [res.locals.landlord_id]);
            sql = "SELECT COUNT(*) AS total FROM landlords WHERE phone = ?";
            var resualts = await query(conn, sql, [req.body.phone]).catch(console.log);
            var duplicateErr = {};
            if(resualts[0].total != 0 && req.body.phone != info[0].phone) duplicateErr.phoneErr = true;
            sql = "SELECT COUNT(*) AS total FROM landlords WHERE email = ?";
            resualts = await query(conn, sql, [req.body.email]).catch(console.log);
            if (resualts[0].total != 0 && req.body.email != info[0].email) duplicateErr.emailErr = true;
            sql = "SELECT COUNT(*) AS total FROM landlords WHERE citizen_id = ?";
            resualts = await query(conn, sql, [req.body.citizen_id]).catch(console.log);
            if (resualts[0].total != 0 && req.body.citizen_id != info[0].citizen_id) duplicateErr.citizen_idErr = true;
            if (!duplicateErr.phoneErr && !duplicateErr.emailErr && !duplicateErr.citizen_idErr) {
                //console.log(1);
                //var password = md5(req.body.password);
                sql = "UPDATE landlords SET fullName = ? , citizen_id = ? , address = ? , phone = ? , email = ? WHERE landlord_id = ?"
                resualts = await query(conn, sql, [req.body.fullname,req.body.citizen_id, req.body.address, req.body.phone,req.body.email,res.locals.landlord_id]).catch(console.log);
                //console.log(resualts);
                res.send();
                conn.end()
                return;
            }
            else{
                res.send(duplicateErr);
            }
        } 
    }
}

module.exports = new registerLandlordController;