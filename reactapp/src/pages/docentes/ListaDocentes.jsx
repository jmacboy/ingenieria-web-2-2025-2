import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import SearchTextField from "../../components/SearchTextField";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ListaDocentes = () => {
    const navigate = useNavigate();
    const [listaDocentes, setListaDocentes] = useState([]);
    const [docentesFiltrados, setDocentesFiltrados] = useState([]);

    const fetchDocentes = () => {
        axios.get("http://localhost:3000/docentes", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setListaDocentes(response.data);
                setDocentesFiltrados(response.data);
                console.log(response.data);
            });
    }
    useEffect(() => {
        fetchDocentes();
    }, []);
    const onEditClick = (id) => () => {
        navigate(`/docentes/${id}/edit`);
    }
    const onDeleteClick = (id) => () => {
        if (!window.confirm("¿Está seguro de eliminar el docente?")) {
            return;
        }
        axios.delete(`http://localhost:3000/docentes/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(() => {
                fetchDocentes();
            })
            .catch((error) => {
                console.error(error);
                alert("Error al eliminar el docente");
            });
    }
    const onSearchChanged = (event) => {
        const text = event.target.value.toLowerCase();
        if (text === "") {
            setDocentesFiltrados(listaDocentes);
            return;
        }
        const nuevoFiltro = listaDocentes.filter((docente) => {
            return docente.persona.nombre.toLowerCase().includes(text)
                || docente.persona.apellido.toLowerCase().includes(text)
                || docente.persona.edad.toString().includes(text)
                || docente.persona.ciudad?.toLowerCase().includes(text)
                || docente.persona.fechaNacimiento?.toLowerCase().includes(text)
                || docente.telefono?.toLowerCase().includes(text)
                || docente.email?.toLowerCase().includes(text)
                || docente.id.toString().includes(text);
        });
        setDocentesFiltrados(nuevoFiltro);
    }
    return (
        <>
            <Header />

            <Container>
                <Row>
                    <Col md={9}>
                        <h1>Lista de Docentes</h1>
                    </Col>
                    <Col md={3}>
                        <SearchTextField className={"mt-2"} onTextChanged={onSearchChanged} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm" responsive>
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
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {docentesFiltrados.map((docente) => (
                                    <tr key={docente.id}>
                                        <td>{docente.id}</td>
                                        <td>{docente.persona.nombre}</td>
                                        <td>{docente.persona.apellido}</td>
                                        <td>{docente.persona.edad}</td>
                                        <td>{docente.persona.ciudad}</td>
                                        <td>{docente.persona.fechaNacimiento && moment(docente.persona.fechaNacimiento).format("DD/MM/YYYY")}</td>
                                        <td>{docente.telefono}</td>
                                        <td>{docente.email}</td>
                                        <td>
                                            <Button onClick={onEditClick(docente.id)}>Editar</Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={onDeleteClick(docente.id)}>Eliminar</Button>
                                        </td>
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