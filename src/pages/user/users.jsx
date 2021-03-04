import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link'
import List from '../../components/user/list';

export default function Home() {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Link href="../home">
                            <a>Voltar para a Home</a>
                        </Link>
                    </Col>
                    <Col>
                        <Link href="./create">
                            <a>Cadastrar usuário</a>
                        </Link>
                    </Col>
                </Row>
                <Col>
                    <List />
                </Col>
            </Container>
        </>
    );
}