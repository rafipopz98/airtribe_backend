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
        default: false,
    }

})

const ConversationSchema = new Schema({
    threadId: String,
    stage: String,
    phoneNumber: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages: [messageSchema]
})



export const Conversation = mongoose.model("Conversation", ConversationSchema)
