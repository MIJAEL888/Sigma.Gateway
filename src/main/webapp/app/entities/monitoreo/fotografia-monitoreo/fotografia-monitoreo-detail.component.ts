import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';

@Component({
  selector: 'jhi-fotografia-monitoreo-detail',
  templateUrl: './fotografia-monitoreo-detail.component.html'
})
export class FotografiaMonitoreoDetailComponent implements OnInit {
  fotografiaMonitoreo: IFotografiaMonitoreo;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fotografiaMonitoreo }) => {
      this.fotografiaMonitoreo = fotografiaMonitoreo;
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
