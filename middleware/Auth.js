import jwt from "jsonwebtoken";
import {User} from "../models/User.js"
import dotenv from "dotenv";

dotenv.config();
export const authUser = async (req, res, next) => {

    try {
        const userToken = req.header('Authorization').replace('Bearer ', "") ;
        const decodedToken = jwt.verify(userToken,process.env.SECRET_KEY);
        const user = await User.findOne({_id: decodedToken._id});
        if(!user) {
            return res.status(404).json('please authenticate');
        }
        req.user=user;
        next();
    }catch(err) {
        console.log(err);
        res.status(500).send()
    }
}