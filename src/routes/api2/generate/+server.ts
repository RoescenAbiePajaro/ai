import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

// Initialize Ollama
const ollama = new Ollama({ host: "http://localhost:11434/" });

// Master user data
const dataofMasterUser = {
  name: "Roescen",
  course: "BS Computer Science",
  hobbies: ["Draw 2D arts", "Play cozy games"],
  favoriteColor: "Black",
  age: 22,
  gender: "Female",
  userTypes: "Master User",
};

// GET handler
export const GET: RequestHandler = async () => {
  try {
    const chat = await ollama.chat({
      model: "deepseek-r1:1.5b",
      messages: [
        {
          role: "system",
          content: `Here is the information of your master user: ${JSON.stringify(dataofMasterUser)} 
          Respond only based on the creator's data.`,
        },
        {
          role: "user",
          content: "Who is your creator?",
        },
      ],
    });

    return json(chat);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};

// POST handler
export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message } = await request.json();

    const chat = await ollama.chat({
      model: "deepseek-r1:1.5b",
      messages: [
        {
          role: "system",
          content: `Here is the information of your master user: ${JSON.stringify(dataofMasterUser)} 
          Respond only based on the creator's data.`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return json({ response: chat.message.content });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
};