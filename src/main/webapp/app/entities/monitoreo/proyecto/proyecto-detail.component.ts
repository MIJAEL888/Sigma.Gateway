import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProyecto } from 'app/shared/model/monitoreo/proyecto.model';

@Component({
  selector: 'jhi-proyecto-detail',
  templateUrl: './proyecto-detail.component.html'
})
export class ProyectoDetailComponent implements OnInit {
  proyecto: IProyecto;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ proyecto }) => {
      this.proyecto = proyecto;
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
