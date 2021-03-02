import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
    return (
        <Container>
            <Row>
                <Col>
                    <h1>
                        Olá, seu login foi realizado com sucesso!
                    </h1>
                </Col>
            </Row>
        </Container>
    );
}