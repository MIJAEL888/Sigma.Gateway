import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IObservacion } from 'app/shared/model/monitoreo/observacion.model';

@Component({
  selector: 'jhi-observacion-detail',
  templateUrl: './observacion-detail.component.html'
})
export class ObservacionDetailComponent implements OnInit {
  observacion: IObservacion;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ observacion }) => {
      this.observacion = observacion;
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
