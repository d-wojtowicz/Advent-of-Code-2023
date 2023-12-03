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
function sumAllID(initialBag, fileLines) {
    let sumOfIDWithPossibleCombinations = 0;
    let IS_GOOD = true;
    for (const singleGame of fileLines) {
        const [gameNo, gameInfo] = singleGame.split(":");
        let actualGameID = parseInt(gameNo.split(" ")[1]);
        const singleGameSets = gameInfo.replace(/\r/g, "").split(";");
        IS_GOOD = true;
        for (const singleGameSet of singleGameSets) {
            const ballsInfo = singleGameSet.split(",");
            let tmpBag = { red: 0, green: 0, blue: 0 };
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
                IS_GOOD = false;
                break;
            }
        }
        if (IS_GOOD === true)
            sumOfIDWithPossibleCombinations += actualGameID;
    }
    return sumOfIDWithPossibleCombinations;
}
function readLinesFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const fileLines = fileContent.split('\n');
    return fileLines;
}
const filePath = './data/day_2.txt';
const fileLines = readLinesFromFile(filePath);
const initialBag = {
    red: 12,
    green: 13,
    blue: 14
};
let sumID = sumAllID(initialBag, fileLines);
console.log(sumID);
//# sourceMappingURL=day_2.js.map