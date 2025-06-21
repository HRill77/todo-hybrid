import { createStore } from "redux";

// Actions
const SET_TODOS = "SET_TODOS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const GET_TODO_STATS = "GET_TODO_STATS";

// Action creators
export const setTodos = (todos) => ({ type: SET_TODOS, payload: todos });
export const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
export const getTodoStats = () => ({ type: GET_TODO_STATS });

// Reducer
const initialState = {
  todos: [],
  todoStats: {},
  nextId: 1,
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return { ...state, todos: action.payload };
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            ...action.payload,
            createdAt: new Date(),
          },
        ],

        nextId: state.nextId + 1,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        ),
      };
    case GET_TODO_STATS: {
      const total = state.todos.length;
      const completed = state.todos.filter((todo) => todo.completed).length;
      const active = total - completed;
      total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        ...state,
        todoStats: {
          total,
          completed,
          active,
          completionRate,
        },
      };
    }
    default:
      return state;
  }
};

export const todoStore = createStore(todoReducer);