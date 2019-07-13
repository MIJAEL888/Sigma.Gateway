import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { INormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';

@Component({
  selector: 'jhi-norma-calidad-detail',
  templateUrl: './norma-calidad-detail.component.html'
})
export class NormaCalidadDetailComponent implements OnInit {
  normaCalidad: INormaCalidad;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ normaCalidad }) => {
      this.normaCalidad = normaCalidad;
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
