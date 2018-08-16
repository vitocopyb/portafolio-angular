import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable()
export class InfoPaginaService {
    info: InfoPagina = {};
    cargada = false;

    constructor(private http: HttpClient) {
        // lee el archivo JSON
        this.http.get('assets/data/data-pagina.json')
            .subscribe((resp: InfoPagina) => {
                console.log(resp);
                this.cargada = true;
                this.info = resp;
        });
    }
}
