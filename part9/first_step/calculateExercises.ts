interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArguments = (args: Array<string>): Array<number> => {
    if (args.length !== 12) throw new Error("Invalid amount of arguments");
    
    const bmiValues = args.slice(2)
    bmiValues.map(arg => {
        if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!')
    })
    const values = bmiValues.map(value => Number(value))
    return values
}
  
const calculateExercises = (values: Array<number>, target: number): Result => {

    return {
        periodLength: values.length,
        trainingDays: values.filter(value => value !== 0).length,
        success: (values.reduce((sum, value) => sum + value, 0)) / values.length > target,
        rating: 2,
        ratingDescription: "Well done Ali!",
        target,
        average: values.reduce((sum, value) => sum + value, 0) / values.length
    }
}

try {
    const args: Array<number> = parseArguments(process.argv)
    console.log(calculateExercises(args.slice(1), args[0]))
} catch (error) {
    console.log("Error:", error.message)
}