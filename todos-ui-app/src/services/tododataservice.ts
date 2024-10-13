import { TodoApiItem } from "./todoapiitem";
import { TodoApiItemBase } from "./todoapiitembase";

const BASE_URL = `${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api`;

export class TodoDataService {
    constructor() {
        console.log('from env: '+process.env.REACT_APP_API_KEY) ;
    }
    async getAllItems(): Promise<TodoApiItem[]> {
        try {
            let fullPath: string = `${BASE_URL}/todos`;
            let response = await fetch(fullPath);
            let jsonData = await response.json();
            let result = JSON.parse(JSON.stringify(jsonData));
            return result;
        }
        catch (err) {
            console.log('Error getting todo items');
            throw err;
        }
    }

    async deleteTodoItem(id: number): Promise<any> {
        try {
            let fullPath: string = `${BASE_URL}/todos/${id}`;
            let response = await fetch(fullPath, {
                method: 'DELETE', 
                headers: { 
                    'Content-type': 'application/json'
                } 
            });
            let jsonData = await response.json();
            let result = JSON.parse(JSON.stringify(jsonData));
            console.log(`delete result : ${result}`);
            return result;
        }
        catch(err) { 
            console.log(`Error while delete: ${err}`);
            throw err;
        }

    }

    async updateTodoItem(itemToUpdate : TodoApiItem): Promise<any> {
        try {
            let fullPath: string = `${BASE_URL}/todos/${itemToUpdate.id}`;
            let response = await fetch(fullPath, {
                method: 'PUT', 
                headers: { 
                    'Content-type': 'application/json'
                }, 
                body : JSON.stringify({text : itemToUpdate.text, status : itemToUpdate.status})
            });
            let jsonData = await response.json();
            let result = JSON.parse(JSON.stringify(jsonData));
            console.log(`update result : ${result}`);
            return result;
        }
        catch(err) { 
            console.log(`Error while delete: ${err}`);
            throw err;
        }
    }

    async addTodoItem(itemAdd : TodoApiItemBase): Promise<TodoApiItem> {
        try {
            let fullPath: string = `${BASE_URL}/todos`;
            let response = await fetch(fullPath, {
                method: 'POST', 
                headers: { 
                    'Content-type': 'application/json'
                }, 
                body : JSON.stringify({text : itemAdd.text, status : itemAdd.status})
            });
            let jsonData = await response.json();
            let result = JSON.parse(JSON.stringify(jsonData));
            return result;
        }
        catch(err) { 
            console.log(`Error while delete: ${err}`);
            throw err;
        }

    }

}