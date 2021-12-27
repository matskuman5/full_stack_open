import React, { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad)/(good + neutral + bad)}</p>
      <p>positive {good / (good + neutral + bad) * 100} %</p>
    </div>
  )  
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>
        {name}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name={'good'} handleClick={() => setGood(good + 1)}/>
      <Button name={'neutral'} handleClick={() => setNeutral(neutral + 1)}/>
      <Button name={'bad'} handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App