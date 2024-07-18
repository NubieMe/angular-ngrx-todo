import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { AppState } from "../app.state";
import { addTodo, loadTodos, loadTodosFailure, loadTodosSuccess, removeTodo } from "./todo.actions";
import { from, of } from "rxjs";
import { catchError, switchMap, withLatestFrom, map } from "rxjs/operators"
import { TodoService } from "../../todo/todo.service";
import { selectAllTodos } from "./todo.selectors";

@Injectable()
export class TodoEffects {
    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private todoService: TodoService
    ) {}

    loadTodos$ = createEffect(() =>
        this.actions.pipe(
          ofType(loadTodos),
          switchMap(() =>
            from(this.todoService.getTodos()).pipe(
              map((todos) => loadTodosSuccess({ todos })),
              catchError((error) => of(loadTodosFailure({ error })))
            )
          )
        )
    );

    saveTodos$ = createEffect(
        () =>
          this.actions.pipe(
            ofType(addTodo, removeTodo),
            withLatestFrom(this.store.select(selectAllTodos)),
            switchMap(([action, todos]) => from(this.todoService.saveTodo(todos)))
          ),
          
        { dispatch: false }
    );
}