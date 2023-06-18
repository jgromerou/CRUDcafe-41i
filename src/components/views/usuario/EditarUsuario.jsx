import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { consultaEditarUsuario, consultaUsuario } from '../../helpers/queries';
import Swal from 'sweetalert2';

const EditarUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { id } = useParams();
  const navegacion = useNavigate();
  const password = useRef({});
  password.current = watch('password', '');
  const [pass, setPass] = useState('');
  useEffect(() => {
    consultaUsuario(id).then((respuesta) => {
      if (respuesta) {
        // tengo que cargar el objeto en el formulario
        setValue('nombreUsuario', respuesta.nombreUsuario);
        setValue('email', respuesta.email);
        setValue('rol', respuesta.rol);
        setPass(respuesta.password);
      } else {
        Swal.fire(
          'Ocurrio un error',
          `No se puede editar el usuario, intentelo mas tarde`,
          'error'
        );
      }
    });
  }, []);

  const onSubmit = (usuarioEditado) => {
    if (
      usuarioEditado.password === '' &&
      usuarioEditado.repetirPassword === ''
    ) {
      usuarioEditado.password = pass;
      usuarioEditado.repetirPassword = pass;
    }
    consultaEditarUsuario(usuarioEditado, id).then((respuestaEditado) => {
      if (respuestaEditado && respuestaEditado.status === 200) {
        Swal.fire(
          'Usuario editado',
          `El usuario ${usuarioEditado.nombreUsuario} fue editado correctamente`,
          'success'
        );
        navegacion('/administradorUsuario');
      } else {
        Swal.fire(
          'Ocurrio un error',
          `El usuario ${usuarioEditado.nombreUsuario} no fue editado, intentelo mas tarde`,
          'error'
        );
      }
    });
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Editar Usuario</h1>
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
            type="text"
            placeholder="Password"
            {...register('password', {
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

        <Form.Group className="mb-3" controlId="formRepetirPassword">
          <Form.Control
            type="text"
            placeholder="Repetir Password"
            {...register('repetirPassword', {
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message:
                  'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.',
              },
              validate: (value) =>
                value === password.current || 'Las contraseñas no coinciden',
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.repetirPassword?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRol">
          <Form.Label>Rol*</Form.Label>
          <Form.Select
            {...register('rol', {
              required: 'El rol es obligatorio.',
            })}
          >
            <option value="">Seleccione un rol disponible:</option>
            <option value="admin">Administrador</option>
            <option value="user">Normal</option>
          </Form.Select>
          <Form.Text className="text-danger">{errors.rol?.message}</Form.Text>
        </Form.Group>
        <div className="row">
          <Button className="btn btn-dark btn-lg btn-block mb-2" type="submit">
            Guardar
          </Button>
        </div>
      </Form>
    </section>
  );
};

export default EditarUsuario;
