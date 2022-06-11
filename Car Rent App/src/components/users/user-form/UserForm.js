import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { useEffect, useState } from 'react';
import { getUserById, saveUser } from '../../../utils/http-utils/user-requests';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {

    const params = useParams();

    const [user, setUser] = useState({
        isActive: false,
        name: '',
        picture: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        getUserById(params.id).then(response => {
            setUser(response.data);
        })
    }, [params.id])

    const navigate = useNavigate();

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(user).then(() =>{
            navigate('/users-list')
        })
    }

    const onInputChange = (event) =>{

        let value = event.target.value;

        if (event.target.name === 'isActive'){
            value = event.target.checked;
        }

        setUser((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return (
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={user.name} name="name" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={user.email} name="email" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture URL" value={user.picture} name="picture" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone number" value={user.phone} name="phone" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" value={user.address} name="address" onChange={onInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Active" checked={user.isActive} name="isActive" onChange={onInputChange}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}