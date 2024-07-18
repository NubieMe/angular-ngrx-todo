import { createAction, props } from "@ngrx/store"
import { Todo } from "../../Todo"

export const addTodo = createAction(
    '[Home Page] Add Todo',
    props<{ todo: Todo }>()
)

export const removeTodo = createAction(
    '[Dialog Todolist] Remove Todo',
    props<{ name: string }>()
)

export const updateTodo = createAction(
    '[Dialog Todolist] Update Todo',
    props<{ name: string }>()
)

export const loadTodos = createAction('[Dialog Todolist] Load Todos')

export const loadTodosSuccess = createAction(
    '[Dialog Todolist] Load Todos Success',
    props<{ todos: Todo[] }>()
)

export const loadTodosFailure = createAction(
    '[Dialog Todolist] Load Todos Failure',
    props<{ error: string }>()
)