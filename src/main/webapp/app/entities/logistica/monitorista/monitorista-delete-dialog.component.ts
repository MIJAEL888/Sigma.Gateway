import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMonitorista } from 'app/shared/model/logistica/monitorista.model';
import { MonitoristaService } from './monitorista.service';

@Component({
  selector: 'jhi-monitorista-delete-dialog',
  templateUrl: './monitorista-delete-dialog.component.html'
})
export class MonitoristaDeleteDialogComponent {
  monitorista: IMonitorista;

  constructor(
    protected monitoristaService: MonitoristaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.monitoristaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'monitoristaListModification',
        content: 'Deleted an monitorista'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-monitorista-delete-popup',
  template: ''
})
export class MonitoristaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ monitorista }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MonitoristaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.monitorista = monitorista;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/monitorista', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/monitorista', { outlets: { popup: null } }]);
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
