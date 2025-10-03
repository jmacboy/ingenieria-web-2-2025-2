import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" >
            <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Docentes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">
                                Lista de docentes
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/docentes/create">Crear docente</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;