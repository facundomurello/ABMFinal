import { ArticuloManufacturado } from "../types/ArticuloManufacturado"

const BASE_URL ='http://localhost:8080/api/v1';

export const ArticuloManufacturadoService = {


    //aca declaramos nuestros metodos
    //Sintaxis es fetch(url, optiosns). En options ponemos get, post, put, delete, etc.

    getArticulos: async(): Promise<ArticuloManufacturado[]>=>{
        const response = await fetch(`${BASE_URL}/articulosinsumos`)
        const data = await response.json();

        return data;
    },

    getArticulo: async(id: number): Promise<ArticuloManufacturado[]>=>{
        const response = await fetch(`${BASE_URL}/articulosinsumos/id`)
        const data = await response.json();

        return data;
    },

    createArticuloManufacturado: async (articulomanufacturado: ArticuloManufacturado): Promise<ArticuloManufacturado[]> =>{
        const response = await fetch(`${BASE_URL}/articulosinsumos`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulomanufacturado)
        });
        const data = await response.json();
        return data;
    },

    updateProduct: async(id: number, articulomanufacturado: ArticuloManufacturado): Promise<ArticuloManufacturado[]> => {
        const response = await fetch(`${BASE_URL}/articulosinsumos/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(articulomanufacturado)
        });
        const data = await response.json();
        return data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/articulosinsumos/${id}`, {
            method: "DELETE"
        });
    }







}
