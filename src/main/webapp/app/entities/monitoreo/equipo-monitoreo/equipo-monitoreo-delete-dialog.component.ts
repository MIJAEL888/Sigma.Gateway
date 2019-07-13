import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEquipoMonitoreo } from 'app/shared/model/monitoreo/equipo-monitoreo.model';
import { EquipoMonitoreoService } from './equipo-monitoreo.service';

@Component({
  selector: 'jhi-equipo-monitoreo-delete-dialog',
  templateUrl: './equipo-monitoreo-delete-dialog.component.html'
})
export class EquipoMonitoreoDeleteDialogComponent {
  equipoMonitoreo: IEquipoMonitoreo;

  constructor(
    protected equipoMonitoreoService: EquipoMonitoreoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.equipoMonitoreoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'equipoMonitoreoListModification',
        content: 'Deleted an equipoMonitoreo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-equipo-monitoreo-delete-popup',
  template: ''
})
export class EquipoMonitoreoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ equipoMonitoreo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EquipoMonitoreoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.equipoMonitoreo = equipoMonitoreo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/equipo-monitoreo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/equipo-monitoreo', { outlets: { popup: null } }]);
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
