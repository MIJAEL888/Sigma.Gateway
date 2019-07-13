import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoEquipo } from 'app/shared/model/logistica/tipo-equipo.model';
import { TipoEquipoService } from './tipo-equipo.service';

@Component({
  selector: 'jhi-tipo-equipo-delete-dialog',
  templateUrl: './tipo-equipo-delete-dialog.component.html'
})
export class TipoEquipoDeleteDialogComponent {
  tipoEquipo: ITipoEquipo;

  constructor(
    protected tipoEquipoService: TipoEquipoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoEquipoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoEquipoListModification',
        content: 'Deleted an tipoEquipo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-equipo-delete-popup',
  template: ''
})
export class TipoEquipoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoEquipo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoEquipoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoEquipo = tipoEquipo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-equipo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-equipo', { outlets: { popup: null } }]);
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
