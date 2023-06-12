//llamar a mis variables de entorno.
const URLUsuario = import.meta.env.VITE_API_USUARIO;
const URLProducto = import.meta.env.VITE_API_PRODUCTO;

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

export const consultaListaProductos = async () => {
  try {
    const respuesta = await fetch(URLProducto);
    const listaProductos = await respuesta.json();
    return listaProductos;
  } catch (error) {
    console.log(error);
  }
};

/*
  GET: obtener un listado de elementos o un elemento.

  POST: crear un elemento nuevo en la BD.

  PUT: editar todo el objeto de la BD.

  PATCH: edita un solo objeto de la BD. como categoria un item del objeto.

  DELETE: borra un elemento de la BD.

*/
