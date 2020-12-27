const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');

module.exports.authClassify = async function(req, res, next)
{
    if (!req.signedCookies.admin_id){
            res.send()
            return;
    }
    const conn = await connection(dbConfig).catch(e => {});
    var admin_id = parseInt(req.signedCookies.admin_id)
    var sessions = req.cookies.sessions;
    if (sessions == 'admin')
    {
        sql = "SELECT COUNT(*) AS total FROM admin WHERE admin_id = ?"
        var resualts = await query(conn,sql , [admin_id]);
        //console.log(resualts)
        if (resualts[0].total == 0){
            res.send()
            return;
        }
        res.locals.admin_id = admin_id;
        next()
    }
    
    // res.sendStatus(200);

}