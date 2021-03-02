import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Router from 'next/router';
import { toast } from 'react-toastify';

export default function Login() {

  const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const onLogin = (e) => {
  e.preventDefault();
  
  fetch(`http://api.emarketplace.local/admin/login`, {
    method: 'POST',
    mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    body: JSON.stringify({
      email,
      password
    }),
  }).then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data) {
        if (data.access_token) {
          Router.push('/home')
          return toast.success('Login feito com sucesso!');
        }
        data.map((erro) => {
          return toast.error(erro);
        })
      }
    }).catch(function(error) {
      return toast.error(error);
    });
  }

	return (
		<Form>
			<Form.Group controlId="formBasicEmail">
				<Form.Label>
					E-mail
				</Form.Label>
				<Form.Control 
          type="email" 
          placeholder="Informe seu e-mail" 
          onChange={(e) => { setEmail(e.target.value) }}
          value={email}
        />
				<Form.Text className="text-muted">
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>
					Senha
				</Form.Label>
				<Form.Control 
          type="password" 
          placeholder="Informe sua senha" 
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
        />
			</Form.Group>
			<Button 
				variant="primary" 
				type="submit"
				onClick={onLogin}
			>
				Login
			</Button>
		</Form>
	);
}