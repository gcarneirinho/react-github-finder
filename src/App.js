import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import axios from 'axios';
import './App.css';

const AUTH = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
//const LINK_USER = `https://api.github.com/users?${AUTH}`;
const SEARCH = `https://api.github.com/search/users?q=`;

class App extends Component {
  state = {
    users: [],
    loading: false
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

  // ClearUser

  clearUsers = () => {
    this.setState({users: []});
  }

  

  render(){

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search busca={this.searchUser} clearUsers={this.clearUsers} showClear={this.state.users.length > 0? true: false} />
          
          <Users users={this.state.users} loading={this.state.loading}/>
          
        </div>
        
      </div>
    )
  }
}

export default App;
