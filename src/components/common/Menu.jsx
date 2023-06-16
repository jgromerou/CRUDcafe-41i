import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const logout = () => {
    setUsuarioLogueado({});
    sessionStorage.removeItem('usuario');
    navegacion('/');
  };
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={'/'}>
          Rolling Café
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className={'nav-item nav-link'} to="/">
              Inicio
            </NavLink>
            <NavLink end className={'nav-item nav-link'} to="/registro">
              Registro
            </NavLink>
            {usuarioLogueado.nombreUsuario ? (
              <>
                <NavDropdown title="Administrador" id="dropdownAdministrador">
                  <NavDropdown.Item
                    as={NavLink}
                    end
                    className={'nav-item nav-link '}
                    to="/administrador"
                  >
                    Productos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    end
                    className={'nav-item nav-link '}
                    to="/administradorUsuario"
                  >
                    Usuarios
                  </NavDropdown.Item>
                </NavDropdown>

                <Button onClick={logout} variant="dark">
                  Logout
                </Button>
              </>
            ) : (
              <NavLink end className={'nav-item nav-link'} to="/login">
                Login
              </NavLink>
            )}

            <NavLink end className={'nav-item nav-link'} to="/testError404">
              Error404
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
