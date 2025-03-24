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
          content: `Here is the information of your master user: ${JSON.stringify(
            dataofMasterUser
          )}. Respond only based on the creator's data.`,
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

    if (!message) {
      return json({ response: "Please provide a message." });
    }

    let responseText = "I'm not sure how to respond to that.";

    if (message.toLowerCase() === "hello") {
      responseText = "Hello! How may I assist you?";
    } else if (
      message.toLowerCase() === "who is your creator" ||
      message.toLowerCase() === "who created you" ||
      message.toLowerCase() === "who made you" ||
      message.toLowerCase() === "who is your master" ||
      message.toLowerCase() === "who is your master user" ||
      message.toLowerCase() === "who is your masteruser" ||
      message.toLowerCase() === "who is your master user?" ||
      message.toLowerCase() === "who is your master?" ||
      message.toLowerCase() === "who is your masteruser?" ||
      message.toLowerCase() === "who is your master user?" ||
      message.toLowerCase() === "who is your master?" ||
      message.toLowerCase() === "who is your masteruser?"
    ) {
      responseText = `My creator is ${dataofMasterUser.name}. She is a ${dataofMasterUser.age}-year-old ${dataofMasterUser.gender} studying ${dataofMasterUser.course}. She enjoys ${dataofMasterUser.hobbies.join(
        ", "
      )} and loves the color ${dataofMasterUser.favoriteColor}.`;
    } else if (
      message.toLowerCase() === "what is the age of your creator" ||
      message.toLowerCase() === "how old is your creator" ||
      message.toLowerCase() === "what is your creator's age"
    ) {
      responseText = `My creator is ${dataofMasterUser.age} years old.`;
    } else if (
      message.toLowerCase() === "what are the hobbies of your creator" ||
      message.toLowerCase() === "what are your creator's hobbies" ||
      message.toLowerCase() === "what does your creator like to do"
    ) {
      responseText = `My creator enjoys ${dataofMasterUser.hobbies.join(", ")}.`;
    } else if (
      message.toLowerCase() === "what is the gender of your creator" ||
      message.toLowerCase() === "what is your creator's gender"
    ) {
      responseText = `My creator is ${dataofMasterUser.gender}.`;
    } else {
      const chat = await ollama.chat({
        model: "deepseek-r1:1.5b", // Ensure this model exists in Ollama
        messages: [
          {
            role: "system",
            content: `Here is the information of your master user: ${JSON.stringify(
              dataofMasterUser
            )}. Respond only based on the creator's data. Respond shorter please.`,
          },
          { role: "user", content: message },
        ],
      });

      responseText = chat.message?.content || responseText;
    }

    return json({ response: responseText });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return json(
      { response: "An error occurred.", error: errorMessage },
      { status: 500 }
    );
  }
};