import axios from "axios";
import { getAccessToken } from "../utils/TokenUtilities";

const login = (loginData) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/auth/login", loginData)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const me = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/auth/me", {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}
export { login, me };