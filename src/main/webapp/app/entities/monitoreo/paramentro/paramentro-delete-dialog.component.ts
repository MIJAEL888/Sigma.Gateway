import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParamentro } from 'app/shared/model/monitoreo/paramentro.model';
import { ParamentroService } from './paramentro.service';

@Component({
  selector: 'jhi-paramentro-delete-dialog',
  templateUrl: './paramentro-delete-dialog.component.html'
})
export class ParamentroDeleteDialogComponent {
  paramentro: IParamentro;

  constructor(
    protected paramentroService: ParamentroService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paramentroService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paramentroListModification',
        content: 'Deleted an paramentro'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-paramentro-delete-popup',
  template: ''
})
export class ParamentroDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paramentro }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ParamentroDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.paramentro = paramentro;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/paramentro', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/paramentro', { outlets: { popup: null } }]);
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
