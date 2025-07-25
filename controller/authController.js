import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import userModel from '../models/userModel.js'

import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body

        //validation
        if (!name) {
            return res.send({ error: "name is required" })
        }
        if (!email) {
            return res.send({ error: "email is required" })
        }
        if (!password) {
            return res.send({ error: "password is required" })
        } if (!phone) {
            return res.send({ error: "phone is required" })
        }
        if (!address) {
            return res.send({ error: "address is required" })
        }

        //check user 
        const exisitingUser = await userModel.findOne({ email })

        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                Message: "Already registration please Login"
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save()
        res.status(201).send({
            success: true,
            message: "user Registration successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in registration",
            error
        })

    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "invalid email or password"
            })
        }

        //check user
        const user = await userModel.findOne({ email })
        //check email
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "email is not register"
            })
        }

        //check password
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "invalid password"
            })
        }


        //token
        const token = await JWT.sign({ _id: user._id }, process.env.SEC, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in login"
        })


    }
}