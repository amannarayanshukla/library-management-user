import {SEARCH_FIELD,FETCH_ROBOTS_SUCCESS,FETCH_ROBOTS_PENDING,FETCH_ROBOTS_FAILED} from "./constants";

export const initialStateSearch = {
    searchField:''
};

export const initialStateFetch = {
    isPending: true,
    robots:[],
    error:''
};

export const searchRobots = (state = initialStateSearch, action = {}) => {
    switch (action.type) {
        case SEARCH_FIELD:
            return {...state, searchField: action.payload};
        default:
            return state;
    }
};

export const fetchRobots = (state = initialStateFetch, action ={}) => {
    switch (action.type) {
        case FETCH_ROBOTS_PENDING:
            return {...state, isPending: true};
        case FETCH_ROBOTS_SUCCESS:
            return {...state, robots: action.payload, isPending: false};
        case FETCH_ROBOTS_FAILED:
            return {...state, error: action.payload, isPending: false};
        default:
            return state;
    }
};
