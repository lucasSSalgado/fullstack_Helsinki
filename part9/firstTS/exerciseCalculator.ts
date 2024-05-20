interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface SanitizeInputs {
    weakData: number[],
    target: number
}

const calculateExercises = (exerciseByDay: number[], target: number): Result => {
    const periodLength = exerciseByDay.length;
    const trainingDays = exerciseByDay.filter(day => day > 0).length;

    const avg = exerciseByDay.reduce((a, b) => a + b, 0) / periodLength;
    const success = avg >= target;
    let rating: number;
    if (avg < target) {
        rating = 1;
    } else if (avg == target) {
        rating = 2;
    } else {
        rating = 3;
    }

    let ratingDescription: string;
    if (rating === 1) {
        ratingDescription = "you dont reach your target";
    } else if (rating === 2) {
        ratingDescription = "just ok";
    } else {
        ratingDescription = "excellent";
    }


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average: avg
    } 
}

const validateInputs = (args: string[]): SanitizeInputs => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    args.slice(3).forEach(arg => {
        if (isNaN(Number(arg))) {
            console.log(arg, "is not a number")
            throw new Error('Provided values were not numbers!');
        }
    });
    return {
        weakData: args.slice(3).map(arg => Number(arg)),
        target: Number(args[2])
    }
}

const { weakData, target } = validateInputs(process.argv);

console.log(calculateExercises(weakData, target));