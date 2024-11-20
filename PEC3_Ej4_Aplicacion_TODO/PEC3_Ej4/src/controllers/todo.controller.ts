/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 * 
 * Esto lo modificamos por el import siguiente ya que le TypeScript validará los datos y tipos automáticamente
 */

import {TodoService} from '../services/todo.service';
import {TodoView} from '../views/todo.views';
import { Todo } from '../models/todo.model';


export class TodoController {
  private service: TodoService;
  private view: TodoView;
  
  constructor(service: TodoService, view: TodoView) {
    this.service = service;
    this.view = view;
  
    // Esto lo dejo igual
    this.service.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);

    this.onTodoListChanged(this.service.todos);
  }

  onTodoListChanged = (todos: Todo[]) => {
    this.view.displayTodos(todos);
  }
  handleAddTodo = (todoText: string) => {
    this.service.addTodo({ text: todoText, completed: false });
  };

  handleEditTodo = (id: string, todoText: string) => {
    this.service.editTodo(id, todoText);
  }
  handleDeleteTodo = (id: string) => {
    this.service.deleteTodo(id);
  }
  handleToggleTodo = (id: string) => {
    this.service.toggleTodo(id); 
};
  
}
