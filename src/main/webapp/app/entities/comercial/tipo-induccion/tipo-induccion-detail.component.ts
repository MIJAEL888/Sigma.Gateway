import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';

@Component({
  selector: 'jhi-tipo-induccion-detail',
  templateUrl: './tipo-induccion-detail.component.html'
})
export class TipoInduccionDetailComponent implements OnInit {
  tipoInduccion: ITipoInduccion;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoInduccion }) => {
      this.tipoInduccion = tipoInduccion;
    });
  }

  previousState() {
    window.history.back();
  }
}
