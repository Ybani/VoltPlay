import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(" ")[1];
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Invalid Token" });
        }
    } else {
        return res.status(401).json({ message: "No Token Provided" });
    }
};

// middleware to verify admintoken
const verifyAdminToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin){
            next();
        }else{
            return res.status(403).json({ message: "Access denied, only Admin" });
        }
    });
};
// middleware to verify usertoken
const verifyUserToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params.id){
            next();
        }else{
            return res.status(403).json({ message: "Access denied, only User himself" });
        }
    });
};
export  {verifyToken
,verifyAdminToken,
verifyUserToken
};