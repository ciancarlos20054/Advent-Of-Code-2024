const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

const lists = input.map((line) => line.replace("\r", "").split(" "));



/**
 * Day 2 | Part 1
 * Problem states that a level (list) is safe if both of the following conditions are true:c
 * - The levels are either all increasing or all decreasing.
 * - Any two adjacent levels differ by at least one and at most three.
 * 
 * so we just need to check if the difference between two adjacent levels isn't 0
 * since that would mean that the levels aren't increasing or decreasing.
 * 
 * then we check if the difference between two adjacent levels is greater than 1
 * but less than 4
 */


function isSafe(list)
{
    const n = list.length;

    let isIncreasing = false;
    let isDecreasing = false;

    for(let i = 0; i < n - 1; i++)
    {
        const difference = list[i] - list[i + 1];

        const absDifference = Math.abs(difference);

        if(absDifference === 0 || absDifference > 3) return false;

        if(difference > 0) isDecreasing = true;
        else if(difference < 0) isIncreasing = true;

        if(isIncreasing && isDecreasing) return false;
    }

    return true;
}

function countReports()
{
    let count = 0;

    for(const report of lists)
    {
        if(isSafe(report)) count++;
    }

    return count;
}

console.log(countReports());


// Part 2


/**
 * Part 2 wants the same rules, except if removing a single level 
 * from an unsafe report makes it safe, then it should count as safe.
 */

function isSafe2(list)
{
    const n = list.length;

    if(isSafe(list)) return true;

    for(let i = 0; i < n; i++)
    {
        if(reEvaluate(list, i)) return true;
    }
    return false;
}

function reEvaluate(list, index)
{
    const temp = [...list];
    temp.splice(index, 1);

    if(isSafe(temp)) return true; 
}

function countReports2()
{
    let count = 0;

    for(const report of lists)
    {
        if(isSafe2(report)) count++;
    }

    return count;
}

console.log(countReports2());
