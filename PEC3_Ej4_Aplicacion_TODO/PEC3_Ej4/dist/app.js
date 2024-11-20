"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_controller_1 = require("./controllers/todo.controller");
const todo_service_1 = require("./services/todo.service");
const todo_views_1 = require("./views/todo.views");
// Instanciamos clases
const service = new todo_service_1.TodoService();
const view = new todo_views_1.TodoView();
const controller = new todo_controller_1.TodoController(service, view);
