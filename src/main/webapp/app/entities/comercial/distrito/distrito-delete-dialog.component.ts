import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDistrito } from 'app/shared/model/comercial/distrito.model';
import { DistritoService } from './distrito.service';

@Component({
  selector: 'jhi-distrito-delete-dialog',
  templateUrl: './distrito-delete-dialog.component.html'
})
export class DistritoDeleteDialogComponent {
  distrito: IDistrito;

  constructor(protected distritoService: DistritoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.distritoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'distritoListModification',
        content: 'Deleted an distrito'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-distrito-delete-popup',
  template: ''
})
export class DistritoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ distrito }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DistritoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.distrito = distrito;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/distrito', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/distrito', { outlets: { popup: null } }]);
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
