const reducer = (state = null, action) => {
    switch(action.type) {
        case('SETMESSAGE'):
            return action.data.message
        default:
            return state
    }
}

export const setMessage = (message) => {
    return {
        type: 'SETMESSAGE',
        data: {
            message
        }
    }
}

export default reducer