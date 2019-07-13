/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { RequisitosSeguridadDeleteDialogComponent } from 'app/entities/comercial/requisitos-seguridad/requisitos-seguridad-delete-dialog.component';
import { RequisitosSeguridadService } from 'app/entities/comercial/requisitos-seguridad/requisitos-seguridad.service';

describe('Component Tests', () => {
  describe('RequisitosSeguridad Management Delete Component', () => {
    let comp: RequisitosSeguridadDeleteDialogComponent;
    let fixture: ComponentFixture<RequisitosSeguridadDeleteDialogComponent>;
    let service: RequisitosSeguridadService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RequisitosSeguridadDeleteDialogComponent]
      })
        .overrideTemplate(RequisitosSeguridadDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RequisitosSeguridadDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RequisitosSeguridadService);
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
