import { asClass, createContainer } from "awilix";
import { scopePerRequest } from "awilix-express";
import { Application } from "express";
import TodoService  from "./services/impl/todoservice";
import TodoFileRepository from "./services/impl/todofilerepository";
import { RequestValidator } from "./services/impl/requestValidator";
export const loadContainer = (app: Application) => {
    const Container = createContainer({
        injectionMode: 'CLASSIC'
    });
    Container.register({
        todoService: asClass(TodoService).singleton(),
        todoRepository: asClass(TodoFileRepository).singleton(),
        requestValidator : asClass(RequestValidator).singleton()
    });
    app.use(scopePerRequest(Container));
}