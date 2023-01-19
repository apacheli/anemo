import { Anemo } from "./anemo.js";

const model = "text-davinci-003";

const anemo = new Anemo(Deno.env.get("OPENAI_API_KEY"));

console.log(`Anemo demo\nmodel: ${model}\nuse ctrl+c to exit`);

while (true) {
  const input = prompt(">");
  const body = await anemo.createCompletion({
    max_tokens: 256,
    model,
    n: 1,
    prompt: input,
  });
  console.log(`\x1b[36m${model}: ${body.choices[0].text}\x1b[39m`);
}
