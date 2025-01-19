import jwt from "jsonwebtoken";

export function verifyToken(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ") [1];

    jwt.verify(token, "secretKey", (err, user) => {
        if(err){
        return res.status(403).json({message: "Invalid JWT Token"});
        }
        req.user = user.id;
        next();
    });
}