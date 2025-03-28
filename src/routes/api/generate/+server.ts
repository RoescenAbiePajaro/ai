import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const GET: RequestHandler = async () => {
  const ollama = new Ollama({ host: "http://localhost:11434/" });

  const dataofMasterUser = {
    name: "Roescen",
    course: "BS Computer Science",
    hobbies: ["Draw 2D arts", "Play cozy games"],
    favoriteColor: "Black",
    age: 22,
    gender:"Female",
    userTypes: "Master User",
  };
      const chat = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [
          {
            role: "system",
            content: `Here is the information of your master user: ${JSON.stringify(dataofMasterUser)} 
            Respond only based on the master user's data.`,
          },
          {
            role: "user",
            content: "Who is your master user?",
          },
        ],
      });

      return json(chat)

    };