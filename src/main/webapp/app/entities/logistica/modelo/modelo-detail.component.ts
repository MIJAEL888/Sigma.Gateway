import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IModelo } from 'app/shared/model/logistica/modelo.model';

@Component({
  selector: 'jhi-modelo-detail',
  templateUrl: './modelo-detail.component.html'
})
export class ModeloDetailComponent implements OnInit {
  modelo: IModelo;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ modelo }) => {
      this.modelo = modelo;
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
