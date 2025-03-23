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
        // const newUser = new User({name, email, phoneNumber})
        const newUser = await User.create({name, email, phoneNumber})
        // await newUser.save()
        
        res.status(200).json({user: newUser})
        // create Conversation
        const messages = []
        const message = {
            from: "ai",
            text: "TMAY",
            link: false,
        }
        messages.push(message)
        const conversation = new Conversation({userId: newUser._id, phoneNumber, messages, stage: "tmay"})
        await conversation.save()
    }catch (error) {
        console.log("Error while handling user-form-submit error: ", error);
        return res.status(500).json(error)
    }
})

export default router;