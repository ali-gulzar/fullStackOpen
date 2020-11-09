import React from 'react'
import { useDispatch } from 'react-redux'
import { addAction } from '../reducers/anecdoteReducer'

const AnectodeForm = () => {

    const dispatch = useDispatch()

    const addAnectode = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(addAction(content))
    }

    return (
    <>
        <h2>create new</h2>
        <form onSubmit={addAnectode}>
            <div><input name="content"/></div>
            <button type="submit">create</button>
        </form>
    </>

    )
}

export default AnectodeForm