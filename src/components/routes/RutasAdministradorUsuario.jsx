import { Routes, Route } from 'react-router-dom';
import AdministradorUsuario from '../views/AdministradorUsuario';

const RutasAdministradorUsuario = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<AdministradorUsuario />}></Route>
      </Routes>
    </>
  );
};

export default RutasAdministradorUsuario;
