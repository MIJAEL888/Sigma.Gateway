import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';

@Component({
  selector: 'jhi-equipo-monitoreo-detail',
  templateUrl: './equipo-monitoreo-detail.component.html'
})
export class EquipoMonitoreoDetailComponent implements OnInit {
  equipoMonitoreo: IEquipoMonitoreo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ equipoMonitoreo }) => {
      this.equipoMonitoreo = equipoMonitoreo;
    });
  }

  previousState() {
    window.history.back();
  }
}
