import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error404 from './components/views/Error404';
import Menu from './components/common/Menu';
import Footer from './components/common/Footer';
import Inicio from './components/views/Inicio';
import DetalleProducto from './components/views/DetalleProducto';
import CrearProducto from './components/views/producto/CrearProducto';
import EditarProducto from './components/views/producto/EditarProducto';
import Administrador from './components/views/Administrador';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/views/Login';
import Registro from './components/views/Registro';
import { useState } from 'react';

function App() {
  const usuario = sessionStorage.getItem('usuario') || {};
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
        <Route exact path="/detalle" element={<DetalleProducto />}></Route>
        <Route exact path="/administrador" element={<Administrador />}></Route>
        <Route
          exact
          path="/administrador/crear-producto"
          element={<CrearProducto />}
        ></Route>
        <Route
          exact
          path="/administrador/editar-producto"
          element={<EditarProducto />}
        ></Route>
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
