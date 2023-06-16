import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { consultaListaUsuarios } from '../helpers/queries';
import ItemUsuario from './usuario/ItemUsuario';

const AdministradorUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    consultaListaUsuarios()
      .then((repuesta) => {
        setUsuarios(repuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Usuarios disponibles</h1>
        <Link className="btn btn-primary" to="/administrador/crear-usuario">
          Agregar
        </Link>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <ItemUsuario key={usuario.id} usuario={usuario}></ItemUsuario>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default AdministradorUsuario;
