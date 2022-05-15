import { CREATE, DELETE, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, LIKE, UPDATE, START_LOADING, END_LOADING, COMENT } from "../constants/actionTypes";

const posts = (states = { isLoading: true, posts: [] }, action) => {

    switch (action.type) {
        case START_LOADING:
            return { ...states, isLoading: true }
        case END_LOADING:
            return { ...states, isLoading: false }

        case FETCH_ALL:
            return {
                ...states,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_POST:
            return { ...states, post: action.payload };

        case FETCH_BY_SEARCH:
            return { ...states, posts: action.payload };
        case CREATE:
            return { ...states, posts: [action.payload, ...states.posts] };


        case UPDATE:
        case LIKE:
            return { ...states, posts: states.posts.map((pst) => pst._id === action.payload._id ? action.payload : pst) };
        case COMENT:
            return { ...states, posts: states.posts.map((pst) => pst._id === action.payload._id ? action.payload : pst) };

        case DELETE:
            return { ...states, posts: states.posts.filter(post => post._id !== action.payload) };


        default:
            return states;
    }
};
export default posts;