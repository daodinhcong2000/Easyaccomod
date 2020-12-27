const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');
const md5 = require('md5')

class resgisterCustomerController{
    creat(req, res) {
        // res.render('customer/login')
        //customer.customerCreat(req.body , res)
        res.render( 'customer/singin', {layout: false})
    };

    async store(req , res)
    {
        //insert_customer
        // var regeEmail = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
        // var regeName = /^(?!.*(\d|\[|\]|\{|\}|\\|\||\/|\$|\*|\^|\+|\.|\?|#|%|,|~|=|,|<|>|;|'|:|"|@)).*$/
        // var regePhone = /^\d{10}$/
        // var regePassword = /^((?!.*\s).+){8,}$/
        // if ( !req.body.fullname.match(regeName) || !req.body.email.match(regeEmail) || !req.body.phone.match(regePhone) || !req.body.password.match(regePassword)){
        //     //res.status(404).end();
        //     console.log(404);
        // }
        const conn = await connection(dbConfig).catch(e => {});
        var sql = "SELECT COUNT(*) AS total FROM customer WHERE phone = ?";
        var resualts = await query(conn, sql, [req.body.phone]).catch(console.log);
        var duplicateErr = {};
        if(resualts[0].total != 0 ) duplicateErr.phoneErr = true;
        sql = "SELECT COUNT(*) AS total FROM customer WHERE email = ?";
        resualts = await query(conn, sql, [req.body.email]).catch(console.log);
        if (resualts[0].total != 0 ) duplicateErr.emailErr = true;
        //console.log(duplicateErr.b)
        var password = md5(req.body.password);
        //console.log(password);
        if (!duplicateErr.phoneErr && !duplicateErr.emailErr) {
            //console.log(1);
            sql = "INSERT INTO customer (fullName , phone , email , password) VALUES (?,?,?,?);"
            resualts = await query(conn, sql, [req.body.fullname, req.body.phone,req.body.email,password]).catch(console.log);
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

module.exports = new resgisterCustomerController;