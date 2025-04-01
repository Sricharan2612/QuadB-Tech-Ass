const initialState = {
    todos: [],
    isLoading: true
};

const TodosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, todos: action.payload.todos, isLoading: false };
        default:
            return { ...state };
    }
};

export default TodosReducer;