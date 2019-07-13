import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEquipo } from 'app/shared/model/logistica/equipo.model';
import { EquipoService } from './equipo.service';

@Component({
  selector: 'jhi-equipo-delete-dialog',
  templateUrl: './equipo-delete-dialog.component.html'
})
export class EquipoDeleteDialogComponent {
  equipo: IEquipo;

  constructor(protected equipoService: EquipoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.equipoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'equipoListModification',
        content: 'Deleted an equipo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-equipo-delete-popup',
  template: ''
})
export class EquipoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ equipo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EquipoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.equipo = equipo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/equipo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/equipo', { outlets: { popup: null } }]);
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
