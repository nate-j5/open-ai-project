import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-curie-001", {
    prompt: generatePrompt(req.body.city),
    temperature: 0.4,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(city) {
  const capitalizedCity =
    city[0].toUpperCase() + city.slice(1).toLowerCase();
  return `Write a list of famous events in a city.

City: Chicago
Events: Great Chicago Fire, Chicago Board of Trade Founded, Completion of the Galena & Chicago Union Railroad
City: Denver
Event: Union Station Opens, Fort Collins Earthquake, The Broadmoor Casino opens
City: ${capitalizedCity}
Event:`;
}
