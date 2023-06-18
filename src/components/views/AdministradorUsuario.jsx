import { Table, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { consultaListaUsuarios } from '../helpers/queries';
import ItemUsuario from './usuario/ItemUsuario';

const AdministradorUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const itemsPorPagina = 5;
  const [paginaActual, setPaginaActual] = useState(1);

  // Calcula el índice inicial y final de los elementos a mostrar en la página actual
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const currentItems = usuarios.slice(indicePrimerItem, indiceUltimoItem);

  // Calcula el número total de páginas
  const totalPaginas = Math.ceil(usuarios.length / itemsPorPagina);

  useEffect(() => {
    consultaListaUsuarios()
      .then((repuesta) => {
        setUsuarios(repuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (numeroPage) => {
    setPaginaActual(numeroPage);
  };

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Usuarios disponibles</h1>
        <Link
          className="btn btn-primary"
          to="/administradorUsuario/crear-usuario"
        >
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
            <th>Rol</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((usuario) => (
            <ItemUsuario
              key={usuario.id}
              usuario={usuario}
              setUsuarios={setUsuarios}
            ></ItemUsuario>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev
          disabled={paginaActual === 1}
          onClick={() => handlePageChange(paginaActual - 1)}
        />
        {[...Array(totalPaginas)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === paginaActual}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={paginaActual === totalPaginas}
          onClick={() => handlePageChange(paginaActual + 1)}
        />
      </Pagination>
    </section>
  );
};

export default AdministradorUsuario;
