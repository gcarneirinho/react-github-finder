import React, { useReducer} from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import GithubReducer from './GithubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    //GET_REPOS
    //REMOVE_ALERT,
    //SET_ALERT,
} from '../types';


const LINK_USER = `https://api.github.com/users/`;
const AUTH = `client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
const SEARCH = `https://api.github.com/search/users?q=`;

const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Serch User

    const searchUser = async strBusca => {
        setLoading();

        var link = `${SEARCH}${strBusca}&${AUTH}`;

        const res = await axios.get(link);

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
        //setUsers(res.data.items);
    };

    // Get User

    const getUser = async login => {
        setLoading();

        var link = `${LINK_USER}${login}?${AUTH}`;
        const res = await axios.get(link);

        dispatch({
            type: GET_USER,
            payload: res.data
        })

    };

    // Get Repos
    const getUserRepos = async userName => {
        setLoading();
    
        var link = `${LINK_USER}${userName}/repos?per_page=5&sort=created:asc&${AUTH}`;
    
        const res = await axios.get(link);
    
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
      };

    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS});

    // Set Loading

    // Dispatcher

    const setLoading = () => dispatch({ type: SET_LOADING });

    return <githubContext.Provider
    value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        clearUsers,
        getUser,
        getUserRepos
    }}>{props.children}</githubContext.Provider>
}

export default GithubState;