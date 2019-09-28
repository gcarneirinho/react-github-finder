import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
    //REMOVE_ALERT,
    //SET_ALERT,
} from '../types';

export default (state, action) => {
    switch(action.type){
        case CLEAR_USERS:
            console.log("clear");
            return {
                ...state,
                users: [],
                loading: false
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_REPOS:
            return{
                ...state,
                repos: action.payload,
                loading: false
            }

        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        default:
            return state;
    }
}