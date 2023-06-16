import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  consultaBorrarUsuario,
  consultaListaUsuarios,
} from '../../helpers/queries';
import Swal from 'sweetalert2';
import { useState } from 'react';

const ItemUsuario = ({ usuario, setUsuarios }) => {
  const borrarUsuario = () => {
    Swal.fire({
      title: `¿Esta seguro de borrar el usuario ${usuario.nombreUsuario}?`,
      text: 'No se puede revertir este paso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        //borrar el usuario de la api por su id.
        consultaBorrarUsuario(usuario.id).then((respuesta) => {
          console.log(respuesta);
          if (respuesta && respuesta.status === 200) {
            Swal.fire(
              'Usuario eliminado',
              `El ${usuario.nombreUsuario} fue eliminado correctamente`,
              'success'
            );
            //actualizar la tabla de usuarios
            consultaListaUsuarios().then((respuesta) => setUsuarios(respuesta));
          } else {
            Swal.fire(
              'Ocurrió un error',
              `Intente realizar esta operación nuevamente mas tarde`,
              'error'
            );
          }
        });
      }
    });
  };

  return (
    <tr>
      {/* <td>{props.usuario._id}</td> */}
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
        <Button variant="danger" onClick={() => borrarUsuario()}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemUsuario;
