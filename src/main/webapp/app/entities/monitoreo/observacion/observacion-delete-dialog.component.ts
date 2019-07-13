import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IObservacion } from 'app/shared/model/monitoreo/observacion.model';
import { ObservacionService } from './observacion.service';

@Component({
  selector: 'jhi-observacion-delete-dialog',
  templateUrl: './observacion-delete-dialog.component.html'
})
export class ObservacionDeleteDialogComponent {
  observacion: IObservacion;

  constructor(
    protected observacionService: ObservacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.observacionService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'observacionListModification',
        content: 'Deleted an observacion'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-observacion-delete-popup',
  template: ''
})
export class ObservacionDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ observacion }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ObservacionDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.observacion = observacion;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/observacion', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/observacion', { outlets: { popup: null } }]);
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
