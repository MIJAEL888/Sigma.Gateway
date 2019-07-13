import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPosicion } from 'app/shared/model/rrhh/posicion.model';
import { PosicionService } from './posicion.service';

@Component({
  selector: 'jhi-posicion-delete-dialog',
  templateUrl: './posicion-delete-dialog.component.html'
})
export class PosicionDeleteDialogComponent {
  posicion: IPosicion;

  constructor(protected posicionService: PosicionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.posicionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'posicionListModification',
        content: 'Deleted an posicion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-posicion-delete-popup',
  template: ''
})
export class PosicionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ posicion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PosicionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.posicion = posicion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/posicion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/posicion', { outlets: { popup: null } }]);
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
