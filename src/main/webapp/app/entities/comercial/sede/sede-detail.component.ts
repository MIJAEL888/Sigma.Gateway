import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISede } from 'app/shared/model/comercial/sede.model';

@Component({
  selector: 'jhi-sede-detail',
  templateUrl: './sede-detail.component.html'
})
export class SedeDetailComponent implements OnInit {
  sede: ISede;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sede }) => {
      this.sede = sede;
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
