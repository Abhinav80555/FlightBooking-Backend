import express from "express";
import mongoose from 'mongoose';
import {authUser} from "../middleware/Auth.js"
import { User } from "../models/User.js";


const router = express.Router();


router.post('/user',async(req,res)=>{
  try {
      const user = await User.create(req.body);
      await user.generateToken();
      res.status(200).send()
  }catch(err) {
       console.error(err);
      res.status(500).send()
  }
})

router.post('/login',async(req,res)=>{
  const{email, password} = req.body;
  try{
      const user = await User.findByCredentials(email, password);
      await user.generateToken();
      res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: user.token,
      })
  }catch(err) {
       console.log(err);
      res.status(500).send()
  }
})


router.post('/logout',authUser, async (req, res) => {
  const user =req.User;
  user.token = '';
  await user.save();
  res.status(200).send()
})









export const UsersRouter = router;
