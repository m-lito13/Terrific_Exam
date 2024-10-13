import TodoItemExt from "../../models/todoitemtoget";
import TodoItem from "../../models/todoitem";
import { TodoRepositoryIfs } from "../todorepositoryIfs";
import { TodoServiceIfs } from "../todoserviceIfs";

class TodoService implements TodoServiceIfs {
    private todoRepository: TodoRepositoryIfs;
    constructor(todoRepository: TodoRepositoryIfs) {
        this.todoRepository = todoRepository;
    }
    addToDo(itemToAdd : TodoItem): TodoItemExt {
        return this.todoRepository.addTodoItem(itemToAdd); 
    }
    removeToDo(id: number): void {
        this.todoRepository.deleteToDoItem(id);
    }
    updateToDo(id: number, modifiedItem: TodoItem): void {
        this.todoRepository.updateTodoItem(id, modifiedItem);
    }
    getAllTodos(): TodoItemExt[] {
        return this.todoRepository.getTodos();
    }
}

export default TodoService;