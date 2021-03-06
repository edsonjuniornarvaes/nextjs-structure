import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <p>
                            Olá, seu login foi realizado com sucesso!
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Col>
                    <Link href="./user/users">
                        <a>Acesse a lista de usuários</a>
                    </Link>
                </Col>
            </Container>
        </>
    );
}