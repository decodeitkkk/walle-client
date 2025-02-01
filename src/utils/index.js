import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

const getRandomPrompt = (prompt) => {
    let randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    let randomPrompt = surpriseMePrompts[randomIndex];

    if (randomPrompt === prompt) return getRandomPrompt(prompt);

    return randomPrompt;
};

const downloadImage = ( photo) => {
    FileSaver.saveAs(photo, `download-${Date.now()}.jpg`);
};

export { getRandomPrompt, downloadImage };
