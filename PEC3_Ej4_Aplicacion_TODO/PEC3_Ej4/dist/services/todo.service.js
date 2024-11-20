"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const todo_model_1 = require("../models/todo.model");
class TodoService {
    constructor() {
        this.onTodoListChanged = () => { };
        this.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }
    // Estos métodos no devuelven nada, por eso tienen tipo `void`
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback; // Asignamos el callback recibido
    }
    _commit(todos) {
        if (this.onTodoListChanged) {
            this.onTodoListChanged(todos); // Llamamos al callback si está definido
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    addTodo(todo) {
        this.todos.push(new todo_model_1.Todo(todo.text, todo.completed));
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => todo.id === id
            ? new todo_model_1.Todo(updatedText, todo.complete) // Crear un nuevo Todo con el texto actualizado
            : todo // Dejar el resto de los todos sin cambios
        );
        this._commit(this.todos); // Actualizar el almacenamiento local y la vista
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(({ id: todoId }) => todoId !== id);
        this._commit(this.todos);
    }
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id
            ? new todo_model_1.Todo(todo.text, !todo.complete) // Alternamos el estado del "complete"
            : todo);
        this._commit(this.todos);
    }
}
exports.TodoService = TodoService;
