import { Routes, Route } from 'react-router-dom';
import AdministradorUsuario from '../views/AdministradorUsuario';
import CrearUsuario from '../views/usuario/CrearUsuario';
import EditarUsuario from '../views/usuario/EditarUsuario';

const RutasAdministradorUsuario = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<AdministradorUsuario />}></Route>
        <Route
          exact
          path="/crear-usuario"
          element={<CrearUsuario></CrearUsuario>}
        ></Route>
        <Route
          exact
          path="/editar-usuario/:id"
          element={<EditarUsuario></EditarUsuario>}
        ></Route>
      </Routes>
    </>
  );
};

export default RutasAdministradorUsuario;
