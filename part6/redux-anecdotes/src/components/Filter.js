import React from 'react'
import { useDispatch } from 'react-redux'
import { setValue } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const filterNotes = (event) => {
        dispatch(setValue(event.target.value))
    }

    return <p>filter <input onChange={filterNotes}/></p>
}


export default Filter