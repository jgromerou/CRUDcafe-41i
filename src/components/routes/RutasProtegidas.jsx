import { Navigate } from 'react-router-dom';

const RutasProtegidas = ({ children }) => {
  //está logueado
  const usuarioLogueado = sessionStorage.getItem('usuario') || null;
  console.log(usuarioLogueado);
  //preguntar si el usuario NO está logueado
  if (!usuarioLogueado) {
    return <Navigate to={'/login'}></Navigate>;
  } else {
    return children;
  }
};

export default RutasProtegidas;
