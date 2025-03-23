import OAI from "openai";
import { OPEN_AI_SECRET_KEY } from "../helpers/constants.js";
import User from "../models/userm.js";
import { Conversation } from "../models/conversation.js";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const myEvent = z.object({
  summary: z.string(),
  candidateType: z.string().nullable(),
  yearsOfExperience: z.number().nullable(),
  educationStatus: z.boolean().nullable(),
  programmingLanguages: z.array(z.string()),
  missingFields: z.array(z.string()),
});

class OpenAI {
  constructor() {
    console.log(OPEN_AI_SECRET_KEY);
    this.openai = new OAI({
      apiKey: OPEN_AI_SECRET_KEY,
    });
    this.prompts = []
  }

  async handleTmay(response, phoneNumber) {
    const completion = await this.openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are an AI assistant analyzing a candidate's short introduction.
     
                Candidate's introduction: ${response}
                
                Extract the following information if present else keep them as null in the output schema:
                1. Candidate type (student, or professional)
                2. Years of experience (if a professional) or education status (if a student)
                3. Known programming languages.
                
                Provide a structured analysis in JSON format with the following fields:
                - summary: A brief summary of the candidate's background
                - candidateType: The type of candidate they are (student or professional) if present else null.
                - yearsOfExperience: Their experience level if present else null. If student keep it null.
                - educationStatus: true if they are a final year student else false. If professional keep it null.
                - programmingLanguages: Languages they know (as an array)
                - missingFields: An array of information that's missing and needs to be asked in the next step (candidateType, yearsOfExperience or educationStatus, programmingLanguages)
                `,
        },
      ],
      model: "gpt-4o",
      store: true,
      response_format: zodResponseFormat(myEvent, "event"),
    });
    const jsonResponse = JSON.parse(completion.choices[0].message.content)
    if (jsonResponse) {
        const tmi = {
            userInput:response
        }
        const typeofCandidate = {}
        const user = await User.findOne({phoneNumber: phoneNumber})
        if (jsonResponse.summary){
            tmi["summar"] = jsonResponse.summary
        }
        if(jsonResponse.candidateType){
            typeofCandidate["candidateType"] = jsonResponse.candidateType
            this.prompts.push("Are you  a student or a professional?")
        }
        if (!isNaN(jsonResponse.yearsOfExperience)){
            typeofCandidate["experience"] = jsonResponse.yearsOfExperience
            this.prompts.push("How many years of exp do you have?")
        }
        if(jsonResponse.programmingLanguages){
            user["programmingLanguages"] = jsonResponse.programmingLanguages.join(",")
            this.prompts.push("what programming languages are you comfortable with?")
        }
        this.prompts.push("are you fine with a 7,500 Rupees/month fee for the course?")
        user.tellMeAboutYourself = {...tmi};
        user.typeofCandidate = {...typeofCandidate}
        await user.save()
    }
    let newMessage = ""
    const conversations = await Conversation.findOne({phoneNumber})
    console.log(conversations)
    if(this.prompts.length>0){
        newMessage = this.prompts.pop()
        conversations.messages.push({from:"ai", text: newMessage, link: false})
        await conversations.save()
    }
    console.log(jsonResponse)

    console.log(completion.choices[0]);
    return conversations
  }

  async createMessage(threadID, userResponse) {
    const messageResponse = await this.openai.beta.threads.messages.create(
      threadID,
      {
        role: "user",
        content: userResponse,
      }
    );
    return { success: true, data: messageResponse, error: null };
  }

  async RunAssitant(threadID) {
    try {
      let runID = null;

      const run = await this.openai.beta.threads.runs.create(threadID, {
        assistant_id: OPEN_AI_ASSISTANT_ID,
        instructions: "",
      });
      runID = run.id;
      return runID;
    } catch (error) {
      console.log("error while running the assitant:", error);
    }
  }
}

export default OpenAI;
