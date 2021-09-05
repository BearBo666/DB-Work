import React, { Component, Fragment, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const Admin = lazy(() => import('./pages/Admin'))

class App extends Component {

  render() {
    return (
      <Fragment>
        <Suspense fallback={<h1>loading.....</h1>}>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Redirect to="/login"></Redirect>
          </Switch>
        </Suspense>
      </Fragment>
    )
  }
}

export default App
