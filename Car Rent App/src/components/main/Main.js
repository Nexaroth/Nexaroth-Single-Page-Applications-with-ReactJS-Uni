import { Route, Routes } from "react-router-dom";
import { RentForm } from "../rents/rent-form/RentForm";
import { RentsList } from "../rents/rents-list/RentsList";
import { UserForm } from "../users/user-form/UserForm";
import { User } from "../users/user/User";
import { UsersList } from "../users/users-list/UsersList";

export function Main(){

    return(
        <div className="main-content">
            <Routes>
                <Route path="/users-list" element={<UsersList />}/>
                <Route path="/user/:id" element={<User />} />
                <Route path="/user/create" element={<UserForm />}/>
                <Route path="/user/edit/:id" element={<UserForm />}/>
                <Route path="/rents-list" element={<RentsList/>}/>
                <Route path="/rent/create" element={<RentForm/>}/> 
                <Route path="/rent/edit/:id" element={<RentForm />}/>
            </Routes>

        </div>
    );
}