import axios from "axios";

const apiUrl = 'http://localhost:3003/user';

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser'));
}

export function getAllUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteUser(id) {
    return axios.delete(`${apiUrl}/${id}`)
}

export function saveUser(user) {
    if (!user.picture)
        user.picture = `https://picsum.photos/200/300?random=${Math.random()}`;

    if (user.id) {
        return axios.put(`${apiUrl}/${user.id}`, user);
    }

    return axios.post(`${apiUrl}`, user)
}

export async function registerUser(user) {
    const existingUser = (await axios.get(`${apiUrl}?email=${user.email}`)).data;

    if (existingUser.length>0){
        throw new Error('User with that email already exists!');
    }

    return saveUser(user);
}

export async function loginUser(user){
    const allUsers = (await getAllUsers()).data;

    const foundUser = allUsers.find(u => u.email === user.email && u.password === user.password);

    if(!foundUser)
        throw new Error('Invalid username/password');

        localStorage.setItem('loggedUser', JSON.stringify(foundUser));

    return foundUser;
}