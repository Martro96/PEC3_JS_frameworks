import { Todo } from '../models/todo.model';

/**
 * @class TodoView
 *
 * Visual representation of the model.
 */

export class TodoView {
  // Declaramos los elementos del DOM que vamos a manipular y otras propiedades necesarias
  app: HTMLElement;
  form: HTMLFormElement;
  input: HTMLInputElement;
  submitButton: HTMLButtonElement;
  title: HTMLHeadingElement;
  todoList: HTMLElement;
  private _temporaryTodoText: string;

  constructor() {
    // Inicializamos las propiedades con elementos del DOM
    this.app = this.getElement("#root");
    this.form = this.createElement("form") as HTMLFormElement;
    this.input = this.createElement("input") as HTMLInputElement;
    this.input.type = "text";
    this.input.placeholder = "Add todo";
    this.input.name = "todo";
    this.submitButton = this.createElement("button") as HTMLButtonElement;
    this.submitButton.textContent = "Submit";
    this.form.append(this.input, this.submitButton);
    this.title = this.createElement("h1") as HTMLHeadingElement;
    this.title.textContent = "Todos";
    this.todoList = this.createElement("ul", "todo-list");
    this.app.append(this.title, this.form, this.todoList);

    this._temporaryTodoText = "";
    this._initLocalListeners(); // Método privado para configurar eventos internos
  }

  // Métodos privados:
  private _resetInput(): void { // Resetea el campo de texto del formulario. Se devueve void porque no se espera nada de vuelta.
    this.input.value = "";
  }

  private createElement(tag: string, className?: string): HTMLElement { // Crea un elemento del DOM con la etiqueta y clase proporcionadas.
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  private getElement(selector: string): HTMLElement { // Devuelve un elemento del DOM según el selector dado.
    const element = document.querySelector(selector);
    if (!element) throw new Error(`No element found with selector: ${selector}`);
    return element as HTMLElement;
  }

  displayTodos(todos: Todo[]): void { 
    // Eliminar todos los nodos
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Mostrar mensaje por defecto si no hay tareas
    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      // Crear nodos
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.id = todo.id;

        const checkbox = this.createElement("input") as HTMLInputElement;
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        const span = this.createElement("span");
        span.contentEditable = "true";
        span.classList.add("editable");

        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
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

  private _initLocalListeners(): void { 
    this.todoList.addEventListener("input", (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("editable")) {
        this._temporaryTodoText = target.innerText;
      }
    });
  }

  bindAddTodo(handler: (text: string) => void): void { 
    this.form.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      if (this.input.value) {
        handler(this.input.value);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler: (id: string) => void): void { 
    this.todoList.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("delete")) {
        const id = target.parentElement?.id;
        if (id) handler(id);
      }
    });
  }

  bindEditTodo(handler: (id: string, updatedText: string) => void): void { 
    this.todoList.addEventListener("focusout", (event: Event) => {
      const target = event.target as HTMLElement;
      if (this._temporaryTodoText && target.parentElement?.id) {
        const id = target.parentElement.id;
        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }

  bindToggleTodo(handler: (id: string) => void): void { 
    this.todoList.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.type === "checkbox" && target.parentElement?.id) {
        handler(target.parentElement.id);
      }
    });
  }
}
