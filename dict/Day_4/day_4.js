"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function prepareNums(fileLine) {
    let [win_card, full_card] = (fileLine
        .replace(/Card\s+\d+:/g, "")
        .replace(/\r/, "")
        .replace(/  +/g, " ")
        .split("|"));
    const win_numbers = (win_card
        .split(" ")
        .filter(el => el !== "")
        .map(el => parseInt(el)));
    const all_numbers = (full_card
        .split(" ")
        .filter(el => el !== "")
        .map(el => parseInt(el)));
    return [win_numbers, all_numbers];
}
function sumAllPoints(fileLines) {
    let sumOfAllPoints = 0;
    const rowNums = fileLines.length;
    for (let row_index = 0; row_index < rowNums; row_index++) {
        const [win_numbers, all_numbers] = prepareNums(fileLines[row_index]);
        let card_points = 0;
        win_numbers.forEach((win_number) => {
            if (all_numbers.includes(win_number)) {
                if (card_points < 1)
                    card_points++;
                else
                    card_points *= 2;
            }
        });
        sumOfAllPoints += card_points;
    }
    return sumOfAllPoints;
}
function sumAllCards(fileLines) {
    const sumOfAllScratchcards = {};
    const rowNums = fileLines.length;
    for (let row_index = 0; row_index < rowNums; row_index++)
        sumOfAllScratchcards[`Card ${row_index + 1}`] = 1;
    for (let row_index = 0; row_index < rowNums; row_index++) {
        const [win_numbers, all_numbers] = prepareNums(fileLines[row_index]);
        let win_cards = 0;
        win_numbers.forEach((win_number) => {
            if (all_numbers.includes(win_number))
                win_cards++;
        });
        console.log("AAA", row_index, win_cards, sumOfAllScratchcards[`Card ${row_index + 1}`]);
        const numOfCard = sumOfAllScratchcards[`Card ${row_index + 1}`];
        for (let startNum = 0; startNum < numOfCard; startNum++)
            for (let new_card_index = 1; new_card_index <= win_cards; new_card_index++) {
                if (row_index + 1 + new_card_index <= rowNums)
                    sumOfAllScratchcards[`Card ${row_index + 1 + new_card_index}`] += 1;
                else
                    break;
            }
    }
    return Object.values(sumOfAllScratchcards).reduce((acc, value) => acc + value, 0);
}
function readLinesFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileLines = fileContent.split('\n');
    return fileLines;
}
const filePathA = './data/day_4a.txt';
const filePathB = './data/day_4b.txt';
const fileLinesA = readLinesFromFile(filePathA);
const fileLinesB = readLinesFromFile(filePathB);
let sumPoints = sumAllPoints(fileLinesA);
let sumCards = sumAllCards(fileLinesB);
console.log(sumCards);
//# sourceMappingURL=day_4.js.map