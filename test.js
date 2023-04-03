import { Anemo } from "./anemo.js";

console.log("Anemo 0.0.2");
console.log("use ctrl+c to exit");
console.log("type enter on nil prompt to reset");

const anemo = new Anemo(Deno.env.get("OPENAI_API_KEY"));
const messages = [];
const model = "gpt-3.5-turbo";

while (true) {
  const content = prompt(">");
  if (content === null) {
    console.log(`\x1b[33mreset ${messages.length} messages\x1b[39m`);
    messages.length = 0;
    continue;
  }
  messages.push({ content, role: "user" });
  const data = await anemo.createChatCompletion({ messages, model });
  const message = data.choices[0].message;
  messages.push(message);
  console.log(`\x1b[36mChatGPT (${model}): ${message.content}\x1b[39m`);
}
