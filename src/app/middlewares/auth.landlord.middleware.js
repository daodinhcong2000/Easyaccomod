const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');

module.exports.authClassify = async function(req, res, next)
{
    if (!req.signedCookies.landlord_id){
            res.send()
            return;
    }
    const conn = await connection(dbConfig).catch(e => {});
    var landlord_id = parseInt(req.signedCookies.landlord_id)
    var sessions = req.cookies.sessions;
    if (sessions == 'landlords')
    {
        sql = "SELECT COUNT(*) AS total FROM landlords WHERE landlord_id = ?"
        var resualts = await query(conn,sql , [landlord_id]);
        //console.log(resualts)
        if (resualts[0].total == 0){
            res.send()
            return;
        }
        res.locals.landlord_id = landlord_id;
        next()
    }
    
    // res.sendStatus(200);

}