import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import RequiredLabel from "../../components/RequiredLabel";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import useAuthentication from "../../../hooks/useAuthentication";
import { getDocenteById, uploadDocenteProfilePicture } from "../../../services/DocenteService";

const FotoPerfilDocente = () => {
    const navigate = useNavigate();
    useAuthentication(true);

    const { id } = useParams();

    const [validated, setValidated] = useState(false);

    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState("");



    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchDocente = () => {
            getDocenteById(id).then((docente) => {
                setProfilePictureUrl(docente.fotoPerfil || "");
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
        uploadDocenteProfilePicture(id, profilePicture).then(() => {
            navigate("/");
        }).catch(() => {
            alert("Error al subir la foto de perfil");
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
                                                <RequiredLabel htmlFor="txtProfilePicture">Foto de Perfil</RequiredLabel>

                                                {profilePictureUrl &&
                                                    <div>
                                                        <img alt="Foto de Perfil" src={profilePictureUrl} style={{ height: "100px", marginBottom: "10px" }} />
                                                    </div>
                                                }

                                                <FormControl id="txtProfilePicture" required type="file" onChange={(e) => {
                                                    setProfilePicture(e.target.files[0]);
                                                    setProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
                                                }} />
                                                <FormControl.Feedback type="invalid">La foto de perfil no ha sido seleccionada</FormControl.Feedback>
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

export default FotoPerfilDocente;