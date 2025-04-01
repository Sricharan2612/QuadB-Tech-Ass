import axios from "axios";

export const todosAction = () => async (dispatch) => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');

    dispatch({
        type: 'FETCH_DATA',
        payload: {
            todos: data
        }
    });
};