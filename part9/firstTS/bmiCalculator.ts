const calculateBmi = (heightCM: number, weightKG: number): string => {
    const heightM = heightCM / 100;
    const bmi = weightKG / (heightM * heightM);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Something get wrong";
    }
}

interface ParsonData {
    heightMeter: number;
    weightKG: number;
}

const checkArguments = (args: string[]): ParsonData => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    if (args.length > 4) {
        throw new Error('Too many arguments');
    }
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightMeter: Number(args[2]),
            weightKG: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

if (require.main === module) {
    try {
        const { heightMeter, weightKG } = checkArguments(process.argv);
        console.log(calculateBmi(heightMeter, weightKG));
    } catch (error) {
        console.error(error.message);
    }
}

export { calculateBmi }