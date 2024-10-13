import { before, DELETE, GET, POST, PUT, route } from "awilix-express";
import { Request, Response } from "express";
import { TodoServiceIfs } from "../services/todoserviceIfs";
import bodyParser from 'body-parser';
import TodoItem from "../models/todoitem";
import { RequestValidatorIfs } from "../services/requestvalidatorIfs";



@route('/api/todos')
export class TodoController {
    private todoService : TodoServiceIfs;
    private requestValidator : RequestValidatorIfs
    constructor(todoService: TodoServiceIfs , requestValidator : RequestValidatorIfs) {
        this.todoService = todoService;
        this.requestValidator = requestValidator;
    }
   
    @GET()
    getTodos(req: Request, res: Response) {
        console.log('env '+process.env.NODE_ENV);
        return res.status(200).json({ data: this.todoService.getAllTodos(), status: 200 });
    }

    @route('/:id')
    @DELETE()
    deleteTodo(req: Request, res: Response) {
        let id: number = Number(req.params.id);
        this.todoService.removeToDo(id);
        return res.status(200).json({ message: `deleted ${id} successfully`, status: 200 });
    }

    @POST()
    addTodo(req: Request, res: Response) {
        this.requestValidator.validateAddRequest(req);
        let todoToAdd = req.body as TodoItem;
        let createdItem = this.todoService.addToDo(todoToAdd);
        return res.status(200).json({ data : createdItem, status: 200 });
    }

    @route('/:id')
    @PUT()
    modifyTodo(req: Request, res: Response) {
        this.requestValidator.validateModifyRequest(req);
        let id: number = Number(req.params.id);
        let itemToModify = req.body as TodoItem;
        this.todoService.updateToDo(id, itemToModify);
        return res.status(200).json({ message: `changed ${id} successfully`, status: 200 });
    }
}

