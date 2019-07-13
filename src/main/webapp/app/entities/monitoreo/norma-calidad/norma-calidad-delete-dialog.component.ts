import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INormaCalidad } from 'app/shared/model/monitoreo/norma-calidad.model';
import { NormaCalidadService } from './norma-calidad.service';

@Component({
  selector: 'jhi-norma-calidad-delete-dialog',
  templateUrl: './norma-calidad-delete-dialog.component.html'
})
export class NormaCalidadDeleteDialogComponent {
  normaCalidad: INormaCalidad;

  constructor(
    protected normaCalidadService: NormaCalidadService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.normaCalidadService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'normaCalidadListModification',
        content: 'Deleted an normaCalidad'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-norma-calidad-delete-popup',
  template: ''
})
export class NormaCalidadDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ normaCalidad }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(NormaCalidadDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.normaCalidad = normaCalidad;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/norma-calidad', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/norma-calidad', { outlets: { popup: null } }]);
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
