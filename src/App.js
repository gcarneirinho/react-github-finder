import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

const AUTH = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
const LINK_USER = `https://api.github.com/users/`;
const SEARCH = `https://api.github.com/search/users?q=`;

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  
  // Serch User

  const searchUser = async strBusca => {
    setLoading(true);

    var link = `${SEARCH}${strBusca}&${AUTH}`;

    const res = await axios.get(link);

    setUsers(res.data.items);
    setLoading(false);
  };

  // getUserRepos

  const getUserRepos = async userName => {
    setLoading(true);

    var link = `${LINK_USER}${userName}/repos?per_page=5&sort=created:asc&${AUTH}`;

    const res = await axios.get(link);

    setRepos(res.data);
    setLoading(false);
  };

  // ShowUser

  const showUser = async login => {
    setLoading(true);

    var link = `${LINK_USER}${login}?${AUTH}`;
    const res = await axios.get(link);

    setUser(res.data);
    setLoading(false);
  };

  // Set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });

    setTimeout(() => setAlert({ alert: null }), 4000);
  };

  // ClearUser

  const clearUsers = () => {
    setUsers([]);
  };


    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      busca={searchUser}
                      clearUsers={clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={showAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={showUser}
                    getUserRepos={getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
}

export default App;
