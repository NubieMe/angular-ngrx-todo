import { AppState } from "../app.state";
import { createFeatureSelector, createSelector } from "@ngrx/store"
import { TodoState } from "./todo.reducer";

// export const selectTodos = (state: AppState) => state.todos
export const selectTodos = createFeatureSelector<AppState, TodoState>('todos');
export const selectAllTodos = createSelector(
    selectTodos,
    (state: TodoState) => state.todos
)