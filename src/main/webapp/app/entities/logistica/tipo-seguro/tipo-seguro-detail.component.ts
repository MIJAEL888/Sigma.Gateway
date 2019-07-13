import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ITipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';

@Component({
  selector: 'jhi-tipo-seguro-detail',
  templateUrl: './tipo-seguro-detail.component.html'
})
export class TipoSeguroDetailComponent implements OnInit {
  tipoSeguro: ITipoSeguro;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoSeguro }) => {
      this.tipoSeguro = tipoSeguro;
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
