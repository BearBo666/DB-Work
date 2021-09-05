import React, { Component, lazy } from "react";
import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const Login = lazy(() => import("./login"));
const Home = lazy(() => import("./home"));

export default class index extends Component {
  render() {
    return (
      <div className="w-100 h-100">
        <Suspense fallback={<h1>loading.....</h1>}>
          <Switch>
            <Route path="/admin/login" component={Login}></Route>
            <Route path="/admin/home" component={Home}></Route>
            <Redirect to="/admin/login"></Redirect>
          </Switch>
        </Suspense>
      </div>
    );
  }
}
