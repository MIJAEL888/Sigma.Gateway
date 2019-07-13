import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResultadoEmisiones } from 'app/shared/model/monitoreo/resultado-emisiones.model';
import { ResultadoEmisionesService } from './resultado-emisiones.service';

@Component({
  selector: 'jhi-resultado-emisiones-delete-dialog',
  templateUrl: './resultado-emisiones-delete-dialog.component.html'
})
export class ResultadoEmisionesDeleteDialogComponent {
  resultadoEmisiones: IResultadoEmisiones;

  constructor(
    protected resultadoEmisionesService: ResultadoEmisionesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.resultadoEmisionesService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'resultadoEmisionesListModification',
        content: 'Deleted an resultadoEmisiones'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-resultado-emisiones-delete-popup',
  template: ''
})
export class ResultadoEmisionesDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ resultadoEmisiones }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ResultadoEmisionesDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.resultadoEmisiones = resultadoEmisiones;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/resultado-emisiones', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/resultado-emisiones', { outlets: { popup: null } }]);
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
