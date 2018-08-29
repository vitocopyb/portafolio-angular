import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable()
export class ProductosService {
    cargando = true;
    productos: Producto[] = [];
    productosFiltrado: Producto[] = [];

    constructor(private http: HttpClient) {
        this.cargarProductos();
    }

    private cargarProductos() {
        return new Promise((resolve, reject) => {
            this.http.get('https://fotos-325c3.firebaseio.com/productos_idx.json')
                .subscribe((resp: Producto[]) => {
                    this.productos = resp;
                    this.cargando = false;
                    resolve();
                });
        });
    }

    getProducto(id: string) {
        return this.http.get(`https://fotos-325c3.firebaseio.com/productos/${ id }.json`);
    }

    buscarProducto(termino: string) {
        if (this.productos.length === 0) {
            // carga productos
            this.cargarProductos().then(() => {
                // aplica filtro
                this.filtrarProductos(termino);
            });
        } else {
            // aplica filtro
            this.filtrarProductos(termino);
        }
    }

    private filtrarProductos(termino: string) {
        this.productosFiltrado = [];
        termino = termino.toLocaleLowerCase();

        this.productos.forEach(prod => {
            const titulo = prod.titulo.toLocaleLowerCase();

            if ( (prod.categoria.indexOf(termino) >= 0) || (titulo.indexOf(termino) >= 0) ) {
                this.productosFiltrado.push(prod);
            }
        });
    }

}

