import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDistrito } from 'app/shared/model/comercial/distrito.model';

@Component({
  selector: 'jhi-distrito-detail',
  templateUrl: './distrito-detail.component.html'
})
export class DistritoDetailComponent implements OnInit {
  distrito: IDistrito;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ distrito }) => {
      this.distrito = distrito;
    });
  }

  previousState() {
    window.history.back();
  }
}
