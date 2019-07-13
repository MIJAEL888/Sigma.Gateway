import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';

@Component({
  selector: 'jhi-paramentro-detail',
  templateUrl: './paramentro-detail.component.html'
})
export class ParamentroDetailComponent implements OnInit {
  paramentro: IParamentro;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramentro }) => {
      this.paramentro = paramentro;
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
