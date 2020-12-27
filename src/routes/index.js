// routing chung
const siteRouter = require('./site');

const customerRouter = require('./customer')
const login = require('../app/controllers/loginController')
const adminRouter = require('./admin.routes')
const landlordRouter = require('./landlord.router')


function route(app) {
    
    app.use('/customer', customerRouter);
    //app.post('/image' , upload ,createImage.uploadImage )
    app.post('/login', login.login )
    app.get('/login' , login.create)
    app.use('/admin', adminRouter)
    app.use('/landlord' , landlordRouter )
    app.use('/', siteRouter);
    
    
}

module.exports = route;
