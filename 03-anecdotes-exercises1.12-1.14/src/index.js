import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => 
  <button onClick={props.handleClick}>{props.text}</button>

const Anecdote = (props) => {
  let wordVote = (props.vote === 1) ? "vote" : "votes"
  return (
    <>
      <h3>{props.anecdote}</h3>
      <p>has {props.vote} {wordVote}</p>
    </>
  )
}

const App = (props) => {
  
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(props.anecdotes.length).fill(0))
  
  let indexAnecdote = props.anecdotes.indexOf(props.anecdotes[selected])
  
  const handleClickAnecdote = () => setSelected(
    Math.floor(Math.random() * props.anecdotes.length)
  )
  const handleClickVote = () => {
      const newVotes = [...vote]
      newVotes[indexAnecdote] += 1
      setVote(newVotes)
  }
  
  let maxVotes = Math.max(...vote)
  let indexMaxVotes = [...vote].indexOf(maxVotes)

  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
        <Anecdote 
          anecdote={props.anecdotes[selected]} 
          vote={vote[indexAnecdote]}
        />
        <Button 
          handleClick={handleClickVote} 
          text="vote" 
        />
        <Button 
          handleClick={handleClickAnecdote} 
          text="next anectode" 
        />
      </div>
      <div>
        <h2>Anecdote with the most votes</h2>
        <Anecdote 
          anecdote={props.anecdotes[indexMaxVotes]} 
          vote={vote[indexMaxVotes]}
        />
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />, 
  document.getElementById('root')
)