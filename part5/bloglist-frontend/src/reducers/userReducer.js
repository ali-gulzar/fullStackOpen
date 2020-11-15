const reducer = (state = null , action) => {
    switch(action.type) {
    case('SETUSER'):
        return action.user
    default:
        return state
    }
}

export const setUser = (user) => {
    return {
        type: 'SETUSER',
        user
    }
}

export default reducer