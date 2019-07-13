import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactoSede } from 'app/shared/model/comercial/contacto-sede.model';

@Component({
  selector: 'jhi-contacto-sede-detail',
  templateUrl: './contacto-sede-detail.component.html'
})
export class ContactoSedeDetailComponent implements OnInit {
  contactoSede: IContactoSede;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contactoSede }) => {
      this.contactoSede = contactoSede;
    });
  }

  previousState() {
    window.history.back();
  }
}
