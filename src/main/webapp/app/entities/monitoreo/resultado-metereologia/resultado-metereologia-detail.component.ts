import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';

@Component({
  selector: 'jhi-resultado-metereologia-detail',
  templateUrl: './resultado-metereologia-detail.component.html'
})
export class ResultadoMetereologiaDetailComponent implements OnInit {
  resultadoMetereologia: IResultadoMetereologia;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ resultadoMetereologia }) => {
      this.resultadoMetereologia = resultadoMetereologia;
    });
  }

  previousState() {
    window.history.back();
  }
}
