import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRequisitosSeguridad } from 'app/shared/model/comercial/requisitos-seguridad.model';
import { RequisitosSeguridadService } from './requisitos-seguridad.service';

@Component({
  selector: 'jhi-requisitos-seguridad-delete-dialog',
  templateUrl: './requisitos-seguridad-delete-dialog.component.html'
})
export class RequisitosSeguridadDeleteDialogComponent {
  requisitosSeguridad: IRequisitosSeguridad;

  constructor(
    protected requisitosSeguridadService: RequisitosSeguridadService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.requisitosSeguridadService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'requisitosSeguridadListModification',
        content: 'Deleted an requisitosSeguridad'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-requisitos-seguridad-delete-popup',
  template: ''
})
export class RequisitosSeguridadDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ requisitosSeguridad }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(RequisitosSeguridadDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.requisitosSeguridad = requisitosSeguridad;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/requisitos-seguridad', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/requisitos-seguridad', { outlets: { popup: null } }]);
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
