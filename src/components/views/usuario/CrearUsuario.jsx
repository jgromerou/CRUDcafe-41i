import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { registrar } from '../../helpers/queries';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrearUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navegacion = useNavigate();
  const onSubmit = (usuarioNuevo) => {
    registrar(usuarioNuevo).then((respuestaCreated) => {
      console.log(respuestaCreated);
      if (respuestaCreated && respuestaCreated.status === 201) {
        Swal.fire(
          'Usuario creado',
          `El usuario ${usuarioNuevo.nombreUsuario} fue creado correctamente`,
          'success'
        );
        reset();
        navegacion('/administrador');
      } else {
        Swal.fire(
          'Ocurrio un error',
          `El usuario ${usuarioNuevo.nombreUsuario} no fue creado, intentelo mas tarde`,
          'error'
        );
      }
    });
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Nuevo usuario</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-2">
          <Form.Control
            type="text"
            placeholder="Ingrese un nombre de usuario"
            {...register('nombreUsuario', {
              required: 'El Nombre de Usuario es un dato obligatorio.',
              pattern: {
                value: /^[A-Za-z]+$/,
                message: 'Por favor, ingrese solo letras.',
              },
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.nombreUsuario?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Ingrese un email"
            {...register('email', {
              required: 'El Email es un dato obligatorio.',
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message:
                  'El Email debe cumplir con el formato correo@correo.com',
              },
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'El Password es un dato obligatorio.',
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message:
                  'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.',
              },
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
        <div className="row">
          <Button className="btn btn-dark btn-lg btn-block mb-2" type="submit">
            Registrar
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default CrearUsuario;
