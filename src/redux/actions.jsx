import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({ type: 'FETCH_USERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
    }
};

export const sortUsers = (field) => ({
    type: 'SORT_USERS',
    payload: field,
});

export const searchUsers = (value) => ({
    type: 'SEARCH_USERS',
    payload: value,
});

export const changePage = (page) => ({
    type: 'CHANGE_PAGE',
    payload: page,
});
