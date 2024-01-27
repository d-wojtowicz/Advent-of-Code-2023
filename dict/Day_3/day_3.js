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
function checkIfPartNumber(number_start, number_end, fileLines, row_index) {
    let ignoreChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    let left_border = number_start - 1 < 0 ? 0 : number_start - 1;
    let right_border = number_end + 1 > fileLines[row_index].length + 1 ? fileLines[row_index].length + 1 : number_end + 1;
    let bottom_border = row_index + 1 > fileLines[row_index].length - 1 ? fileLines[row_index].length - 1 : row_index + 1;
    let top_border = row_index - 1 < 0 ? 0 : row_index - 1;
    if (bottom_border === fileLines.length) {
        bottom_border--;
    }
    let upperLine = fileLines[top_border].slice(left_border, right_border);
    let lineWithNumber = fileLines[row_index].slice(left_border, right_border);
    let lowerLine = fileLines[bottom_border].slice(left_border, right_border);
    if (upperLine.split("").some(char => !ignoreChars.includes(char)) ||
        lineWithNumber.split("").some(char => !ignoreChars.includes(char)) ||
        lowerLine.split("").some(char => !ignoreChars.includes(char)))
        return true;
    else
        return false;
}
function sumAllPartNumbers(fileLines) {
    let sumOfAllPartNumbers = 0n;
    const rowNums = fileLines.length;
    const colNums = fileLines[0].length;
    for (let row_index = 0; row_index < rowNums; row_index++) {
        let number_start = 0;
        let number_end = 0;
        let found_the_whole_number = false;
        let found_digit = false;
        let found_start_number = false;
        for (let col_index = 0; col_index < colNums; col_index++) {
            if (!found_the_whole_number) {
                const actualChar = fileLines[row_index][col_index];
                let isDigit = !isNaN(Number(actualChar));
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
                }
                else {
                    if (found_digit) {
                        found_the_whole_number = true;
                        found_digit = false;
                        if (number_end < number_start)
                            number_end = number_start + 1;
                    }
                }
            }
            if (found_the_whole_number) {
                let isPartNumber = checkIfPartNumber(number_start, number_end, fileLines, row_index);
                if (isPartNumber) {
                    let readedNum = parseInt(fileLines[row_index].slice(number_start, number_end));
                    sumOfAllPartNumbers += BigInt(readedNum);
                }
                found_start_number = false;
                found_the_whole_number = false;
            }
        }
    }
    return sumOfAllPartNumbers;
}
function readLinesFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileLines = fileContent.split('\n');
    return fileLines;
}
const filePath = './data/day_3.txt';
const fileLines = readLinesFromFile(filePath);
let sumPartNumbers = sumAllPartNumbers(fileLines);
console.log(sumPartNumbers);
//# sourceMappingURL=day_3.js.map