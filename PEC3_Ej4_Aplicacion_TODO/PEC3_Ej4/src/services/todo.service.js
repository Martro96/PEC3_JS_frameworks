"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TodoService {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem("todos") || "[]");
    }
    // Estos métodos no devuelven nada, por eso tienen tipo `void`
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback;
    }
    _commit(todos) {
        this.onTodoListChanged(todos);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    addTodo(text) {
        this.todos.push(new Todo({ text }));
        this._commit(this.todos);
    }
    editTodo(id, updatedText) {
        this.todos = this.todos.map((todo) => todo.id === id
            ? new Todo(Object.assign(Object.assign({}, todo), { text: updatedText }))
            : todo);
        this._commit(this.todos);
    }
    deleteTodo(id) {
        this.todos = this.todos.filter(({ id: todoId }) => todoId !== id);
        this._commit(this.todos);
    }
    toggleTodo(id) {
        this.todos = this.todos.map((todo) => todo.id === id
            ? new Todo(Object.assign(Object.assign({}, todo), { complete: !todo.complete }))
            : todo);
        this._commit(this.todos);
    }
}
