import { Todo } from "../../Todo"
import { createReducer, on } from "@ngrx/store"
import { addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, removeTodo, updateTodo } from "./todo.actions"

export type TodoState = {
    todos: Todo[]
    error: string | null
    status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: TodoState = {
    todos: [],
    error: null,
    status: 'pending'
}

export const todoReducer = createReducer(
    initialState,
    on(addTodo, (state, { todo }) => ({
        ...state,
        todos: [...state.todos, todo]
    })),

    on(removeTodo, (state, { name }) => ({
        ...state,
        todos: state.todos.filter(todo => todo.name !== name)
    })),

    on(updateTodo, (state, { name }) => ({
        ...state,
        todos: state.todos.map(todo => todo.name === name ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    })),

    on(loadTodos, (state) => ({ ...state, status: 'loading' as const })),

    on(loadTodosSuccess, (state, { todos }) => ({
        ...state,
        status: 'success' as const,
        error: null,
        todos
    })),

    on(loadTodosFailure, (state, { error }) => ({ ...state, error, status: 'error' as const }))
);