import {SEARCH_FIELD, FETCH_ROBOTS_PENDING,FETCH_ROBOTS_FAILED,FETCH_ROBOTS_SUCCESS} from "./constants";


export const setSearchField = (text) => {
    return {
        type: SEARCH_FIELD,
        payload: text
    }
};

export const requestRobots = () => (dispatch) => {
    dispatch({type: FETCH_ROBOTS_PENDING});

    fetch(`http://localhost:3001/api/user/get-all-books`)
        .then((data) => data.json())
        .then((data)=>{
            console.log(data,"DATA")
            dispatch({type: FETCH_ROBOTS_SUCCESS, payload: data})
        })
        .catch((error) => {
            dispatch({type: FETCH_ROBOTS_FAILED, payload:error})
        })
};

