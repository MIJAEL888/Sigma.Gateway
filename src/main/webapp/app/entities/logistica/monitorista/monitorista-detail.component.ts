import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMonitorista } from 'app/shared/model/logistica/monitorista.model';

@Component({
  selector: 'jhi-monitorista-detail',
  templateUrl: './monitorista-detail.component.html'
})
export class MonitoristaDetailComponent implements OnInit {
  monitorista: IMonitorista;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ monitorista }) => {
      this.monitorista = monitorista;
    });
  }

  previousState() {
    window.history.back();
  }
}
