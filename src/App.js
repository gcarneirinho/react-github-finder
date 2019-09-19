import React, { Component, Fragment } from "react";
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

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  // Serch User

  searchUser = async strBusca => {
    this.setState({ loading: true });

    var link = `${SEARCH}${strBusca}&${AUTH}`;

    const res = await axios.get(link);

    this.setState({ users: res.data.items, loading: false });
  };

  // getUserRepos

  getUserRepos = async userName => {
    this.setState({ loading: true });

    var link = `${LINK_USER}${userName}/repos?per_page=5&sort=created:asc&${AUTH}`;

    const res = await axios.get(link);

    this.setState({ repos: res.data, loading: false });
  };

  // ShowUser

  showUser = async login => {
    this.setState({ loading: true });

    var link = `${LINK_USER}${login}?${AUTH}`;
    const res = await axios.get(link);

    this.setState({ user: res.data, loading: false });
  };

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ alert: null }), 4000);
  };

  // ClearUser

  clearUsers = () => {
    this.setState({ users: [] });
  };

  render() {
    const { users, loading, user, repos, alert } = this.state;

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
                      busca={this.searchUser}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.showUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={this.state.loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
