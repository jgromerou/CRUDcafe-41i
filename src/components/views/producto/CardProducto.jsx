import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardProducto = ({ producto }) => {
  const { nombreProducto, precio, imagen, _id } = producto;
  return (
    <Col md={6} lg={4} className="mb-3">
      <Card>
        <Card.Img variant="top" src={imagen} className="cardImage" />
        <Card.Body>
          <Card.Title className="text-uppercase">{nombreProducto}</Card.Title>
          <Card.Text>${precio}</Card.Text>
          <Link className="btn btn-primary" to={'/detalle/' + _id}>
            Ver Detalles
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
