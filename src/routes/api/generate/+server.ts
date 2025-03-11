import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const POST: RequestHandler = async ({ request }) => {
    const ollama = new Ollama({ host: "http://localhost:11434" });

    const body = await request.json();
    const chatMessage = body.chat || "";

    const user = {
        name: "Roescen Abie S. Pajaro",
        likes: ["coffee", "brownies", "fried chicken"],
        hobbies: ["Drawing", "Watching Anime", "Play Cozy Games"],
        userType: "Master User",
    };

    const chat = await ollama.chat({
        model: "deepseek-r1:1.5b",
        messages: [
            {
                role: "system",
                content: `Here is the data of my user: Respond only based on the data provided. ${JSON.stringify(user)}`,
            },
            {
                role: "user",
                content: chatMessage,
            },
        ],
    });

    return json(chat);
};
