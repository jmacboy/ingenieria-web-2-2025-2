import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import MapMarker from "../../components/MapMarker";

const MapPage = () => {
    return (
        <>
            <Header />
            <Container>
                <Row className="mt-2">
                    <Col md={9} xl={6}>
                        <Card>
                            <Card.Body>
                                <MapMarker />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MapPage;
<MapMarker />