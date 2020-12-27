const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');

module.exports.authClassify = async function(req, res, next)
{
    const conn = await connection(dbConfig).catch(e => {});
    var customer_id = parseInt(req.signedCookies.customer_id)
    var sessions = req.cookies.sessions;
    if (sessions == 'customer')
    {
        sql = "SELECT COUNT(*) AS total FROM customer WHERE customer_id = ?"
        var resualts = await query(conn,sql , [customer_id]);
        //console.log(resualts)
        if (resualts[0].total == 0){
            res.send()
            return;
        }
        res.locals.customer_id = customer_id;
        next()
    }
    
    // res.sendStatus(200);

}