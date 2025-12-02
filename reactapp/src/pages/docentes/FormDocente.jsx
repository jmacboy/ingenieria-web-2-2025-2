import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import RequiredLabel from "../../components/RequiredLabel";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import moment from "moment";
import useAuthentication from "../../../hooks/useAuthentication";
import { createDocente, getDocenteById, updateDocente } from "../../../services/DocenteService";

const FormDocente = () => {
    const navigate = useNavigate();
    useAuthentication(true);

    const { id } = useParams();

    const [validated, setValidated] = useState(false);

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("")
    const [ciudad, setCiudad] = useState("")
    const [edad, setEdad] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [fechaNacimiento, setFechaNacimiento] = useState("")


    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchDocente = () => {
            getDocenteById(id).then((docente) => {
                setNombre(docente.nombre || "");
                setApellido(docente.apellido || "");
                setCiudad(docente.ciudad || "");
                setEdad(docente.edad || "");
                // setFechaNacimiento(moment(docente.persona.fechaNacimiento).format("YYYY-MM-DD") || "");
                // setTelefono(docente.telefono || "");
                // setEmail(docente.email || "");
            }).catch(() => {
                alert("Error al cargar el docente");
                navigate("/");
            });
        }
        fetchDocente();
    }, [id, navigate])


    const onDocenteSaveClick = (event) => {
        const form = event.currentTarget;
        let hasErrors = false;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            hasErrors = true;
        }
        setValidated(true);

        if (hasErrors) {
            return;
        }
        sendPersonaForm();
    }
    const sendPersonaForm = () => {
        const persona = {
            nombre,
            apellido,
            edad: parseInt(edad, 10),
            // telefono,
            // email,
        }
        if (ciudad) {
            persona.ciudad = ciudad;
        }
        // if (fechaNacimiento) {
        //     persona.fechaNacimiento = fechaNacimiento;
        // }
        if (id) {
            sendPersonaUpdate(persona);
        } else {
            sendPersonaCreate(persona);
        }
    }

    const sendPersonaUpdate = (persona) => {
        updateDocente(id, persona)
            .then((docenteActualizado) => {
                console.log(docenteActualizado);
                navigate("/");
            })
            .catch(() => {
                alert("Error al actualizar el docente");
            });
    }
    const sendPersonaCreate = (persona) => {
        createDocente({ persona }).then((nuevoDocente) => {
            console.log(nuevoDocente);
            navigate("/");
        }).catch(() => {
            alert("Error al crear el docente");
        });
    }
    const onCancelClick = () => {
        navigate("/");
    }
    return (
        <>
            <Header />
            <Container>
                <Row className="mt-2">
                    <Col md={9} xl={6}>
                        <Card>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={onDocenteSaveClick}>
                                    <Row>
                                        <Col sm={6}>
                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtNombre">Nombre</RequiredLabel>
                                                <FormControl id="txtNombre" required maxLength={100} type="text" value={nombre} onChange={(e) => {
                                                    setNombre(e.target.value);
                                                }} />
                                                <FormControl.Feedback type="invalid">El nombre es obligatorio</FormControl.Feedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtApellido">Apellido</RequiredLabel>
                                                <FormControl id="txtApellido" maxLength={100} required type="text" value={apellido} onChange={(e) => {
                                                    setApellido(e.target.value);
                                                }} />
                                                <FormControl.Feedback type="invalid">El apellido es obligatorio</FormControl.Feedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormLabel htmlFor="txtCiudad" >Ciudad</FormLabel>
                                                <FormControl id="txtCiudad" type="text" maxLength={100} value={ciudad} onChange={(e) => {
                                                    setCiudad(e.target.value);
                                                }} />
                                            </FormGroup>
                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtEdad">Edad</RequiredLabel>
                                                <FormControl id="txtEdad" min={0} required type="number" value={edad} onChange={(e) => {
                                                    setEdad(e.target.value);
                                                }} />
                                                <FormControl.Feedback type="invalid">La edad es obligatoria</FormControl.Feedback>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={6}>
                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtTelefono">Teléfono</RequiredLabel>
                                                <FormControl id="txtTelefono" minLength={7} maxLength={15} type="text" value={telefono} onChange={(e) => {
                                                    setTelefono(e.target.value);
                                                }} />
                                                <FormControl.Feedback type="invalid">El teléfono es obligatorio</FormControl.Feedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <RequiredLabel htmlFor="txtEmail">Email</RequiredLabel>
                                                <FormControl id="txtEmail" type="email" value={email} onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }} />
                                                <FormControl.Feedback type="invalid">El email es obligatorio</FormControl.Feedback>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormLabel htmlFor="txtFechaNacimiento" >Fecha de Nacimiento</FormLabel>
                                                <FormControl id="txtFechaNacimiento" type="date" value={fechaNacimiento} onChange={(e) => {
                                                    setFechaNacimiento(e.target.value);
                                                }} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <div className="mt-2">
                                        <Button variant="primary" type="submit">Guardar</Button>
                                        <Button variant="secondary" className="ms-2" onClick={onCancelClick}>Cancelar</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FormDocente;