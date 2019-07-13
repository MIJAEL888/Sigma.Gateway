import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IUnidades } from 'app/shared/model/monitoreo/unidades.model';

@Component({
  selector: 'jhi-unidades-detail',
  templateUrl: './unidades-detail.component.html'
})
export class UnidadesDetailComponent implements OnInit {
  unidades: IUnidades;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ unidades }) => {
      this.unidades = unidades;
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
