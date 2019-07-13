import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResultadoMetereologia } from 'app/shared/model/monitoreo/resultado-metereologia.model';
import { ResultadoMetereologiaService } from './resultado-metereologia.service';

@Component({
  selector: 'jhi-resultado-metereologia-delete-dialog',
  templateUrl: './resultado-metereologia-delete-dialog.component.html'
})
export class ResultadoMetereologiaDeleteDialogComponent {
  resultadoMetereologia: IResultadoMetereologia;

  constructor(
    protected resultadoMetereologiaService: ResultadoMetereologiaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.resultadoMetereologiaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'resultadoMetereologiaListModification',
        content: 'Deleted an resultadoMetereologia'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-resultado-metereologia-delete-popup',
  template: ''
})
export class ResultadoMetereologiaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ resultadoMetereologia }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ResultadoMetereologiaDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.resultadoMetereologia = resultadoMetereologia;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/resultado-metereologia', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/resultado-metereologia', { outlets: { popup: null } }]);
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
