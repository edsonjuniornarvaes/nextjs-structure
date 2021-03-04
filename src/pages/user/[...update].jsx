import { React, useState, useEffect } from 'react';
import FormUser from '../../components/user/form'
import { useRouter } from "next/router";

export default function UpdateUser() {
  const [idUsuario, setIdUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
      setIdUsuario( router.query.update && router.query.update[1] ? router.query.update[1] : null )
  }, [router.query]);

  return (
    <FormUser idUser={idUsuario}/>
  );
}