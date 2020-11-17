const pA = (args: Array<string>): Array<number> => {
    if (args.length !== 4) throw new Error("Invalid amount of arguments");
    
    const bmiValues = args.slice(2)
    bmiValues.map(arg => {
        if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!')
    })
    const values = bmiValues.map(value => Number(value))
    return values
}


const calculateBmi = (height: number, mass: number): string => {
    const bmi: number = mass / (height * 0.01)**2
    if (bmi >= 0 && bmi < 15) return "Very severely underweight"
    else if (bmi >= 15 && bmi < 16) return "Severely underweight"
    else if (bmi >= 16 && bmi < 18.5) return "Underweight"
    else if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)"
    else if (bmi >= 25 && bmi < 30) return "Overweight"
    else if (bmi >= 30 && bmi < 35) return "Obese Class I (Moderately obese)"
    else if (bmi >= 35 && bmi < 40) return "Obese Class II (Severely obese)"
    else if (bmi >= 40) return "Obese Class III (Very severely obese)"
    else return `Invalid values provided: Height ${height} and Mass ${mass}`
}

try {
    const args = pA(process.argv)
    console.log(calculateBmi(args[0], args[1]))
} catch (error) {
    console.log("Error ",error.message)
}
