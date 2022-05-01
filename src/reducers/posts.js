import { CREATE, DELETE, FETCH_ALL, LIKE, UPDATE } from "../constants/actionTypes";

const posts = (posts = [], action) => {

    switch (action.type) {
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...posts, action.payload ];

        case UPDATE:
        case LIKE: 
            return posts.map((pst) => pst._id === action.payload._id ? action.payload : pst)

        case DELETE:
            return posts.filter(post => post._id !== action.payload)

        
        default:
            return posts;
    }
};
export default posts;