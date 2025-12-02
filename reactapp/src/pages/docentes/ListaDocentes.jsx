import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import SearchTextField from "../../components/SearchTextField";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAuthentication from "../../../hooks/useAuthentication";
import { deleteDocente, getAllDocentes } from "../../../services/DocenteService";

const ListaDocentes = () => {
    const navigate = useNavigate();
    useAuthentication(true);
    const [listaDocentes, setListaDocentes] = useState([]);
    const [docentesFiltrados, setDocentesFiltrados] = useState([]);

    const fetchDocentes = () => {
        getAllDocentes().then((docentes) => {
            setListaDocentes(docentes);
            setDocentesFiltrados(docentes);
            console.log(docentes);
        }).catch(() => {
            alert("Error al cargar los docentes");
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
        deleteDocente(id).then(() => {
            fetchDocentes();
        }).catch(() => {
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
            return docente.nombre.toLowerCase().includes(text)
                || docente.apellido.toLowerCase().includes(text)
                || docente.edad.toString().includes(text)
            // || docente.persona.ciudad?.toLowerCase().includes(text)
            // || docente.persona.fechaNacimiento?.toLowerCase().includes(text)
            // || docente.telefono?.toLowerCase().includes(text)
            // || docente.email?.toLowerCase().includes(text)
            // || docente.id.toString().includes(text);
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
                                    <th></th>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {docentesFiltrados.map((docente) => (
                                    <tr key={docente.id}>
                                        <td>
                                            {docente.fotoPerfil ? <img alt="Foto de Perfil" src={docente.fotoPerfil} style={{ height: "50px" }} /> : null}
                                        </td>
                                        <td>{docente.id}</td>
                                        <td>{docente.nombre}</td>
                                        <td>{docente.apellido}</td>
                                        <td>{docente.edad}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <Button variant="secondary" onClick={() => navigate(`/docentes/${docente.id}/photo`)}>Foto</Button>
                                        </td>
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