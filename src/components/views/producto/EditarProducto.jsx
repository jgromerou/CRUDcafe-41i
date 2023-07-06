import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  consultaEditarProducto,
  consultaProducto,
} from '../../helpers/queries';
import Swal from 'sweetalert2';

const EditarProducto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { id } = useParams();
  const navegacion = useNavigate();

  useEffect(() => {
    consultaProducto(id).then((respuesta) => {
      if (respuesta) {
        console.log('tengo que cargar el objeto en el formulario');
        console.log(respuesta);
        setValue('nombreProducto', respuesta.nombreProducto);
        setValue('precio', respuesta.precio);
        setValue('imagen', respuesta.imagen);
        setValue('descripcion', respuesta.descripcion);
        setValue('categoria', respuesta.categoria);
      } else {
        Swal.fire(
          'Ocurrio un error',
          `No se puede editar el producto, intentelo mas tarde`,
          'error'
        );
      }
    });
  }, []);

  const onSubmit = (productoEditado) => {
    console.log(productoEditado);
    consultaEditarProducto(productoEditado, id).then((respuestaEditado) => {
      if (respuestaEditado && respuestaEditado.status === 200) {
        Swal.fire(
          'Producto editado',
          `El producto ${productoEditado.nombreProducto} fue editado correctamente`,
          'success'
        );
        navegacion('/administrador');
      } else {
        Swal.fire(
          'Ocurrio un error',
          `El producto ${productoEditado.nombreProducto} no fue editado, intentelo mas tarde`,
          'error'
        );
      }
    });
  };

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Editar producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProdcuto">
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
              pattern: {
                value: /^(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpe?g|gif|svg)$/,
                message:
                  'La URL de la imagen debe cumplir con  por ej: http://imagen.com/img.jpg',
              },
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
            {errors.descripcionProducto?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
            aria-label="Seleccione una categoría:"
            {...register('categoria', {
              required: 'Debe seleccionar una categoría',
            })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida caliente">bebida caliente</option>
            <option value="bebida fria">bebida fria</option>
            <option value="dulce">dulce</option>
            <option value="salado">salado</option>
          </Form.Select>
          <Form.Text className="text-danger my-2 py-3">
            {errors.categoriaProducto?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-2">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default EditarProducto;
