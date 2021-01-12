import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { selectUser, logout, login } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./Firebase";
import { useDispatch } from "react-redux";
import Widgets from "./Widgets";
// import { Switch } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Network from "./Network";
import Jobs from "./Jobs";
import Messaging from "./Messaging";
import Notifications from "./Notifications";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        //user logged out
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact component={Header}>
              <Header />
              <div className="app__body">
                <Sidebar />
                <Feed />
                <Widgets />
              </div>
            </Route>
            <Route path="/network" component={Network}>
              <Header />
              <Network />
            </Route>
            <Route path="/jobs" component={Jobs}>
              <Header />
              <Jobs />
            </Route>
            <Route path="/messaging" component={Messaging}>
              <Header />
              <Jobs />
            </Route>
            <Route path="/notifications" component={Notifications}>
              <Header />
              <Notifications />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
