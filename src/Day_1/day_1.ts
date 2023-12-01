//npm install @types/node // Library with File System operations
//START: tsc && node dict/Day_1/day_1.js

import * as fs from 'fs';

function findCalibrationValueInLine(line: string) : number {
    let calibrationValue: string = '';
    let rememberedNumber: string = '';
    for (const letter of line) {
        if (!isNaN(parseInt(letter))) 
            rememberedNumber = letter;
        if (calibrationValue === '')
            calibrationValue += rememberedNumber
    }
    calibrationValue += rememberedNumber

    return parseInt(calibrationValue)
}

function sumAllCalibrationValues(puzzle_input: string[]) : number {
    let sumAllCalValues: number = 0;
    for (const line of puzzle_input) {
        sumAllCalValues += findCalibrationValueInLine(line)
    }
    return sumAllCalValues
}

function readLinesFromFile(filePath: string): string[] {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    const fileLines: string[] = fileContent.split('\n');
    return fileLines;
}

const filePath: string = './data/day_1.txt';
const fileLines: string[] = readLinesFromFile(filePath);
let calibrationValue: number = sumAllCalibrationValues(fileLines);
console.log(calibrationValue)