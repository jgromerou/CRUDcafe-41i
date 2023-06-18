import { Table, Pagination } from 'react-bootstrap';
import ItemProducto from './producto/ItemProducto';
import { useState, useEffect } from 'react';
import { consultaListaProductos } from '../helpers/queries';
import { Link } from 'react-router-dom';

const Administrador = () => {
  const itemsPorPagina = 5;
  const [productos, setProductos] = useState([]);

  const [paginaActual, setPaginaActual] = useState(1);

  // Calcula el índice inicial y final de los elementos a mostrar en la página actual
  const indiceUltimoItem = paginaActual * itemsPorPagina;
  const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
  const currentItems = productos.slice(indicePrimerItem, indiceUltimoItem);

  // Calcula el número total de páginas
  const totalPaginas = Math.ceil(productos.length / itemsPorPagina);

  // Cambia a la página especificada
  const handlePageChange = (numeroPage) => {
    setPaginaActual(numeroPage);
  };

  useEffect(() => {
    consultaListaProductos()
      .then((repuesta) => {
        setProductos(repuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <Link className="btn btn-primary" to="/administrador/crear-producto">
          Agregar
        </Link>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((producto) => (
            <ItemProducto
              key={producto.id}
              producto={producto}
              setProductos={setProductos}
            ></ItemProducto>
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

export default Administrador;
