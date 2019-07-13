import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IServicio } from 'app/shared/model/comercial/servicio.model';

@Component({
  selector: 'jhi-servicio-detail',
  templateUrl: './servicio-detail.component.html'
})
export class ServicioDetailComponent implements OnInit {
  servicio: IServicio;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ servicio }) => {
      this.servicio = servicio;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
