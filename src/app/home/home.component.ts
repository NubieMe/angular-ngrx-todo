import { MatDialog } from '@angular/material/dialog';
import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { Todo } from '../Todo';
import { map, Observable, startWith } from 'rxjs';
import { DialogTodolist } from '../dialog-todolist/dialog-todolist.component';
import { Store } from '@ngrx/store';
import { addTodo } from '../state/todos/todo.actions';
import { AppState } from '../state/app.state';

const moment = _rollupMoment || _moment

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    NgFor,
    DialogTodolist
  ],
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  title = 'todo-app';
  name = new FormControl('');
  category = new FormControl('');
  readonly date = new FormControl(moment());
  options: string[] = ['Work', 'Play', 'Trip', 'Sport'];
  filteredOptions: Observable<string[]>
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<AppState>) {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.filteredOptions = this.category.valueChanges.pipe(
      startWith(''),
      map(val => this._filter(val || '')),
    )
  }

  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.date(normalizedMonthAndYear.date())
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  saveTodo() {
    if (!this.name.value || !this.category.value || !this.date.value) {
      alert('Please fill all fields');
    } else {
      let todo = new Todo()
      todo.name = this.name.value!;
      todo.category = this.category.value!;
      todo.date = this.date.value!.format('MM/YYYY');
      todo.isCompleted = false;
      this.store.dispatch(addTodo({ todo }));
      
      this.name.setValue('');
      this.category.setValue('');
      this.date.setValue(moment());
    }
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTodolist, {
      width: '600px',
      height: 'auto',
    })
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      // if (result) {
      //   this.remove(result);
      // }
    })  
  }
}