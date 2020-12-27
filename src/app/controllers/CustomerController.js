const { customerCreat } = require('../model/customer');
const customer = require('../model/customer')
const dbConfig = require('../config/db/dbConfig');
const connection = require('../config/db/index');
const query = require('../config/db/query');

class CustomerController {
    // GET /product/:name
    creat(req, res) {
        // res.render('customer/login')
        //customer.customerCreat(req.body , res)
        res.render( 'customer/singin', {layout: false})
    }

    store(req, res)
    {
        //console.log(req.body)
        customer.customerCreat(req.body, res)
        res.send('1')
    }

    async likeNews(req, res)
    {
        
        if(req.body.room_id)
        {
            const conn = await connection(dbConfig).catch(e => {});
            var sql = "SELECT COUNT(*) total FROM room WHERE room_id = ? ;"
            var resualts = await query(conn, sql , [req.body.room_id])
            if (resualts[0].total == 0)
            {
                //console.log('Không có bài viết hợp lệ');
                res.send();
                conn.end()
                return;
            }
            else{

                sql = "INSERT INTO customer_like (customer_id, room_id] VALUES [?,?] ;"
                await query(conn, sql , [res.locals.customer_id, req.body.room_id]);
                res.send();
                conn.end()
                return;
            }
        }
        else{
            res.send();
            return;
        }
        
    }

    async comment(req, res)
    {
        if(req.body.room_id && req.body.comment_content && req.comment_content != ''){
            const conn = await connection(dbConfig).catch(e => {});
            var sql = "SELECT COUNT(*) total FROM room WHERE room_id = ? ;"
            var resualts = await query(conn, sql , [req.body.room_id])
            if (resualts[0].total == 0)
            {
                //console.log('Không có bài viết hợp lệ');
                res.send();
                conn.end()
                return;
            }
            else{
                sql = "INSERT INTO customer_comment (customer_id, room_id, comment_content] VALUES [?,?,?] ;"
                await query(conn, sql , [res.locals.customer_id, req.body.room_id, req.comment_content ]);
                res.send();
                conn.end()
                return;
            }
        }
        else{
            res.send();
            return;
        }
    }
}

module.exports = new CustomerController();