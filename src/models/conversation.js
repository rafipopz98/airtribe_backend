import mongoose from "mongoose"
const  {Schema} = mongoose

const messageSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    }
})

const ConversationSchema = new Schema({
    phoneNumber: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Messages: [messageSchema]
})



export const Conversation = mongoose.model("Conversation", ConversationSchema)
