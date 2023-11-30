import { useState } from 'react'
import Statistics from './Statistics'
import ButtonHandler from './ButtonHandler'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <ButtonHandler text={"good"} handlerClick={() => setGood(good + 1)} />
      <ButtonHandler text={"neutral"} handlerClick={() => setNeutral(neutral + 1)} />
      <ButtonHandler text={"bad"} handlerClick={() => setBad(bad + 1)} />

      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App