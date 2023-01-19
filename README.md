# Anemo

A simple library for OpenAI's API.

```js
import { Anemo } from "https://github.com/apacheli/anemo/raw/master/anemo.js";

const model = "text-davinci-003";

const anemo = new Anemo(Deno.env.get("OPENAI_API_KEY"));

console.log(`Anemo demo\nuse ctrl+c to exit`);

while (true) {
  const input = prompt(">");
  const body = await anemo.createCompletion({
    model,
    prompt: input,
  });
  console.log(`\n\x1b[36m${model}: ${body.choices[0].text}\x1b[39m`);
}
```
