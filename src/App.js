import React from 'react'
import ShowDocuments from './views/ShowDocuments'
import EditDocument from './views/EditDocument'
import CreateDocument from './views/CreateDocument'
import CreatePage from './views/CreatePage'
import PageList from './views/PageList'
import Profile from './views/Profile'
import Register from './views/Register'
import EditPage from './views/EditPage'
import Logout from './views/Logout'
import NavigationBar from './components/NavigationBar'
import { UserProvider } from './context/UserContext'
import Login from './views/Login'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.scss'
import './MonacoOverride.scss'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
    return (
        <UserProvider>
            <Router>
                <NavigationBar />
                <Switch style={{width: '100vw'}}>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/" exact render={() => <Redirect to="/pages" />} />
                    <PrivateRoute path="/profile/:id">
                        <Profile />
                    </PrivateRoute>
                    <PrivateRoute path="/pages" exact>
                        <PageList />
                    </PrivateRoute>
                    <Route path="/pages/:pageid" exact render={({location}) => <Redirect to={`${location.pathname}/documents`} />}/>
                    <PrivateRoute path="/create">
                        <CreatePage />
                    </PrivateRoute>
                    <PrivateRoute path="/edit/:pageid">
                        <EditPage />
                    </PrivateRoute>
                    <PrivateRoute path="/pages/:pageid/documents/:_id?">
                        <ShowDocuments />
                    </PrivateRoute>
                    <PrivateRoute path="/pages/:pageid/edit/:_id">
                        <EditDocument />
                    </PrivateRoute>
                    <PrivateRoute path="/pages/:pageid/create/:_id?">
                        <CreateDocument />
                    </PrivateRoute>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                </Switch>
            </Router>
        </UserProvider>
    )
}
