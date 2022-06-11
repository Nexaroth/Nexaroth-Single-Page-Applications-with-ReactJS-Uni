import { useEffect, useState } from "react";
import { deleteRent, getAllRents } from "../../../utils/http-utils/rent-requests";
import { RentCard } from "../rents-card/RentCard";
import "./RentsList.scss";

export function RentsList() {

    const [rents, setRents] = useState([]);

    useEffect(() => {
        getAllRents().then(response => {
            setRents(response.data);
        });
    }, [])

    const onDeleteHandler = (id) =>{
        deleteRent(id).then(() =>{
            setRents((prevState)=>{
                return prevState.filter(rent=> !rent.id !== id);
            })
        })
    }

    return (
        <div className="rents-list-wrapper">
            { rents.map(rent => <RentCard key={rent.id} rent={rent} onRentDelete={onDeleteHandler}/>) }
        </div>
    );
}