import React from 'react'
import ShowDocuments from './views/ShowDocuments'
import EditDocument from './views/EditDocument'
import NavigationBar from './components/NavigationBar'
import Login from './views/Login'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './App.scss'
import 'codemirror/lib/codemirror.css';
import './cmOverride.scss'

export default function App() {
    return (
            <Router>
                <NavigationBar />
                <Switch>
                    <Route path="/" exact render={({location}) => <Redirect to={{pathname: "/documents", state: {from: location}}} />} />
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/documents" exact>
                        <ShowDocuments />
                    </Route>
                    <Route path="/documents/:_id">
                        <ShowDocuments />
                    </Route>
                    <Route path="/edit/:_id">
                        <EditDocument />
                    </Route>
                </Switch>
            </Router>
    )
}
