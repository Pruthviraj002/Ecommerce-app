import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js'

// protected token
export const requireSingIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.SEC)
        req.user = decode
        next()
    } catch (error) {
        console.log(error);
    }
}

export const isAdmin = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unAuthorized access"
            })
        }
        else {
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "error in admin middleware"
        })

    }
}