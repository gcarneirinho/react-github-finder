import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from  './components/layout/Alert';
import axios from 'axios';
import './App.css';

const AUTH = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//const LINK_USER = `https://api.github.com/users?${AUTH}`;
const SEARCH = `https://api.github.com/search/users?q=`;

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  
  
  // Init app
  /*async componentDidMount(){

    this.setState({loading:true});

    const res = await axios.get(this.LINK_USER);

    this.setState({users: res.data, loading: false});
  }*/

  // Serch User 

  searchUser = async strBusca => {

    this.setState({loading: true});

    var link = `${SEARCH}${strBusca}&${AUTH}`;

    const res = await axios.get(link);

    this.setState({users: res.data.items, loading: false});
  }

  // Set Alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg: msg, type: type}});

    setTimeout(() => this.setState({alert: null}), 4000);
  }

  // ClearUser

  clearUsers = () => {
    this.setState({users: []});
  }

  render(){

    const {users, loading, alert} = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Search busca={this.searchUser} clearUsers={this.clearUsers} showClear={users.length > 0? true: false} setAlert={this.setAlert} />
          <Users users={users} loading={loading}/>
        </div>
      </div>
    )
  }
}

export default App;
