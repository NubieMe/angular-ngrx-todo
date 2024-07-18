import { Injectable } from "@angular/core";
import { Todo } from "../Todo";
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TodoService {
    getTodos(): Observable<Todo[]> {
        if (localStorage.getItem('todos') === null) {
            localStorage.setItem('todos', JSON.stringify([]))
        }
        const todos = localStorage.getItem('todos') || '[]'
        return of(JSON.parse(todos))
    }

    saveTodo(todos: Todo[]) {
        localStorage.setItem('todos', JSON.stringify(todos))
        return todos
    }
}