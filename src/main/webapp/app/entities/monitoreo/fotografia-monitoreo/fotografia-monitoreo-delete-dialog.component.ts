import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFotografiaMonitoreo } from 'app/shared/model/monitoreo/fotografia-monitoreo.model';
import { FotografiaMonitoreoService } from './fotografia-monitoreo.service';

@Component({
  selector: 'jhi-fotografia-monitoreo-delete-dialog',
  templateUrl: './fotografia-monitoreo-delete-dialog.component.html'
})
export class FotografiaMonitoreoDeleteDialogComponent {
  fotografiaMonitoreo: IFotografiaMonitoreo;

  constructor(
    protected fotografiaMonitoreoService: FotografiaMonitoreoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.fotografiaMonitoreoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'fotografiaMonitoreoListModification',
        content: 'Deleted an fotografiaMonitoreo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-fotografia-monitoreo-delete-popup',
  template: ''
})
export class FotografiaMonitoreoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fotografiaMonitoreo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FotografiaMonitoreoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.fotografiaMonitoreo = fotografiaMonitoreo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/fotografia-monitoreo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/fotografia-monitoreo', { outlets: { popup: null } }]);
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
