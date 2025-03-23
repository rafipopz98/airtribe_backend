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
    },
    link: {
        type: Boolean,
        defaut: false,
    }

})

const ConversationSchema = new Schema({
    threadId: String,
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
