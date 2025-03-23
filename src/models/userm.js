import mongoose from "mongoose"
const { Schema } = mongoose;


const TellMeAboutYourselfSchema = new Schema ({
    userInput: {
        type: String,
    },
    summary: {
        type: String,
    },
    matchScore: String,
    attributes: [String],
})

const TypeOfCandidateSchema = new Schema({
    cadidateType: {
        type: String,
    },
    experience: {
        type: Number,
    },
    field: {
        type: String,
    }
});

const ratingSchema = new Schema ({
    rating: {
        type: String,
    },
    summary: {
        type: String
    }
})

const socialsSchema = new Schema ({
    github: ratingSchema,
    linkedIn: ratingSchema,
    leetcode: ratingSchema
})


const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true,
    },

    tellMeAboutYourself: {
        type: TellMeAboutYourselfSchema,
    },
    programmingLanguage: {
        type: String,
    },
    capitalCommitment: {
        type: Boolean,
    },
    timeCommitment: {
        type: Boolean,
    },
    typeofCandidate: TypeOfCandidateSchema,
    socials: socialsSchema,

})

export default mongoose.model("User", userSchema);