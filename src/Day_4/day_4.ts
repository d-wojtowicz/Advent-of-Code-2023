//npm install @types/node // Library with File System operations
//START: tsc && node dict/Day_4/day_4.js

import * as fs from 'fs';
import { start } from 'repl';

function prepareNums(fileLine: string) : [number[], number[]] {
    let [win_card, full_card] = (
        fileLine
        .replace(/Card\s+\d+:/g, "")
        .replace(/\r/, "")
        .replace(/  +/g, " ")
        .split("|")
    );

    const win_numbers: number[] = (
        win_card
        .split(" ")
        .filter(el => el !== "")
        .map(el => parseInt(el))
    );

    const all_numbers: number[] = (
        full_card
        .split(" ")
        .filter(el => el !== "")
        .map(el => parseInt(el))
    );

    return [win_numbers, all_numbers];
}

function sumAllPoints(fileLines: string[]) : number {
    let sumOfAllPoints: number = 0;
    const rowNums: number = fileLines.length;

    for (let row_index = 0; row_index < rowNums; row_index++) {
        const [win_numbers, all_numbers] = prepareNums(fileLines[row_index])

        let card_points: number = 0;
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

function sumAllCards(fileLines: string[]) : number {
    const sumOfAllScratchcards: Record<string, number> = {};
    const rowNums: number = fileLines.length;

    for (let row_index = 0; row_index < rowNums; row_index++)
        sumOfAllScratchcards[`Card ${row_index+1}`] = 1;

    for (let row_index = 0; row_index < rowNums; row_index++) {
        const [win_numbers, all_numbers] = prepareNums(fileLines[row_index]);

        let win_cards: number = 0;
        win_numbers.forEach((win_number) => {
            if (all_numbers.includes(win_number))
                win_cards++;
        });

        const numOfCard: number = sumOfAllScratchcards[`Card ${row_index+1}`]
        for(let startNum = 0; startNum < numOfCard; startNum++)
            for(let new_card_index = 1; new_card_index <= win_cards; new_card_index++) {
                if (row_index+1+new_card_index <= rowNums)
                    sumOfAllScratchcards[`Card ${row_index+1+new_card_index}`] += 1;
                else
                    break
            }
    }
    
    return Object.values(sumOfAllScratchcards).reduce((acc, value) => acc + value, 0);
}

function readLinesFromFile(filePath: string): string[] {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    const fileLines: string[] = fileContent.split('\n');
    return fileLines;
}

// Day 4 Part 1
const filePathA: string = './data/day_4a.txt';
const fileLinesA: string[] = readLinesFromFile(filePathA);
let sumPoints: number = sumAllPoints(fileLinesA);
console.log(sumPoints);

// Day 4 Part 2
const filePathB: string = './data/day_4b.txt';
const fileLinesB: string[] = readLinesFromFile(filePathB);
let sumCards: number = sumAllCards(fileLinesB);
console.log(sumCards);

