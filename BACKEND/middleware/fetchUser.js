const jwt = require('jsonwebtoken');
const JWT_SECRET = "Abiskarisagoodboy"

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and append id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Access Denied!!!" });
    }
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user=data.user; 
        next();
    }
    catch(error)
    {
        res.status(401).send(error + " Denied Access");
    }
} 
module.exports=fetchuser