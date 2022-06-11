import axios from "axios";
import { getLoggedUser } from "./user-requests";


export const RentStatus = {
    NEW: 'New',
    IN_PROGRESS: 'In Progress',
    IN_REVIEW: 'In Review',
    DONE: 'Done'
}

export const RentBrand = {
    MAZDA: 'Mazda',
    SUBARU: 'Subaru',
    NISSAN: 'Nissan',
    TOYOTA: 'Toyota'
}

export const RentModelMazda = {
    THREE: '3',
    SIX: '6',
    CX3: 'CX-3',
    MX5: 'MX-5'
}

export const RentModelSubaru = {
    IMPREZA: 'Impreza',
    LEGACY: 'Legacy',
    FORESTER: 'Forester',
    BRZ: 'BRZ'
}

export const RentModelNissan = {
    Z370: '370Z',
    JUKE: 'Juke',
    SKYLINE: 'Skyline R34',
    SX200: '200SX'
}

export const RentModelToyota = {
    SUPRA: 'Supra',
    MR2: 'MR-2',
    CELICA: 'Celica',
    COROLLA: 'Corolla'
}

export const RentCarSeats = {
    TWOSEATER: '2',
    FOURSEATER: '4'
}

export const RentCarFuel ={
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
    HYBRID: 'Hybrid',
    ELECTRIC: 'Electric'
}

export const RentCarType ={
    ESTATE: 'Estate',
    ECONOMY: 'Ecnomy',
    SUV: 'SUV',
    LUXURY: 'Luxury',
    CARGO: 'Cargo'
}

const apiUrl = 'http://localhost:3003/rents';

export function getAllRents() {
    return axios.get(apiUrl);
}

export function getAllRentsForCustomer(customerId) {
    return axios.get(`${apiUrl}?customerId=${customerId}`);
}

export function getRentById(rentId){
    return axios.get(`${apiUrl}/${rentId}`);
}

export function saveRent(rent){
    if(!rent.id){
        const loggedUser = getLoggedUser();

        rent.customerId = loggedUser.id;
        rent.customerName = loggedUser.name;
        rent.createdDate = new Date().toDateString();
        rent.dueDate = new Date(rent.dueDate).toDateString();
        return axios.post(apiUrl, rent)
    }

    rent.createdDate = new Date(rent.createdDate).toDateString();
    rent.dueDate = new Date(rent.dueDate).toDateString();
    return axios.put(`${apiUrl}/${rent.id}`, rent);
}

export function deleteRent(id){
    return axios.delete(`${apiUrl}/${id}`);
}