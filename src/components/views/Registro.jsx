import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registrar } from '../helpers/queries';
import Swal from 'sweetalert2';

const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navegacion = useNavigate();
  const onSubmit = (usuarioNuevo) => {
    registrar(usuarioNuevo).then((respuesta) => {
      if (respuesta) {
        Swal.fire(
          'Bienvenido',
          `${respuesta.nombreUsuario} registrado correctamente. Tiene que iniciar sesión`,
          'success'
        );
        navegacion('/login');
      } else {
        Swal.fire(
          'Error',
          'No se pudo registrar el usuario, intente más tarde',
          'error'
        );
      }
    });
  };
  return (
    <div className="mt-5 mainSection">
      <h3 className="text-center">Registro</h3>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
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
            <Form.Group className="mb-3" controlId="formRol">
              <Form.Select
                {...register('rol', {
                  required: 'El rol es obligatorio.',
                })}
              >
                <option value="">Seleccione un rol disponible:</option>
                <option value="user">Normal</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.rol?.message}
              </Form.Text>
            </Form.Group>
            <div className="row">
              <Button
                className="btn btn-dark btn-lg btn-block mb-2"
                type="submit"
              >
                Registrar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
