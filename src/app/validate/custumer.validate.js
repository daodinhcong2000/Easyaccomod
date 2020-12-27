module.exports.postCreate = function (req, res , next )
{
        var regeEmail = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
        //var regeName = /^(?!.*(\d|\[|\]|\{|\}|\\|\||\/|\$|\*|\^|\+|\.|\?|#|%|,|~|=|,|<|>|;|'|:|"|@)).*$/
        var regeName = /^([A-Za-z0-9]+)(\s([A-Za-z0-9])+)*$/;
        var regePhone = /^\d{10}$/
        var regePassword = /^((?!.*\s).+){8,}$/
        if ( !req.body.fullname.match(regeName) || !req.body.email.match(regeEmail) || !req.body.phone.match(regePhone) || !req.body.password.match(regePassword)){
            console.log('123');
            res.status(404).end();
            return;
        }
        next();
}
