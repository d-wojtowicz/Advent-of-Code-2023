//npm install @types/node // Library with File System operations
//START: tsc && node dict/Day_3/day_3.js

import * as fs from 'fs';

function checkIfPartNumber(number_start: number, number_end: number, fileLines: string[], row_index: number) {
    let ignoreChars: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
    
    let left_border: number = number_start - 1 < 0 ? 0 : number_start - 1;
    let right_border: number = number_end + 1 > fileLines[row_index].length + 1 ? fileLines[row_index].length + 1: number_end + 1;
    let bottom_border: number = row_index + 1 > fileLines[row_index].length - 1 ? fileLines[row_index].length - 1: row_index + 1;
    let top_border: number = row_index - 1 < 0 ? 0 : row_index - 1;
    
    if (bottom_border === fileLines.length){
        bottom_border--;
    }

    let upperLine: string = fileLines[top_border].slice(left_border, right_border);
    let lineWithNumber: string = fileLines[row_index].slice(left_border, right_border);
    let lowerLine: string = fileLines[bottom_border].slice(left_border, right_border);

    if (
        upperLine.split("").some(char => !ignoreChars.includes(char)) ||
        lineWithNumber.split("").some(char => !ignoreChars.includes(char)) ||
        lowerLine.split("").some(char => !ignoreChars.includes(char))
    )
        return true;
    else
        return false;
}

function sumAllPartNumbers(fileLines: string[]) {
    let sumOfAllPartNumbers: bigint = 0n;   

    const rowNums: number = fileLines.length;
    const colNums: number = fileLines[0].length;
    for (let row_index = 0; row_index < rowNums; row_index++) {
        let number_start: number = 0;
        let number_end: number = 0;
        let found_the_whole_number: boolean = false;
        let found_digit: boolean = false;
        let found_start_number: boolean = false;
        for (let col_index = 0; col_index < colNums; col_index++) {
            if (!found_the_whole_number) {
                const actualChar: string | number = fileLines[row_index][col_index];
                let isDigit: boolean = !isNaN(Number(actualChar));
                if (actualChar === "\r") {
                    isDigit = false;
                }
                
                if (isDigit) {
                    if (!found_start_number) {
                        number_start = col_index;
                        found_start_number = true;
                    }
                    else
                        number_end = col_index + 1;
                    found_digit = true;
                } else {
                    if (found_digit) {
                        found_the_whole_number = true;
                        found_digit = false;
                        if (number_end < number_start)
                            number_end = number_start + 1;
                    }
                }
            }
            if (found_the_whole_number) {
                
                let isPartNumber: boolean = checkIfPartNumber(number_start, number_end, fileLines, row_index);
                if (isPartNumber) {
                    let readedNum: number = parseInt(fileLines[row_index].slice(number_start,number_end));
                    sumOfAllPartNumbers += BigInt(readedNum);
                }
                found_start_number = false;
                found_the_whole_number = false;
            }
        }
    }

    return sumOfAllPartNumbers;
}

function readLinesFromFile(filePath: string): string[] {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    const fileLines: string[] = fileContent.split('\n');
    return fileLines;
}

const filePath: string = './data/day_3.txt';
const fileLines: string[] = readLinesFromFile(filePath);

let sumPartNumbers: bigint = sumAllPartNumbers(fileLines);
console.log(sumPartNumbers)