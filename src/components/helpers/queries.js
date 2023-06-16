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
    if (usuarioBuscado) {
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

export const registrar = async (usuarioNuevo) => {
  try {
    const respuesta = await fetch(`${URLUsuario}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioNuevo),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const consultaListaUsuarios = async () => {
  try {
    const respuesta = await fetch(URLUsuario);
    const listaUsuarios = await respuesta.json();
    return listaUsuarios;
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

export const consultaProducto = async (id) => {
  try {
    const respuesta = await fetch(URLProducto + '/' + id);
    const producto = await respuesta.json();
    return producto;
  } catch (error) {
    console.log(error);
  }
};

export const consultaBorrarProducto = async (id) => {
  try {
    const respuesta = await fetch(`${URLProducto}/${id}`, {
      method: 'DELETE',
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const consultaNuevoProducto = async (producto) => {
  try {
    const respuesta = await fetch(`${URLProducto}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const consultaEditarProducto = async (producto, id) => {
  try {
    const respuesta = await fetch(URLProducto + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });
    return respuesta;
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
