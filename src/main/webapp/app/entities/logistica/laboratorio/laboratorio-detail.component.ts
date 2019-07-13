import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILaboratorio } from 'app/shared/model/logistica/laboratorio.model';

@Component({
  selector: 'jhi-laboratorio-detail',
  templateUrl: './laboratorio-detail.component.html'
})
export class LaboratorioDetailComponent implements OnInit {
  laboratorio: ILaboratorio;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ laboratorio }) => {
      this.laboratorio = laboratorio;
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
