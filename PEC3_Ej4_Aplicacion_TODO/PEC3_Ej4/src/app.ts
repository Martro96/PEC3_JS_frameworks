import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { TodoView } from './views/todo.views';

// Instanciamos clases
const service = new TodoService();
const view = new TodoView();
const controller = new TodoController(service, view);