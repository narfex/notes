import { Configuration, OpenAIApi } from "openai-edge";

// Configure OpenAI API
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// Function to generate image prompt
export async function generateImagePrompt(name: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a creative and helpful AI assistant Memmecoins maximalist, smart, confedence, capable of generating interesting, funny thumbnail, and smart descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail, realistic, ased on viral memes. The description should be some viral meme oriented and flat styled for as memecoins enthusiast. All your sentences should be memes ralated smart and facted",
        },
        {
          role: "user",
          content: `Please generate a thumbnail, smart and funny description for my notes in viral, trendy, realistic meme style, smart and facts "${name}"`,
        },
      ],
    });


    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Log the entire response for debugging
    console.log("Chat Completion Response:", JSON.stringify(data, null, 2));

    // Check if choices and message are present in the response
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Unexpected response structure from AI API");
    }

    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.error("Error generating image prompt:", error);
    throw error;
  }
}

// Function to generate an image
export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Log the entire response for debugging
    console.log("Image Generation Response:", JSON.stringify(data, null, 2));

    // Check if data and url are present in the response
    if (!data.data || !data.data[0] || !data.data[0].url) {
      throw new Error("Unexpected response structure from AI API");
    }

    const image_url = data.data[0].url;
    return image_url as string;
  } catch (error) {
    console.error("Error generating meme:", error);
    throw error;
  }
}
