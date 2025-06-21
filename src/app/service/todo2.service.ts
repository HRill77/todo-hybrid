import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AppState as TodoState,
  Todo,
  todoStore,
  addTodo,
  deleteTodo,
  toggleTodo,
  getTodoStats,
} from '../store/notif/todo.store';

@Injectable({
  providedIn: 'root',
})
export class Todo2Service {
  private stateSubject = new BehaviorSubject<TodoState>(todoStore.getState());
  public state$ = this.stateSubject.asObservable();

  constructor() {
    todoStore.subscribe(() => {
      this.stateSubject.next(todoStore.getState());
    });
  }

  getState(): TodoState {
    return todoStore.getState();
  }

  getState$(): Observable<TodoState> {
    return this.state$;
  }

  getAllTodos() {
    return todoStore.getState().todos;
  }

  getAllTodos$(): Observable<Todo[]> {
    return new Observable((observer) => {
      observer.next(this.getAllTodos());

      const unsubscribe = todoStore.subscribe(() => {
        observer.next(this.getAllTodos());
      });

      return () => unsubscribe();
    });
  }

  // Actions
  addTodo(todo: Todo) {
    todoStore.dispatch(addTodo(todo));
  }

  deleteTodo(id: number) {
    todoStore.dispatch(deleteTodo(id));
  }

  toggleTodo(id: number) {
    todoStore.dispatch(toggleTodo(id));
  }

  getTodoStats() {
    console.log('running...');
    todoStore.dispatch(getTodoStats());
    return todoStore.getState().todoStats;
  }
}