import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnectodeList = (props) => {

    const voteAnectodeAndDisplayMessage = (id, content, votes) => {
        props.voteAction(id, {content, votes})
        props.setMessage(`you voted ${content}`, 1000, props.timeoutID)
    }

    return (
    <>
        {props.anectodes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => voteAnectodeAndDisplayMessage(anecdote.id, anecdote.content, anecdote.votes + 1)}>vote</button>
            </div>
            </div>
        )}
    </>

    )
}

const mapStateToProps = (state) => {
    return {
      anectodes: state.anectode.filter(a => a.content.includes(state.filter)),
      timeoutID: state.notification.timeoutID
    }
}

const ConnectAnectodeList = connect(mapStateToProps, { voteAction, setMessage })(AnectodeList)

export default ConnectAnectodeList