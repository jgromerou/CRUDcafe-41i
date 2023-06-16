import { Routes, Route } from 'react-router-dom';
import AdministradorUsuario from '../views/AdministradorUsuario';
import CrearUsuario from '../views/usuario/CrearUsuario';

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
      </Routes>
    </>
  );
};

export default RutasAdministradorUsuario;
