import axios from "axios";
import { getAccessToken } from "../utils/TokenUtilities";

const getAllDocentes = () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/personas", {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}

const getDocenteById = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:3000/personas/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                const docente = response.data;
                resolve(docente);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const createDocente = (docente) => {
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/personas", docente, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                const nuevoDocente = response.data;
                resolve(nuevoDocente);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const updateDocente = (id, docente) => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:3000/personas/${id}`, docente, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then((response) => {
                const updatedDocente = response.data;
                resolve(updatedDocente);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const deleteDocente = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/personas/${id}`, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`
            }
        })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}
const uploadDocenteProfilePicture = (id, file) => {
    const formData = new FormData();
    formData.append("image", file);

    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:3000/personas/${id}/profile`, formData, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}


export { getDocenteById, createDocente, updateDocente, getAllDocentes, deleteDocente, uploadDocenteProfilePicture };