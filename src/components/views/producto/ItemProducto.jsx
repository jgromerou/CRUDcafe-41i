import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import {
  consultaBorrarProducto,
  consultaListaProductos,
} from '../../helpers/queries';
import { Link } from 'react-router-dom';

const ItemProducto = ({ producto, setProductos }) => {
  const borrarProducto = () => {
    Swal.fire({
      title: `¿Estás seguro de borrar el producto ${producto.nombreProducto}?`,
      text: 'No se puede revertir este paso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then(() => {
      //borrar el producto de la API
      consultaBorrarProducto(producto._id).then((respuesta) => {
        console.log(respuesta);
        if (respuesta && respuesta.status === 200) {
          Swal.fire(
            'Producto eliminado',
            `El ${producto.nombreProducto} fue eliminado correctamente`,
            'success'
          );
          //actualizar la tabla de productos.
          consultaListaProductos().then((respuesta) => {
            setProductos(respuesta);
          });
        } else {
          Swal.fire(
            'Ocurrió un error',
            `Intente realizar esta opreación nuevamente más tarde`,
            'error'
          );
        }
      });
    });
  };
  return (
    <tr>
      {/* <td>{props.producto._id}</td> */}
      <td>{producto._id}</td>
      <td>{producto.nombreProducto}</td>
      <td>${producto.precio}</td>
      <td>{producto.imagen}</td>
      <td>{producto.categoria}</td>
      <td>
        <Link
          className="btn btn-warning"
          to={'/administrador/editar-producto/' + producto._id}
        >
          Editar
        </Link>
        <Button variant="danger" onClick={() => borrarProducto()}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
