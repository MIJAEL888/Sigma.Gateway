import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFotografiaPunto } from 'app/shared/model/monitoreo/fotografia-punto.model';
import { FotografiaPuntoService } from './fotografia-punto.service';

@Component({
  selector: 'jhi-fotografia-punto-delete-dialog',
  templateUrl: './fotografia-punto-delete-dialog.component.html'
})
export class FotografiaPuntoDeleteDialogComponent {
  fotografiaPunto: IFotografiaPunto;

  constructor(
    protected fotografiaPuntoService: FotografiaPuntoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.fotografiaPuntoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'fotografiaPuntoListModification',
        content: 'Deleted an fotografiaPunto'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-fotografia-punto-delete-popup',
  template: ''
})
export class FotografiaPuntoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fotografiaPunto }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FotografiaPuntoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.fotografiaPunto = fotografiaPunto;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/fotografia-punto', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/fotografia-punto', { outlets: { popup: null } }]);
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
