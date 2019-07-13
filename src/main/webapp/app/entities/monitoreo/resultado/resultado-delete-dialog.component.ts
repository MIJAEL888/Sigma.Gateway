import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResultado } from 'app/shared/model/monitoreo/resultado.model';
import { ResultadoService } from './resultado.service';

@Component({
  selector: 'jhi-resultado-delete-dialog',
  templateUrl: './resultado-delete-dialog.component.html'
})
export class ResultadoDeleteDialogComponent {
  resultado: IResultado;

  constructor(protected resultadoService: ResultadoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.resultadoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'resultadoListModification',
        content: 'Deleted an resultado'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-resultado-delete-popup',
  template: ''
})
export class ResultadoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ resultado }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ResultadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.resultado = resultado;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/resultado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/resultado', { outlets: { popup: null } }]);
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
