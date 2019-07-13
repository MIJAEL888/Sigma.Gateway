import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IFotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';

@Component({
  selector: 'jhi-fotografia-punto-detail',
  templateUrl: './fotografia-punto-detail.component.html'
})
export class FotografiaPuntoDetailComponent implements OnInit {
  fotografiaPunto: IFotografiaPunto;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fotografiaPunto }) => {
      this.fotografiaPunto = fotografiaPunto;
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
