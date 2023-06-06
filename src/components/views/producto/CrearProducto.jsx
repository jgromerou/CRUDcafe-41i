import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CrearProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (producto) => {
    console.log(producto);
    //TODO: Hacer la función crearProducto en queries.js e incovarla aqui
  };
  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Nuevo producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register('nombreProducto', {
              required: 'El nombre del producto es un dato obligatorio.',
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register('precio', {
              required: 'El precio es un dato obligatorio.',
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register('imagen', {
              required: 'La imagen es un dato obligatorio.',
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescripcion">
          <Form.Label>Descripción*</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Combinación perfecta entre leche, choclate, café intenso y un toque de canela."
            style={{ height: '100px' }}
            aria-label="Seleccione una descripción:"
            {...register('descripcionProducto', {
              required: 'Debe ingresar una descripción del producto',
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.descripcionProducto?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
            aria-label="Seleccione una categoría:"
            {...register('categoriaProducto', {
              required: 'Debe seleccionar una categoría',
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida caliente">Bebida caliente</option>
            <option value="bebida fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger my-2 py-3">
            {errors.categoriaProducto?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default CrearProducto;
