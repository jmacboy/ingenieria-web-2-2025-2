import axios from "axios";
import { useEffect, useState } from "react";

const ListaDocentes = () => {
    const [listaDocentes, setListaDocentes] = useState([]);

    const fetchDocentes = () => {
        axios.get("http://localhost:3000/docentes")
            .then((response) => {
                setListaDocentes(response.data);
                console.log(response.data);
            });
    }
    useEffect(() => {
        fetchDocentes();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Ciudad</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {listaDocentes.map((docente) => (
                        <tr key={docente.id}>
                            <td>{docente.id}</td>
                            <td>{docente.persona.nombre}</td>
                            <td>{docente.persona.apellido}</td>
                            <td>{docente.persona.edad}</td>
                            <td>{docente.persona.ciudad}</td>
                            <td>{docente.persona.fechaNacimiento}</td>
                            <td>{docente.telefono}</td>
                            <td>{docente.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaDocentes;