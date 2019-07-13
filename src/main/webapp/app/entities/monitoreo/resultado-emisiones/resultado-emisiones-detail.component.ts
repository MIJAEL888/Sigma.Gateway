import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';

@Component({
  selector: 'jhi-resultado-emisiones-detail',
  templateUrl: './resultado-emisiones-detail.component.html'
})
export class ResultadoEmisionesDetailComponent implements OnInit {
  resultadoEmisiones: IResultadoEmisiones;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ resultadoEmisiones }) => {
      this.resultadoEmisiones = resultadoEmisiones;
    });
  }

  previousState() {
    window.history.back();
  }
}
