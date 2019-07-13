import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUnidades } from 'app/shared/model/monitoreo/unidades.model';
import { UnidadesService } from './unidades.service';

@Component({
  selector: 'jhi-unidades-delete-dialog',
  templateUrl: './unidades-delete-dialog.component.html'
})
export class UnidadesDeleteDialogComponent {
  unidades: IUnidades;

  constructor(protected unidadesService: UnidadesService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.unidadesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'unidadesListModification',
        content: 'Deleted an unidades'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-unidades-delete-popup',
  template: ''
})
export class UnidadesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ unidades }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(UnidadesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.unidades = unidades;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/unidades', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/unidades', { outlets: { popup: null } }]);
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
