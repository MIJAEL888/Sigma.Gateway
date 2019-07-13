/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { FotografiaPuntoDeleteDialogComponent } from 'app/entities/monitoreo/fotografia-punto/fotografia-punto-delete-dialog.component';
import { FotografiaPuntoService } from 'app/entities/monitoreo/fotografia-punto/fotografia-punto.service';

describe('Component Tests', () => {
  describe('FotografiaPunto Management Delete Component', () => {
    let comp: FotografiaPuntoDeleteDialogComponent;
    let fixture: ComponentFixture<FotografiaPuntoDeleteDialogComponent>;
    let service: FotografiaPuntoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [FotografiaPuntoDeleteDialogComponent]
      })
        .overrideTemplate(FotografiaPuntoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FotografiaPuntoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FotografiaPuntoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
