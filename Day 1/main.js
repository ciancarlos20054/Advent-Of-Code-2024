const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

const lists = input.map((line) => line.replace("\r", "").split("-"));

/**
 * Pair up the smallest number in the left list with the smallest number
 * in the right list, then the second-smallest left number with the second-smallest right number,
 * and so on.
 * 
 * So we sort the two lists in ascending order, then pair up the numbers at the same index.
 */
const leftList = lists.map((arr) => arr[0]).sort((a, b) => a - b);

const rightList = lists.map((arr) => arr[1]).sort((a, b) => a - b);


// We can safely assume that the two lists are of the same length 
const n = leftList.length;

function getDistance(a, b)
{
    return Math.abs(a - b);
}

function getTotalDistance()
{
    let total = 0;
    for(let i = 0; i < n; i++)
    {
        total += getDistance(leftList[i], rightList[i]);
    }

    return total;
}

console.log(getTotalDistance());



// Part 2

/**
 * Part 2 just asks for us to calculate the similarity score.
 * For example: if the left list is [1, 2, 3] and the right list is [1, 2, 3, 3, 1, 2],
 * left[0] = 1;
 * freqRight[1] = 2;
 * score += 1 * 2 = 2;
 * 
 * so if we say that the left list value is x, and that the frequency of x in the right list
 * is y, then to calculate the similarity score, we do x * y = a.
 * a being the score for that particular value.
 * 
 * We then sum up all the scores for each value in the left list.
 * 
 **/
function calculateSimilarityScore()
{
    let score = 0;

    const freq = {};

    for(let i = 0; i < n; i++)
    {
        if(!freq[rightList[i]]) freq[rightList[i]] = 0;
        freq[rightList[i]]++;
    }

    for(let i = 0; i < n; i++)
    {
        const num = leftList[i];
        score += num * freq[num] || 0;
    }

    return score;
}

console.log(calculateSimilarityScore());