const jwt = require('jsonwebtoken')
const isLogin = async (req, res, next) => {
    try {
        let token = req.cookies?.token;
        console.log(token)
        if (!token) {
           return res.status(401).json(
                {
                    message: "No Token"
                }
            )
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()

    }
    catch (error) {
        res.status(401).json(
            {
                message: "Token expired"
            }
        )
    }
}
const authorize = (...authorizedPerson)=>
{

   return async (req, res, next) => {
        try {
            let user = req.user;
            if (!user) {
                return res.status(401).json({ message: "Invalid Credentials" })
            }
            if (!authorizedPerson.includes(user.role)) {
                return res.status(403).json(
                    {
                        message: "Unauthorized access"
                    })
            }
            next()
        }
        catch (error) {
            console.log(error.message);
            res.status(500).json(
                {
                    message: "Something went wrong"
                }
            )

        }


    }

}


module.exports = { isLogin, authorize}