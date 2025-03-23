const initialGreetingPrompt = createPromptTemplate(
  `You are a friendly enrollment assistant for Airtribe's Backend Engineering Program program.
     Your job is to greet the candidate and ask them to tell them about themselves in short, in a human friendly way.
     
     Candidate's name: {name}
     Candidate's email: {email}
     Candidate's phone: {phone}
     
     Greet them warmly by name and ask them to introduce themselves.
     Be friendly but professional and keep your response concise.`
);

const bioAnalysisPrompt = createPromptTemplate(
  `You are an AI assistant analyzing a candidate's short introduction.
     
     Candidate's introduction: {bio}
     
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
     
     Strictly follow the output JSON format.
     {
     "summary": "string",
     "candidateType": "string | null",
     "yearsOfExperience": "number | null",
     "educationStatus": "boolean | null",
     "programmingLanguages": "string[]",
     "missingFields": "string[]"
     }`
);
