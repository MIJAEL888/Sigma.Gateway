import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IComponente } from 'app/shared/model/monitoreo/componente.model';

@Component({
  selector: 'jhi-componente-detail',
  templateUrl: './componente-detail.component.html'
})
export class ComponenteDetailComponent implements OnInit {
  componente: IComponente;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ componente }) => {
      this.componente = componente;
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
