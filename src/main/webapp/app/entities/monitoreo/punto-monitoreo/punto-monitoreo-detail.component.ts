import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';

@Component({
  selector: 'jhi-punto-monitoreo-detail',
  templateUrl: './punto-monitoreo-detail.component.html'
})
export class PuntoMonitoreoDetailComponent implements OnInit {
  puntoMonitoreo: IPuntoMonitoreo;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ puntoMonitoreo }) => {
      this.puntoMonitoreo = puntoMonitoreo;
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
