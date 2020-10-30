import React, {useState} from 'react';

const Button = ({text, onclick}) => {
  return (
    <button onClick={onclick}>
      {text}
    </button>
  )
}

const Statistics = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const StatisticsSection = ({good, neutral, bad, all, average, positiveFeedback}) => {
  return (
    <table>
      <tbody>
        <Statistics text="good" value={good}/>
        <Statistics text="neutral" value={neutral}/>
        <Statistics text="bad" value={bad}/>
        <Statistics text="all" value={all}/>
        <Statistics text="average" value={average}/>
        <Statistics text="positive" value={positiveFeedback}/>
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = 0
  let average = 0
  let positiveFeedback = "0 %"

  if (good !== 0 || neutral !== 0 || bad !== 0) {
    all = good + neutral + bad
    average = (((good * 1) + (bad * (-1))) / all).toFixed(1)
    positiveFeedback = (((good / all) * 100)).toFixed(1).toString() + " %"
  }

  return (
    <>
      <div>
        <h1>Give feedback</h1>
        <Button text="good" onclick={() => setGood(good + 1)}/>
        <Button text="neutral" onclick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" onclick={() => setBad(bad + 1)}/>
      </div>
      <div>
        <h1>Statistics</h1>
        {(good !== 0 || neutral !== 0 || bad !== 0) ? < StatisticsSection good={good} bad={bad} neutral={neutral} all={all} average={average} positiveFeedback={positiveFeedback}/> : <p>No feedback given</p>}
      </div>
    </>
  )
}

export default App;
