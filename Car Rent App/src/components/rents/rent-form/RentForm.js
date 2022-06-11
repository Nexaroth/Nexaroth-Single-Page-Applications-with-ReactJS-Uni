import { useEffect, useState } from "react";
import { getRentById, RentBrand, RentCarFuel, RentCarSeats, RentCarType, RentModelMazda, RentModelNissan, RentModelSubaru, RentModelToyota, RentStatus, saveRent } from "../../../utils/http-utils/rent-requests";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import "./RentForm.scss";

export function RentForm(){

    const navigate = useNavigate();

    const params = useParams();

    const [rent, setRent] = useState({
        title: '',
        description: '',
        year: '',
        dueDate: '',
        status: ''
    });

    const onRentSubmit = (event) => {
        event.preventDefault();

        saveRent(rent).then(() =>{
            navigate(`/rents-list`);
        });
    }

    const onInputChange = (event) =>{
        setRent((prevState)=>({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    useEffect(()=>{
        if(params.id){
            getRentById(params.id).then((response) => {
                setRent(response.data);
            })
        }
    }, [params.id]);

    

    return (
        <div className="rent-form-wrapper">
            <Form onSubmit={onRentSubmit}>
                
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Brand</Form.Label>
                    <Form.Select placeholder="Enter Brand" value={rent.title} name="title" onChange={onInputChange}>
                        { Object.keys(RentBrand).map(title => <option key={title} value={RentBrand[title]}>{RentBrand[title]}</option>)}
                    </Form.Select>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Model</Form.Label>
                   {rent.title === "Mazda" ? (<Form.Select placeholder="Enter Model" value={rent.description} name="description" onChange={onInputChange}>
                        { Object.keys(RentModelMazda).map(description => <option key={description} value={RentModelMazda[description]}>{RentModelMazda[description]}</option>)}
                    </Form.Select>) 
                    :
                    rent.title === "Subaru" ? (<Form.Select placeholder="Enter Model" value={rent.description} name="description" onChange={onInputChange}>
                    { Object.keys(RentModelSubaru).map(description => <option key={description} value={RentModelSubaru[description]}>{RentModelSubaru[description]}</option>)}
                    </Form.Select>) 
                    :
                    rent.title === "Nissan" ? (<Form.Select placeholder="Enter Model" value={rent.description} name="description" onChange={onInputChange}>
                    { Object.keys(RentModelNissan).map(description => <option key={description} value={RentModelNissan[description]}>{RentModelNissan[description]}</option>)}
                    </Form.Select>) 
                    :
                    rent.title === "Toyota" ? (<Form.Select placeholder="Enter Model" value={rent.description} name="description" onChange={onInputChange}>
                    { Object.keys(RentModelToyota).map(description => <option key={description} value={RentModelToyota[description]}>{RentModelToyota[description]}</option>)}
                    </Form.Select>)
                    :
                    <Form.Select placeholder="Enter Model" value={rent.description} name="description" onChange={onInputChange}>
                    { Object.keys(RentModelMazda).map(description => <option key={description} value={RentModelMazda[description]}>{RentModelMazda[description]}</option>)}
                    </Form.Select>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Model Year</Form.Label>
                    <Form.Control type="date" placeholder="Enter Model Year" value={rent.year} name="year" onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Vehicle Type</Form.Label>
                    <Form.Select placeholder="Enter Type" value={rent.type} name="type" onChange={onInputChange}>
                        { Object.keys(RentCarType).map(type => <option key={type} value={RentCarType[type]}>{RentCarType[type]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Fuel</Form.Label>
                    <Form.Select placeholder="Enter Fuel" value={rent.fuelType} name="fuelType" onChange={onInputChange}>
                        { Object.keys(RentCarFuel).map(fuelType => <option key={fuelType} value={RentCarFuel[fuelType]}>{RentCarFuel[fuelType]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Fuel</Form.Label>
                    <Form.Select placeholder="Enter Number of seats" value={rent.numberOfSeats} name="numberOfSeats" onChange={onInputChange}>
                        { Object.keys(RentCarSeats).map(numberOfSeats => <option key={numberOfSeats} value={RentCarSeats[numberOfSeats]}>{RentCarSeats[numberOfSeats]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter Due date" value={rent.dueDate} name="dueDate" onChange={onInputChange}/>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Status</Form.Label>
                    <Form.Select placeholder="Enter Status" value={rent.status} name="status" onChange={onInputChange}>
                        { Object.keys(RentStatus).map(status => <option key={status} value={RentStatus[status]}>{RentStatus[status]}</option>)}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit"> {rent.id ? 'Edit rent' : 'Rent car'} </Button>
            </Form>
        </div>
    );
}