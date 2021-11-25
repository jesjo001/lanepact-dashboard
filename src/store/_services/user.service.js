import { authHeader } from '../_helpers';
import axios from "axios";

const API_URL = "https://agulite.herokuapp.com/api/v1/";
axios.defaults.headers.common['Content-Type'] = 'application/json'


export const userService = {
    login,
    logout,
    getAll,
    register
};

function login(email, password) {
    return axios
        .post(API_URL + "users/signin", {
            email,
            password
        },{
            headers: {
            //   'content-type': 'application/json',
              'Access-Control-Allow-Origin': true,
            }
          })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            console.log(response.data)
            return response.data;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(firstname, lastname, phone, email, role, password, passwordConfirm) {
    return axios.post(API_URL + "users/signup", {
        firstname,
        lastname,
        phone,
        email,
        role,
        password,
        passwordConfirm
    });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${API_URL}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}