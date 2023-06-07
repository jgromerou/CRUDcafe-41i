//llamar a mis variables de entorno.
const URLUsuario = import.meta.env.VITE_API_USUARIO;

export const login = async (usuario) => {
  try {
    const respuesta = await fetch(URLUsuario);
    const listaUsuarios = await respuesta.json();

    const usuarioBuscado = listaUsuarios.find(
      (itemBuscado) => itemBuscado.email === usuario.email
    );
    console.log(usuarioBuscado);
    if (usuarioBuscado) {
      console.log('Email encontrado');
      if (usuarioBuscado.password === usuario.password) {
        return usuarioBuscado;
      } else {
        console.log('Password incorrecto!');
        return null;
      }
    } else {
      console.log('El email no existe!');
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
