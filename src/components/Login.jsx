import { Box, Button, Container, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Typography, Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    //States
    const [RegisterChecked, setRegisterChecked] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPasswrod] = useState('');
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('Users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const authenticated = localStorage.getItem('isAuthenticated');
        return authenticated ? JSON.parse(authenticated) : false;
    });
    //Handlers
    const handleSubmit = (e) => {
        e.preventDefault();

        if (RegisterChecked) {
            console.log(userEmail);
            console.log(userPassword);
            if (userEmail !== '' && userPassword !== '') {
                const userData = {
                    email: userEmail,
                    password: userPassword
                };

                const updatedUsers = [...users, userData];
                setUsers(updatedUsers);
                alert('Sign Up sucessful');

                setUserEmail('');
                setUserPasswrod('');
                localStorage.setItem('isAuthenticated', JSON.stringify(true));
                navigate('/');
            } else {
                alert('Please fill all the details');
            }

        } else {
            if (userEmail !== '' && userPassword !== '') {
                const existingUser = users.find((user) => user.email === userEmail && user.password === userPassword);
                if (existingUser !== undefined) {
                    alert('Login sucessful');
                    setUserEmail('');
                    setUserPasswrod('');
                    localStorage.setItem('isAuthenticated', JSON.stringify(true));
                    navigate('/');
                } else {
                    alert('Incorrect account details');
                    setUserEmail('');
                    setUserPasswrod('');
                }
            } else {
                alert('please fill all the details');
            }
        }

    };

    useEffect(() => {
        localStorage.setItem('Users', JSON.stringify(users));
    }, [users]);

    return (
        <Container maxWidth disableGutters sx={{ backgroundColor: '#0084A8', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: { xs: '90%', sm: '60%', md: '50%', lg: '40%', xl: '30%' }, backgroundColor: '#fff', borderRadius: '10px', padding: '35px 25px' }}>
                <Typography variant='subtitle1' sx={{ fontSize: '26px', textAlign: 'center', fontWeight: 600 }}>{RegisterChecked ? 'Register' : 'Login'}</Typography>
                <FormControl fullWidth >
                    <FormLabel>Email</FormLabel>
                    <TextField
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        sx={{ fontSize: '16px', marginBottom: '17px' }} />
                    <FormLabel>Password</FormLabel>
                    <TextField
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPasswrod(e.target.value)}
                        sx={{ fontSize: '16px', marginBottom: '17px' }} />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox />}
                            label='Show password'
                            sx={{ marginBottom: '30px', marginRight: '0px', paddingLeft: '10px' }} />
                    </FormGroup>
                    <Button
                        onClick={handleSubmit}
                        sx={{ backgroundColor: '#007498', color: 'white', padding: '15px' }}>{RegisterChecked ? 'Sign Up' : 'Sign In'}</Button>
                    <Typography
                        sx={{ textAlign: 'center', marginTop: '15px' }}>
                        {RegisterChecked ? 'Already a user? ' : "Don't have an account? "}
                        <span
                            style={{ color: '#0084A8', cursor: 'pointer' }}
                            onClick={() => setRegisterChecked(!RegisterChecked)}>
                            {RegisterChecked ? "Sign in" : 'Sign up'}
                        </span>
                    </Typography>
                </FormControl>
            </Box>
        </Container >
    );
};

export default Login;
