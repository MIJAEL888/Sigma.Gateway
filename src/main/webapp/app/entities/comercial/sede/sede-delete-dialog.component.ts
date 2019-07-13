import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISede } from 'app/shared/model/comercial/sede.model';
import { SedeService } from './sede.service';

@Component({
  selector: 'jhi-sede-delete-dialog',
  templateUrl: './sede-delete-dialog.component.html'
})
export class SedeDeleteDialogComponent {
  sede: ISede;

  constructor(protected sedeService: SedeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sedeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sedeListModification',
        content: 'Deleted an sede'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-sede-delete-popup',
  template: ''
})
export class SedeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sede }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SedeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sede = sede;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/sede', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/sede', { outlets: { popup: null } }]);
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
