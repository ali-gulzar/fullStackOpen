import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnectodeList = () => {

    const filterValue = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anectode).filter(a => a.content.includes(filterValue))
    
    const dispatch = useDispatch()

    const voteAnectodeAndDisplayMessage = (id, content) => {
        dispatch(voteAction(id))
        dispatch(setMessage(`you voted ${content}`))
        setTimeout(() => {
            dispatch(setMessage(null)) 
        }, 5000);
    }

    return (
    <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteAnectodeAndDisplayMessage(anecdote.id, anecdote.content)}>vote</button>
            </div>
            </div>
        )}
    </>

    )
}

export default AnectodeList