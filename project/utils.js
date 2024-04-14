export function generateRandomNumber(upperLimit, lowerLimit=0) {
    return Math.floor(Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit);
}