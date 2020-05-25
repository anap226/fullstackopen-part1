import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => 
  <button onClick={handleClick}>{text}</button>

const Buttons = (props) => {
  return (
    <div>
      <Button 
        handleClick={props.feedback.goodFeedback.updatedState} 
        text={props.feedback.goodFeedback.text} 
      />
      <Button 
        handleClick={props.feedback.neutralFeedback.updatedState} 
        text={props.feedback.neutralFeedback.text} 
      />
      <Button 
        handleClick={props.feedback.badFeedback.updatedState} 
        text={props.feedback.badFeedback.text} 
      />
    </div>
  )
}  

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  return props.feedback.allFeedback.value === 0 
  ? <p>No feedback given</p>
  : (
    <table>
      <tbody>
        <Statistic 
          text={props.feedback.goodFeedback.text} 
          value={props.feedback.goodFeedback.value} 
        />
        <Statistic 
          text={props.feedback.neutralFeedback.text} 
          value={props.feedback.neutralFeedback.value} 
        />
        <Statistic 
          text={props.feedback.badFeedback.text} 
          value={props.feedback.badFeedback.value} 
        />
        <Statistic 
          text={props.feedback.allFeedback.text} 
          value={props.feedback.allFeedback.value} 
        />
        <Statistic 
          text={props.feedback.averageFeedback.text} 
          value={props.feedback.averageFeedback.value} 
        />
        <Statistic 
          text={props.feedback.positiveFeedback.text} 
          value={props.feedback.positiveFeedback.value} 
        />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  const feedback = {
    goodFeedback: {
      text: "good", 
      value: good,
      updatedState: () => setGood(good + 1)
    },
    neutralFeedback: {
      text: "neutral", 
      value: neutral,
      updatedState: () => setNeutral(neutral + 1)
    },
    badFeedback: {
      text: "bad", 
      value: bad,
      updatedState: () => setBad(bad + 1)
    },
    allFeedback: {
      text: "all", 
      value: all
    },
    averageFeedback: {
      text: "average", 
      value: Math.round(
        (((good - bad) / all) + Number.EPSILON) * 100
        ) / 100
    },
    positiveFeedback: {
      text: "positive", 
      value: Math.round(
        ((good * 100 / all) + Number.EPSILON) * 100
        ) / 100 + " %"
    },
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Buttons feedback={feedback} />
      <h2>statistics</h2>
      <Statistics feedback={feedback} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))