const { User } = require("../models");

const isLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne(
            {
                where:
                {
                    email
                }
            }
        )
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        if (password != user.password) {
            return res.status(401).json(
                {
                    message: "Invalid Credentials"
                }
            )
        }
        req.user=user
        next()
    }
    catch (error) {
        res.status(500).json(
            {
                message:"Something went wrong"
            }
        )
    }
}
const isAdmin =
    async (req, res, next) => {
        try {
            let user=req.user;
            if (!user) {
                return res.status(401).json({ message: "Invalid Credentials" })
            }
            if (user.role != 'admin') {
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

module.exports = {isLogin,isAdmin}