import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import {Layout} from './components/layout/Layout';
import { RentForm } from './components/rents/rent-form/RentForm';
import { RentsList } from './components/rents/rents-list/RentsList';
import { UserForm } from './components/users/user-form/UserForm';
import { User } from './components/users/user/User';
import { UsersList } from './components/users/users-list/UsersList';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { NonAuthenticatedGuard } from './utils/guards/NonAuthenticatedGuard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/register' element={<NonAuthenticatedGuard><Register/></NonAuthenticatedGuard>}/>

        <Route path="/login" element={<NonAuthenticatedGuard><Login /></NonAuthenticatedGuard>}/>

        <Route exact path='/' element={<AuthenticatedRoute><Layout/></AuthenticatedRoute>}>
                <Route path="/users-list" element={<UsersList />}/>
                <Route path="/user/:id" element={<User />} />
                <Route path="/user/create" element={<UserForm />}/>
                <Route path="/user/edit/:id" element={<UserForm />}/>

                <Route path="/rents-list" element={<RentsList />}/>  
                <Route path="/rent/create" element={<RentForm />}/>  
                <Route path="/rent/edit/:id" element={<RentForm />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
