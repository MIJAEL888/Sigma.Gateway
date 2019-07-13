import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';

@Component({
  selector: 'jhi-laboratorio-monitoreo-detail',
  templateUrl: './laboratorio-monitoreo-detail.component.html'
})
export class LaboratorioMonitoreoDetailComponent implements OnInit {
  laboratorioMonitoreo: ILaboratorioMonitoreo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ laboratorioMonitoreo }) => {
      this.laboratorioMonitoreo = laboratorioMonitoreo;
    });
  }

  previousState() {
    window.history.back();
  }
}
