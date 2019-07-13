import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';

@Component({
  selector: 'jhi-tipo-servicios-detail',
  templateUrl: './tipo-servicios-detail.component.html'
})
export class TipoServiciosDetailComponent implements OnInit {
  tipoServicios: ITipoServicios;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoServicios }) => {
      this.tipoServicios = tipoServicios;
    });
  }

  previousState() {
    window.history.back();
  }
}
