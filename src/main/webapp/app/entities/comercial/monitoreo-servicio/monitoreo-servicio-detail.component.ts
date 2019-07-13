import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonitoreoServicio } from 'app/shared/model/comercial/monitoreo-servicio.model';

@Component({
  selector: 'jhi-monitoreo-servicio-detail',
  templateUrl: './monitoreo-servicio-detail.component.html'
})
export class MonitoreoServicioDetailComponent implements OnInit {
  monitoreoServicio: IMonitoreoServicio;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ monitoreoServicio }) => {
      this.monitoreoServicio = monitoreoServicio;
    });
  }

  previousState() {
    window.history.back();
  }
}
