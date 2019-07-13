import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPosicion } from 'app/shared/model/rrhh/posicion.model';

@Component({
  selector: 'jhi-posicion-detail',
  templateUrl: './posicion-detail.component.html'
})
export class PosicionDetailComponent implements OnInit {
  posicion: IPosicion;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ posicion }) => {
      this.posicion = posicion;
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
