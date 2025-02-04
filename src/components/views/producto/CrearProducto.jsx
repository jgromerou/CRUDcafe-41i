import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { consultaNuevoProducto } from '../../helpers/queries';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrearProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navegacion = useNavigate();
  const onSubmit = (productoNuevo) => {
    consultaNuevoProducto(productoNuevo).then((respuestaCreated) => {
      console.log(respuestaCreated);
      if (respuestaCreated && respuestaCreated.status === 201) {
        Swal.fire(
          'Producto creado',
          `El producto ${productoNuevo.nombreProducto} fue creado correctamente`,
          'success'
        );
        reset();
        navegacion('/administrador');
      } else {
        Swal.fire(
          'Ocurrio un error',
          `El producto ${productoNuevo.nombreProducto} no fue creado, intentelo mas tarde`,
          'error'
        );
      }
    });
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Nuevo producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProducto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register('nombreProducto', {
              required: 'El nombre del producto es obligatorio',
              minLength: {
                value: 2,
                message: 'La cantidad minima de caracteres es de 2 digitos',
              },
              maxLength: {
                value: 100,
                message: 'La cantidad máxima de caracteres es de 100 digitos',
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register('precio', {
              required: 'El precio del producto es obligatorio',
              min: {
                value: 1,
                message: 'El precio minimo es de $1',
              },
              max: {
                value: 10000,
                message: 'El precio maximo es de $10000',
              },
            })}
          />
          <Form.Text className="text-danger">
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
              pattern: {
                value: /^(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpe?g|gif|svg)$/,
                message:
                  'La URL de la imagen debe cumplir con  por ej: http://imagen.com/img.jpg',
              },
            })}
          />
          <Form.Text className="text-danger">
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
            {...register('descripcion', {
              required: 'Debe ingresar una descripción del producto',
              minLength: {
                value: 2,
                message: 'La cantidad minima de caracteres es de 2 digitos',
              },
              maxLength: {
                value: 300,
                message: 'La cantidad máxima de caracteres es de 300 digitos',
              },
            })}
          />
          <Form.Text className="text-danger my-2 py-3">
            {errors.descripcion?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
            {...register('categoria', {
              required: 'La categoria es obligatoria',
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida caliente">bebida caliente</option>
            <option value="bebida fria">bebida fria</option>
            <option value="dulce">dulce</option>
            <option value="salado">salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
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
