import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const TaskInput = ({ setToggle, todosData, setTodosData }) => {
    const { todos } = useSelector((state) => state.todoData);
    const [taskName, setTaskName] = useState('');
    const [prority, setPriority] = useState(null);
    const [updatedTodoList, setUpdatedTodoList] = useState([]);


    const handlePostData = async (e) => {
        e.preventDefault();
        const nextId = todosData.length > 0 ? Math.max(...todosData.map(todo => todo.id)) + 1 : 1;
        const newTask = {
            id: nextId,
            title: taskName,
            completed: false
        };

        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { newTask },
                {
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }
            );
            alert('Task Added Sucessfully');
            setTodosData((prev) => [...prev, newTask]);
            setToggle(false);
            setTaskName('');
            setPriority('');

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div
            onClick={(e) => { setToggle(false), e.stopPropagation(); }}
            style={{
                backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center ', position: 'fixed', width: '100%', height: '100vh', top: 0
            }}>
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: '30%', backgroundColor: '#fff', borderRadius: '10px', padding: '45px 25px', display: 'flex', flexDirection: 'column', boxShadow: '2px 2px 20px rgba(0,0,0,0.5)' }
            } >
                <TextField
                    onChange={(e) => setTaskName(e.target.value)}
                    value={taskName}
                    label='Add task'
                    sx={{ width: '100%', fontSize: '24px', marginBottom: '20px', "& .MuiInputLabel-root": { fontSize: "16px" }, "& .MuiInputBase-input": { fontSize: "16px" }, }} />
                <FormControl>
                    <FormLabel>Prirority</FormLabel>
                    <RadioGroup value={prority} onChange={(e) => setPriority(e.target.value)}>
                        <FormControlLabel value='high' label='High' control={<Radio />} />
                        <FormControlLabel value='medium' label='Medium' control={<Radio />} />
                        <FormControlLabel value='low' label='low' control={<Radio />} />
                    </RadioGroup>
                </FormControl>
                <Button onClick={handlePostData} sx={{ backgroundColor: 'blue', color: 'white', padding: '10px 25px', marginTop: '20px' }}>Submit</Button>
            </Box >

        </div >
    );
};

export default TaskInput;
