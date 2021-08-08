import React, { Component, Fragment } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Login from './pages/Login/index'
import Admin from './pages/Admin/index'
import Teacher from './pages/Teacher/index'
import Student from './pages/Student/index'

class App extends Component {
  // componentDidMount() {
  //   this.props.history.push('/login')
  // }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/student" component={Student}></Route>
          <Route path="/teacher" component={Teacher}></Route>
          <Redirect to="/login"></Redirect>
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
