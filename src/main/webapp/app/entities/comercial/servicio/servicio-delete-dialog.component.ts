import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServicio } from 'app/shared/model/comercial/servicio.model';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'jhi-servicio-delete-dialog',
  templateUrl: './servicio-delete-dialog.component.html'
})
export class ServicioDeleteDialogComponent {
  servicio: IServicio;

  constructor(protected servicioService: ServicioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.servicioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'servicioListModification',
        content: 'Deleted an servicio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-servicio-delete-popup',
  template: ''
})
export class ServicioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ servicio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ServicioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.servicio = servicio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/servicio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/servicio', { outlets: { popup: null } }]);
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
