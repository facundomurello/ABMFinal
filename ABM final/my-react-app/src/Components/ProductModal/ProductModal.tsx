import { Button, Form, FormLabel, Modal } from "react-bootstrap";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ModalType } from "../../types/ModalType";
//de´p formularios
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import { toast } from 'react-toastify';

type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    denominacion: string;
    modalType: ModalType;
    prod: ArticuloManufacturado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
    
  };

  

    
 const ProductModal = ({show, onHide, denominacion, modalType, prod, refreshData}: ProductModalProps) => {


  //CREATE - ACTUALIZAR
    const handleSaveUpdate = async (art: ArticuloManufacturado) => {
        try {
          const isNew = art.id === 0;
          if(isNew){
            await ArticuloManufacturadoService.createArticuloManufacturado(art);
          } else{
            await ArticuloManufacturadoService.updateProduct(art.id, art);
          }
          toast.success(isNew ? 'Producto Creado' : 'Producto Actualizado', {
            position: 'top-center',
          });
          
          onHide();
          refreshData(prevState => !prevState);
           } catch(error){
            console.error(error);

           }
         };


         //DELETE
          const handleDelete = async () => {
              try{
                await ArticuloManufacturadoService.deleteProduct(prod.id);
                toast.success("Producto Eliminado con exito", {
                  position: 'top-center',
                });
                onHide();
                refreshData(prevState => !prevState);
              } catch(error){
                console.error(error);
              }
          }
      

    //Yu´p, esquema de validacion.
    const validationSchema = ()=> {
return Yup.object().shape( { 
    id: Yup.number().integer().min(0),
    denominacion: Yup.string().required('El título es requerido'),
    urlImagen: Yup.string().required('El título es requerido'), // Corregido aquí
    precioCompra: Yup.number().required('El precio es requerido'),
    stockActual: Yup.number().required('El Stock actual es requerido'),
    stockMinimo: Yup.number().required('El Stock mínimo es requerido'),
      });
     };

    

     //formik, utiliza el esquema de validacion para crear un formulario dinamico y que bloquee
     //en caso de haber errores

     const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: ArticuloManufacturado) => handleSaveUpdate(obj),
      });
   


  return (
    <>
    {modalType === ModalType.DELETE ?(
        <>
        <Modal show={show} onHide={onHide} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>{denominacion}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              ¿Está seguro que desea eliminar el Producto?
              <br /> <strong>{prod.denominacion}</strong>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    ): (
        <>
        <Modal show={show} onHide={onHide} centered backdrop="static" className ="modal-xl">
        <Modal.Header closeButton>
            <Modal.Title>{denominacion}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <Form onSubmit={formik.handleSubmit}>
                <FormLabel> Denominacion</FormLabel>
                <Form.Control 
                    name="denominacion"
                    type="text"
                    value={formik.values.denominacion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion )}
                    />
                    <Form.Control.Feedback type="invalid">
                  {formik.errors.denominacion}
                </Form.Control.Feedback>

                <Form.Group controlId="forImagen">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  name="urlImagen"
                  type="text"
                  value={formik.values.urlImagen }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.urlImagen}
                </Form.Control.Feedback>
              </Form.Group>

                
                
                      

            

                <Form.Group controlId="forPrecioCompra">
                <Form.Label>Precio Compra</Form.Label>
                <Form.Control
                  name="precioCompra"
                  type="number"
                  value={formik.values.precioCompra }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.precioCompra}
                </Form.Control.Feedback>
              </Form.Group>


              


              <Form.Group controlId="forStockActual">
                <Form.Label>Stock actual</Form.Label>
                <Form.Control
                  name="stockActual"
                  type="number"
                  value={formik.values.stockActual }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.stockActual}
                </Form.Control.Feedback>
              </Form.Group>


              <Form.Group controlId="forStockMinimo">
                <Form.Label>Stock Minimo</Form.Label>
                <Form.Control
                  name="stockMinimo"
                  type="number"
                  value={formik.values.stockMinimo }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.stockMinimo}
                </Form.Control.Feedback>
              </Form.Group>

              <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={!formik.isValid}>
              Guardar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>

        </>
    ) }
    </>
  )
}
export default ProductModal

