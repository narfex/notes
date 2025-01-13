import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful AI with humer and an of meme coins trends embedded in a notion text editor app that is used to autocomplete sentences in web3 style
            The traits of AI include expert knowledge, helpfulness, cleverness, degen,  and articulateness.
        AI is a well-behaved and well-mannered degen individual.
        AI is always funny, inspiring, and smart he is eager to provide vivid and thoughtful responses to the user.`,
      },
      {
        role: "user",
        content: `
        I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here: ##${prompt}##
        keep the tone of the text consistent with the rest of the text.
        keep the response short and funny.
        `,
      },
    ],
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
