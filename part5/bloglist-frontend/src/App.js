import React, { useEffect, useState } from 'react'
import Main from './Main'
import User from './components/User'
import userService from './services/users'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'

const Users = ({ users }) => {

    return (
        <div>
            <h1>Users</h1>
            <table>
                <tbody>
                    <tr><td>Name</td><td>Blogs</td></tr>
                </tbody>
                {users.map(user => {
                    return (
                        <tbody key={user.id}>
                            <tr>
                                <Link to={`/users/${user.id}`} ><td>{user.name}</td></Link>
                                <td>{user.blogs.length}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

const App = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAll().then(res => setUsers(res))
    },[users])

    const userById = id => users.find(u => u.id === id)
    const match = useRouteMatch('/users/:id')
    const user = match ? userById(match.params.id) : null

    return (
        <div>
            <div>
                <Link style={{ paddingRight: 10 }} to="/">main</Link>
                <Link to="/users">users</Link>
            </div>
            <Switch>
                <Route path="/users/:id">
                    <User user={user} />
                </Route>
                <Route path="/users">
                    <Users users={users} />
                </Route>
                <Route path="/">
                    <Main />
                </Route>
            </Switch>
        </div>

    )
}

export default App