import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import Grid from "@mui/material/Grid2";
import { TodoApiItem } from "../services/todoapiitem";
import { TodoDataService } from "../services/tododataservice";
import { TodoHandlers } from "./TodoProps";
import { Button } from "@mui/material";
import { Status } from "../constants/statusconstants";
import { TodoApiItemBase } from "../services/todoapiitembase";

function ToDoContainer() {
    let todoDataService: TodoDataService = new TodoDataService();

    //TODO - add handling of local-storage
    const [dataFromAPI, setDataFromApi] = useState<TodoApiItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const respData: any = await todoDataService.getAllItems();
                console.log(respData);
                setDataFromApi(respData['data']);
                console.log(dataFromAPI);
            }
            catch (err) {
                alert('Cannot get items from API');   
            }

        }
        fetchData();
        console.log('fetched');
    }, []);

    let deleteItemHandler = async function (id: number) {
        console.log('common delete handler');
        try {
            await todoDataService.deleteTodoItem(id);
            console.log(`item ${id} deleted OK`);
            let updatedCollection = dataFromAPI.filter(item => item.id !== id);
            setDataFromApi(updatedCollection);
        }
        catch (err) {
            alert('Cannot delete item');
        }
    }

    let editItemHandler = async function (itemToEdit: TodoApiItem) {
        try {
            await todoDataService.updateTodoItem(itemToEdit);
            console.log(`item ${itemToEdit.id} updatded OK`);
            let collectionToUpdate = dataFromAPI.map(obj => {
                if (obj.id === itemToEdit.id) {
                    return { ...obj, status: itemToEdit.status, text: itemToEdit.text };
                }
                return obj;
            });
            setDataFromApi(collectionToUpdate);
        }
        catch (err) {
            alert(`Cannot edit item ${itemToEdit.id} ${err}`);
        }
    }

    let addNewItemHandler = async function () {
        let newTodoItem: TodoApiItemBase = { status: Status.NEW.id, text: 'new' };
        try {
            let respData: any = await todoDataService.addTodoItem(newTodoItem);
            let addedItem = respData['data'];
            let updatedCollection = [...dataFromAPI, addedItem];
            setDataFromApi(updatedCollection);
            alert('New item added');
        }
        catch (err) {
            alert(`Cannot add new item ${err}`);
        }
    }

    let todoHandlers: TodoHandlers = {
        deleteHandler: deleteItemHandler,
        editHandler: editItemHandler,
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={11}>
                    <h2>Tasks To Do</h2>
                </Grid>
                <Grid size={2}>
                    <Button variant="contained" onClick={() => addNewItemHandler()}>Add New</Button>
                </Grid>
                <Grid size={3}>
                    <h3>New</h3>
                    <div>
                        {dataFromAPI.filter(item => item.status.toUpperCase() === 'NEW')
                            .map(item => <TodoCard key={item.id} id={item.id} text={item.text} status={item.status} handlers={todoHandlers}></TodoCard>)}
                    </div>
                </Grid>
                <Grid size={3}>
                    <h3>In Progress</h3>
                    <div>
                        {dataFromAPI.filter(item => item.status.toUpperCase() === 'INPROCESS')
                            .map(item => <TodoCard key={item.id} id={item.id} text={item.text} status={item.status} handlers={todoHandlers}></TodoCard>)}
                    </div>
                </Grid>
                <Grid size={3}>
                    <h3>Done</h3>
                    <div>
                        {dataFromAPI.filter(item => item.status.toUpperCase() === 'DONE')
                            .map(item => <TodoCard key={item.id} id={item.id} text={item.text} status={item.status} handlers={todoHandlers}></TodoCard>)}
                    </div>
                </Grid>
            </Grid>
        </>

    )
}

export default ToDoContainer;