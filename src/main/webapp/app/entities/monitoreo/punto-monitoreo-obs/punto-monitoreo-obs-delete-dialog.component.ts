import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPuntoMonitoreoObs } from 'app/shared/model/monitoreo/punto-monitoreo-obs.model';
import { PuntoMonitoreoObsService } from './punto-monitoreo-obs.service';

@Component({
  selector: 'jhi-punto-monitoreo-obs-delete-dialog',
  templateUrl: './punto-monitoreo-obs-delete-dialog.component.html'
})
export class PuntoMonitoreoObsDeleteDialogComponent {
  puntoMonitoreoObs: IPuntoMonitoreoObs;

  constructor(
    protected puntoMonitoreoObsService: PuntoMonitoreoObsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.puntoMonitoreoObsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'puntoMonitoreoObsListModification',
        content: 'Deleted an puntoMonitoreoObs'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-punto-monitoreo-obs-delete-popup',
  template: ''
})
export class PuntoMonitoreoObsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ puntoMonitoreoObs }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PuntoMonitoreoObsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.puntoMonitoreoObs = puntoMonitoreoObs;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/punto-monitoreo-obs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/punto-monitoreo-obs', { outlets: { popup: null } }]);
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
