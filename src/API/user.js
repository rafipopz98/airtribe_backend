import express from "express";
const router = express.Router();
import User  from "../models/userm.js"
import {Conversation} from "../models/conversation.js";

router.post("/add-user", async (req, res) =>{
    try{
        const {name, phoneNumber, email} = req.body;
        if (!name || !phoneNumber, !email) {
            return res.status(400).json({error: "insufficient data"})
        } 
        const newUser = new User({name, email, phoneNumber})
        await newUser.save()
        
        res.status(201)
        
        // create Conversation
        const conversation = new Conversation({userId: newUser._id})
        await conversation.save()
    }catch (error) {
        console.log("Error while handling user-form-submit error: ", error);
        return res.status(500).json(error)
    }
})

export default router;