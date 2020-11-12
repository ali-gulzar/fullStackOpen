import React from 'react'
import { connect } from 'react-redux'
import { setValue } from '../reducers/filterReducer'

const Filter = (props) => {

    const filterNotes = (event) => {
        props.setValue(event.target.value)
    }

    return <p>filter <input onChange={filterNotes}/></p>
}

const ConnectFilter = connect(null, {setValue})(Filter)

export default ConnectFilter