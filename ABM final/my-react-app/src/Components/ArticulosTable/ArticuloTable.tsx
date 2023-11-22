import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ModalType } from "../../types/ModalType";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import { Button, Form, Table } from "react-bootstrap";
import ProductModal from "../ProductModal/ProductModal";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";


const ProductTable = () => {
    const [articulos, setArticulos] = useState<ArticuloManufacturado[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    //variable que actualiza datos de la tabla
    const[refresData, setRefreshData] = useState(false);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const articulos = await ArticuloManufacturadoService.getArticulos();
          setArticulos(articulos);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      fetchProducts();
    }, [refresData]);
  
    const initializeNewProduct = (): ArticuloManufacturado => {
      return {
        id: 0,
        denominacion: "",
        urlImagen: "",
        precioCompra: 0,
        stockActual: 0,
        stockMinimo: 0,
        
      };
    };
  
    const [selectedProduct, setSelectedProduct] = useState<ArticuloManufacturado>(initializeNewProduct());
  
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [denominacion, setDenominacion] = useState("");
  
    const handleClick = (newDenominacion: string, art: ArticuloManufacturado, modal: ModalType) => {
      setDenominacion(newDenominacion);
      setModalType(modal);
      setSelectedProduct(art);
      setShowModal(true);
    };
  
    const handleDeleteProduct = async (ArticuloManufacturado: ArticuloManufacturado) => {
      try {
        await ArticuloManufacturadoService.deleteProduct(ArticuloManufacturado.id);
        const updatedArticulo = articulos.filter((p) => p.id !== ArticuloManufacturado.id);
        setArticulos(updatedArticulo);
      } catch (error) {
        console.error(error);
      }
      setShowModal(false);
    };
  
    const handleUpdateProduct = (updatedProduct: ArticuloManufacturado) => {
      try {
        const updatedProducts =articulos.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        );
        setArticulos(updatedProducts);
      } catch (error) {
        console.error(error);
      }
      setShowModal(false);
    };
  
    return (
      <>
  
  <div className="container">
        <div className="row">
          <div className="col-3">
            <Button variant="warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="me-2">
                <path d="M11.5998 21.6673C16.9385 21.6673 21.2664 17.3394 21.2664 12.0007C21.2664 6.6619 16.9385 2.33398 11.5998 2.33398C6.26102 2.33398 1.93311 6.6619 1.93311 12.0007C1.93311 17.3394 6.26102 21.6673 11.5998 21.6673Z" stroke="white" strokeWidth="1.45" />
                <path d="M15.4667 11.9996H7.7334M7.7334 11.9996L10.6334 9.09961M7.7334 11.9996L10.6334 14.8996" stroke="white" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Volver
            </Button>
          </div>
          <div className=" row col-5 d-flex justify-content-center align-items-center">
            <Button variant="warning">Articulos</Button>
          </div>
        </div>
      </div>
  
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Button variant="success" className="mt-4" onClick={() => handleClick("Nuevo Producto", initializeNewProduct(), ModalType.CREATE)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 49 49" fill="none" className="me-2">
                      <path d="M44.9167 24.5002C44.9167 28.5382 43.7193 32.4855 41.4759 35.8431C39.2325 39.2006 36.0438 41.8174 32.3131 43.3627C28.5826 44.9081 24.4774 45.3123 20.517 44.5246C16.5565 43.7367 12.9186 41.7923 10.0633 38.937C7.20797 36.0815 5.26347 32.4437 4.47569 28.4833C3.68789 24.5228 4.09223 20.4176 5.6375 16.6871C7.1828 12.9564 9.79966 9.76774 13.1572 7.52432C16.5147 5.28091 20.462 4.0835 24.5001 4.0835" stroke="white" stroke-width="3.0625" stroke-linecap="round"/>
                      <path d="M30.625 24.5H24.5M24.5 24.5H18.375M24.5 24.5V18.375M24.5 24.5V30.625" stroke="white" stroke-width="3.0625" stroke-linecap="round"/>
                      <path d="M29.6041 4.72656C36.7785 6.57315 42.4268 12.2214 44.2735 19.3959" stroke="white" stroke-width="3.0625" stroke-linecap="round"/>
                    </svg>
                    Nuevo
            </Button>
          </div>
          <div className="col-8 mt-1 mb-0 d-flex justify-content-end align-items-center">
            <Form className="d-flex justify-content-start align-items-center me-4">
              <img src="src/assets/Componentes/Lupita.svg" alt="Lupa" />
            </Form>
          </div>
        </div>
      </div>
  
          <Table className="container mt-4">
          <thead>
                    <tr className="table-secondary">
                      <th scope="col" className="col-3">Denominacion</th>
                      <th scope="col" className="col-3">Stock Actual</th>
                      <th scope="col" className="col-3 pe-3">Url Imagen</th>
                      <th scope="col" className="px-4">Acciones</th>
                    </tr>
          </thead>
  
                  <tbody>
              {articulos.map((articulos) => (
                <tr key={articulos.id}>
                  <td>{articulos.denominacion}</td>
                  <td>{articulos.urlImagen}</td>
                  <td>{articulos.precioCompra}</td>
                  <td>{articulos.stockActual}</td>
                  <td>{articulos.stockMinimo}</td>
                  <td scope="col" className="px-4">
                    <EditButton 
                      onClick={() =>
                        handleClick("Editar Producto", articulos, ModalType.UPDATE)
                      }
                    
                     />
                     
                    <DeleteButton
                      onClick={() =>
                        handleClick("Borrar Producto", articulos, ModalType.DELETE)
                      }
                    
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
        {showModal && (
          <ProductModal
            show={showModal}
            onHide={() => setShowModal(false)}
            denominacion={denominacion}
            modalType={modalType}
            prod={selectedProduct}
            refreshData={setRefreshData}
            
          />
        )}
      </>
    );
  };
  
  export default ProductTable;