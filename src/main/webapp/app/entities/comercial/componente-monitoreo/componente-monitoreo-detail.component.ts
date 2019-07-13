import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';

@Component({
  selector: 'jhi-componente-monitoreo-detail',
  templateUrl: './componente-monitoreo-detail.component.html'
})
export class ComponenteMonitoreoDetailComponent implements OnInit {
  componenteMonitoreo: IComponenteMonitoreo;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ componenteMonitoreo }) => {
      this.componenteMonitoreo = componenteMonitoreo;
    });
  }

  previousState() {
    window.history.back();
  }
}
