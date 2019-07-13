import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParamentroMonitoreo } from 'app/shared/model/comercial/paramentro-monitoreo.model';
import { ParamentroMonitoreoService } from './paramentro-monitoreo.service';

@Component({
  selector: 'jhi-paramentro-monitoreo-delete-dialog',
  templateUrl: './paramentro-monitoreo-delete-dialog.component.html'
})
export class ParamentroMonitoreoDeleteDialogComponent {
  paramentroMonitoreo: IParamentroMonitoreo;

  constructor(
    protected paramentroMonitoreoService: ParamentroMonitoreoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paramentroMonitoreoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paramentroMonitoreoListModification',
        content: 'Deleted an paramentroMonitoreo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-paramentro-monitoreo-delete-popup',
  template: ''
})
export class ParamentroMonitoreoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramentroMonitoreo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ParamentroMonitoreoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.paramentroMonitoreo = paramentroMonitoreo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/paramentro-monitoreo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/paramentro-monitoreo', { outlets: { popup: null } }]);
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
