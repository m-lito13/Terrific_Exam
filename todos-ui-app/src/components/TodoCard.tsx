import { Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { KeyboardEvent, ReactNode, useState } from "react";
import { TodoComponentProps } from "./TodoProps";
import { Status, StatusKey } from "../constants/statusconstants";
import { TodoApiItem } from "../services/todoapiitem";

function TodoCard(props: TodoComponentProps) {
    const [readOnlyState, setReadOnlyState] = useState(true);
    const [todoText, setTodoText] = useState(props.text);

    const editHandle = () => {
        console.log('edit');
        setReadOnlyState(false);
    }

    const keyPressHandle = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            let updatedTodoItem: TodoApiItem = { id: props.id, status: props.status, text: todoText };
            setReadOnlyState(true);
            if (props.handlers.editHandler) {
                props.handlers.editHandler(updatedTodoItem);
            }
        }
    }

    const editChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTodoText(event.target.value);
    }

    const deleteHandle = () => {
        if (props.handlers.deleteHandler) {
            props.handlers.deleteHandler(props.id);
        }
    }

    function statusChangedHandler(event: SelectChangeEvent<string>, child: ReactNode): void {
        console.log('changed combo Value : ' + event.target.value);
        let updatedTodoItem: TodoApiItem = { id: props.id, status: event.target.value, text: props.text };
        if (props.handlers.editHandler) {
            props.handlers.editHandler(updatedTodoItem);
        }
    }

    return (
        <>
            <Card variant='outlined' sx={{ display: 'flex', flexDirection: 'column', m: 2, justifyContent: 'flex-start' }} >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <TextField slotProps={{
                        input: {
                            readOnly: readOnlyState,
                        },
                    }}
                        multiline
                        maxRows={4}
                        onChange={editChangeHandler}
                        onKeyDown={keyPressHandle}
                        defaultValue={props.text}
                        style={{ padding: '5%', width : '90%'}}>

                    </TextField>
                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            defaultValue={Status[props.status.toLocaleUpperCase() as StatusKey].id}
                            label="Status"
                            onChange={statusChangedHandler}
                        >
                            {Object.keys(Status).map((key) =>
                                <MenuItem value={key}>{Status[key as StatusKey].displayName}
                                </MenuItem>)}
                        </Select>
                    </FormControl>
                </CardContent>

                <CardActions>
                    <Button size="small" onClick={() => editHandle()}>
                        Edit Text
                    </Button>
                    <Button size="small" onClick={() => deleteHandle()}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </>
    )
};

export default TodoCard;