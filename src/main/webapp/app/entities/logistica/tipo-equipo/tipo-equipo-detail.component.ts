import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';

@Component({
  selector: 'jhi-tipo-equipo-detail',
  templateUrl: './tipo-equipo-detail.component.html'
})
export class TipoEquipoDetailComponent implements OnInit {
  tipoEquipo: ITipoEquipo;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoEquipo }) => {
      this.tipoEquipo = tipoEquipo;
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
