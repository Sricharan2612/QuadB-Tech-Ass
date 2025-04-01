import React, { useEffect } from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { todosAction } from '../Redux/Actions/todosAction';
import axios from 'axios';

const TaskList = ({ todosData, setTodosData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todosAction());
    }, []);

    const handleDelete = async (id) => {
        const modifiedData = todosData.filter((todo) => todo.id !== id);
        console.log(modifiedData);
        try {
            const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
            alert('Task deleted sucessfully');
            setTodosData([...modifiedData]);
        }
        catch (error) {
            alert(error.message);
        }
    };

    return (
        <Box sx={{ width: '70%' }}>
            <Typography variant='h4' sx={{ fontWeight: 600, textTransform: 'capitalize', marginBottom: '10px', display: 'block', color: '#003459' }}>
                Task list
            </Typography>
            <TableContainer>
                <Table sx={{ borderRadius: '10px', overflow: 'hidden' }}>
                    <TableHead sx={{ background: '#003459' }}>
                        <TableRow>
                            {
                                ['Id', 'Title', 'Action'].map((heading, i) => (
                                    <TableCell
                                        sx={{ fontSize: '17px', fontWeight: '600', color: '#fff' }}
                                        key={i}
                                        align='center'>
                                        {heading}
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            todosData?.map((todo, i) => (
                                <TableRow key={i} sx={{
                                    background: '#efeeee', borderRadius: '10px', cursor: 'pointer', '&:hover': {
                                        backgroundColor: '#b0bcc55b'
                                    },
                                }}>
                                    <TableCell
                                        align='center'
                                        sx={{ fontSize: '16px', fontWeight: 600 }}>
                                        {todo.id}.
                                    </TableCell>
                                    <TableCell
                                        sx={{ fontSize: '16px', fontWeight: 600, textTransform: 'capitalize' }}
                                        align='center'>
                                        {todo.title}
                                    </TableCell>
                                    <TableCell
                                        onClick={() => handleDelete(todo.id)}
                                        align='center'>
                                        <DeleteIcon sx={{ color: '#b3131bd5' }} />
                                    </TableCell>
                                </TableRow  >
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default TaskList;