import jwt from "jsonwebtoken"

const protect = (req,res,next) =>{
    const token = req.cookies.token;
    if(!token)return res.status(401).json({msg:"Not Authorized"});

    try {
        const decoded = jwt.verify (token,process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
        } catch (error) {
        res.status(401).json({msg:"Invalid tken"});
     }
};

export default protect;