const reducer = (state = null, action) => {
    switch(action.type) {
        case('SETMESSAGE'):
            return action.message
        default:
            return state
    }
}

export const setMessage = (message, timeout) => {
    return dispatch => {
        dispatch({
            type: 'SETMESSAGE',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'SETMESSAGE',
                message: null
            })
        }, timeout);
    }
}

export default reducer