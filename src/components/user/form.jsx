import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function FormUser({ idUser }) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [situation, setSituation] = useState(true);

  useEffect(() => {
    if (idUser) {
      getData(idUser)
    }
  }, [idUser]);

  //Buscar dados usuário
  const getData = (idUser) => {
    fetch(`users/${idUser}`, {
      method: 'GET',
      mode: 'cors',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Authorization': ''
        },
    }).then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setSituation(data.situation);
      }).catch(function(error) {
        return toast.error(error);
      });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    //Criar usuário
    if (!idUser) {
      fetch(`users`, {
        method: 'POST',
        mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': ''
          },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
          situation: Boolean(situation)
        }),
      })
      .then((res) => res.json())
      .then((data) => {
          if (data) {
            toast.success('Usuário cadastrado com sucesso!');
            setTimeout(() => {
              location.reload()
            }, 500);
          }
      }).catch(function(error) {
        return toast.error(error);
      });
    }

    //Atualizar usuário
    if (idUser) {
      fetch(`users/${idUser}`, {
        method: 'PUT',
        mode: 'cors',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': ''
          },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation,
          situation: Boolean(situation)
        }),
      })
      .then((res) => res.json())
      .then((data) => {
          console.log(data)
          if (data) {
            toast.success('Usuário atualizado com sucesso!');
            setTimeout(() => {
              location.reload()
            }, 500);
          }
      }).catch(function(error) {
        return toast.error(error);
      });
    }
  }

    return (
      <Container>
        <hr/>
        <Form>
          <Form.Row>
            
            {/* Nome do usuário */}
            <Form.Group as={Col} controlId="userName">
              <Form.Label>
                Nome
              </Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Nome"
                onChange={(e) => { setName(e.target.value) }}
                value={name}
              />
            </Form.Group>

            {/* Email do usuário */}
            <Form.Group as={Col} controlId="userEmail">
              <Form.Label>
                E-mail
              </Form.Label>
              <Form.Control 
                type="email" 
                placeholder="E-mail"
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </Form.Group>

            {/* Senha do usuário */}
            <Form.Group as={Col} controlId="userPassword">
              <Form.Label>
                Senha
              </Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Senha"
                autoComplete="new-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
            </Form.Group>

            {/* Confirmar senha do usuário */}
            <Form.Group as={Col} controlId="userPasswordConfirmation">
              <Form.Label>
                Confirmar senha
              </Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Confirmar Senha"
                autoComplete="off"
                value={password_confirmation}
                onChange={(e) => { setPasswordConfirmation(e.target.value) }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="userSituation">
              <Form.Label>Situação</Form.Label>
              <Form.Control 
                as="select" 
                defaultValue={situation} 
                onChange={(e) => { setSituation(e.target.value) }}
              >
                <option value={true} selected={situation && true}>
                  Ativo
                </option>
                <option value={false} selected={!situation && true}>
                  Inativo
                </option>
              </Form.Control>
            </Form.Group>

          </Form.Row>

          <Button 
            variant="primary" 
            type="submit"
            onClick={ onSubmit }
          >
            Enviar
          </Button>
        </Form>   
      </Container>
    );
} 