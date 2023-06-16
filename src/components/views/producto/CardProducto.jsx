import { Col, Card, Button } from 'react-bootstrap';

const CardProducto = ({ producto }) => {
  const { nombreProducto, precio, imagen } = producto;
  return (
    <Col md={4} ld={3} className="mb-3">
      <Card>
        <Card.Img variant="top" src={imagen} />
        <Card.Body>
          <Card.Title className="text-uppercase">{nombreProducto}</Card.Title>
          <Card.Text>${precio}</Card.Text>
          <Button variant="primary">Ver detalle</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardProducto;
