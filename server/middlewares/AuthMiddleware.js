const {verify} = require('jsonwebtoken');

const validatedToken = (req, res, next) =>{
    
    const accessToken = req.body.headers.accessToken;

    if(!accessToken){
        return res.json({error: "Bạn chưa đăng nhập!"})
    }

    try{
        const validToken = verify(accessToken, "importantSecrect");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    }catch(err){
        return res.json({error: error})
    }
}

module.exports =  {validatedToken}