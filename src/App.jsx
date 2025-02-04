import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Error404 from './components/views/Error404';
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import Inicio from './components/views/Inicio';
import DetalleProducto from './components/views/DetalleProducto';
import Login from './components/views/Login';
import Registro from './components/views/Registro';
import { useState } from 'react';
import RutasProtegidas from './components/routes/RutasProtegidas';
import RutasAdministrador from './components/routes/RutasAdministrador';
import RutasAdministradorUsuario from './components/routes/RutasAdministradorUsuario';

function App() {
  const usuario = JSON.parse(sessionStorage.getItem('usuario')) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);

  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      />
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/registro" element={<Registro />} />
        <Route
          exact
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        ></Route>
        <Route exact path="/detalle/:id" element={<DetalleProducto />}></Route>

        <Route
          exact
          path="/administrador/*"
          element={
            <RutasProtegidas>
              <RutasAdministrador></RutasAdministrador>
            </RutasProtegidas>
          }
        />

        <Route
          exact
          path="/administradorUsuario/*"
          element={
            <RutasProtegidas>
              <RutasAdministradorUsuario></RutasAdministradorUsuario>
            </RutasProtegidas>
          }
        />
        <Route exact path="/detalle/:id" element={<DetalleProducto />}></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
