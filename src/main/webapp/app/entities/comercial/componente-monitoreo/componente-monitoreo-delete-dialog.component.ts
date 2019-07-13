import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IComponenteMonitoreo } from 'app/shared/model/comercial/componente-monitoreo.model';
import { ComponenteMonitoreoService } from './componente-monitoreo.service';

@Component({
  selector: 'jhi-componente-monitoreo-delete-dialog',
  templateUrl: './componente-monitoreo-delete-dialog.component.html'
})
export class ComponenteMonitoreoDeleteDialogComponent {
  componenteMonitoreo: IComponenteMonitoreo;

  constructor(
    protected componenteMonitoreoService: ComponenteMonitoreoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.componenteMonitoreoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'componenteMonitoreoListModification',
        content: 'Deleted an componenteMonitoreo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-componente-monitoreo-delete-popup',
  template: ''
})
export class ComponenteMonitoreoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ componenteMonitoreo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ComponenteMonitoreoDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.componenteMonitoreo = componenteMonitoreo;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/componente-monitoreo', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/componente-monitoreo', { outlets: { popup: null } }]);
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
