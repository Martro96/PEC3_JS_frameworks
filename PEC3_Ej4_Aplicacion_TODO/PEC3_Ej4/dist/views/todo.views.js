"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoView = void 0;
/**
 * @class TodoView
 *
 * Visual representation of the model.
 */
class TodoView {
    constructor() {
        // Inicializamos las propiedades con elementos del DOM
        this.app = this.getElement("#root");
        this.form = this.createElement("form");
        this.input = this.createElement("input");
        this.input.type = "text";
        this.input.placeholder = "Add todo";
        this.input.name = "todo";
        this.submitButton = this.createElement("button");
        this.submitButton.textContent = "Submit";
        this.form.append(this.input, this.submitButton);
        this.title = this.createElement("h1");
        this.title.textContent = "Todos";
        this.todoList = this.createElement("ul", "todo-list");
        this.app.append(this.title, this.form, this.todoList);
        this._temporaryTodoText = "";
        this._initLocalListeners(); // Método privado para configurar eventos internos
    }
    // Métodos privados:
    _resetInput() {
        this.input.value = "";
    }
    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className)
            element.classList.add(className);
        return element;
    }
    getElement(selector) {
        const element = document.querySelector(selector);
        if (!element)
            throw new Error(`No element found with selector: ${selector}`);
        return element;
    }
    displayTodos(todos) {
        // Eliminar todos los nodos
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild);
        }
        // Mostrar mensaje por defecto si no hay tareas
        if (todos.length === 0) {
            const p = this.createElement("p");
            p.textContent = "Nothing to do! Add a task?";
            this.todoList.append(p);
        }
        else {
            // Crear nodos
            todos.forEach((todo) => {
                const li = this.createElement("li");
                li.id = todo.id;
                const checkbox = this.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = todo.complete;
                const span = this.createElement("span");
                span.contentEditable = "true";
                span.classList.add("editable");
                if (todo.complete) {
                    const strike = this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                }
                else {
                    span.textContent = todo.text;
                }
                const deleteButton = this.createElement("button", "delete");
                deleteButton.textContent = "Delete";
                li.append(checkbox, span, deleteButton);
                // Añadir los nodos
                this.todoList.append(li);
            });
        }
    }
    _initLocalListeners() {
        this.todoList.addEventListener("input", (event) => {
            const target = event.target;
            if (target.classList.contains("editable")) {
                this._temporaryTodoText = target.innerText;
            }
        });
    }
    bindAddTodo(handler) {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (this.input.value) {
                handler(this.input.value);
                this._resetInput();
            }
        });
    }
    bindDeleteTodo(handler) {
        this.todoList.addEventListener("click", (event) => {
            var _a;
            const target = event.target;
            if (target.classList.contains("delete")) {
                const id = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id;
                if (id)
                    handler(id);
            }
        });
    }
    bindEditTodo(handler) {
        this.todoList.addEventListener("focusout", (event) => {
            var _a;
            const target = event.target;
            if (this._temporaryTodoText && ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id)) {
                const id = target.parentElement.id;
                handler(id, this._temporaryTodoText);
                this._temporaryTodoText = "";
            }
        });
    }
    bindToggleTodo(handler) {
        this.todoList.addEventListener("change", (event) => {
            var _a;
            const target = event.target;
            if (target.type === "checkbox" && ((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.id)) {
                handler(target.parentElement.id);
            }
        });
    }
}
exports.TodoView = TodoView;
