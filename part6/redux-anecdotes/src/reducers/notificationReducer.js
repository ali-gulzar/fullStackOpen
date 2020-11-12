const reducer = (state = {message: null, timeoutID: null}, action) => {
    switch(action.type) {
        case('SETMESSAGE'):
            return {message: action.message, timeoutID: action.timeoutID}
        default:
            return state
    }
}

export const setMessage = (message, timeout, toID) => {
    return dispatch => {
        if (toID !== null) {
            clearTimeout(toID)
        }
        const timeoutID = setTimeout(() => {
            dispatch({
                type: 'SETMESSAGE',
                message: null,
                timeoutID: null
            })
        }, timeout);
        dispatch({
            type: 'SETMESSAGE',
            message,
            timeoutID: timeoutID
        })
    }
}

export default reducer