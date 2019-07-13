import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactoSede } from 'app/shared/model/comercial/contacto-sede.model';
import { ContactoSedeService } from './contacto-sede.service';

@Component({
  selector: 'jhi-contacto-sede-delete-dialog',
  templateUrl: './contacto-sede-delete-dialog.component.html'
})
export class ContactoSedeDeleteDialogComponent {
  contactoSede: IContactoSede;

  constructor(
    protected contactoSedeService: ContactoSedeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contactoSedeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'contactoSedeListModification',
        content: 'Deleted an contactoSede'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-contacto-sede-delete-popup',
  template: ''
})
export class ContactoSedeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contactoSede }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContactoSedeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.contactoSede = contactoSede;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/contacto-sede', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/contacto-sede', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
