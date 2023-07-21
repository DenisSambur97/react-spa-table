const initialState = {
    users: [],
    currentPage: 1,
    totalPages: 1,
    searchQuery: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                totalPages: Math.ceil(action.payload.length / 10), // Вычисляем общее количество страниц
            };
        case 'FETCH_USERS_FAILURE':
            return { ...state, users: [], error: action.payload };
        case 'SORT_USERS':
            const sortedUsers = [...state.users].sort((a, b) => {
                if (a[action.payload] < b[action.payload]) return -1;
                if (a[action.payload] > b[action.payload]) return 1;
                return 0;
            });
            return { ...state, users: sortedUsers };
        case 'SEARCH_USERS':
            return { ...state, searchQuery: action.payload, currentPage: 1 };
        case 'CHANGE_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

export default userReducer;
