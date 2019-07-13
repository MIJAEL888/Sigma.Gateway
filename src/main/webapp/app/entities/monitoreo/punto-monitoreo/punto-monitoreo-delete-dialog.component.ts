import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPuntoMonitoreo } from 'app/shared/model/monitoreo/punto-monitoreo.model';
import { PuntoMonitoreoService } from './punto-monitoreo.service';

@Component({
  selector: 'jhi-punto-monitoreo-delete-dialog',
  templateUrl: './punto-monitoreo-delete-dialog.component.html'
})
export class PuntoMonitoreoDeleteDialogComponent {
  puntoMonitoreo: IPuntoMonitoreo;

  constructor(
    protected puntoMonitoreoService: PuntoMonitoreoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.puntoMonitoreoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'puntoMonitoreoListModification',
        content: 'Deleted an puntoMonitoreo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-punto-monitoreo-delete-popup',
  template: ''
})
export class PuntoMonitoreoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ puntoMonitoreo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PuntoMonitoreoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.puntoMonitoreo = puntoMonitoreo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/punto-monitoreo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/punto-monitoreo', { outlets: { popup: null } }]);
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
