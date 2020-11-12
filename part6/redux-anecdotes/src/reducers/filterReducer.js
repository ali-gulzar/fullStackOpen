const reducer = (state = "", action) => {
    switch(action.type) {
        case('SETFILTER'):
            return action.data.value
        default:
            return state
    }
}

export const setValue = (value) => {
    return {
        type: 'SETFILTER',
        data: {
            value
        }
    }
}

export default reducer