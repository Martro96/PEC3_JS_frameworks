/**
 * @class Service
 *
 * Manages the data of the application.
 */

import { Todo } from '../models/todo.model';

export class TodoService {
  todos: Todo[]; 
  private onTodoListChanged: (todos: Todo[]) => void = () => {}; 

  constructor() {
    this.todos = (JSON.parse(localStorage.getItem("todos") || "[]") as Todo[]);
  }

// Estos métodos no devuelven nada, por eso tienen tipo `void`
bindTodoListChanged(callback: (todos: Todo[]) => void): void {
  this.onTodoListChanged = callback; // Asignamos el callback recibido
}

private _commit(todos: Todo[]): void {
  if (this.onTodoListChanged) {
    this.onTodoListChanged(todos); // Llamamos al callback si está definido
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

addTodo(todo: { text: string; completed: boolean }): void {
  this.todos.push(new Todo(todo.text, todo.completed));
  this._commit(this.todos);
}

editTodo(id: string, updatedText: string): void {
  this.todos = this.todos.map((todo) =>
    todo.id === id
      ? new Todo(updatedText, todo.complete) // Crear un nuevo Todo con el texto actualizado
      : todo // Dejar el resto de los todos sin cambios
  );
  this._commit(this.todos); // Actualizar el almacenamiento local y la vista
}

deleteTodo(id: string): void {
  this.todos = this.todos.filter(({ id: todoId }) => todoId !== id);
  this._commit(this.todos);
}

toggleTodo(id: string): void {
  this.todos = this.todos.map((todo) =>
    todo.id === id
      ? new Todo(todo.text, !todo.complete) // Alternamos el estado del "complete"
      : todo
  );
  this._commit(this.todos);
}
}