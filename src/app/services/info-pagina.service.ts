import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable()
export class InfoPaginaService {
    info: InfoPagina = {};
    cargada = false;
    equipo: any[] = [];

    constructor(private http: HttpClient) {
        this.cargarInfo();
        this.cargarEquipo();
    }

    private cargarInfo() {
        // lee el archivo JSON
        this.http.get('assets/data/data-pagina.json')
            .subscribe((resp: InfoPagina) => {
                this.cargada = true;
                this.info = resp;
        });
    }

    private cargarEquipo() {
        // lee el archivo JSON
        this.http.get('https://fotos-325c3.firebaseio.com/equipo.json')
            .subscribe((resp: any[]) => {
                this.equipo = resp;
        });
    }

}
