import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { getLoggedUser } from "../../../utils/http-utils/user-requests";
import { useNavigate} from 'react-router-dom';


export function RentCard( {rent, onRentDelete} ){
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    
    const navigateToEdit = () => {
        navigate(`/rent/edit/${rent.id}`);
    }

    return(
        <div className="rent-card-wrapper">
            <Card style={{ width: '18rem' }}>
             <Card.Body>
                <Card.Title>{rent.title}</Card.Title>

                <Card.Text>
                    <span className="key">Model: </span>
                    <span className="value">{rent.description}</span>
                </Card.Text>

                <Card.Text>
                    <span className="key">Customer: </span>
                    <span className="value">{rent.customerName}</span>
                </Card.Text>

                <Card.Text>
                    <span className="key">Model Year: </span>
                    <span className="value">{rent.year}</span>
                </Card.Text>

                <Card.Text>
                    <span className="key">Vehicle: </span>
                    <span className="value">{rent.type}</span>
                </Card.Text>

                <Card.Text>
                    <span className="key">Fuel: </span>
                    <span className="value">{rent.fuelType}</span>
                </Card.Text>

                <Card.Text>
                    <span className="key">Number of Seats: </span>
                    <span className="value">{rent.numberOfSeats}</span>
                </Card.Text>

                <Card.Text>
                    <span className="key">Status: </span>
                    <span className="value">{rent.status}</span>
                 </Card.Text>

                 <Card.Text>
                    <span className="key">Rented on: </span>
                    <span className="value">{rent.createdDate}</span>
                 </Card.Text>

                 <Card.Text>
                    <span className="key">Due: </span>
                    <span className="value">{rent.dueDate}</span>
                 </Card.Text>
                 
                 <div className="btn-holder">
                    { loggedUser && loggedUser.id === rent.customerId && <Button variant="primary" onClick={navigateToEdit}> Edit</Button>}
                    { loggedUser && loggedUser.id === rent.customerId && <Button variant="danger" onClick={()=> onRentDelete(rent.id)}> Delete</Button>}
                 </div>
                 
            </Card.Body>
        </Card>
        </div>
    );
}