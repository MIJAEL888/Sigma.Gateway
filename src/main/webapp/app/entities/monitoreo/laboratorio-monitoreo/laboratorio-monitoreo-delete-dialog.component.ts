import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILaboratorioMonitoreo } from 'app/shared/model/monitoreo/laboratorio-monitoreo.model';
import { LaboratorioMonitoreoService } from './laboratorio-monitoreo.service';

@Component({
  selector: 'jhi-laboratorio-monitoreo-delete-dialog',
  templateUrl: './laboratorio-monitoreo-delete-dialog.component.html'
})
export class LaboratorioMonitoreoDeleteDialogComponent {
  laboratorioMonitoreo: ILaboratorioMonitoreo;

  constructor(
    protected laboratorioMonitoreoService: LaboratorioMonitoreoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.laboratorioMonitoreoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'laboratorioMonitoreoListModification',
        content: 'Deleted an laboratorioMonitoreo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-laboratorio-monitoreo-delete-popup',
  template: ''
})
export class LaboratorioMonitoreoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ laboratorioMonitoreo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LaboratorioMonitoreoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.laboratorioMonitoreo = laboratorioMonitoreo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/laboratorio-monitoreo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/laboratorio-monitoreo', { outlets: { popup: null } }]);
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
