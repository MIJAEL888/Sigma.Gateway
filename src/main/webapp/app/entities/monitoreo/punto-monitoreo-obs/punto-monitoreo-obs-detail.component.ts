import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';

@Component({
  selector: 'jhi-punto-monitoreo-obs-detail',
  templateUrl: './punto-monitoreo-obs-detail.component.html'
})
export class PuntoMonitoreoObsDetailComponent implements OnInit {
  puntoMonitoreoObs: IPuntoMonitoreoObs;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ puntoMonitoreoObs }) => {
      this.puntoMonitoreoObs = puntoMonitoreoObs;
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
