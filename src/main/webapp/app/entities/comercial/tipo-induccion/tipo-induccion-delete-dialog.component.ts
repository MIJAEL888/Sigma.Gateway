import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoInduccion } from 'app/shared/model/comercial/tipo-induccion.model';
import { TipoInduccionService } from './tipo-induccion.service';

@Component({
  selector: 'jhi-tipo-induccion-delete-dialog',
  templateUrl: './tipo-induccion-delete-dialog.component.html'
})
export class TipoInduccionDeleteDialogComponent {
  tipoInduccion: ITipoInduccion;

  constructor(
    protected tipoInduccionService: TipoInduccionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoInduccionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoInduccionListModification',
        content: 'Deleted an tipoInduccion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-induccion-delete-popup',
  template: ''
})
export class TipoInduccionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoInduccion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoInduccionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoInduccion = tipoInduccion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-induccion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-induccion', { outlets: { popup: null } }]);
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
