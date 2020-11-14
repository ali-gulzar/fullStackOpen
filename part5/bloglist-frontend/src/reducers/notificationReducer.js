const reducer = (state = '' , action) => {
    switch(action.type) {
    case('SETMESSAGE'):
        return action.message
    default:
        return state
    }
}

export const setMessage = (message) => {
    return {
        type: 'SETMESSAGE',
        message
    }
}

export default reducer