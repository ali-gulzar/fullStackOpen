import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

const Login = ({ setMessage, successfullLogin, show}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [loginUser, result] = useMutation(LOGIN, {
        onError: (error) => setMessage(error.graphQLErrors[0].message)
    })

    const login = async (event) => {
        event.preventDefault()

        await loginUser({ variables: { username, password }})
    }

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            localStorage.setItem('user-token', token)
            successfullLogin(token)
            setUsername('')
            setPassword('')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data])

    if (!show) return null

    return (
        <div>
            <form onSubmit={login}>
            <div>
                username <input value={username} onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div>
                password <input value={password} onChange={(event) => setPassword(event.target.value)} type="password"/>
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login