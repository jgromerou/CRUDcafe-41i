import { Navigate } from 'react-router-dom';

const RutasProtegidas = ({ children }) => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuario')) || null;

  if (usuarioLogueado !== null) {
    if (usuarioLogueado.rol !== 'user') {
      if (usuarioLogueado.rol !== 'admin') {
        return <Navigate to={'/login'}></Navigate>;
      } else {
        return children;
      }
    } else {
      return <Navigate to={'/'}></Navigate>;
    }
  } else {
    return <Navigate to={'/'}></Navigate>;
  }
};

export default RutasProtegidas;
