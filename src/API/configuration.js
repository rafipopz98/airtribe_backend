import express from "express"
const router = express.Router()
import { Conversation } from "../models/conversation.js"

router.get("/:phoneNumber", async (req, res) => {
    try {
        const {phoneNumber} = req.params
    if (!phoneNumber) {
        console.log("Invalid phone number:", phoneNumber)
        return res.status(404).json("Phone Number is not present in the URL")
    }

    const userConversation = await Conversation.find({phoneNumber}).lean()
    return res.status(200).json(userConversation)
    } catch (error) {
        console.log("error while handling error in /conversation/:phoneNumber api: ",error)
        return res.status(500).json(error)
    } 

})



export default router