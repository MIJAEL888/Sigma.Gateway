import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILaboratorio } from 'app/shared/model/logistica/laboratorio.model';
import { LaboratorioService } from './laboratorio.service';

@Component({
  selector: 'jhi-laboratorio-delete-dialog',
  templateUrl: './laboratorio-delete-dialog.component.html'
})
export class LaboratorioDeleteDialogComponent {
  laboratorio: ILaboratorio;

  constructor(
    protected laboratorioService: LaboratorioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.laboratorioService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'laboratorioListModification',
        content: 'Deleted an laboratorio'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-laboratorio-delete-popup',
  template: ''
})
export class LaboratorioDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ laboratorio }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LaboratorioDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.laboratorio = laboratorio;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/laboratorio', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/laboratorio', { outlets: { popup: null } }]);
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
