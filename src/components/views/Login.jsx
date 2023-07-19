import { Form, Button, Container, Card, InputGroup } from 'react-bootstrap';
import { login } from '../helpers/queries';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';
import './../../css/login.css';

const Login = ({ setUsuarioLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navegacion = useNavigate();

  const onSubmit = (usuario) => {
    login(usuario).then((respuesta) => {
      if (respuesta && respuesta.status === 200) {
        console.log(respuesta);
        const { status, ...respuestaRestante } = respuesta;
        sessionStorage.setItem('usuario', JSON.stringify(respuestaRestante));
        Swal.fire(
          'Bienvenido',
          `${respuesta.nombreUsuario} iniciste sesión correctamente`,
          'success'
        );
        setUsuarioLogueado(respuesta);
        navegacion('/administrador');
      } else {
        Swal.fire('Error', 'Email o password incorrecto', 'error');
      }
    });
  };

  return (
    <Container className="mainSection contenedorPrincipal">
      <Card className="my-5 border-0 contenedor_login">
        <Card.Title as="h2" className=" mt-3 text-center">
          Iniciar Sesión
        </Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formEmail">
              <InputGroup>
                <InputGroup.Text id="iconoEmail" className="fondoIconoInput">
                  <ArrowRight color="royalblue" size={10} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Email"
                  aria-label="Email"
                  aria-describedby="iconoEmail"
                  type="email"
                  className="inputFormulario"
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
              </InputGroup>
              <Form.Text className="text-danger my-2 py-3">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <InputGroup>
                <InputGroup.Text id="iconoPassword" className="fondoIconoInput">
                  <ArrowRight color="royalblue" size={10} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Contraseña"
                  aria-label="Password"
                  aria-describedby="iconoPassword"
                  type="password"
                  className="inputFormulario"
                  {...register('password', {
                    required: 'La contraseña es un dato obligatorio.',
                    pattern: {
                      value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                      message:
                        'La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.',
                    },
                  })}
                />
              </InputGroup>
              <Form.Text className="text-danger my-2 py-3">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Button type="submit" className="mb-2 botonIngresar">
              Ingresar
            </Button>
          </Form>
          <hr />
          <div className="text-center">
            <Card.Text as="h4" className="mt-3 subtituloCuenta">
              ¿No tienes una cuenta?
            </Card.Text>
            <Card.Link href="#" className="linkRegistrate">
              Registrate
            </Card.Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
