const reducer = (state = [] , action) => {
    switch(action.type) {
    case('INIT'):
        return action.data
    default:
        return state
    }
}

export const initData = (data) => {
    return {
        type: 'INIT',
        data
    }
}

export default reducer