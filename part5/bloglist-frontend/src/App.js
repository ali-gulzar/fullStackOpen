import React, { useEffect, useState } from 'react'
import Main from './Main'
import User from './components/User'
import userService from './services/users'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Users = ({ users }) => {

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        }
    })

    const classes = useStyles()

    return (
        <div>
            <h1>Users</h1>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                        <TableRow><TableCell>Name</TableCell><TableCell>Blogs</TableCell></TableRow>
                    </TableBody>
                    {users.map(user => {
                        return (
                            <TableBody key={user.id}>
                                <TableRow>
                                    <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                                    <TableCell>{user.blogs.length}</TableCell>
                                </TableRow>
                            </TableBody>
                        )
                    })}
                </Table>
            </TableContainer>
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