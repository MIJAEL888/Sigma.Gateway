import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IEquipo } from 'app/shared/model/logistica/equipo.model';

@Component({
  selector: 'jhi-equipo-detail',
  templateUrl: './equipo-detail.component.html'
})
export class EquipoDetailComponent implements OnInit {
  equipo: IEquipo;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ equipo }) => {
      this.equipo = equipo;
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
