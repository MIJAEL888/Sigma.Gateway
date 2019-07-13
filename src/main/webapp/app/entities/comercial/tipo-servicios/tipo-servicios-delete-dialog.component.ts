import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoServicios } from 'app/shared/model/comercial/tipo-servicios.model';
import { TipoServiciosService } from './tipo-servicios.service';

@Component({
  selector: 'jhi-tipo-servicios-delete-dialog',
  templateUrl: './tipo-servicios-delete-dialog.component.html'
})
export class TipoServiciosDeleteDialogComponent {
  tipoServicios: ITipoServicios;

  constructor(
    protected tipoServiciosService: TipoServiciosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoServiciosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoServiciosListModification',
        content: 'Deleted an tipoServicios'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-servicios-delete-popup',
  template: ''
})
export class TipoServiciosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoServicios }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoServiciosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoServicios = tipoServicios;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-servicios', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-servicios', { outlets: { popup: null } }]);
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
