import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';

@Component({
  selector: 'jhi-paramentro-monitoreo-detail',
  templateUrl: './paramentro-monitoreo-detail.component.html'
})
export class ParamentroMonitoreoDetailComponent implements OnInit {
  paramentroMonitoreo: IParamentroMonitoreo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramentroMonitoreo }) => {
      this.paramentroMonitoreo = paramentroMonitoreo;
    });
  }

  previousState() {
    window.history.back();
  }
}
