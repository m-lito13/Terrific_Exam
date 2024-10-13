import TodoItemExt from "../models/todoitemtoget";
import TodoItem from "../models/todoitem";

export interface TodoRepositoryIfs {
    getTodos() : TodoItemExt[];
    addTodoItem(itemToAdd : TodoItem) : TodoItemExt;
    deleteToDoItem(id: number) : void;
    updateTodoItem(id: number, modifiedItem: TodoItem) : void;
};
