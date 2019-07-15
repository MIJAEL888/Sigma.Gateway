/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { PosicionDeleteDialogComponent } from 'app/entities/rrhh/posicion/posicion-delete-dialog.component';
import { PosicionService } from 'app/entities/rrhh/posicion/posicion.service';

describe('Component Tests', () => {
  describe('Posicion Management Delete Component', () => {
    let comp: PosicionDeleteDialogComponent;
    let fixture: ComponentFixture<PosicionDeleteDialogComponent>;
    let service: PosicionService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PosicionDeleteDialogComponent]
      })
        .overrideTemplate(PosicionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PosicionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PosicionService);
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