import { TodoRepositoryIfs } from "../todorepositoryIfs";
import path from 'path';
import fs from 'fs';
import TodoItemExt from "../../models/todoitemtoget";
import TodoItem from "../../models/todoitem";
class TodoFileRepository implements TodoRepositoryIfs {
    private data: TodoItemExt[] = [];
    constructor() {
        this.fillDataFromFile();
    }

    getTodos(): TodoItemExt[] {
        console.log('current : ' + this.data);
        return this.data;
    };

    addTodoItem(itemToAdd: TodoItem): TodoItemExt {
        let maxId = Math.max(...this.data.map(item => item.id), 0);
        let createdItem : TodoItemExt = {
            id: maxId + 1,
            text: itemToAdd.text,
            status: itemToAdd.status
        };
        this.data.push(createdItem);
        this.updateFile();
        return createdItem;
    };

    deleteToDoItem(id: number): void {
        let indexToDeete = this.data.findIndex(item => item.id === id);
        if (indexToDeete < 0) {
            throw Error(`Todo item with ${id} was not found`);
        }
        this.data.splice(indexToDeete, 1);
        this.updateFile();
    };

    updateTodoItem(id: number, modifiedItem: TodoItem): void {
        let indexToUpdate = this.data.findIndex(item => item.id === id);
        if (indexToUpdate < 0) {
            throw Error(`Todo item with ${id} was not found`);
        }

        if (modifiedItem.status) {
            this.data[indexToUpdate].status = modifiedItem.status;
        }
        if (modifiedItem.text) {
            this.data[indexToUpdate].text = modifiedItem.text;
        }

        this.updateFile();
    }

    private fillDataFromFile(): void {
        let fullFilePath = path.join(__dirname, '../../data', 'todo_data.json');
        let fileData = fs.readFileSync(fullFilePath, { encoding: 'utf-8' });
        this.data = JSON.parse(fileData);
    }

    private updateFile(): void {
        let fullFilePath = path.join(__dirname, '../../data', 'todo_data.json');
        fs.writeFile(
            fullFilePath,
            JSON.stringify(this.data),
            err => {
                // Checking for errors 
                if (err) {
                    throw err;
                }
                // Success 
                console.log("Done writing");
            });
    }
}

export default TodoFileRepository;


