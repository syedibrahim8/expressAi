import dotenv from "dotenv";
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.APIKEY });

async function main() {
    let question = readline.question("What's on your mind: ")
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: question
  });
  console.log(response.text);
}
main();

const groq = new Groq({ apiKey: process.env.GROQAPIKEY});

async function main() {
  let question = readline.question("Drop your thoughts: ")
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: question
        }
      ],
      model: "llama-3.3-70b-versatile",
    })
  console.log(completion.choices[0].message.content);
}

main();