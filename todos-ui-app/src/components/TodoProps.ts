import { TodoApiItem } from "../services/todoapiitem";

export interface TodoComponentProps {
    text: string;
    status: string;
    id: number;
    handlers: TodoHandlers;
};

export interface TodoHandlers {
    deleteHandler?: (id: number) => void;
    editHandler?: (itemToEdit : TodoApiItem) => void;
};

