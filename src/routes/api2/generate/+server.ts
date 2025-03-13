// // src/lib/server.ts
// import { json, type RequestHandler } from "@sveltejs/kit";
// import { Ollama } from "ollama";

// export const GET: RequestHandler = async () => {
//   const ollama = new Ollama({ host: "http://localhost:11434/" });

//   const dataofMasterUser = {
//     name: "Roescen",
//     course: "BS Computer Science",
//     hobbies: ["Draw 2D arts", "Play cozy games"],
//     favoriteColor: "Black",
//     age: 22,
//     gender:"Female",
//     userTypes: "Master User",
//   };
//       const chat = await ollama.chat({
//         model: "deepseek-r1:1.5b",
//         messages: [
//           {
//             role: "system",
//             content: `Here is the information of your master user: ${JSON.stringify(dataofMasterUser)} 
//             Respond only based on the creator's data.`,
//           },
//           {
//             role: "user",
//             content: "Who is your creator?",
//           },
//         ],
//       });

//       return json(chat)

//     };

// // src/routes/api2/generate/server.ts
// // src/lib/server.ts
import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

const ollama = new Ollama({ host: "http://localhost:11434/" });

const dataofMasterUser = {
  name: "Roescen",
  course: "BS Computer Science",
  hobbies: ["Draw 2D arts", "Play cozy games"],
  favoriteColor: "Black",
  age: 22,
  gender: "Female",
  userTypes: "Master User",
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { message } = await request.json();

    if (!message) {
      return json({ response: "Please provide a message." });
    }

    let responseText = "I'm not sure how to respond to that.";

    if (message.toLowerCase() === "hello") {
      responseText = "Hello! How may I assist you?";
    } else if (message.toLowerCase() === "who is your creator?") {
      responseText = `My creator is ${dataofMasterUser.name}. She is a ${dataofMasterUser.age}-year-old ${dataofMasterUser.gender} studying ${dataofMasterUser.course}. She enjoys ${dataofMasterUser.hobbies.join(", ")} and loves the color ${dataofMasterUser.favoriteColor}.`;
    } else {

      
      const chat = await ollama.chat({
        model: "deepseek-r1:1.5b", // Ensure this model exists in Ollama
        messages: [
          {
            role: "system",
            content: `Here is the information of your master user: ${JSON.stringify(
              dataofMasterUser
            )}. Respond only based on the creator's data.`,
          },
          { role: "user", content: message },
        ],
      });

      responseText = chat.message?.content || responseText;
    }

    return json({ response: responseText });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return json({ response: "An error occurred.", error: errorMessage }, { status: 500 });
  }
};
