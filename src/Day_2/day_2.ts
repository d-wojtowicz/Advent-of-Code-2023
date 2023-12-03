//npm install @types/node // Library with File System operations
//START: tsc && node dict/Day_2/day_2.js

import * as fs from 'fs';

interface bag {
    red: number,
    green: number,
    blue: number
}

function sumAllID(initialBag: bag, fileLines: string[]) {
    let sumOfIDWithPossibleCombinations: number = 0;
    let IS_GOOD: boolean = true;
    for (const singleGame of fileLines) {
        const [gameNo, gameInfo]: string[] = singleGame.split(":");
        let actualGameID: number = parseInt(gameNo.split(" ")[1]);

        const singleGameSets: string[] = gameInfo.replace(/\r/g, "").split(";");
        IS_GOOD = true;
        for (const singleGameSet of singleGameSets) {
            const ballsInfo: string[] = singleGameSet.split(",");
            let tmpBag: bag = {red: 0, green: 0, blue: 0};
            for (const singleBallInfo of ballsInfo) {
                let [_, numOfBalls, typeOfBall] = singleBallInfo.split(" ");
                if (typeOfBall === "red")
                    tmpBag.red = parseInt(numOfBalls);
                if (typeOfBall === "green")
                    tmpBag.green = parseInt(numOfBalls);
                if (typeOfBall === "blue")
                    tmpBag.blue = parseInt(numOfBalls);
            }
            if (tmpBag.red > initialBag.red || tmpBag.green > initialBag.green || tmpBag.blue > initialBag.blue) {
                IS_GOOD = false
                break
            }
        }
        if (IS_GOOD === true)
            sumOfIDWithPossibleCombinations += actualGameID;
    }
    return sumOfIDWithPossibleCombinations
}

function readLinesFromFile(filePath: string): string[] {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8');
    const fileLines: string[] = fileContent.split('\n');
    return fileLines;
}

const filePath: string = './data/day_2.txt';
const fileLines: string[] = readLinesFromFile(filePath);
const initialBag: bag = {
    red: 12,
    green: 13,
    blue: 14
};

let sumID: number = sumAllID(initialBag, fileLines);
console.log(sumID);