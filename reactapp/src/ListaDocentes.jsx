import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import SearchTextField from "./components/SearchTextField";
import Header from "./components/Header";

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
        <>
            <Header />

            <Container>
                <Row>
                    <Col md={9}>
                        <h1>Lista de Docentes</h1>
                    </Col>
                    <Col md={3}>
                        <SearchTextField className={"mt-2"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm">
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
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ListaDocentes;