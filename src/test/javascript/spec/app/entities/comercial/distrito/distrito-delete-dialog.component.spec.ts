/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { DistritoDeleteDialogComponent } from 'app/entities/comercial/distrito/distrito-delete-dialog.component';
import { DistritoService } from 'app/entities/comercial/distrito/distrito.service';

describe('Component Tests', () => {
  describe('Distrito Management Delete Component', () => {
    let comp: DistritoDeleteDialogComponent;
    let fixture: ComponentFixture<DistritoDeleteDialogComponent>;
    let service: DistritoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DistritoDeleteDialogComponent]
      })
        .overrideTemplate(DistritoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DistritoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DistritoService);
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
