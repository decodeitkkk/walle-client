import { surpriseMePrompts } from "../constants";

const getRandomPrompt = (prompt) => {
    let randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    let randomPrompt = surpriseMePrompts[randomIndex];

    if (randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
};
export { getRandomPrompt };
