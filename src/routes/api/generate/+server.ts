// src/routes/api/server.ts
import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

// Initialize Ollama with the correct host
const ollama = new Ollama({ host: "http://localhost:11434/" });

// Define the master user data
const dataofMasterUser = {
  name: "Roescen",
  course: "BSCS",
  hobbies: ["Draw 2d arts", "Play cozy games"],
  favoriteColor: "Black",
  age: 22,
  userTypes: "Master User",
};

// Handle POST requests
export const POST: RequestHandler = async ({ request }) => {
  try {
    // Parse the incoming message from the request body
    const { message } = await request.json();

    let responseContent = "I didn't understand that.";

    // Handle specific user inputs
    if (message.toLowerCase() === "hello") {
      responseContent = "Hello! How can I assist you today?";
    } else if (message.toLowerCase().includes("who is your creator")) {
      responseContent = `My master user is ${dataofMasterUser.name}. They are ${dataofMasterUser.age} years old, studying ${dataofMasterUser.course}. Their hobbies include ${dataofMasterUser.hobbies.join(", ")}, and their favorite color is ${dataofMasterUser.favoriteColor}.`;
    } else {
      // Use Ollama to generate a response for other messages
      const chat = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [{ role: "user", content: message }],
      });
      responseContent = chat.message.content;
    }

    // Return the response as JSON
    return json({ response: responseContent });
  } catch (error) {
    console.error("Error processing request:", error);
    return json({ response: "Error: Unable to process your request." }, { status: 500 });
  }
};