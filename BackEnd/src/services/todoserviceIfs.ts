import TodoItemExt from "../models/todoitemtoget";
import TodoItem from "../models/todoitem";

export interface TodoServiceIfs {
    getAllTodos(): TodoItemExt[];
    addToDo(itemToAdd: TodoItem): TodoItemExt;
    removeToDo(id: number): void;
    updateToDo(id: number, modifiedItem: TodoItem): void;
};