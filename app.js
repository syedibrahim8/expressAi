import express from "express";
import OpenAI from "openai";
import Groq from "groq-sdk";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "WELCOME TO AI CHAT BOX" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.post("/ai/openai", async (req, res) => {
  try {
    let client = new OpenAI({
      apiKey: process.env.OPENAPIKEY,
    });
    let question = req.body.question;
    let response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });
    res.status(200).json({ msg: response.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.post("/ai/genai", async (req, res) => {
  try {
    let client = new GoogleGenAI({
      apiKey: process.env.GENAI,
    });
    let response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      content: req.body.question,
    });
    res.status(200).json({ msg: response.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.post("/ai/groqai", async (req, res) => {
  try {
    let gKey = process.env.GROQAPIKEY;
    const groq = new Groq({ apikey: gKey });
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: req.body.question,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      res.status(200).json({ msg: completion.choices[0].message.content });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.listen(port, () =>
  console.log(`Server is high at http://localhost:${port}`)
);
