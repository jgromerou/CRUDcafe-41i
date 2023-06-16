import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ItemUsuario = ({ usuario }) => {
  return (
    <tr>
      {/* <td>{props.producto._id}</td> */}
      <td>{usuario.id}</td>
      <td>{usuario.nombreUsuario}</td>
      <td>{usuario.email}</td>
      <td>
        <Link
          className="btn btn-warning"
          to={'/administrador/editar-usuario/' + usuario.id}
        >
          Editar
        </Link>
        <Button variant="danger">Borrar</Button>
      </td>
    </tr>
  );
};

export default ItemUsuario;
