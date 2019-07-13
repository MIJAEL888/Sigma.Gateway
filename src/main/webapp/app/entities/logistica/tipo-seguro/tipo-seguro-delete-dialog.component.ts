import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoSeguro } from 'app/shared/model/logistica/tipo-seguro.model';
import { TipoSeguroService } from './tipo-seguro.service';

@Component({
  selector: 'jhi-tipo-seguro-delete-dialog',
  templateUrl: './tipo-seguro-delete-dialog.component.html'
})
export class TipoSeguroDeleteDialogComponent {
  tipoSeguro: ITipoSeguro;

  constructor(
    protected tipoSeguroService: TipoSeguroService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoSeguroService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoSeguroListModification',
        content: 'Deleted an tipoSeguro'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-seguro-delete-popup',
  template: ''
})
export class TipoSeguroDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoSeguro }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoSeguroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoSeguro = tipoSeguro;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-seguro', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-seguro', { outlets: { popup: null } }]);
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
