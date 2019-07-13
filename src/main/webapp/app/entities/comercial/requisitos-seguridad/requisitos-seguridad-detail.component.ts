import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';

@Component({
  selector: 'jhi-requisitos-seguridad-detail',
  templateUrl: './requisitos-seguridad-detail.component.html'
})
export class RequisitosSeguridadDetailComponent implements OnInit {
  requisitosSeguridad: IRequisitosSeguridad;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ requisitosSeguridad }) => {
      this.requisitosSeguridad = requisitosSeguridad;
    });
  }

  previousState() {
    window.history.back();
  }
}
