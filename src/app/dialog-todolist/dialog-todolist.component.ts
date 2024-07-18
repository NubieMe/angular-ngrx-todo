import { removeTodo, updateTodo } from './../state/todos/todo.actions';
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { loadTodos } from "../state/todos/todo.actions";
import { selectAllTodos } from '../state/todos/todo.selectors';
import { AppState } from '../state/app.state';
import { Todo } from '../Todo';

@Component({
    selector: 'dialog-todolist',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatTableModule,
      MatIconModule
    ],
    templateUrl: 'dialog-todolist.component.html',
    styleUrl: 'dialog-todolist.component.css'
  })
  export class DialogTodolist implements OnInit {
    data:Todo[] = []
    readonly dialogRef = inject(MatDialogRef<DialogTodolist>)
    readonly displayedColumns = ['name', 'category', 'date', 'isCompleted', 'actions'];
  
    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
      this.store.select(selectAllTodos).subscribe(todos => {
        this.data = todos
      })
        this.store.dispatch(loadTodos())    
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    updateTodo(name: string) {
        this.store.dispatch(updateTodo( { name }))
    }

    removeTodo(name: string) {
        this.store.dispatch(removeTodo( { name }))
    }
  }