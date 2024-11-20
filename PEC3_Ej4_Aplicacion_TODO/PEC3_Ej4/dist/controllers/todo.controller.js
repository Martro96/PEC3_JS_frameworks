"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
class TodoController {
    constructor(service, view) {
        this.onTodoListChanged = (todos) => {
            this.view.displayTodos(todos);
        };
        this.handleAddTodo = (todoText) => {
            this.service.addTodo({ text: todoText, completed: false });
        };
        this.handleEditTodo = (id, todoText) => {
            this.service.editTodo(id, todoText);
        };
        this.handleDeleteTodo = (id) => {
            this.service.deleteTodo(id);
        };
        this.handleToggleTodo = (id) => {
            this.service.toggleTodo(id); // Cambiar handleToggleTodo por toggleTodo
        };
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
}
exports.TodoController = TodoController;
