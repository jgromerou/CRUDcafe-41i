import { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { consultaProducto } from '../helpers/queries';

const DetalleProducto = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    consultaProducto(id).then((respuesta) => {
      if (respuesta) {
        console.log(respuesta);
        setNombreProducto(respuesta.nombreProducto);
        setPrecio(respuesta.precio);
        setImagen(respuesta.imagen);
        setDescripcion(respuesta.descripcion);
        setCategoria(respuesta.categoria);
      } else {
        Swal.fire(
          'Ocurrio un error',
          `No se puede editar el producto, intentelo mas tarde`,
          'error'
        );
      }
    });
  }, []);
  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img variant="top" src={imagen} className="cardImage" />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{nombreProducto}</Card.Title>
              <hr />
              <Card.Text>
                {descripcion}
                <br />
                <br />
                <span className="text-danger fw-semibold ">
                  Categoria:
                </span>{' '}
                {categoria}
                <br />
                <span className="text-danger fw-semibold ">Precio:</span> $
                {precio}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleProducto;
