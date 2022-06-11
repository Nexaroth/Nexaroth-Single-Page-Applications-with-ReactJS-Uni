import Form  from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { loginUser } from "../../../utils/http-utils/user-requests";
import { useNavigate } from 'react-router-dom';

export function Login(){

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const onInputChange = (event) =>{

        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });

        setError('');
    }
     

    const onFormSubmit = (event) => {
        event.preventDefault();

        loginUser(user).then(() => {
            navigate('/users-list');
        })
        .catch(error => setError(error.message))
        
    }

    return (
        <div className="user-form-wrapper">
        <Form onSubmit={onFormSubmit}>

                {error && <span className='text-danger'>{error}</span>}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={user.email} name="email" onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={user.password} name="password" onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
        </Form>
        </div>
    );
}