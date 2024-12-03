const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8");


// Part 1

/**
 * Day 3 | Part 1
 * 
 * We just need to parse the instructions and multiply the two numbers
 * So we can use regex to extract the expression we need and then multiply the two numbers
 * and add them to a sum
 */

function parseInstructions(instructions)
{
    const regex = /((mul\(\d{1,3},\s*\d{1,3}\)))/g;
    const parsed = instructions.match(regex)

    let sum = 0;

    for(const instruction of parsed)
    {
        const [term, expression] = instruction.split("(");

        if(term === "mul")
        {
            const [x, y] = expression.replace(")", "").split(",");

            sum += x * y;
        }
    }

    return sum;
}

console.log(parseInstructions(input));


// Part 2  

/**
 * 
 * Day 3 | Part 2
 * 
 * We still need to parse the mul(x,y) expressions but this time
 * we have additional instructions that we need to follow
 * these are:
 * 
 * - do() - this instruction enables future mul() instructions
 * - don't() - this instruction disables future mul() instructions
 * 
 * We are told that by default mul() instructions are enabled
 * 
 * So we need to keep track of whether mul() instructions are enabled
 * which is pretty simple to do, just assign a boolean variable to keep track of this
 * 
 * Then we can just repeat our previous regex but this time we add the new instructions
 * to it.
 */


function parseInstructions2(instructions)
{
    const regex = /((?:do\(\)|don't\(\)|mul\(\d{1,3},\s*\d{1,3}\)))/g;

    const parsed = instructions.match(regex);

    let sum = 0;
    let enabled = true;

    for(const instruction of parsed)
    {
        const [term, expression] = instruction.split("(");

        switch(term)
        {
            case "mul":
                if(!enabled) continue;
                const [x, y] = expression.replace(")", "").split(",");
                sum += x * y;
                break;
            case "do":
                enabled = true;
                break;
            case "don't":
                enabled = false;
                break;
        }
    }

    return sum;
}

console.log(parseInstructions2(input));