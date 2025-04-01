import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { Box, Button, Typography } from '@mui/material';
import { todosAction } from '../Redux/Actions/todosAction';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    //Redux
    const dispatch = useDispatch();
    const { todos } = useSelector((state) => state.todoData);
    //States
    const [toggle, setToggle] = useState(false);
    const [todosData, setTodosData] = useState();

    const navigate = useNavigate();

    //Handlers
    const handleLogout = () => {
        localStorage.setItem('isAuthenticated', JSON.stringify(false));
        navigate('/login');
    };
    //UseEffect
    useEffect(() => {
        dispatch(todosAction());
    }, []);

    useEffect(() => {
        setTodosData(todos);
    }, [todos]);
    return (
        <div className='home' style={{ background: '#bde0fe', padding: '20px 20px', overflowY: toggle ? 'hidden' : 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                <Button
                    onClick={handleLogout}
                    sx={{ background: '#003459', color: '#fff', padding: '12px 20px', borderRadius: '10px', position: 'static', top: '20px', right: '40px' }}>
                    Logout
                </Button>
            </div>
            <TaskList
                todosData={todosData}
                setTodosData={setTodosData} />
            {toggle && <TaskInput
                setToggle={setToggle}
                todosData={todosData}
                setTodosData={setTodosData} />}

            <Button
                sx={{ backgroundColor: '#003459', color: '#fff', marginTop: '20px', padding: '12px 20px', borderRadius: '10px' }}
                onClick={() => setToggle(true)}>
                Add task
            </Button>
        </div>
    );
};

export default Home;
